import { classify, hashUserAgent, type ActorType } from "./requester";

// Server-side half of website analytics: enriches events with who sent them and forwards
// them to hitman-api. Used by middleware (agent fetches) and /api/e (browser beacons).
// Never throws: analytics must not break a page.

export const ANON_COOKIE = "ds_aid";

export type ServerEvent = {
  event: string;
  ts?: string;
  actorType: ActorType;
  agentName?: string | null;
  anonId?: string | null;
  sessionId?: string | null;
  path?: string | null;
  referrer?: string | null;
  ref?: string | null;
  arms?: Record<string, string> | null;
  props?: Record<string, unknown> | null;
  country?: string | null;
  uaHash?: string | null;
};

const clip = (v: string | null | undefined, max: number) => (v ? v.slice(0, max) : null);

export async function requestContext(request: Request & { cookies?: { get(name: string): { value: string } | undefined } }) {
  const ua = request.headers.get("user-agent");
  const who = classify(ua, request.headers);
  return {
    ...who,
    country: request.headers.get("cf-ipcountry"),
    uaHash: await hashUserAgent(ua),
    anonId: request.cookies?.get(ANON_COOKIE)?.value || null,
  };
}

export async function sendEvents(events: ServerEvent[]) {
  const api = process.env.DOCSTAR_API_URL;
  const key = process.env.SITE_EVENTS_SECRET;
  if (!api || !key || events.length === 0) return;
  const body = events.slice(0, 50).map((e) => ({
    ...e,
    path: clip(e.path, 512),
    referrer: clip(e.referrer, 512),
    ref: clip(e.ref, 64),
    agentName: clip(e.agentName, 64),
  }));
  try {
    await fetch(`${api.replace(/\/$/, "")}/site/events`, {
      method: "POST",
      headers: { "content-type": "application/json", "x-events-key": key },
      body: JSON.stringify({ events: body }),
      cache: "no-store",
    });
  } catch (error) {
    console.error("[events] send failed:", (error as Error).message);
  }
}
