import { NextRequest } from "next/server";
import { HttpError, handle, json } from "@/server/http";
import { scheduledRun } from "@/server/autopilot/run";

export const dynamic = "force-dynamic";
export const maxDuration = 300;

// The daily autopilot run, started by the GitHub schedule (.github/workflows/autopilot.yml) with
// `Authorization: Bearer <CRON_SECRET>`. Does nothing while the autopilot is paused or if it already ran today.
export const POST = handle(async (request: NextRequest) => {
  const secret = process.env.CRON_SECRET;
  if (!secret || request.headers.get("authorization") !== `Bearer ${secret}`) throw new HttpError(401, "Unauthorized");
  return json(await scheduledRun());
});
