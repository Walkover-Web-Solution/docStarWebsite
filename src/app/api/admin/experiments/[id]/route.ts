import { NextRequest } from "next/server";
import { z } from "zod";
import { requireAdmin } from "@/server/auth";
import { withDb } from "@/server/db";
import { get, updateDraft } from "@/server/experiments";
import { handle, intParam, json, readJson } from "@/server/http";

export const dynamic = "force-dynamic";

export const GET = handle(async (request: NextRequest, ctx: { params: Promise<{ id: string }> }) => {
  await requireAdmin(request);
  const id = intParam((await ctx.params).id);
  return json(await withDb((db) => get(db, id)));
});

export const PATCH = handle(async (request: NextRequest, ctx: { params: Promise<{ id: string }> }) => {
  await requireAdmin(request);
  const id = intParam((await ctx.params).id);
  const input = await readJson(
    request,
    z.object({ hypothesis: z.string().max(2000).optional(), audience: z.string().max(300).optional(), reviewBy: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(), rollbackPlan: z.string().max(1000).optional() }),
    10_000
  );
  return json(await withDb((db) => updateDraft(db, id, input)));
});
