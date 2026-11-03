// The SEO test suite. Crawls a running copy of the site and fails on anything that would hurt how search
// engines or agents read it.
//   npm run build && DATABASE_URL= npm run start      (another terminal)
//   npm run seo:check                                  (SEO_BASE_URL defaults to http://localhost:3000)
//   node scripts/seo-check.mjs --report seo/crawl.json  also writes the raw crawl
// Exits 1 if any error is found; warnings are printed but don't fail.
import { writeFileSync } from "node:fs";
import { crawl, ldNodes } from "./seo/crawl.mjs";

const base = process.env.SEO_BASE_URL || "http://localhost:3000";
const reportPath = process.argv.includes("--report") ? process.argv[process.argv.indexOf("--report") + 1] : null;

const LIMITS = { title: [50, 60], description: [140, 160] };
// Paths on docstar.io served by other apps (DocStar help docs and blog), not this site.
const EXTERNAL_PREFIXES = ["/help", "/blog"];
const isExternal = (p) => EXTERNAL_PREFIXES.some((x) => p === x || p.startsWith(`${x}/`));

const errors = [];
const warnings = [];
const error = (where, msg) => errors.push({ where, msg });
const warn = (where, msg) => warnings.push({ where, msg });

const content = await fetch(`${base}/content.json`).then((r) => r.json());
const indexable = content.pages.map((p) => p.path);
const site = await crawl(base, ["/", ...indexable]);
const byPath = new Map(site.pages.map((p) => [p.path, p]));

