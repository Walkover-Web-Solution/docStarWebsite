"use client";

// A/B recording for tests the owner defines in the external middleware.
// Not the revision tests in src/lib/experiments.ts, and not the /api/e beacon.
// No page calls this yet, so nothing on the site changes.
//
// A later experiment imports these in a client component and:
//   const variant = mwVariant("hero-cta", [["control", 50], ["b", 50]])
//   mwVariant() during render (synchronous; on any error, the first variant).
//   mwSend({ event: "exposure", experiment: "hero-cta", variant }) once the variant is shown.
//   mwSend({ event: "conversion", experiment: "hero-cta", variant, goal: "signup" }) when the goal happens.
// mwSend() returns nothing. Do not await it, retry it, or send it from render.

export type MwWeightedVariant = readonly [string, number];

export type MwExperimentEvent = {
  event: "exposure" | "conversion";
  experiment: string;
  variant: string;
  goal?: string;
};

const MW_EVENTS = "https://cursor-slack-bot.embarko.app/repos/docstarwebsite/events";
const MW_KEY = "pk_11cbbaeffd9424ac6a200658401786b4"; // publishable: it can only append events

let mwId: string | undefined;
let mwOff = false;

function mwVisitor(): string {
  if (mwId) return mwId;
  try {
    mwId = localStorage.getItem("mw_visitor") || undefined;
  } catch {
    /* private mode or no storage */
  }
  if (!mwId) {
    const bytes = new Uint8Array(16);
    try {
      crypto.getRandomValues(bytes);
    } catch {
      for (let i = 0; i < 16; i++) bytes[i] = Math.random() * 256;
    }
    mwId = Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
    try {
      localStorage.setItem("mw_visitor", mwId);
    } catch {
      /* ignore */
    }
  }
  return mwId;
}

function mwBucket(experiment: string, visitorId: string, variants: readonly MwWeightedVariant[]): string | undefined {
  let h = 0x811c9dc5;
  const s = `${experiment}:${visitorId}`;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619) >>> 0;
  h = Math.imul(h ^ (h >>> 16), 0x85ebca6b);
  h = Math.imul(h ^ (h >>> 13), 0xc2b2ae35);
  h = (h ^ (h >>> 16)) >>> 0;
  let n = h % variants.reduce((sum, [, w]) => sum + w, 0);
  for (const [key, w] of variants) if ((n -= w) < 0) return key;
  return undefined;
}

// The variant to render, at once and locally. variants exactly as defined on the middleware, in order:
// [["control", 50], ["b", 50]]. On any error: the control (the first), or undefined if there is none.
export function mwVariant(experiment: string, variants: readonly MwWeightedVariant[]): string | undefined {
  try {
    return mwBucket(experiment, mwVisitor(), variants) ?? variants[0][0];
  } catch {
    return variants?.[0]?.[0];
  }
}

// Fire and forget: returns nothing, never throws, never waits. Do not await it or chain on it.
export function mwSend(event: MwExperimentEvent): void {
  if (mwOff) return;
  try {
    const body = JSON.stringify({ key: MW_KEY, visitor_id: mwVisitor(), ...event });
    if (navigator.sendBeacon?.(MW_EVENTS, body)) return;
    const signal = typeof AbortSignal !== "undefined" && AbortSignal.timeout ? AbortSignal.timeout(3000) : undefined;
    fetch(MW_EVENTS, { method: "POST", body, keepalive: true, credentials: "omit", signal }).catch(() => {
      mwOff = true;
    });
  } catch {
    mwOff = true;
  }
}
