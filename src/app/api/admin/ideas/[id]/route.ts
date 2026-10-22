import { NextRequest } from "next/server";
import { requireAdmin } from "@/server/auth";
import { withDb } from "@/server/db";
import { handle, intParam, json, readJson } from "@/server/http";
import { getForAdmin, update, updateSchema } from "@/server/ideas";

export const dynamic = "force-dynamic";
type Ctx = { params: Promise<{ id: string }> };

export const GET = handle(async (request: NextRequest, ctx: Ctx) => {
  await requireAdmin(request);
  const id = intParam((await ctx.params).id);
  return json(await withDb((db) => getForAdmin(db, id)));
});

export const PATCH = handle(async (request: NextRequest, ctx: Ctx) => {
  await requireAdmin(request);
  const id = intParam((await ctx.params).id);
  const changes = await readJson(request, updateSchema, 20_000);
  return json(await withDb((db) => update(db, id, changes)));
});
