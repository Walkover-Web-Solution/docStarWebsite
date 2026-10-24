import { NextRequest } from "next/server";
import { z } from "zod";
import { adminActor, requireAdmin } from "@/server/auth";
import { withDb } from "@/server/db";
import { handle, intParam, json, readJson } from "@/server/http";

export const dynamic = "force-dynamic";

import * as research from "@/server/research";

export const GET = handle(async (request: NextRequest) => {
  await requireAdmin(request);
  return json(await withDb(research.overview));
});

export const POST = handle(async (request: NextRequest) => {
  const session = await requireAdmin(request);
  const input = await readJson(request, research.competitorSchema, 20_000);
  return json(await withDb((db) => research.addCompetitor(db, input, adminActor(session))), 201);
});
