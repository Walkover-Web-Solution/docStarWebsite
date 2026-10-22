import { NextRequest } from "next/server";
import { z } from "zod";
import { requireAdmin } from "@/server/auth";
import { withDb } from "@/server/db";
import { handle, intParam, json, readJson } from "@/server/http";
import { merge } from "@/server/ideas";

export const dynamic = "force-dynamic";

export const POST = handle(async (request: NextRequest, ctx: { params: Promise<{ id: string }> }) => {
  await requireAdmin(request);
  const id = intParam((await ctx.params).id);
  const { intoId } = await readJson(request, z.object({ intoId: z.number().int().positive() }), 1_000);
  return json(await withDb((db) => merge(db, id, intoId)));
});
