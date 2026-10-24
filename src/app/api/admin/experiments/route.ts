import { NextRequest } from "next/server";
import { adminActor, requireAdmin } from "@/server/auth";
import { withDb } from "@/server/db";
import { create, createSchema, list } from "@/server/experiments";
import { handle, json, readJson } from "@/server/http";

export const dynamic = "force-dynamic";

export const GET = handle(async (request: NextRequest) => {
  await requireAdmin(request);
  return json({ experiments: await withDb(list) });
});

export const POST = handle(async (request: NextRequest) => {
  const session = await requireAdmin(request);
  const input = await readJson(request, createSchema, 20_000);
  return json(await withDb((db) => create(db, input, adminActor(session))), 201);
});
