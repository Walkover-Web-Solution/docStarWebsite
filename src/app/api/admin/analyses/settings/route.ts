import { NextRequest } from "next/server";
import { z } from "zod";
import { adminActor, requireAdmin } from "@/server/auth";
import { withDb } from "@/server/db";
import { handle, intParam, json, readJson } from "@/server/http";

export const dynamic = "force-dynamic";

import * as analyses from "@/server/analyses";

export const POST = handle(async (request: NextRequest) => {
  const session = await requireAdmin(request);
  const input = await readJson(
    request,
    z.object({ paused: z.boolean().optional(), maxRunsPerDay: z.number().optional(), enabled: z.record(z.string(), z.boolean()).optional(), intervalHours: z.record(z.string(), z.number()).optional() }),
    10_000
  );
  return json(await withDb(async (db) => (await analyses.saveSettings(db, input, adminActor(session)), analyses.overview(db))));
});
