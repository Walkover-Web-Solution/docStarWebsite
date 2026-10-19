import { draftMode } from "next/headers";
import type { SitePage } from "./types";
import { PAGES } from "./pages";

// Where page content comes from: the published revision in hitman-api (/site/pages/:slug),
// cached for a minute. Publishing also calls /api/revalidate, but tag revalidation does not
// reach edge-runtime pages on every host, so the short time window is what guarantees
// freshness. In draft mode (admin preview) the newest draft is fetched uncached. If the API
// is unset or unreachable, the copy in src/content is used, so the site never renders empty.

const API = process.env.DOCSTAR_API_URL;
export const REVALIDATE_SECONDS = 60;

const local = (slug: string) => PAGES.find((p) => p.slug === slug);

async function isPreview() {
  try {
    return (await draftMode()).isEnabled;
  } catch {
    return false; // outside a request (e.g. build-time static generation)
  }
}

export async function getSitePage(slug: string): Promise<SitePage> {
  const fallback = local(slug);
  if (!API) {
    if (!fallback) throw new Error(`No content for page "${slug}"`);
    return fallback;
  }

  const preview = await isPreview();
  try {
    const res = await fetch(`${API.replace(/\/$/, "")}/site/pages/${encodeURIComponent(slug)}${preview ? "?draft=1" : ""}`, {
      headers: preview && process.env.SITE_PREVIEW_SECRET ? { "x-preview-secret": process.env.SITE_PREVIEW_SECRET } : {},
      ...(preview ? { cache: "no-store" as const } : { next: { tags: [`site:${slug}`, "site:pages"], revalidate: REVALIDATE_SECONDS } }),
    });
    // 404: the page hasn't been added to the content store yet; the bundled copy is the source.
    if (res.status === 404 && fallback) return fallback;
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return { slug: data.slug, path: data.path, meta: data.meta, sections: data.sections };
  } catch (error) {
    if (!fallback) throw error;
    console.error(`[content] using bundled copy of "${slug}":`, (error as Error).message);
    return fallback;
  }
}

export async function getSitePages(): Promise<SitePage[]> {
  return Promise.all(PAGES.map((p) => getSitePage(p.slug)));
}
