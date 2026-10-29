import { z } from "zod";
import type { Db } from "./db";

// Every row of the `admin` table goes through here. The table is generic (type + parent + key + status
// + title + actor + data JSONB), so this file is where each type's shape is enforced: which statuses it
// may have, whether it needs a parent or key, and what `data` holds. Keep ADMIN_TYPES in step with the
// CHECK constraint in db/migrations/001_init.sql.

export const ADMIN_TYPES = ["user", "page", "page_revision", "idea", "experiment", "ai_proposal", "ai_run", "setting", "blog_post"] as const;
export type AdminType = (typeof ADMIN_TYPES)[number];

export type ActorType = "human" | "agent" | "system";
export type Actor = { type: ActorType; id: string; name: string };

export class AdminError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

export type AdminRow = {
  id: number;
  type: AdminType;
  parentId: number | null;
  key: string | null;
  status: string | null;
  title: string | null;
  actorType: ActorType;
  actorId: string | null;
  actorName: string | null;
  data: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
};

export const mapRow = (r: any): AdminRow => ({
  id: r.id,
  type: r.type,
  parentId: r.parent_id,
  key: r.key,
  status: r.status,
  title: r.title,
  actorType: r.actor_type,
  actorId: r.actor_id,
  actorName: r.actor_name,
  data: r.data,
  createdAt: r.created_at,
  updatedAt: r.updated_at,
});

const id = z.number().int().positive();
const str = (max: number) => z.string().max(max);
// Dates inside `data` are stored as ISO strings.
const when = z.union([z.date().transform((d) => d.toISOString()), z.string()]).nullable().default(null);
const nullableStr = (max: number) => z.string().max(max).nullable().default(null);

type Spec = {
  statuses?: string[];
  parent?: AdminType; // required parent type
  key?: boolean; // key required
  title?: boolean; // title required
  data: z.ZodType<any>;
};

