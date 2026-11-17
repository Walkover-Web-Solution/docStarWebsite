import type { NextRequest } from "next/server";
import { handle, HttpError } from "@/server/http";
import { handleSiteMcp, mcpSse, type JsonRpcRequest } from "@/server/siteMcp";

export const dynamic = "force-dynamic";

const ACCEPT = "application/json, text/event-stream";

// Streamable HTTP MCP for the marketing site: read-only site content plus feedback (Axien act.mcp-tool-depth).
export const POST = handle(async (request: NextRequest) => {
  const accept = request.headers.get("accept") || "";
  if (!accept.includes("application/json") || !accept.includes("text/event-stream")) {
    throw new HttpError(406, "Accept header must include both application/json and text/event-stream");
  }
  let body: JsonRpcRequest;
  try {
    body = await request.json();
  } catch {
    throw new HttpError(400, "Body must be JSON-RPC");
  }
  const { result, error } = await handleSiteMcp(body, request.nextUrl.origin);
  const frame = {
    jsonrpc: "2.0" as const,
    id: body.id ?? null,
    ...(error ? { error } : { result }),
  };
  return new Response(mcpSse(frame), {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
});

export const GET = () =>
  new Response("DocStar marketing site MCP. POST JSON-RPC with Accept: application/json, text/event-stream\n", {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });