import { AdminError, createRow, getRow, mapRow, updateRow, type Actor, type AdminRow } from "./adminTypes";
import { withTx, type Db } from "./db";
import { pageContentSchema } from "./siteSchema";

// Versioned content for docstar.io. A page has many versions ("revisions"); at most one is published.
// Pages and versions are rows of the `admin` table:
//   page           key = slug, data = { path, publishedRevisionId }
//   page_revision  parent = page, status, actor*, data = { version, content, note, basedOnRevisionId, publishedAt, publishedBy }

export type { Actor };

export const STATUS = { DRAFT: "draft", PUBLISHED: "published", SUPERSEDED: "superseded", REJECTED: "rejected" } as const;

const LATEST_VERSION = "(data->>'version')::int DESC";

const pageView = (p: AdminRow) => ({ id: p.id, slug: p.key as string, path: p.data.path as string, publishedRevisionId: (p.data.publishedRevisionId ?? null) as number | null });

export const revisionSummary = (r: AdminRow | null) =>
  r && {
    id: r.id,
    version: r.data.version as number,
    status: r.status as string,
    actorType: r.actorType,
    actorName: r.actorName,
    note: r.data.note as string | null,
    basedOnRevisionId: r.data.basedOnRevisionId as number | null,
    createdAt: r.createdAt,
    publishedAt: r.data.publishedAt as string | null,
  };

// ---------- finding things ----------

export async function findPage(db: Db, slug: string, lock = false) {
  const row = await db.one(`SELECT * FROM admin WHERE type = 'page' AND key = $1 ${lock ? "FOR UPDATE" : ""}`, [slug]);
  if (!row) throw new AdminError(404, `Page "${slug}" not found`);
  return mapRow(row);
}

export async function findRevision(db: Db, id: number, lock = false) {
  const row = await db.one(`SELECT * FROM admin WHERE id = $1 AND type = 'page_revision' ${lock ? "FOR UPDATE" : ""}`, [id]);
  return row ? mapRow(row) : null;
}

const latestRevision = async (db: Db, pageId: number, onlyDrafts = false) => {
  const row = await db.one(`SELECT * FROM admin WHERE type = 'page_revision' AND parent_id = $1 ${onlyDrafts ? "AND status = 'draft'" : ""} ORDER BY ${LATEST_VERSION} LIMIT 1`, [pageId]);
  return row ? mapRow(row) : null;
};

// ---------- reading, for the website ----------

/**
 * A page's content: the published version; with `draft` the newest draft (admin preview); with
 * `variant` a version that is part of a running A/B test on this page (anything else is not found).
 */
export async function getPageContent(db: Db, slug: string, { draft = false, variant }: { draft?: boolean; variant?: number } = {}) {
  const page = pageView(await findPage(db, slug));
  let revision: AdminRow | null = null;
  if (variant) {
    const running = await db.one(
      "SELECT 1 AS ok FROM admin WHERE type = 'experiment' AND status = 'running' AND parent_id = $1 AND data->'variants' @> jsonb_build_array(jsonb_build_object('revisionId', $2::int))",
      [page.id, variant]
    );
    if (!running) throw new AdminError(404, "No running test uses this version");
    revision = await findRevision(db, variant);
  } else {
    if (draft) revision = await latestRevision(db, page.id, true);
    if (!revision && page.publishedRevisionId) revision = await findRevision(db, page.publishedRevisionId);
  }
  if (!revision) throw new AdminError(404, `Page "${slug}" has no published content`);
  const updatedAt = (revision.data.publishedAt as string | null) ?? null;
  return { slug: page.slug, path: page.path, version: revision.data.version as number, status: revision.status as string, updatedAt, ...(revision.data.content as { meta: any; sections: any[] }) };
}

// ---------- reading, for the admin ----------

export async function listPagesForAdmin(db: Db) {
  const pages = (await db.query("SELECT * FROM admin WHERE type = 'page' ORDER BY data->>'path'")).map(mapRow).map(pageView);
  if (!pages.length) return [];
  const latest = (await db.query("SELECT DISTINCT ON (parent_id) * FROM admin WHERE type = 'page_revision' ORDER BY parent_id, " + LATEST_VERSION)).map(mapRow);
  const published = (await db.query("SELECT * FROM admin WHERE type = 'page_revision' AND id = ANY($1::int[])", [pages.map((p) => p.publishedRevisionId).filter(Boolean)])).map(mapRow);
  return pages.map((p) => {
    const pub = published.find((r) => r.id === p.publishedRevisionId) || null;
    const last = latest.find((r) => r.parentId === p.id) || null;
    return { slug: p.slug, path: p.path, title: ((pub || last)?.data.content?.meta?.title as string) || null, published: revisionSummary(pub), latest: revisionSummary(last) };
  });
}

