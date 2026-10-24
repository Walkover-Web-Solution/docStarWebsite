import { NextRequest } from "next/server";
import { requireAdmin } from "@/server/auth";
import { withDb } from "@/server/db";
import { handle, json } from "@/server/http";
import { overview } from "@/server/overview";

export const dynamic = "force-dynamic";

export const GET = handle(async (request: NextRequest) => {
  await requireAdmin(request);
  return json(await withDb(overview));
});
