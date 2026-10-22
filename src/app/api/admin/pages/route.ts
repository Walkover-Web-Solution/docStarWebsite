import { NextRequest } from "next/server";
import { z } from "zod";
import { requireAdmin, adminActor } from "@/server/auth";
import { createPage, listPagesForAdmin } from "@/server/content";
import { withDb } from "@/server/db";
import { handle, json, readJson } from "@/server/http";
import { PATH, SLUG } from "@/server/siteSchema";

export const dynamic = "force-dynamic";

export const GET = handle(async (request: NextRequest) => {
  await requireAdmin(request);
  return json({ pages: await withDb(listPagesForAdmin) });
});

export const POST = handle(async (request: NextRequest) => {
  const session = await requireAdmin(request);
  const body = await readJson(request, z.object({ slug: SLUG, path: PATH, content: z.unknown(), note: z.string().max(500).optional() }), 2_000_000);
  return json(await withDb((db) => createPage(db, body, adminActor(session))), 201);
});
