import { NextRequest } from "next/server";
import { z } from "zod";
import { adminActor, requireAdmin } from "@/server/auth";
import { withDb } from "@/server/db";
import { handle, intParam, json, readJson } from "@/server/http";

export const dynamic = "force-dynamic";

import * as analyses from "@/server/analyses";

export const maxDuration = 120;

export const POST = handle(async (request: NextRequest, ctx: { params: Promise<{ id: string }> }) => {
  await requireAdmin(request);
  const { id } = await ctx.params;
  return json(await withDb((db) => analyses.runAnalysis(db, id, { trigger: "manual", origin: request.nextUrl.origin })));
});
