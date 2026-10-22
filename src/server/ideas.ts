import { z } from "zod";
import { AdminError, createRow, mapRow, updateRow, type Actor, type AdminRow } from "./adminTypes";
import { withTx, type Db } from "./db";
import { sha256 } from "./http";

// Ideas, feature requests, bugs and feedback about DocStar, sent by AI agents or by anyone without an
// account (POST /api/ideas). The team triages them in the admin. Stored as `idea` rows of the `admin`
// table: actor_type says who filed it (agent when it names itself), `data` holds the rest.

export const KINDS = ["feature", "idea", "bug", "feedback"] as const;
export const STATUSES = ["new", "reviewing", "planned", "in_progress", "shipped", "declined", "duplicate"] as const;
export const PRIORITIES = ["low", "medium", "high", "urgent"] as const;
const OPEN = ["new", "reviewing", "planned", "in_progress"];

// Limits for senders (nobody signs in): per caller and in total, and no big or link-heavy posts.
const PER_HOUR = 5;
const PER_DAY = 20;
const GLOBAL_PER_DAY = 500;
const MAX_BODY = 5000;
const MAX_LINKS = 3;

export const submitSchema = z.object({
  kind: z.enum(KINDS).default("idea"),
  title: z.string().trim().min(3).max(200),
  body: z.string().trim().max(10000).optional(),
  source: z.enum(["api", "mcp", "cli"]).optional(),
  // set when an AI agent files it (on its own or for someone)
  agent: z.object({ name: z.string().trim().min(1).max(64), model: z.string().trim().max(64).optional() }).optional(),
  // at most 20 keys and 4 KB as JSON, so nobody can store huge rows
  context: z
    .record(z.string(), z.any())
    .default({})
    .refine((v) => Object.keys(v).length <= 20 && JSON.stringify(v).length <= 4000, "context is too large (max 20 keys and 4 KB)"),
  // where the team can reply
  contactEmail: z.string().trim().email().max(255).optional(),
});
export type Submission = z.infer<typeof submitSchema>;

// The DocStar MCP's send_feedback_to_docstar tool sends { message, type, context, collectionId }.
// Map it onto the normal shape so the tool can post straight to /api/ideas.
const MCP_TYPES: Record<string, { kind: string; tag?: string }> = {
  feature_request: { kind: "feature" },
  feature: { kind: "feature" },
  bug: { kind: "bug" },
  docs: { kind: "feedback", tag: "docs" },
  praise: { kind: "feedback", tag: "praise" },
  other: { kind: "idea" },
};

export function normalizeSubmission(body: any) {
  if (!body || typeof body !== "object" || body.title || typeof body.message !== "string") return body;
  const message = body.message.trim();
  const firstLine = message.split(/\n/)[0];
  const title = firstLine.length > 120 ? `${firstLine.slice(0, 117).trimEnd()}…` : firstLine;
  const mapped = MCP_TYPES[String(body.type || "").toLowerCase()] || { kind: "idea" };
  const context = { ...(body.context && typeof body.context === "object" ? body.context : {}), ...(body.collectionId ? { collectionId: String(body.collectionId) } : {}), ...(mapped.tag ? { tag: mapped.tag } : {}) };
  const agentName = context.client || context.agent || "MCP agent";
  return {
    kind: mapped.kind,
    title: title.length >= 3 ? title : `${mapped.kind}: ${message}`.slice(0, 120),
    body: message,
    source: "mcp",
    agent: { name: String(agentName).slice(0, 64), ...(context.model ? { model: String(context.model).slice(0, 64) } : {}) },
    context,
  };
}

export const updateSchema = z
  .object({
    status: z.enum(STATUSES),
    priority: z.enum(PRIORITIES).nullable(),
    kind: z.enum(KINDS),
    tags: z.array(z.string().trim().toLowerCase().max(32)).max(10),
    // the team's note, shown to the sender too (follow-up link)
    note: z.string().trim().max(5000).nullable(),
  })
  .partial()
  .refine((v) => Object.keys(v).length > 0, "Nothing to change");

// ---------- shapes ----------

function ideaView(row: AdminRow) {
  const d = row.data;
  return {
    id: row.id,
    kind: d.kind as string,
    title: row.title as string,
    body: d.body as string | null,
    status: row.status as string,
    priority: d.priority as string | null,
    source: d.source as string,
    submitterType: row.actorType === "agent" ? "agent" : "human",
    agentName: row.actorType === "agent" ? row.actorName : null,
    agentModel: d.agentModel as string | null,
    contactEmail: (d.contactEmail as string | null) || null,
    context: (d.context || {}) as Record<string, any>,
    tags: (d.tags || []) as string[],
    duplicateOfId: d.duplicateOfId as number | null,
    votes: (d.votes ?? 1) as number,
    note: (d.note as string | null) || null,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  };
}

