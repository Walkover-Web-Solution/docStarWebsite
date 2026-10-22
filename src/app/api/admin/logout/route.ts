import { NextRequest } from "next/server";
import { endSession, requireSameOrigin } from "@/server/auth";
import { handle, json } from "@/server/http";

export const dynamic = "force-dynamic";

export const POST = handle(async (request: NextRequest) => {
  requireSameOrigin(request);
  await endSession();
  return json({ ok: true });
});
