import { NextRequest, after } from "next/server";
import { requireAdmin } from "@/server/auth";
import { isEnabled, overview, run } from "@/server/autopilot/run";
import { withDb } from "@/server/db";
import { AdminError } from "@/server/adminTypes";
import { handle, json } from "@/server/http";

export const dynamic = "force-dynamic";
export const maxDuration = 300;

// "Run now": answers at once and keeps working after the response; the admin checks the overview until it's done.
export const POST = handle(async (request: NextRequest) => {
  await requireAdmin(request);
  const state = await withDb(async (db) => ({ enabled: await isEnabled(db), running: (await overview(db)).running }));
  if (!state.enabled) throw new AdminError(409, "Turn the autopilot on first");
  if (state.running) throw new AdminError(409, "The autopilot is already running");
  after(() => run("request").then(() => undefined, (error) => console.error("[autopilot] run failed:", error.message)));
  return json({ started: true }, 202);
});
