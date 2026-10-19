import { NextRequest } from "next/server";
import { requestContext, sendEvents, type ServerEvent } from "@/lib/events-server";

// Cloudflare Pages runs dynamic routes on the edge runtime.
export const runtime = "edge";

// Browser beacons (src/lib/analytics.ts). Same-origin, so ad-blockers rarely drop them.
// Who sent it (human or not), country and UA hash are decided here, never by the client.
const BROWSER_EVENTS = new Set([
  "page.viewed",
  "section.viewed",
  "cta.clicked",
  "prompt.copied",
  "snippet.copied",
  "faq.opened",
  "nav.clicked",
  "signup.clicked",
  "demo.clicked",
  "early_access.requested",
  "scroll.depth",
  "experiment.exposed",
]);

export async function POST(request: NextRequest) {
  const ctx = await requestContext(request);
  // Headless browsers and bots that do run JS shouldn't inflate human numbers.
  if (ctx.actorType !== "human") return new Response(null, { status: 204 });

  let payload: { events?: unknown };
  try {
    payload = JSON.parse(await request.text());
  } catch {
    return new Response(null, { status: 400 });
  }
  const list = Array.isArray(payload?.events) ? payload.events.slice(0, 30) : [];

  const events: ServerEvent[] = list
    .filter((e: any) => e && BROWSER_EVENTS.has(e.event))
    .map((e: any) => ({
      event: e.event,
      ts: typeof e.ts === "string" ? e.ts : undefined,
      actorType: "human",
      anonId: ctx.anonId || (typeof e.anonId === "string" ? e.anonId.slice(0, 64) : null),
      sessionId: typeof e.sessionId === "string" ? e.sessionId.slice(0, 64) : null,
      path: typeof e.path === "string" ? e.path : null,
      referrer: typeof e.referrer === "string" ? e.referrer : null,
      ref: typeof e.ref === "string" ? e.ref : null,
      arms: e.arms && typeof e.arms === "object" ? e.arms : null,
      props: e.props && typeof e.props === "object" ? e.props : null,
      country: ctx.country,
      uaHash: ctx.uaHash,
    }));

  await sendEvents(events);
  return new Response(null, { status: 204 });
}
