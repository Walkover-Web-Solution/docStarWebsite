import { NextRequest } from "next/server";
import { requireAdmin } from "@/server/auth";
import { overview } from "@/server/blog/run";
import { withDb } from "@/server/db";
import { handle, json } from "@/server/http";

export const dynamic = "force-dynamic";

export const GET = handle(async (request: NextRequest) => {
  await requireAdmin(request);
  return json(await withDb(overview));
});