// ---------- every indexable page ----------
const titles = new Map();
const descriptions = new Map();
for (const path of indexable) {
  const p = byPath.get(path);
  if (!p || p.status !== 200) {
    error(path, `status ${p?.status ?? "not fetched"}`);
    continue;
  }
  if (p.title && !p.metadataInHead) error(path, "metadata is streamed into <body>; crawlers that don't run JS may miss it");
  if (p.lang !== "en") error(path, `<html lang> is "${p.lang}"`);
  if (!p.viewport?.includes("width=device-width")) error(path, "viewport meta missing");
  if (p.h1.length !== 1) error(path, `${p.h1.length} H1s (${p.h1.join(" / ")})`);
  let prev = 0;
  for (const h of p.headings) {
    if (prev && h.level > prev + 1) warn(path, `heading skips from h${prev} to h${h.level} ("${h.text.slice(0, 40)}")`);
    prev = h.level;
  }

  const [tMin, tMax] = LIMITS.title;
  if (!p.title) error(path, "no <title>");
  else if (p.title.length < tMin || p.title.length > tMax) error(path, `title is ${p.title.length} chars, want ${tMin}-${tMax}: "${p.title}"`);
  const [dMin, dMax] = LIMITS.description;
  if (!p.description) error(path, "no meta description");
  else if (p.description.length < dMin || p.description.length > dMax) error(path, `description is ${p.description.length} chars, want ${dMin}-${dMax}`);
  if (p.title) titles.set(p.title, [...(titles.get(p.title) || []), path]);
  if (p.description) descriptions.set(p.description, [...(descriptions.get(p.description) || []), path]);

  if (!p.canonical) error(path, "no canonical");
  else {
    const c = new URL(p.canonical, "https://x.invalid");
    if (!/^https:\/\//.test(p.canonical)) error(path, `canonical is not absolute https: ${p.canonical}`);
    if (c.search || c.hash) error(path, `canonical has query or hash: ${p.canonical}`);
    if (c.pathname !== path) error(path, `canonical points elsewhere: ${p.canonical}`);
  }
  if (/noindex/i.test(p.robots || "")) error(path, `robots meta: ${p.robots}`);
  if (!p.markdownAlternate) error(path, 'no <link rel="alternate" type="text/markdown">');

  for (const k of ["og:title", "og:description", "og:url", "og:type", "og:image", "og:site_name"]) if (!p.og[k]) error(path, `${k} missing`);
  for (const k of ["twitter:card", "twitter:image"]) if (!p.twitter[k]) error(path, `${k} missing`);
  if (p.og["og:url"] && p.canonical && p.og["og:url"].replace(/\/$/, "") !== p.canonical.replace(/\/$/, "")) error(path, `og:url ${p.og["og:url"]} != canonical ${p.canonical}`);

  for (const j of p.jsonLd.filter((j) => !j.ok)) error(path, `JSON-LD does not parse: ${j.error}`);
  const nodes = ldNodes(p.jsonLd);
  const types = nodes.map((n) => n["@type"]);
  const need = (type, props) => {
    const node = nodes.find((n) => n["@type"] === type);
    if (!node) return error(path, `JSON-LD ${type} missing`);
    for (const prop of props) if (node[prop] == null || node[prop] === "") error(path, `JSON-LD ${type}.${prop} missing`);
    return node;
  };
  need("Organization", ["name", "url", "logo"]);
  if (path === "/") need("WebSite", ["name", "url"]);
  else {
    const crumbs = need("BreadcrumbList", ["itemListElement"]);
    for (const [i, item] of (crumbs?.itemListElement || []).entries()) {
      if (item.position !== i + 1 || !item.name || (!item.item && i < crumbs.itemListElement.length - 1)) error(path, `BreadcrumbList item ${i + 1} is incomplete`);
    }
  }
  for (const app of nodes.filter((n) => n["@type"] === "SoftwareApplication")) {
    for (const prop of ["name", "applicationCategory", "operatingSystem", "offers"]) if (!app[prop]) error(path, `SoftwareApplication.${prop} missing`);
    for (const offer of [app.offers].flat().filter(Boolean)) if (offer.price == null || !offer.priceCurrency) error(path, "SoftwareApplication offer without price/priceCurrency");
    if (app.aggregateRating || app.review) error(path, "SoftwareApplication has ratings or reviews; only real, visible ones are allowed");
  }
  if (types.includes("FAQPage")) warn(path, "FAQPage markup (FAQ rich results are limited; keep FAQs as visible content)");

  for (const img of p.images) if (img.alt == null) error(path, `<img src="${img.src}"> has no alt attribute`);
}
for (const [t, paths] of titles) if (paths.length > 1) error(paths.join(", "), `duplicate title "${t}"`);
for (const [d, paths] of descriptions) if (paths.length > 1) error(paths.join(", "), "duplicate meta description");

// ---------- internal links ----------
for (const [target, from] of Object.entries(site.linkedFrom)) {
  if (isExternal(target)) continue;
  const page = byPath.get(target);
  const status = page?.status;
  if (status === 200) continue;
  if (status >= 300 && status < 400) warn(target, `internal link redirects (${status} → ${page.location}); link the destination. From: ${from.slice(0, 3).join(", ")}`);
  else if (target.endsWith(".md") || target.endsWith(".txt")) {
    const r = await site.get(target);
    if (r.status !== 200) error(target, `broken internal link (${r.status}), from ${from.slice(0, 3).join(", ")}`);
  } else error(target, `broken internal link (${status}), from ${from.slice(0, 3).join(", ")}`);
}
const reachable = new Set(Object.keys(site.linkedFrom));
for (const path of indexable) if (path !== "/" && !reachable.has(path)) error(path, "orphan page: no internal link points to it");

// ---------- sitemap ----------
if (site.sitemap.status !== 200) error("/sitemap.xml", `status ${site.sitemap.status}`);
else {
  const urls = [...site.sitemap.body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => decode(m[1]));
  const ours = urls.map((u) => new URL(u)).filter((u) => !isExternal(u.pathname));
  const listed = new Set(ours.map((u) => u.pathname));
  for (const u of ours) {
    if (u.protocol !== "https:") error("/sitemap.xml", `non-https URL ${u}`);
    if (u.pathname.endsWith(".md")) error("/sitemap.xml", `markdown twin listed: ${u}`);
    if (!indexable.includes(u.pathname)) error("/sitemap.xml", `lists a URL that isn't an indexable page: ${u}`);
  }
  for (const path of indexable) if (!listed.has(path)) error("/sitemap.xml", `missing ${path}`);
  const lastmods = [...site.sitemap.body.matchAll(/<lastmod>([^<]+)<\/lastmod>/g)].map((m) => m[1]);
  const now = Date.now();
  if (lastmods.length && lastmods.every((d) => Math.abs(now - Date.parse(d)) < 120_000)) error("/sitemap.xml", "every lastmod is the time of the request");
}

// ---------- robots.txt ----------
if (site.robots.status !== 200) error("/robots.txt", `status ${site.robots.status}`);
else {
  const body = site.robots.body;
  if (!/^user-agent:/im.test(body)) error("/robots.txt", "no User-agent group");
  const sitemapLine = body.match(/^sitemap:\s*(\S+)/im)?.[1];
  if (!sitemapLine || !/^https:\/\//.test(sitemapLine)) error("/robots.txt", "no absolute Sitemap line");
  const star = body.split(/\n\s*\n/).find((g) => /^user-agent:\s*\*\s*$/im.test(g)) || "";
  if (/^disallow:\s*\/\s*$/im.test(star)) error("/robots.txt", "Disallow: / for all crawlers");
  for (const p of ["/llms.txt", "/mcp.md"]) if (new RegExp(`^disallow:\\s*${p.replace(".", "\\.")}`, "im").test(star)) error("/robots.txt", `blocks ${p}`);
}

// ---------- markdown twins and llms.txt ----------
for (const path of indexable) {
  const md = path === "/" ? "/index.md" : `${path}.md`;
  const r = await site.get(md, { headers: { accept: "*/*" } });
  if (r.status !== 200 || !String(r.headers["content-type"]).includes("text/markdown")) error(md, `markdown twin: status ${r.status}, ${r.headers["content-type"]}`);
  else {
    const link = r.headers["link"] || "";
    if (!/rel="?canonical"?/.test(link)) error(md, "markdown twin sends no Link rel=canonical header");
  }
  if (!site.llms.body.includes(`https://docstar.io${md}`)) error("/llms.txt", `doesn't list ${md}`);
  const neg = await site.get(path, { headers: { accept: "text/markdown" } });
  if (!String(neg.headers["content-type"]).includes("text/markdown")) error(path, "Accept: text/markdown doesn't return markdown");
  if (!/\baccept\b/i.test(neg.headers["vary"] || "")) error(path, "markdown response lacks Vary: Accept");
  const html = await site.get(path);
  if (!/\baccept\b/i.test(html.headers["vary"] || "")) error(path, "HTML response lacks Vary: Accept");
}
if (site.llmsFull.status !== 200) error("/llms-full.txt", `status ${site.llmsFull.status}`);

// ---------- status codes ----------
const missing = await site.get("/this-page-does-not-exist-seo-check");
if (missing.status !== 404) error("/this-page-does-not-exist-seo-check", `unknown URL returns ${missing.status}, want 404`);

// ---------- output ----------
function decode(s) {
  return s.replace(/&amp;/g, "&");
}
if (reportPath) {
  const { get, ...data } = site;
  writeFileSync(reportPath, JSON.stringify({ base, indexable, errors, warnings, ...data }, null, 2));
}
for (const w of warnings) console.log(`warn   ${w.where}: ${w.msg}`);
for (const e of errors) console.log(`ERROR  ${e.where}: ${e.msg}`);
console.log(`\n${indexable.length} pages checked: ${errors.length} errors, ${warnings.length} warnings`);
process.exit(errors.length ? 1 : 0);
