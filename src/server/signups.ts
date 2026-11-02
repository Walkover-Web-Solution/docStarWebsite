import { z } from "zod";
import { createRow, mapRow, type AdminRow } from "./adminTypes";
import type { Db } from "./db";

// New DocStar users. The viaSocket signup flow posts each one (POST /api/internal/signups); one row per user,
// so a repeated post answers created: false.

export const signupSchema = z.object({
  userId: z.coerce.string().trim().min(1).max(64),
  name: z.string().trim().max(255).default(""),
  email: z.string().trim().toLowerCase().email().max(255),
  orgId: z.coerce.string().trim().min(1).max(64),
  orgName: z.string().trim().max(255).nullish(),
  collectionId: z.string().trim().max(64).nullish(),
  slug: z.string().trim().max(100).nullish(),
  mcpUrl: z.string().trim().url().max(500).nullish(),
});
export type Signup = z.infer<typeof signupSchema>;

/** Stores a new user. `created` is false when this user was already recorded. */
export async function recordSignup(db: Db, input: Signup) {
  try {
    const row = await createRow(db, "signup", {
      key: input.userId,
      title: input.name || input.email,
      data: {
        email: input.email,
        orgId: input.orgId,
        orgName: input.orgName ?? null,
        collectionId: input.collectionId ?? null,
        slug: input.slug ?? null,
        mcpUrl: input.mcpUrl ?? null,
      },
    });
    return { created: true, id: row.id };
  } catch (error: any) {
    // Postgres unique_violation on (type, key): this user is already here
    if (error?.code === "23505") return { created: false };
    throw error;
  }
}

function signupView(row: AdminRow) {
  const d = row.data;
  return {
    id: row.id,
    userId: row.key as string,
    name: row.title as string,
    email: d.email as string,
    orgId: d.orgId as string,
    orgName: d.orgName as string | null,
    slug: d.slug as string | null,
    mcpUrl: d.mcpUrl as string | null,
    createdAt: row.createdAt,
  };
}

/** Newest first, 50 a page, with how many joined in the last 7 and 30 days. */
export async function listSignups(db: Db, page = 1) {
  page = Math.max(1, Number(page) || 1);
  const [rows, counts] = await Promise.all([
    db.query(`SELECT * FROM admin WHERE type = 'signup' ORDER BY created_at DESC LIMIT 50 OFFSET ${(page - 1) * 50}`),
    db.one<{ total: number; last7: number; last30: number }>(
      `SELECT count(*)::int AS total,
              count(*) FILTER (WHERE created_at > now() - interval '7 days')::int AS last7,
              count(*) FILTER (WHERE created_at > now() - interval '30 days')::int AS last30
         FROM admin WHERE type = 'signup'`
    ),
  ]);
  return { items: rows.map((r) => signupView(mapRow(r))), total: counts?.total || 0, last7: counts?.last7 || 0, last30: counts?.last30 || 0, page };
}
