import { NextRequest } from "next/server";
import { requestContext } from "@/lib/events-server";
import { withDb } from "@/server/db";
import { eventSchema, ingestEvents, type SiteEvent } from "@/server/events";
import { handle } from "@/server/http";

export const dynamic = "force-dynamic";

// Browser beacons (src/lib/analytics.ts). Same-origin, so ad-blockers rarely drop them.
// Whether the sender is a person is decided here from the user agent, never by the client.
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

export const POST = handle(async (request: NextRequest) => {
  const ctx = await requestContext(request);
  // Headless browsers and bots that do run JS shouldn't inflate human numbers.
  if (ctx.actorType !== "human") return new Response(null, { status: 204 });

  const raw = await request.text();
  if (raw.length > 100_000) return new Response(null, { status: 413 });
  let payload: { events?: unknown };
  try {
    payload = JSON.parse(raw);
  } catch {
    return new Response(null, { status: 400 });
  }
  const list = Array.isArray(payload?.events) ? payload.events.slice(0, 30) : [];

  const events: SiteEvent[] = [];
  for (const e of list as any[]) {
    if (!e || !BROWSER_EVENTS.has(e.event)) continue;
    const parsed = eventSchema.safeParse({
      event: e.event,
      ts: typeof e.ts === "string" ? e.ts : undefined,
      actorType: "human",
      anonId: ctx.anonId || (typeof e.anonId === "string" ? e.anonId.slice(0, 64) : null),
      path: typeof e.path === "string" ? e.path.slice(0, 512) : null,
      ref: typeof e.ref === "string" ? e.ref.slice(0, 64) : null,
      variants: cleanArms(e.arms),
      props: e.props && typeof e.props === "object" ? e.props : null,
    });
    if (parsed.success) events.push(parsed.data);
  }
  if (events.length) await withDb((db) => ingestEvents(db, events));
  return new Response(null, { status: 204 });
});
