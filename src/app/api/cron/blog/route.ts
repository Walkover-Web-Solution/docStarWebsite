import { NextRequest } from "next/server";
import { HttpError, handle, json } from "@/server/http";
import { scheduledRun } from "@/server/blog/run";

export const dynamic = "force-dynamic";
export const maxDuration = 600;

// The daily blog run, started by the GitHub schedule (.github/workflows/autopilot.yml) with
// `Authorization: Bearer <CRON_SECRET>`. Does nothing while paused, if today's post was written, or while drafts pile up.
export const POST = handle(async (request: NextRequest) => {
  const secret = process.env.CRON_SECRET;
  if (!secret || request.headers.get("authorization") !== `Bearer ${secret}`) throw new HttpError(401, "Unauthorized");
  return json(await scheduledRun());
});