export const SPECS: Record<AdminType, Spec> = {
  // A team member who can sign in to the admin. key = email (lowercase), title = name.
  user: {
    key: true,
    title: true,
    data: z.object({ salt: str(64), hash: str(128), lastLoginAt: when }).strict(),
  },
  // docstar.io page. key = slug.
  page: {
    statuses: ["active", "archived"],
    key: true,
    data: z.object({ path: str(255).regex(/^\//), publishedRevisionId: id.nullable().default(null) }).strict(),
  },
  // A version of a page. Drafts are published by an admin, or by the autopilot after a winning A/B test.
  page_revision: {
    statuses: ["draft", "published", "superseded", "rejected"],
    parent: "page",
    data: z
      .object({
        version: z.number().int().min(1),
        content: z.record(z.string(), z.any()),
        note: str(5000).nullable().default(null),
        basedOnRevisionId: id.nullable().default(null),
        publishedAt: when,
        publishedBy: nullableStr(64),
      })
      .strict(),
  },
  // A feature request, idea, bug or feedback about DocStar, sent by an agent or a person without signing in.
  // actorType = who filed it (agent when it names itself).
  idea: {
    statuses: ["new", "reviewing", "planned", "in_progress", "shipped", "declined", "duplicate"],
    title: true,
    data: z
      .object({
        kind: z.enum(["feature", "idea", "bug", "feedback"]),
        body: nullableStr(10000),
        priority: z.enum(["low", "medium", "high", "urgent"]).nullable().default(null),
        source: z.enum(["api", "mcp", "cli", "slack"]),
        agentModel: nullableStr(64),
        context: z.record(z.string(), z.any()).default({}),
        tags: z.array(str(32)).max(10).default([]),
        votes: z.number().int().min(1).default(1),
        duplicateOfId: id.nullable().default(null),
        contactEmail: nullableStr(255),
        // sha256 of the secret in the sender's follow-up link
        followUpHash: nullableStr(64),
        // salted hash of the sender's IP, for send limits
        senderHash: nullableStr(64),
        // the team's one note, shown to the sender too
        note: nullableStr(5000),
      })
      .strict(),
  },
  // A/B test on a page. key = experiment key.
  experiment: {
    statuses: ["draft", "running", "stopped", "concluded"],
    parent: "page",
    key: true,
    title: true,
    data: z
      .object({
        variants: z.array(z.object({ key: str(32), revisionId: id, weight: z.number().min(0).max(100) }).strict()).min(2).max(5),
        goal: str(64),
        guardrails: z.array(str(64)).max(5).default([]),
        hypothesis: nullableStr(2000),
        startedAt: when,
        endedAt: when,
        winner: nullableStr(32),
      })
      .strict(),
  },
  // Something the autopilot did, or tried and was blocked from doing. parent = its experiment or revision.
  ai_proposal: {
    statuses: ["applied", "blocked", "rolled_back"],
    title: true,
    data: z
      .object({
        kind: z.enum(["page_change", "experiment", "test_result"]),
        reasoning: str(10000),
        evidence: z.array(z.record(z.string(), z.any())).max(20).default([]),
        expectedEffect: nullableStr(1000),
        changes: z.record(z.string(), z.any()).nullable().default(null),
        runId: id.nullable().default(null),
        rejectReason: nullableStr(2000),
        outcome: z.record(z.string(), z.any()).nullable().default(null),
      })
      .strict(),
  },
  // One autopilot run: what started it, which model, the AI's summary, any error.
  ai_run: {
    statuses: ["running", "done", "failed"],
    data: z
      .object({
        trigger: z.enum(["schedule", "request"]),
        provider: str(32),
        model: str(64),
        toolCalls: z.array(z.record(z.string(), z.any())).max(200).default([]),
        answer: nullableStr(50000),
        error: nullableStr(5000),
        finishedAt: when,
      })
      .strict(),
  },
  // Admin configuration. key = setting name.
  setting: { key: true, data: z.object({ value: z.any() }).strict() },
  // One run of the blog autopilot: the AI's post, a draft page in DocStar Blogs until a person approves it.
  // key = the DocStar page id (set once the draft exists).
  blog_post: {
    statuses: ["writing", "draft", "published", "rejected", "skipped", "failed"],
    data: z
      .object({
        trigger: z.enum(["schedule", "request"]),
        model: str(64),
        // the post type, used in turn: news | how-to | explainer
        format: nullableStr(32),
        topic: nullableStr(300),
        whyNow: nullableStr(2000),
        sources: z.array(z.object({ title: str(300), url: str(1000) }).strict()).max(10).default([]),
        slug: nullableStr(200),
        metaDescription: nullableStr(500),
        tags: z.array(str(60)).max(10).default([]),
        markdown: nullableStr(60000),
        coverUrl: nullableStr(1000),
        publicUrl: nullableStr(1000),
        // why the AI skipped, why the run failed, or why a person rejected it
        reason: nullableStr(5000),
        decidedBy: nullableStr(255),
        decidedAt: when,
        finishedAt: when,
      })
      .strict(),
  },
};

function check(type: AdminType, row: { status: string | null; key: string | null; title: string | null; parentId: number | null; data: any }) {
  const spec = SPECS[type];
  if (!spec) throw new AdminError(500, `Unknown admin type "${type}"`);
  if (spec.statuses && !spec.statuses.includes(row.status || "")) throw new AdminError(400, `Invalid ${type} status "${row.status}"`);
  if (!spec.statuses && row.status != null) throw new AdminError(500, `${type} has no status`);
  if (spec.key && !row.key) throw new AdminError(500, `${type} needs a key`);
  if (spec.title && !row.title) throw new AdminError(400, `${type} needs a title`);
  if (spec.parent && !row.parentId) throw new AdminError(500, `${type} needs a parent ${spec.parent}`);
  const parsed = spec.data.safeParse(row.data ?? {});
  if (!parsed.success) throw new AdminError(500, `Invalid ${type} data: ${parsed.error.issues[0]?.path.join(".")} ${parsed.error.issues[0]?.message}`);
  return parsed.data as Record<string, any>;
}

type RowInput = {
  parentId?: number | null;
  key?: string | null;
  status?: string | null;
  title?: string | null;
  actor?: Actor;
  data?: Record<string, any>;
};

// ---------- reading ----------

export async function getRow(db: Db, id: number, type?: AdminType): Promise<AdminRow | null> {
  const row = type ? await db.one("SELECT * FROM admin WHERE id = $1 AND type = $2", [id, type]) : await db.one("SELECT * FROM admin WHERE id = $1", [id]);
  return row ? mapRow(row) : null;
}

export async function findByKey(db: Db, type: AdminType, key: string): Promise<AdminRow | null> {
  const row = await db.one("SELECT * FROM admin WHERE type = $1 AND key = $2", [type, key]);
  return row ? mapRow(row) : null;
}

// ---------- writing ----------

/** Creates a row after checking it against its type's spec. */
export async function createRow(db: Db, type: AdminType, input: RowInput): Promise<AdminRow> {
  const spec = SPECS[type];
  const base = {
    parentId: input.parentId ?? null,
    key: input.key ?? null,
    status: input.status ?? (spec.statuses ? spec.statuses[0] : null),
    title: input.title ?? null,
    data: input.data || {},
  };
  const data = check(type, base);
  if (spec.parent) {
    const parent = await db.one("SELECT type FROM admin WHERE id = $1", [base.parentId]);
    if (!parent || parent.type !== spec.parent) throw new AdminError(500, `${type} parent #${base.parentId} is not a ${spec.parent}`);
  }
  const row = await db.one(
    `INSERT INTO admin (type, parent_id, key, status, title, actor_type, actor_id, actor_name, data)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
    [type, base.parentId, base.key, base.status, base.title, input.actor?.type || "system", input.actor?.id || null, input.actor?.name || null, JSON.stringify(data)]
  );
  return mapRow(row);
}

/** Updates columns and/or merges fields into `data`, re-checks the whole row, and returns the new row. */
export async function updateRow(db: Db, row: AdminRow, changes: { status?: string | null; title?: string | null; key?: string | null; data?: Record<string, any> }): Promise<AdminRow> {
  const next = {
    parentId: row.parentId,
    key: changes.key !== undefined ? changes.key : row.key,
    status: changes.status !== undefined ? changes.status : row.status,
    title: changes.title !== undefined ? changes.title : row.title,
    data: { ...(row.data || {}), ...(changes.data || {}) },
  };
  const data = check(row.type, next);
  const updated = await db.one("UPDATE admin SET key = $2, status = $3, title = $4, data = $5, updated_at = now() WHERE id = $1 RETURNING *", [row.id, next.key, next.status, next.title, JSON.stringify(data)]);
  return mapRow(updated);
}
