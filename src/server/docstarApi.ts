// The few DocStar API calls the blog autopilot needs (https://developers.docstar.io), on the DocStar
// "Blogs" collection that docstar.io/blog serves. Auth: a DocStar API token (hm_…) of a team member with
// read-write access to that collection, in DOCSTAR_API_TOKEN.

const API = "https://api.docstar.io";
export const BLOG = {
  orgId: process.env.DOCSTAR_BLOG_ORG_ID || "15356",
  collectionId: process.env.DOCSTAR_BLOG_COLLECTION_ID || "wAkjF0zqiO2E",
  // the collection's invisible root page: new pages under it are top-level blog posts
  rootPageId: process.env.DOCSTAR_BLOG_ROOT_PAGE_ID || "goV5ov4QvrqK",
};

export const isConfigured = () => !!process.env.DOCSTAR_API_TOKEN;

/** Where a person edits the draft in the DocStar app. */
export const editorUrl = (pageId: string) => `https://app.docstar.io/orgs/${BLOG.orgId}/dashboard/page/${encodeURIComponent(pageId)}`;

async function call<T = any>(method: string, path: string, body?: unknown): Promise<T> {
  if (!isConfigured()) throw new Error("DOCSTAR_API_TOKEN is not set");
  const res = await fetch(`${API}${path}`, {
    method,
    headers: { authorization: `Bearer ${process.env.DOCSTAR_API_TOKEN}`, "content-type": "application/json", accept: "application/json" },
    body: body === undefined ? undefined : JSON.stringify(body),
    signal: AbortSignal.timeout(30_000),
  });
  const text = await res.text();
  let data: any = text;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    // some errors are plain text, e.g. "Parent page is not published"
  }
  if (!res.ok) throw new Error(`DocStar API ${method} ${path.split("?")[0]} failed (${res.status}): ${String(data?.message || data?.error || text).slice(0, 300)}`);
  return data as T;
}

/** Every blog page, published or draft: id, name, urlName, state. */
export async function listPosts(): Promise<{ id: string; name: string; urlName: string; isPublished: boolean }[]> {
  const data = await call("GET", `/orgs/${BLOG.orgId}/collection/${BLOG.collectionId}/pages`);
  const pages: any[] = Array.isArray(data) ? data : data?.pages || [];
  return pages.filter((p) => p.type !== 0).map((p) => ({ id: p.id, name: p.name, urlName: p.urlName, isPublished: !!p.isPublished }));
}

/**
 * Creates an unpublished blog post with its body. Returns the DocStar page id.
 * The body goes in `contents` (Markdown): a new page has no live editor document yet, so /ydoc would 404. The editor
 * builds its document from `contents` when someone opens the page, and publishing uses `contents` until then.
 */
export async function createDraft(post: { title: string; slug: string; description: string; tags: string[]; markdown: string; coverUrl?: string | null }) {
  const meta: Record<string, unknown> = { title: post.title, description: post.description, tags: post.tags };
  // the blog list and the post header show meta.featureImage, like the hand-written posts
  if (post.coverUrl) meta.featureImage = { name: `${post.slug}-cover.png`, url: post.coverUrl };
  const created = await call("POST", `/orgs/${BLOG.orgId}/pages/${BLOG.rootPageId}`, {
    name: post.title,
    urlName: post.slug,
    state: 1,
    contents: post.markdown,
    meta,
  });
  const page = created?.page || created;
  if (!page?.id) throw new Error("DocStar didn't return the new page's id");
  return { pageId: page.id as string, slug: (page.urlName as string) || post.slug };
}

/** A cover image from DocStar's AI image tool, stored next to the other covers. Returns its URL. */
export async function generateCover(prompt: string): Promise<string> {
  const data = await call("POST", "/ai/generate-image", { searchTerm: prompt.slice(0, 1000), uploadToGCP: true, pathData: `${BLOG.collectionId}/covers` });
  const url = data?.data?.[0] || data?.details?.[0]?.gcpUrl;
  if (!url || !/^https:\/\//.test(url)) throw new Error("DocStar didn't return an image");
  return url as string;
}

/** Every published page of DocStar's help docs (docstar.io/help/…), for links in posts. Public, no token. */
export async function helpPageUrls(): Promise<string[]> {
  const res = await fetch("https://api.docstar.io/p/published-urls/fLMgydvRdvN7", { signal: AbortSignal.timeout(15_000) });
  const urls = res.ok ? await res.json() : [];
  return Array.isArray(urls) ? urls.filter((u) => typeof u === "string" && u.startsWith("https://docstar.io/help/")) : [];
}

/** Publishes the page's current content (including any edits made in the DocStar editor). */
export async function publish(pageId: string): Promise<{ publicUrl: string | null }> {
  const data = await call("PATCH", `/orgs/${BLOG.orgId}/pages/${encodeURIComponent(pageId)}/state`, { state: 2 });
  return { publicUrl: data?.publicUrl || null };
}

export async function deletePage(pageId: string) {
  await call("DELETE", `/orgs/${BLOG.orgId}/pages/${encodeURIComponent(pageId)}`);
}
