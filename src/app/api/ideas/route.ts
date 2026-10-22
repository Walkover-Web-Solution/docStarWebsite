import { NextRequest } from "next/server";
import { SITE_URL } from "@/lib/site";
import { withDb } from "@/server/db";
import { HttpError, callerHash, handle, json } from "@/server/http";
import { normalizeSubmission, submit, submitSchema } from "@/server/ideas";

export const dynamic = "force-dynamic";

// Anyone, human or AI agent, can send DocStar a feature request, idea, bug or feedback. No sign-in.
// Callers are limited per address and in total (src/server/ideas.ts). The response has a private
// followUpUrl that shows the idea's status and the team's note.
const CORS = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "POST, OPTIONS", "Access-Control-Allow-Headers": "content-type" };

export const OPTIONS = () => new Response(null, { status: 204, headers: CORS });

export const POST = handle(async (request: NextRequest) => {
  const raw = await request.text();
  if (raw.length > 30_000) throw new HttpError(413, "Request too large");
  let body: any;
  try {
    body = JSON.parse(raw);
  } catch {
    throw new HttpError(400, "Body must be JSON");
  }
  // Hidden form field people leave empty; bots that fill it get a quiet success.
  if (body?.website) return json({ status: "new" }, 201, CORS);

  const input = submitSchema.parse(normalizeSubmission(body));
  const { followUpSecret, ...idea } = await withDb(async (db) => submit(db, input, { userAgent: request.headers.get("user-agent"), senderHash: await callerHash(request) }));
  const origin = process.env.NODE_ENV === "production" ? SITE_URL : request.nextUrl.origin;
  return json({ ...idea, followUpUrl: `${origin}/api/ideas/public/${followUpSecret}` }, 201, CORS);
});
