import { NextRequest } from "next/server";
import { z } from "zod";
import { adminActor, requireAdmin } from "@/server/auth";
import { withDb } from "@/server/db";
import { handle, intParam, json, readJson } from "@/server/http";

export const dynamic = "force-dynamic";

import * as research from "@/server/research";

export const maxDuration = 120;

export const POST = handle(async (request: NextRequest) => {
  await requireAdmin(request);
  const input = await readJson(request, z.object({ force: z.boolean().default(true), ids: z.array(z.number().int()).max(50).optional() }), 5_000);
  return json(await withDb((db) => research.run(db, { ...input, trigger: "manual" })));
});