// What a sender sees at their follow-up link: their item, its status and the team's note.
function publicView(item: ReturnType<typeof ideaView>) {
  return {
    id: item.id,
    kind: item.kind,
    title: item.title,
    body: item.body,
    status: item.status,
    source: item.source,
    submitterType: item.submitterType,
    agentName: item.agentName,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
    duplicateOfId: item.duplicateOfId,
    note: item.note,
  };
}

async function findIdea(db: Db, id: number, lock = false) {
  const row = await db.one(`SELECT * FROM admin WHERE id = $1 AND type = 'idea' ${lock ? "FOR UPDATE" : ""}`, [id]);
  return row ? mapRow(row) : null;
}

// ---------- senders ----------

async function checkLimits(db: Db, input: Submission, senderHash: string) {
  if ((input.body || "").length > MAX_BODY) throw new AdminError(400, `Details can be at most ${MAX_BODY} characters.`);
  const links = `${input.title} ${input.body || ""}`.match(/https?:\/\//gi)?.length || 0;
  if (links > MAX_LINKS) throw new AdminError(400, `At most ${MAX_LINKS} links.`);
  const counts = await db.one<{ hour: number; day: number; total: number }>(
    `SELECT count(*) FILTER (WHERE data->>'senderHash' = $1 AND created_at > now() - interval '1 hour')::int AS hour,
            count(*) FILTER (WHERE data->>'senderHash' = $1)::int AS day,
            count(*)::int AS total
       FROM admin WHERE type = 'idea' AND created_at > now() - interval '24 hours'`,
    [senderHash]
  );
  if ((counts?.hour || 0) >= PER_HOUR || (counts?.day || 0) >= PER_DAY) throw new AdminError(429, "Too many ideas from this address. Try again later.");
  if ((counts?.total || 0) >= GLOBAL_PER_DAY) throw new AdminError(429, "DocStar is getting a lot of ideas today. Please try again tomorrow.");
}

const randomSecret = () => {
  const bytes = crypto.getRandomValues(new Uint8Array(24));
  return btoa(String.fromCharCode(...bytes)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
};

/** Files an idea. The sender gets a secret follow-up code back (followUpSecret) to check status and the team's note. */
export async function submit(db: Db, input: Submission, request: { userAgent?: string | null; senderHash: string }) {
  await checkLimits(db, input, request.senderHash);
  const followUpSecret = randomSecret();
  const agent = input.agent;
  const actor: Actor = agent ? { type: "agent", id: "", name: agent.name } : { type: "human", id: "", name: input.contactEmail || "anonymous" };
  const tag = input.context.tag ? [String(input.context.tag).slice(0, 32)] : [];
  const row = await createRow(db, "idea", {
    title: input.title,
    actor,
    data: {
      kind: input.kind,
      body: input.body || null,
      source: input.source || "api",
      agentModel: agent?.model || null,
      tags: tag,
      contactEmail: input.contactEmail || null,
      followUpHash: await sha256(followUpSecret),
      senderHash: request.senderHash,
      context: { ...input.context, ...(request.userAgent ? { userAgent: request.userAgent.slice(0, 300) } : {}) },
    },
  });
  return { ...publicView(ideaView(row)), followUpSecret };
}

/** A sender's view of their item, found by the secret in their follow-up link. */
export async function getPublic(db: Db, secret: string) {
  if (secret.length < 20) throw new AdminError(404, "Not found");
  const row = await db.one("SELECT * FROM admin WHERE type = 'idea' AND data->>'followUpHash' = $1", [await sha256(secret)]);
  if (!row) throw new AdminError(404, "Not found");
  return publicView(ideaView(mapRow(row)));
}

// ---------- the team (admin) ----------

export type ListFilters = { status?: string; kind?: string; source?: string; submitterType?: string; q?: string; sort?: string; page?: number };

export async function list(db: Db, filters: ListFilters) {
  const where: string[] = ["type = 'idea'"];
  const params: unknown[] = [];
  const add = (sql: string, value: unknown) => {
    params.push(value);
    where.push(sql.replace("?", `$${params.length}`));
  };
  if (filters.status === "open") add("status = ANY(?::text[])", OPEN);
  else if (filters.status && (STATUSES as readonly string[]).includes(filters.status)) add("status = ?", filters.status);
  if (filters.kind && (KINDS as readonly string[]).includes(filters.kind)) add("data->>'kind' = ?", filters.kind);
  if (filters.source && ["api", "mcp", "cli", "slack"].includes(filters.source)) add("data->>'source' = ?", filters.source);
  if (filters.submitterType === "agent" || filters.submitterType === "human") add("actor_type = ?", filters.submitterType);
  if (filters.q) {
    const q = `%${filters.q.replace(/[%_\\]/g, "\\$&")}%`;
    params.push(q);
    where.push(`(title ILIKE $${params.length} OR data->>'body' ILIKE $${params.length} OR data->>'contactEmail' ILIKE $${params.length})`);
  }
  const order =
    filters.sort === "votes" ? "(data->>'votes')::int DESC, created_at DESC" : filters.sort === "oldest" ? "created_at ASC" : filters.sort === "updated" ? "updated_at DESC" : "created_at DESC";
  const page = Math.max(1, Number(filters.page) || 1);
  const [rows, count] = await Promise.all([
    db.query(`SELECT * FROM admin WHERE ${where.join(" AND ")} ORDER BY ${order} LIMIT 50 OFFSET ${(page - 1) * 50}`, params),
    db.one<{ n: number }>(`SELECT count(*)::int AS n FROM admin WHERE ${where.join(" AND ")}`, params),
  ]);
  return { items: rows.map((r) => ideaView(mapRow(r))), total: count?.n || 0, page };
}

/** Inbox tiles: counts by status, and by who sent them (human | agent). */
export async function stats(db: Db) {
  const [byStatus, bySubmitter] = await Promise.all([
    db.query("SELECT status AS key, count(*)::int AS n FROM admin WHERE type = 'idea' GROUP BY 1"),
    db.query("SELECT actor_type AS key, count(*)::int AS n FROM admin WHERE type = 'idea' GROUP BY 1"),
  ]);
  const toMap = (rows: any[]) => Object.fromEntries(rows.map((r) => [r.key, r.n]));
  return { byStatus: toMap(byStatus), bySubmitter: toMap(bySubmitter) };
}

// Open items whose titles share words with this one: candidates to merge.
async function similar(db: Db, item: ReturnType<typeof ideaView>) {
  const words = Array.from(new Set(item.title.toLowerCase().match(/[a-z0-9]{4,}/g) || [])).slice(0, 8);
  if (!words.length) return [];
  const rows = await db.query("SELECT * FROM admin WHERE type = 'idea' AND id <> $1 AND status <> 'duplicate' AND title ILIKE ANY($2::text[]) LIMIT 20", [item.id, words.map((w) => `%${w}%`)]);
  return rows
    .map((r) => ideaView(mapRow(r)))
    .map((v) => ({ id: v.id, title: v.title, status: v.status, votes: v.votes, kind: v.kind, overlap: words.filter((w) => v.title.toLowerCase().includes(w)).length }))
    .sort((a, b) => b.overlap - a.overlap || b.votes - a.votes)
    .slice(0, 5);
}

export async function getForAdmin(db: Db, id: number) {
  const row = await findIdea(db, id);
  if (!row) throw new AdminError(404, "Not found");
  const item = ideaView(row);
  const [dups, similarItems] = await Promise.all([db.query("SELECT * FROM admin WHERE type = 'idea' AND (data->>'duplicateOfId')::int = $1", [id]), similar(db, item)]);
  return {
    ...item,
    duplicates: dups.map((r) => {
      const v = ideaView(mapRow(r));
      return { id: v.id, title: v.title, contactEmail: v.contactEmail, submitterType: v.submitterType, agentName: v.agentName, createdAt: v.createdAt };
    }),
    similar: similarItems,
  };
}

export async function update(db: Db, id: number, changes: z.infer<typeof updateSchema>) {
  const item = await findIdea(db, id);
  if (!item) throw new AdminError(404, "Not found");
  if (changes.status === "duplicate" && !item.data.duplicateOfId) throw new AdminError(400, "Use merge to mark an item as a duplicate");
  const data: Record<string, any> = {};
  for (const field of ["priority", "kind", "tags"] as const) if (changes[field] !== undefined) data[field] = changes[field];
  if (changes.note !== undefined) data.note = changes.note || null;
  await updateRow(db, item, { ...(changes.status !== undefined ? { status: changes.status } : {}), data });
  return getForAdmin(db, id);
}

/** Folds a duplicate into the original: its votes move over and both stay linked. */
export async function merge(db: Db, id: number, intoId: number) {
  if (id === intoId) throw new AdminError(400, "Can't merge an item into itself");
  await withTx(db, async () => {
    const [item, target] = [await findIdea(db, Math.min(id, intoId), true), await findIdea(db, Math.max(id, intoId), true)]; // fixed lock order
    const [from, into] = id < intoId ? [item, target] : [target, item];
    if (!from || !into) throw new AdminError(404, "Not found");
    if (into.status === "duplicate") throw new AdminError(400, `#${intoId} is itself a duplicate; merge into #${into.data.duplicateOfId}`);
    const votes = ((into.data.votes as number) ?? 1) + ((from.data.votes as number) ?? 1);
    await updateRow(db, from, { status: "duplicate", data: { duplicateOfId: intoId } });
    await updateRow(db, into, { data: { votes } });
    for (const dup of (await db.query("SELECT * FROM admin WHERE type = 'idea' AND (data->>'duplicateOfId')::int = $1 AND id <> $2", [id, id])).map(mapRow)) {
      await updateRow(db, dup, { data: { duplicateOfId: intoId } });
    }
  });
  return getForAdmin(db, intoId);
}

