import { NextRequest } from "next/server";
import { requireAdmin } from "@/server/auth";
import { getRevision } from "@/server/content";
import { withDb } from "@/server/db";
import { handle, intParam, json } from "@/server/http";

export const dynamic = "force-dynamic";

export const GET = handle(async (request: NextRequest, ctx: { params: Promise<{ id: string }> }) => {
  await requireAdmin(request);
  const id = intParam((await ctx.params).id);
  return json(await withDb((db) => getRevision(db, id)));
});
