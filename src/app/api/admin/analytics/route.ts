import { NextRequest } from "next/server";
import { requireAdmin } from "@/server/auth";
import { withDb } from "@/server/db";
import { overview } from "@/server/events";
import { handle, json } from "@/server/http";

export const dynamic = "force-dynamic";

export const GET = handle(async (request: NextRequest) => {
  await requireAdmin(request);
  const days = Math.min(365, Math.max(1, Number(request.nextUrl.searchParams.get("days")) || 7));
  return json(await withDb((db) => overview(db, days)));
});
