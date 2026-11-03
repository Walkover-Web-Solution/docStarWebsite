// Crawls a running copy of the site (npm run start) and records what search engines and agents see on
// every page: status, head tags, headings, links, images, JSON-LD and the markdown twin.
// Used by scripts/seo-check.mjs. No dependencies: the site's HTML is ours and regular enough for regexes.

const decode = (s) =>
  String(s ?? "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&nbsp;/g, " ");

const stripTags = (s) => decode(s.replace(/<!--.*?-->/gs, "").replace(/<[^>]+>/g, "")).replace(/\s+/g, " ").trim();

function attrs(tag) {
  const out = {};
  for (const m of tag.matchAll(/([a-zA-Z_:][-a-zA-Z0-9_:.]*)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g)) {
    out[m[1].toLowerCase()] = decode(m[2] ?? m[3] ?? m[4] ?? "");
  }
  return out;
}

const tags = (html, name) => [...html.matchAll(new RegExp(`<${name}\\b[^>]*>`, "gi"))].map((m) => attrs(m[0].slice(name.length + 1, -1)));

/** Everything the checks need from one HTML page. */
export function parsePage(html) {
  // Next.js can stream metadata into <body>; read tags from the whole document and report where they were.
  const head = html;
  const bodyAt = html.search(/<body\b/i);
  const titleAt = html.search(/<title\b/i);
  const metas = tags(head, "meta");
  const meta = (key) => metas.find((m) => m.name === key || m.property === key)?.content;
  const links = tags(head, "link");
  const headings = [...html.matchAll(/<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>/gi)].map((m) => ({ level: Number(m[1]), text: stripTags(m[2]) }));
  const jsonLd = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)].map((m) => {
    try {
      return { ok: true, value: JSON.parse(m[1]) };
    } catch (error) {
      return { ok: false, error: String(error.message) };
    }
  });
  const body = html.match(/<body\b[^>]*>([\s\S]*)<\/body>/i)?.[1] ?? html;
  const text = stripTags(body.replace(/<script[\s\S]*?<\/script>/gi, "").replace(/<style[\s\S]*?<\/style>/gi, ""));
  return {
    metadataInHead: titleAt >= 0 && titleAt < bodyAt,
    lang: html.match(/<html[^>]*\slang="([^"]*)"/i)?.[1],
    title: stripTags(head.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? ""),
    description: meta("description"),
    robots: meta("robots"),
    viewport: meta("viewport"),
    themeColor: meta("theme-color"),
    canonical: links.find((l) => l.rel === "canonical")?.href,
    markdownAlternate: links.find((l) => l.rel === "alternate" && l.type === "text/markdown")?.href,
    manifest: links.find((l) => l.rel === "manifest")?.href,
    appleIcon: links.find((l) => l.rel === "apple-touch-icon")?.href,
    og: Object.fromEntries(metas.filter((m) => m.property?.startsWith("og:")).map((m) => [m.property, m.content])),
    twitter: Object.fromEntries(metas.filter((m) => m.name?.startsWith("twitter:")).map((m) => [m.name, m.content])),
    headings,
    h1: headings.filter((h) => h.level === 1).map((h) => h.text),
    jsonLd,
    anchors: tags(body, "a").map((a) => a.href).filter(Boolean),
    images: tags(body, "img").map((i) => ({ src: i.src, alt: i.alt })),
    words: text ? text.split(" ").length : 0,
  };
}

/** Flattens JSON-LD (arrays and @graph) into a list of typed nodes. */
export function ldNodes(jsonLd) {
  const out = [];
  const walk = (v) => {
    if (Array.isArray(v)) return v.forEach(walk);
    if (v && typeof v === "object") {
      if (v["@graph"]) walk(v["@graph"]);
      if (v["@type"]) out.push(v);
    }
  };
  jsonLd.filter((j) => j.ok).forEach((j) => walk(j.value));
  return out;
}

async function get(url, init = {}) {
  const res = await fetch(url, { redirect: "manual", ...init, headers: { "user-agent": "Mozilla/5.0 (Macintosh) docstar-seo-check", accept: "text/html", ...init.headers } });
  const body = res.status >= 300 && res.status < 400 ? "" : await res.text();
  return { status: res.status, headers: res.headers, body, location: res.headers.get("location") };
}

/**
 * Crawls `base` starting from `seeds` (paths), following internal links found in the HTML.
 * Returns one record per internal URL plus the sitemap, robots.txt and llms.txt bodies.
 */
export async function crawl(base, seeds = ["/"]) {
  const origin = new URL(base).origin;
  const queue = [...new Set(seeds)];
  const seen = new Set();
  const pages = [];
  const linkedFrom = new Map();

  while (queue.length) {
    const path = queue.shift();
    if (seen.has(path)) continue;
    seen.add(path);
    const res = await get(origin + path);
    const record = { path, status: res.status, location: res.location, contentType: res.headers.get("content-type") };
    if (res.status === 200 && record.contentType?.includes("text/html")) {
      Object.assign(record, parsePage(res.body));
      for (const href of record.anchors) {
        let url;
        try {
          url = new URL(href, origin + path);
        } catch {
          continue;
        }
        const internal = url.origin === origin || url.host === "docstar.io";
        if (!internal || !["http:", "https:"].includes(url.protocol)) continue;
        const target = url.pathname;
        if (!linkedFrom.has(target)) linkedFrom.set(target, new Set());
        linkedFrom.get(target).add(path);
        // Pages served by other apps on docstar.io (help docs, blog) can't be crawled locally.
        if (url.origin !== origin) continue;
        if (!seen.has(target)) queue.push(target);
      }
    }
    pages.push(record);
  }

  const text = async (p, init) => {
    const r = await get(origin + p, init);
    return { status: r.status, body: r.body, headers: Object.fromEntries(r.headers) };
  };
  return {
    pages,
    linkedFrom: Object.fromEntries([...linkedFrom].map(([k, v]) => [k, [...v]])),
    sitemap: await text("/sitemap.xml"),
    robots: await text("/robots.txt"),
    llms: await text("/llms.txt"),
    llmsFull: await text("/llms-full.txt"),
    get: text,
  };
}
