import { NextRequest } from "next/server";
import { z } from "zod";
import { adminActor, requireAdmin } from "@/server/auth";
import { withDb } from "@/server/db";
import { handle, intParam, json, readJson } from "@/server/http";

export const dynamic = "force-dynamic";

import * as knowledge from "@/server/knowledge";

export const POST = handle(async (request: NextRequest, ctx: { params: Promise<{ id: string }> }) => {
  const session = await requireAdmin(request);
  const id = intParam((await ctx.params).id);
  const { action } = await readJson(request, z.object({ action: z.enum(["submit", "refresh", "discard"]) }), 1_000);
  return json(
    await withDb((db) => (action === "submit" ? knowledge.submitEdit(db, id, adminActor(session)) : action === "refresh" ? knowledge.refreshEdit(db, id) : knowledge.discardEdit(db, id)))
  );
});
