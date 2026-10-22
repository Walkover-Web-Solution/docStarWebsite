import { NextRequest } from "next/server";
import { z } from "zod";
import { INTERNAL_HEADER, internalKey } from "@/lib/internal";
import { withDb } from "@/server/db";
import { eventSchema, ingestEvents } from "@/server/events";
import { HttpError, handle, json, readJson } from "@/server/http";

export const dynamic = "force-dynamic";

// Called by the middleware (which can't open database connections) to log agent reads.
export const POST = handle(async (request: NextRequest) => {
  if (request.headers.get(INTERNAL_HEADER) !== (await internalKey())) throw new HttpError(401, "Unauthorized");
  const { events } = await readJson(request, z.object({ events: z.array(eventSchema).min(1).max(50) }), 200_000);
  return json(await withDb((db) => ingestEvents(db, events)), 202);
});
