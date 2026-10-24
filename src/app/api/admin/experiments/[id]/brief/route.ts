import { NextRequest } from "next/server";
import { z } from "zod";
import { adminActor, requireAdmin } from "@/server/auth";
import { withDb } from "@/server/db";
import { handle, intParam, json, readJson } from "@/server/http";

export const dynamic = "force-dynamic";

import * as experiments from "@/server/experiments";

export const GET = handle(async (request: NextRequest, ctx: { params: Promise<{ id: string }> }) => {
  await requireAdmin(request);
  return json({ brief: await withDb(async (db) => experiments.brief(db, intParam((await ctx.params).id))), generation: "not_connected" });
});
