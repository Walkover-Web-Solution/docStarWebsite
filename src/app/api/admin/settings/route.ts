import { NextRequest } from "next/server";
import { requireAdmin } from "@/server/auth";
import { withDb } from "@/server/db";
import { handle, json } from "@/server/http";
import { settingsView } from "@/server/overview";

export const dynamic = "force-dynamic";

export const GET = handle(async (request: NextRequest) => {
  await requireAdmin(request);
  await withDb(async (db) => db.one("SELECT 1")); // the database row above is only true if this works
  return json(settingsView());
});
