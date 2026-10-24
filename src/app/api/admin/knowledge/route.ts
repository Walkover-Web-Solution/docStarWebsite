import { NextRequest } from "next/server";
import { z } from "zod";
import { adminActor, requireAdmin } from "@/server/auth";
import { withDb } from "@/server/db";
import { handle, intParam, json, readJson } from "@/server/http";

export const dynamic = "force-dynamic";

import * as knowledge from "@/server/knowledge";

export const GET = handle(async (request: NextRequest) => {
  await requireAdmin(request);
  const path = request.nextUrl.searchParams.get("path");
  return json(await withDb(async (db) => (path ? knowledge.getDoc(db, path) : { docs: await knowledge.listDocs(db), connection: knowledge.connection() })));
});
