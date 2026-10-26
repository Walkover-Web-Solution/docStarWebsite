import { SignJWT } from "jose";

// AI through viaSocket (https://flow.viasocket.com/documentation/ai.md): no model key of our own.
// The embed token is signed with VIASOCKET_EMBED_SECRET for one fixed user, the autopilot.
// The model is chosen per call; swap it with AUTOPILOT_AI_SERVICE / AUTOPILOT_AI_MODEL.

const API = "https://flow-api.viasocket.com";
export const AI_SERVICE = process.env.AUTOPILOT_AI_SERVICE || "anthropic";
export const AI_MODEL = process.env.AUTOPILOT_AI_MODEL || "claude-opus-4-7";

export const isConfigured = () => !!(process.env.VIASOCKET_ORG_ID && process.env.VIASOCKET_PROJECT_ID && process.env.VIASOCKET_EMBED_SECRET);

const embedToken = () =>
  new SignJWT({ org_id: process.env.VIASOCKET_ORG_ID, project_id: process.env.VIASOCKET_PROJECT_ID, unique_identifier: "docstar-autopilot" })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .sign(new TextEncoder().encode(process.env.VIASOCKET_EMBED_SECRET as string));

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * One question, a JSON answer in `schema`'s shape. Sent in the background (delivery "rtlayer"): a
 * synchronous call is cut at about a minute by viaSocket's gateway, and a whole website is a long read.
 * The answer is then read from the thread's history.
 */
export async function askJson<T = any>(input: { threadId: string; prompt: string; message: string; schemaName: string; schema: object; timeoutMs?: number }): Promise<T> {
  if (!isConfigured()) throw new Error("viaSocket is not configured (VIASOCKET_ORG_ID, VIASOCKET_PROJECT_ID, VIASOCKET_EMBED_SECRET)");
  const headers = { authorization: await embedToken(), "content-type": "application/json" };
  const res = await fetch(`${API}/embed/ai/message`, {
    method: "POST",
    headers,
    signal: AbortSignal.timeout(30_000),
    body: JSON.stringify({
      thread_id: input.threadId,
      prompt: input.prompt,
      message: input.message,
      service: AI_SERVICE,
      model: AI_MODEL,
      response_type: "json_schema",
      json_schema: { name: input.schemaName, strict: true, schema: input.schema },
      delivery: "rtlayer",
    }),
  });
  const sent: any = await res.json().catch(() => ({}));
  if (!sent?.success) throw new Error(sent?.message || `viaSocket AI call failed (${res.status})`);
  const messageId = sent?.data?.message_id;

  const deadline = Date.now() + (input.timeoutMs ?? 4 * 60 * 1000);
  while (Date.now() < deadline) {
    await sleep(5000);
    const history: any = await fetch(`${API}/embed/ai/threads/${encodeURIComponent(input.threadId)}/history?page=1`, { headers, signal: AbortSignal.timeout(20_000) })
      .then((r) => r.json())
      .catch(() => ({}));
    const replies = (history?.data?.messages || []).filter((m: any) => m.role === "assistant" && m.content);
    const reply = (messageId && replies.find((m: any) => m.message_id === messageId)) || replies[replies.length - 1];
    if (!reply) continue;
    try {
      return (typeof reply.content === "string" ? JSON.parse(reply.content) : reply.content) as T;
    } catch {
      // not complete JSON yet; look again on the next poll
    }
  }
  throw new Error("The AI didn't answer in time");
}
