import { NextRequest } from "next/server";
import { requestContext, sendEvents, type ServerEvent } from "@/lib/events-server";

// Cloudflare Pages runs dynamic routes on the edge runtime.
export const runtime = "edge";

// Browser beacons (src/lib/analytics.ts). Same-origin, so ad-blockers rarely drop them.
// Whether the sender is human is decided here, never by the client.
const BROWSER_EVENTS = new Set(["page.viewed", "section.viewed", "cta.clicked", "prompt.copied", "signup.clicked"]);

// Test key → variant (A/B/C) only; anything else is dropped.
function cleanArms(v: unknown): Record<string, string> | null {
  if (!v || typeof v !== "object") return null;
  const out = Object.fromEntries(
    Object.entries(v as Record<string, unknown>)
      .filter(([k, x]) => k.length <= 64 && typeof x === "string" && /^[ABC]$/.test(x))
      .slice(0, 10)
  ) as Record<string, string>;
  return Object.keys(out).length ? out : null;
}

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
      path: typeof e.path === "string" ? e.path : null,
      ref: typeof e.ref === "string" ? e.ref : null,
      arms: cleanArms(e.arms),
      props: e.props && typeof e.props === "object" ? e.props : null,
    }));

  await sendEvents(events);
  return new Response(null, { status: 204 });
}
