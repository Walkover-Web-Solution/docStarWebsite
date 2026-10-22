import { NextRequest } from "next/server";
import { requireAdmin } from "@/server/auth";
import { withDb } from "@/server/db";
import { handle, json } from "@/server/http";
import { list } from "@/server/ideas";

export const dynamic = "force-dynamic";

export const GET = handle(async (request: NextRequest) => {
  await requireAdmin(request);
  const q = Object.fromEntries(request.nextUrl.searchParams);
  return json(await withDb((db) => list(db, { ...q, page: Number(q.page) || 1 })));
});
