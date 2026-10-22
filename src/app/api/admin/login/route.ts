import { NextRequest } from "next/server";
import { z } from "zod";
import { requireSameOrigin, signIn, startSession } from "@/server/auth";
import { withDb } from "@/server/db";
import { handle, json, readJson } from "@/server/http";

export const dynamic = "force-dynamic";

export const POST = handle(async (request: NextRequest) => {
  requireSameOrigin(request);
  const { email, password } = await readJson(request, z.object({ email: z.string().max(255), password: z.string().max(200) }), 5_000);
  const session = await withDb((db) => signIn(db, request, email, password));
  await startSession(session);
  return json(session);
});
