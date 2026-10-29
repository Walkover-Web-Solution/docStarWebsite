import { NextRequest } from "next/server";
import { z } from "zod";
import { adminActor, requireAdmin } from "@/server/auth";
import { setEnabled } from "@/server/blog/run";
import { withDb } from "@/server/db";
import { handle, json, readJson } from "@/server/http";

export const dynamic = "force-dynamic";

export const POST = handle(async (request: NextRequest) => {
  const session = await requireAdmin(request);
  const { enabled } = await readJson(request, z.object({ enabled: z.boolean() }), 1_000);
  return json(await withDb((db) => setEnabled(db, enabled, adminActor(session))));
});
