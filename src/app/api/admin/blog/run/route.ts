import { NextRequest } from "next/server";
import { requireAdmin } from "@/server/auth";
import { isEnabled, overview, run } from "@/server/blog/run";
import { withDb } from "@/server/db";
import { AdminError } from "@/server/adminTypes";
import { handle, json } from "@/server/http";

export const dynamic = "force-dynamic";
export const maxDuration = 600;

// "Write one now": answers when the run is done (a few minutes). Not after(): on Cloudflare that becomes
// waitUntil, which stops about 30 seconds after the response, mid-run.
export const POST = handle(async (request: NextRequest) => {
  await requireAdmin(request);
  const state = await withDb(async (db) => ({ enabled: await isEnabled(db), running: (await overview(db)).running }));
  if (!state.enabled) throw new AdminError(409, "Turn the blog autopilot on first");
  if (state.running) throw new AdminError(409, "A post is already being written");
  return json(await run("request"));
});
