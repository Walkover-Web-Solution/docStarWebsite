import { NextRequest } from "next/server";
import { z } from "zod";
import { adminActor, requireAdmin } from "@/server/auth";
import { withDb } from "@/server/db";
import { handle, intParam, json, readJson } from "@/server/http";

export const dynamic = "force-dynamic";

import * as research from "@/server/research";

export const PATCH = handle(async (request: NextRequest, ctx: { params: Promise<{ id: string }> }) => {
  const session = await requireAdmin(request);
  const id = intParam((await ctx.params).id);
  const input = await readJson(request, research.competitorSchema.partial(), 20_000);
  return json(await withDb((db) => research.updateCompetitor(db, id, input, adminActor(session))));
});
