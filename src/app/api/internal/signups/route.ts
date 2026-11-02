import { NextRequest } from "next/server";
import { withDb } from "@/server/db";
import { HttpError, handle, json, readJson } from "@/server/http";
import { recordSignup, signupSchema } from "@/server/signups";

export const dynamic = "force-dynamic";

// Called by the viaSocket signup flow for each new user, with `Authorization: Bearer <SIGNUPS_SECRET>`.
// Answers { created }: false when this user was already recorded.
export const POST = handle(async (request: NextRequest) => {
  const secret = process.env.SIGNUPS_SECRET;
  if (!secret || request.headers.get("authorization") !== `Bearer ${secret}`) throw new HttpError(401, "Unauthorized");
  const input = await readJson(request, signupSchema, 10_000);
  return json(await withDb((db) => recordSignup(db, input)));
});
