import { NextRequest } from "next/server";
import { withDb } from "@/server/db";
import { HttpError, handle, json } from "@/server/http";
import * as analyses from "@/server/analyses";
import * as research from "@/server/research";

export const dynamic = "force-dynamic";
export const maxDuration = 300;

// Scheduled analyses and competitor-source checks, started by .github/workflows/autopilot.yml with
// `Authorization: Bearer <CRON_SECRET>`. Each analysis has its own interval, so most calls do little.
// Paused settings, daily budgets and duplicate prevention are enforced inside.
export const POST = handle(async (request: NextRequest) => {
  const secret = process.env.CRON_SECRET;
  if (!secret || request.headers.get("authorization") !== `Bearer ${secret}`) throw new HttpError(401, "Unauthorized");
  const origin = process.env.NEXT_PUBLIC_SITE_URL || request.nextUrl.origin;
  return json(await withDb(async (db) => ({ analyses: await analyses.runDue(db, origin), research: await research.run(db, { trigger: "schedule" }) })));
});
