import { NextRequest } from "next/server";
import { requireAdmin } from "@/server/auth";
import { getPageForAdmin } from "@/server/content";
import { withDb } from "@/server/db";
import { handle, json } from "@/server/http";

export const dynamic = "force-dynamic";

export const GET = handle(async (request: NextRequest, ctx: { params: Promise<{ slug: string }> }) => {
  await requireAdmin(request);
  const { slug } = await ctx.params;
  return json(await withDb((db) => getPageForAdmin(db, slug)));
});
