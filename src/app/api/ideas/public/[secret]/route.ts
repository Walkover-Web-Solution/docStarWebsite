import { withDb } from "@/server/db";
import { handle, json } from "@/server/http";
import { getPublic } from "@/server/ideas";

export const dynamic = "force-dynamic";

// A sender's own idea: its status and the team's note, found by the secret in their follow-up link.
export const GET = handle(async (_req: Request, ctx: { params: Promise<{ secret: string }> }) => {
  const { secret } = await ctx.params;
  return json(await withDb((db) => getPublic(db, secret)), 200, { "Access-Control-Allow-Origin": "*" });
});
