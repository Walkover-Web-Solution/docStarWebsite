import { NextRequest } from "next/server";
import { z } from "zod";
import { adminActor, requireAdmin } from "@/server/auth";
import { reject } from "@/server/blog/run";
import { withDb } from "@/server/db";
import { handle, intParam, json, readJson } from "@/server/http";

export const dynamic = "force-dynamic";

// Deletes the DocStar draft. The reason is kept: the AI reads it so it doesn't pitch the same topic again.
export const POST = handle(async (request: NextRequest, ctx: { params: Promise<{ id: string }> }) => {
  const session = await requireAdmin(request);
  const id = intParam((await ctx.params).id);
  const { reason } = await readJson(request, z.object({ reason: z.string().max(2000).default("") }), 5_000);
  return json(await withDb((db) => reject(db, id, adminActor(session), reason)));
});
