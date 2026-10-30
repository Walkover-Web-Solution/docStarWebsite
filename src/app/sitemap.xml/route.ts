import { getSitePages } from "@/content/source";
import { absolute } from "@/lib/seo";

// sitemap.xml: every live website page (src/content/pages.ts) plus the help docs and blog, which the
// DocStar product serves on docstar.io/help and docstar.io/blog. Markdown twins are alternates, not
// listed. lastmod is the page's real change date; the help and blog feeds have none, so theirs is left out.
// Rendered per request (cached by the CDN for 5 minutes), never baked in at build time.
export const dynamic = "force-dynamic";

const FEEDS = {
  help: "https://api.docstar.io/p/published-urls/fLMgydvRdvN7",
  blog: "https://api.docstar.io/p/published-urls/wAkjF0zqiO2E",
};
const ORIGIN = "https://docstar.io";

// The feeds return URLs as strings or objects ({ url | link | href }), possibly wrapped ({ urls | records | data | items | results | rows }).
function urlsFrom(payload: unknown): string[] {
  const list = Array.isArray(payload)
    ? payload
    : payload && typeof payload === "object"
      ? (["urls", "records", "data", "items", "results", "rows"].map((k) => (payload as Record<string, unknown>)[k]).find(Array.isArray) as unknown[]) || []
      : [];
  return list
    .map((e) => (typeof e === "string" ? e : e && typeof e === "object" ? ((e as any).url ?? (e as any).link ?? (e as any).href) : null))
    .filter((u): u is string => typeof u === "string" && !!u.trim())
    .map((u) => {
      const url = new URL(u.trim(), ORIGIN);
      if (url.hostname === "www.docstar.io") url.hostname = "docstar.io";
      url.protocol = "https:";
      return url.toString().replace(/\/$/, "");
    });
}

async function feed(name: keyof typeof FEEDS) {
  try {
    const res = await fetch(FEEDS[name], { headers: { Accept: "application/json" }, cache: "no-store" });
    if (!res.ok) throw new Error(`${res.status}`);
    return urlsFrom(await res.json());
  } catch (error) {
    console.error(`[sitemap] ${name} feed:`, error);
    return [];
  }
}

const iso = (date?: string) => {
  const d = date ? new Date(date) : null;
  return d && !Number.isNaN(d.getTime()) ? d.toISOString() : null;
};

const escapeXml = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");

export async function GET() {
  const [pages, help, blog] = await Promise.all([getSitePages(), feed("help"), feed("blog")]);
  const entries = new Map<string, string | null>();
  for (const page of pages) entries.set(absolute(page.path), iso(page.updated));
  for (const url of [...help, ...blog]) if (!entries.has(url)) entries.set(url, null);

  const body = [...entries]
    .map(([loc, lastmod]) => `  <url>\n    <loc>${escapeXml(loc)}</loc>${lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ""}\n  </url>`)
    .join("\n");
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`, {
    headers: { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "public, s-maxage=300, stale-while-revalidate=86400" },
  });
}
