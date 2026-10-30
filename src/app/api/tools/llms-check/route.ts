import { NextRequest } from "next/server";
import { checkLlmsTxt, rateLimit } from "@/server/llmsCheck";
import { HttpError, callerHash, handle, json } from "@/server/http";

export const dynamic = "force-dynamic";

// GET /api/tools/llms-check?url=docs.acme.com → the llms.txt report as JSON. Public, used by
// /tools/llms-txt-checker and callable by agents. Documented in docs/CONTRACTS.md.
const CORS = { "Access-Control-Allow-Origin": "*" };

export const GET = handle(async (request: NextRequest) => {
  const url = request.nextUrl.searchParams.get("url");
  if (!url) throw new HttpError(400, "Add ?url=<website>, for example ?url=docs.acme.com");
  rateLimit(await callerHash(request));
  return json(await checkLlmsTxt(url), 200, CORS);
});
