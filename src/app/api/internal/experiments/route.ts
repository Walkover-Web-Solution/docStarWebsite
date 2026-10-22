import { NextRequest } from "next/server";
import { INTERNAL_HEADER, internalKey } from "@/lib/internal";
import { withDb } from "@/server/db";
import { listRunning } from "@/server/experiments";
import { HttpError, handle, json } from "@/server/http";

export const dynamic = "force-dynamic";

// Called by the middleware: which A/B tests are running (pages, versions, split).
export const GET = handle(async (request: NextRequest) => {
  if (request.headers.get(INTERNAL_HEADER) !== (await internalKey())) throw new HttpError(401, "Unauthorized");
  return json({ experiments: await withDb(listRunning) });
});
