import { NextRequest } from "next/server";
import { adminActor, requireAdmin } from "@/server/auth";
import { approve } from "@/server/blog/run";
import { withDb } from "@/server/db";
import { handle, intParam, json } from "@/server/http";

export const dynamic = "force-dynamic";

// Publishes the draft on docstar.io/blog, with any edits made to it in the DocStar editor.
export const POST = handle(async (request: NextRequest, ctx: { params: Promise<{ id: string }> }) => {
  const session = await requireAdmin(request);
  const id = intParam((await ctx.params).id);
  return json(await withDb((db) => approve(db, id, adminActor(session))));
});
