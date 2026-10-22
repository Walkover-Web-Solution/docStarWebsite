import { NextRequest } from "next/server";
import { adminActor, requireAdmin } from "@/server/auth";
import { publishRevision } from "@/server/content";
import { withDb } from "@/server/db";
import { handle, intParam, json } from "@/server/http";

export const dynamic = "force-dynamic";

export const POST = handle(async (request: NextRequest, ctx: { params: Promise<{ id: string }> }) => {
  const session = await requireAdmin(request);
  const id = intParam((await ctx.params).id);
  return json(await withDb((db) => publishRevision(db, id, adminActor(session))));
});
