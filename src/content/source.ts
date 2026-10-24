import { draftMode } from "next/headers";
import type { SitePage } from "./types";
import { PAGES } from "./pages";
import { hasDb, withDb } from "@/server/db";
import { getPageContent, pageCache } from "@/server/content";

// Where page content comes from: the published version in the website's own database, cached for a
// minute per server instance (publishing clears that instance's copy at once). In draft mode (admin
// preview) the newest draft is read uncached. If the database is unset or unreachable, or a page
// hasn't been added to it yet, the copy bundled in src/content is used, so the site never renders empty.

export const REVALIDATE_SECONDS = 60;

const local = (slug: string) => PAGES.find((p) => p.slug === slug);

async function isPreview() {
  try {
    return (await draftMode()).isEnabled;
  } catch {
    return false; // outside a request (e.g. build-time static generation)
  }
}

const asPage = (data: any): SitePage => ({ slug: data.slug, path: data.path, meta: data.meta, sections: data.sections });

async function cached<T>(key: string, load: () => Promise<T>): Promise<T> {
  const hit = pageCache.get(key);
  if (hit && Date.now() - hit.at < REVALIDATE_SECONDS * 1000) return hit.value as T;
  const value = await load();
  pageCache.set(key, { at: Date.now(), value });
  return value;
}

export async function getSitePage(slug: string): Promise<SitePage> {
  const fallback = local(slug);
  if (!hasDb()) {
    if (!fallback) throw new Error(`No content for page "${slug}"`);
    return fallback;
  }

  const preview = await isPreview();
  try {
    const load = () => withDb((db) => getPageContent(db, slug, { draft: preview }).then(asPage));
    return preview ? await load() : await cached(`page:${slug}`, load);
  } catch (error: any) {
    // 404: the page hasn't been added to the database yet; the bundled copy is the source.
    if (fallback) {
      if (error?.status !== 404) console.error(`[content] using bundled copy of "${slug}":`, error?.message);
      return fallback;
    }
    throw error;
  }
}

// One version of a page that is in a running A/B test; null when no running test uses it.
export async function getVariantPage(slug: string, revisionId: number, opts: { preview?: boolean } = {}): Promise<SitePage | null> {
  if (!hasDb()) return null;
  if (opts.preview) {
    // operator preview: never cached, may be a draft
    try {
      return await withDb((db) => getPageContent(db, slug, { variant: revisionId, preview: true }).then(asPage));
    } catch {
      return null;
    }
  }
  try {
    return await cached(`variant:${revisionId}`, () => withDb((db) => getPageContent(db, slug, { variant: revisionId }).then(asPage)));
  } catch {
    return null;
  }
}

export async function getSitePages(): Promise<SitePage[]> {
  return Promise.all(PAGES.map((p) => getSitePage(p.slug)));
}
