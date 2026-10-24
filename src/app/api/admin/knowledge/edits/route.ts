import { NextRequest } from "next/server";
import { z } from "zod";
import { adminActor, requireAdmin } from "@/server/auth";
import { withDb } from "@/server/db";
import { handle, intParam, json, readJson } from "@/server/http";

export const dynamic = "force-dynamic";

import * as knowledge from "@/server/knowledge";

const body = z.object({ path: z.string().max(200), content: z.string().max(400000), baseSha: z.string().max(64), note: z.string().max(500).optional(), submit: z.boolean().default(false) });

export const POST = handle(async (request: NextRequest) => {
  const session = await requireAdmin(request);
  const input = await readJson(request, body, 500_000);
  return json(await withDb((db) => knowledge.saveEdit(db, input, adminActor(session))), 201);
});
