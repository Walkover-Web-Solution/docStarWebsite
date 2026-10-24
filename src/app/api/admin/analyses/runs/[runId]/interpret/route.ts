import { NextRequest } from "next/server";
import { z } from "zod";
import { adminActor, requireAdmin } from "@/server/auth";
import { withDb } from "@/server/db";
import { handle, intParam, json, readJson } from "@/server/http";

export const dynamic = "force-dynamic";

import * as analyses from "@/server/analyses";

export const maxDuration = 300;

export const POST = handle(async (request: NextRequest, ctx: { params: Promise<{ runId: string }> }) => {
  await requireAdmin(request);
  const runId = intParam((await ctx.params).runId);
  return json(await withDb((db) => analyses.interpret(db, runId)));
});
