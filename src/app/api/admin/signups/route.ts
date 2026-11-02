import { NextRequest } from "next/server";
import { requireAdmin } from "@/server/auth";
import { withDb } from "@/server/db";
import { handle, json } from "@/server/http";
import { listSignups } from "@/server/signups";

export const dynamic = "force-dynamic";

export const GET = handle(async (request: NextRequest) => {
  await requireAdmin(request);
  const page = Number(request.nextUrl.searchParams.get("page")) || 1;
  return json(await withDb((db) => listSignups(db, page)));
});