export async function getPageForAdmin(db: Db, slug: string) {
  const page = pageView(await findPage(db, slug));
  const revisions = (await db.query(`SELECT * FROM admin WHERE type = 'page_revision' AND parent_id = $1 ORDER BY ${LATEST_VERSION} LIMIT 50`, [page.id])).map(mapRow);
  return { slug: page.slug, path: page.path, publishedRevisionId: page.publishedRevisionId, revisions: revisions.map(revisionSummary) };
}

export async function getRevision(db: Db, id: number) {
  const revision = await findRevision(db, id);
  if (!revision) throw new AdminError(404, "Revision not found");
  const page = pageView((await getRow(db, revision.parentId as number)) as AdminRow);
  return { ...revisionSummary(revision)!, content: revision.data.content, page: { slug: page.slug, path: page.path, publishedRevisionId: page.publishedRevisionId } };
}

// ---------- changing ----------

export async function createPage(db: Db, input: { slug: string; path: string; content: unknown; note?: string }, actor: Actor) {
  const content = pageContentSchema.parse(input.content);
  return withTx(db, async () => {
    const exists = await db.one("SELECT 1 AS ok FROM admin WHERE type = 'page' AND (key = $1 OR data->>'path' = $2)", [input.slug, input.path]);
    if (exists) throw new AdminError(409, "A page with this slug or path already exists");
    const page = await createRow(db, "page", { key: input.slug, actor, data: { path: input.path } });
    const revision = await createRow(db, "page_revision", { parentId: page.id, status: STATUS.DRAFT, actor, data: { version: 1, content, note: input.note ?? null } });
    return { slug: input.slug, path: input.path, revision: revisionSummary(revision)! };
  });
}

export async function saveRevision(db: Db, slug: string, input: { content: unknown; note?: string; basedOnRevisionId?: number }, actor: Actor) {
  const content = pageContentSchema.parse(input.content);
  return withTx(db, async () => {
    const page = await findPage(db, slug, true); // lock the page so version numbers can't clash
    const next = await db.one<{ v: number }>("SELECT COALESCE(max((data->>'version')::int), 0) + 1 AS v FROM admin WHERE type = 'page_revision' AND parent_id = $1", [page.id]);
    const revision = await createRow(db, "page_revision", {
      parentId: page.id,
      status: STATUS.DRAFT,
      actor,
      data: { version: next!.v, content, note: input.note ?? null, basedOnRevisionId: input.basedOnRevisionId ?? page.data.publishedRevisionId ?? null },
    });
    return revisionSummary(revision)!;
  });
}

// What visitors read is cached for a minute per server instance; publishing clears this instance's copy,
// the others catch up within the minute. Kept on globalThis so every route in the process shares one copy.
const shared = globalThis as unknown as { __dsPageCache?: Map<string, { at: number; value: unknown }> };
export const pageCache = (shared.__dsPageCache ??= new Map());

export async function publishRevision(db: Db, id: number, actor: Actor) {
  await withTx(db, async () => {
    const revision = await findRevision(db, id, true);
    if (!revision) throw new AdminError(404, "Revision not found");
    if (revision.status === STATUS.PUBLISHED) throw new AdminError(409, "This revision is already published");
    if (revision.status === STATUS.REJECTED) throw new AdminError(409, "This revision was rejected");
    const page = (await getRow(db, revision.parentId as number)) as AdminRow;
    await db.query("SELECT 1 FROM admin WHERE id = $1 FOR UPDATE", [page.id]);
    const previous = page.data.publishedRevisionId ? await findRevision(db, page.data.publishedRevisionId, true) : null;
    if (previous) await updateRow(db, previous, { status: STATUS.SUPERSEDED });
    await updateRow(db, revision, { status: STATUS.PUBLISHED, data: { publishedAt: new Date(), publishedBy: actor.name.slice(0, 64) } });
    await updateRow(db, page, { data: { publishedRevisionId: revision.id } });
  });
  pageCache.clear();
  return getRevision(db, id);
}

// Restores an older version by copying it into a new published version, so history stays linear.
export async function rollbackTo(db: Db, id: number, actor: Actor) {
  const source = await findRevision(db, id);
  if (!source) throw new AdminError(404, "Revision not found");
  const page = (await getRow(db, source.parentId as number)) as AdminRow;
  const copy = await saveRevision(db, page.key as string, { content: source.data.content, note: `Rollback to v${source.data.version}`, basedOnRevisionId: source.id }, actor);
  return publishRevision(db, copy.id, actor);
}
