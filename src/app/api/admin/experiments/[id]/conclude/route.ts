import { NextRequest } from "next/server";
import { z } from "zod";
import { adminActor, requireAdmin } from "@/server/auth";
import { withDb } from "@/server/db";
import { conclude } from "@/server/experiments";
import { handle, intParam, json, readJson } from "@/server/http";

export const dynamic = "force-dynamic";

export const POST = handle(async (request: NextRequest, ctx: { params: Promise<{ id: string }> }) => {
  const session = await requireAdmin(request);
  const id = intParam((await ctx.params).id);
  const { winner } = await readJson(request, z.object({ winner: z.enum(["A", "B", "C"]) }), 1_000);
  return json(await withDb((db) => conclude(db, id, winner, adminActor(session))));
});
