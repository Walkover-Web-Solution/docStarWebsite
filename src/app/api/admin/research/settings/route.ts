import { NextRequest } from "next/server";
import { z } from "zod";
import { adminActor, requireAdmin } from "@/server/auth";
import { withDb } from "@/server/db";
import { handle, intParam, json, readJson } from "@/server/http";

export const dynamic = "force-dynamic";

import * as research from "@/server/research";

export const POST = handle(async (request: NextRequest) => {
  const session = await requireAdmin(request);
  const input = await readJson(request, z.object({ paused: z.boolean().optional(), cadenceDays: z.number().optional(), scope: z.string().optional(), importSeed: z.boolean().optional() }), 5_000);
  return json(
    await withDb(async (db) => {
      const { importSeed, ...rest } = input;
      if (importSeed) await research.importSeed(db, adminActor(session));
      await research.saveSettings(db, rest, adminActor(session));
      return research.overview(db);
    })
  );
});
