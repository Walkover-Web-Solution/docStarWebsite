"use client";

// Browser half of first-party website analytics. Events queue up and are flushed to our
// own /api/e with sendBeacon; the server decides whether the sender is human. Event names
// must also be allowed in /api/e and src/server/events.ts.

// Only what the admin's Analytics tab and A/B tests use.
export type BrowserEvent = "page.viewed" | "section.viewed" | "cta.clicked" | "prompt.copied" | "signup.clicked";

type Queued = {
  event: BrowserEvent;
  ts: string;
  anonId: string | null;
  path: string;
  ref?: string | null;
  arms?: Record<string, string> | null;
  props?: Record<string, unknown>;
};

const ANON_COOKIE = "ds_aid";
const queue: Queued[] = [];
let timer: ReturnType<typeof setTimeout> | null = null;

const readCookie = (name: string) =>
  typeof document === "undefined" ? null : document.cookie.split("; ").find((c) => c.startsWith(`${name}=`))?.split("=")[1] || null;

function anonId() {
  let id = readCookie(ANON_COOKIE);
  if (!id) {
    id = crypto.randomUUID();
    document.cookie = `${ANON_COOKIE}=${id}; Max-Age=${60 * 60 * 24 * 365}; Path=/; SameSite=Lax${location.protocol === "https:" ? "; Secure" : ""}`;
  }
  return id;
}

// A/B variants the visitor is in (set by the middleware), so results can be split by variant.
function arms() {
  try {
    const raw = readCookie("ds_x");
    return raw ? JSON.parse(decodeURIComponent(raw)) : null;
  } catch {
    return null;
  }
}

export function flush() {
  if (!queue.length) return;
  const body = JSON.stringify({ events: queue.splice(0, queue.length) });
  const blob = new Blob([body], { type: "text/plain" });
  if (!navigator.sendBeacon?.("/api/e", blob)) {
    fetch("/api/e", { method: "POST", body, keepalive: true }).catch(() => {});
  }
}

export function track(event: BrowserEvent, props?: Record<string, unknown>, extra?: { ref?: string }) {
  if (typeof window === "undefined") return;
  queue.push({
    event,
    ts: new Date().toISOString(),
    anonId: anonId(),
    path: location.pathname,
    arms: arms(),
    ref: extra?.ref ?? null,
    props,
  });
  if (queue.length >= 20) return flush();
  if (!timer) timer = setTimeout(() => ((timer = null), flush()), 3000);
}

// Short random id stamped into a copied prompt, so the agent's later fetch of the
// quickstart (?ref=…) can be joined to the copy that caused it.
export const makeRef = () => Array.from(crypto.getRandomValues(new Uint8Array(6)), (b) => (b % 36).toString(36)).join("");
