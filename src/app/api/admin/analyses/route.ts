import { NextRequest } from "next/server";
import { z } from "zod";
import { adminActor, requireAdmin } from "@/server/auth";
import { withDb } from "@/server/db";
import { handle, intParam, json, readJson } from "@/server/http";

export const dynamic = "force-dynamic";

import * as analyses from "@/server/analyses";

export const GET = handle(async (request: NextRequest) => {
  await requireAdmin(request);
  return json(await withDb(analyses.overview));
});
