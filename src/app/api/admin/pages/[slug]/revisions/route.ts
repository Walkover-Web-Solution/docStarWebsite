import { NextRequest } from "next/server";
import { z } from "zod";
import { adminActor, requireAdmin } from "@/server/auth";
import { saveRevision } from "@/server/content";
import { withDb } from "@/server/db";
import { handle, json, readJson } from "@/server/http";

export const dynamic = "force-dynamic";

export const POST = handle(async (request: NextRequest, ctx: { params: Promise<{ slug: string }> }) => {
  const session = await requireAdmin(request);
  const { slug } = await ctx.params;
  const body = await readJson(request, z.object({ content: z.unknown(), note: z.string().max(500).optional(), basedOnRevisionId: z.number().int().optional() }), 2_000_000);
  return json(await withDb((db) => saveRevision(db, slug, body, adminActor(session))), 201);
});
