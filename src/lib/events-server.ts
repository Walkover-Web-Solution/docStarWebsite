import { INTERNAL_HEADER, internalKey } from "./internal";
import { classify, type ActorType } from "./requester";

// Server-side half of website analytics: enriches events with who sent them and hands
// them to this site's own API. Used by middleware (agent fetches) and /api/e (browser beacons).
// Never throws: analytics must not break a page.

export const ANON_COOKIE = "ds_aid";

export type ServerEvent = {
  event: string;
  ts?: string;
  actorType: ActorType;
  agentName?: string | null;
  anonId?: string | null;
  path?: string | null;
  ref?: string | null;
  arms?: Record<string, string> | null;
  props?: Record<string, unknown> | null;
};

const clip = (v: string | null | undefined, max: number) => (v ? v.slice(0, max) : null);

export async function requestContext(request: Request & { cookies?: { get(name: string): { value: string } | undefined } }) {
  const ua = request.headers.get("user-agent");
  const who = classify(ua, request.headers);
  return {
    ...who,
    anonId: request.cookies?.get(ANON_COOKIE)?.value || null,
  };
}

/** Logs agent reads. Called from the middleware, which can't reach the database itself, so it posts to this site's own API. */
export async function sendEvents(events: ServerEvent[], origin: string) {
  if (!process.env.JWT_SECRET || events.length === 0) return;
  const body = events.slice(0, 50).map((e) => ({
    ...e,
    path: clip(e.path, 512),
    ref: clip(e.ref, 64),
    agentName: clip(e.agentName, 64),
    variants: e.arms ?? null,
    arms: undefined,
  }));
  try {
    await fetch(`${origin}/api/internal/events`, {
      method: "POST",
      headers: { "content-type": "application/json", [INTERNAL_HEADER]: await internalKey() },
      body: JSON.stringify({ events: body }),
      cache: "no-store",
    });
  } catch (error) {
    console.error("[events] send failed:", (error as Error).message);
  }
}
