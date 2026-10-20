// A/B tests on the website (edge middleware). hitman-api lists the running tests; each visitor gets a
// variant from their anonymous id, kept in the `ds_x` cookie so their events carry it, and the page is
// served from /xv/<revision><path> (cached per version) while the address bar stays the same.
// Agents, crawlers and the .md twins always get the live page.

export const ARMS_COOKIE = "ds_x";
const CACHE_MS = 30_000;

export type Experiment = { key: string; slug: string; path: string; variants: { key: string; revisionId: number; weight: number }[] };

let cache: { at: number; list: Experiment[] } | null = null;

export async function runningExperiments(): Promise<Experiment[]> {
  const api = process.env.DOCSTAR_API_URL;
  if (!api) return [];
  if (cache && Date.now() - cache.at < CACHE_MS) return cache.list;
  try {
    const res = await fetch(`${api.replace(/\/$/, "")}/site/experiments`, { cache: "no-store" });
    const list = res.ok ? ((await res.json()).experiments as Experiment[]) : [];
    cache = { at: Date.now(), list };
  } catch {
    cache = { at: Date.now(), list: cache?.list || [] };
  }
  return cache.list;
}

// Same visitor + same test = same variant, every time.
async function bucket(anonId: string, key: string) {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(`${anonId}:${key}`));
  return new DataView(digest).getUint32(0) % 100;
}

export async function assign(anonId: string, experiment: Experiment) {
  const b = await bucket(anonId, experiment.key);
  let edge = 0;
  for (const v of experiment.variants) {
    edge += v.weight;
    if (b < edge) return v;
  }
  return experiment.variants[0];
}

// The cookie is set as JSON; Next.js URL-encodes it on the way out and decodes it on the way in.
export const readArms = (raw?: string): Record<string, string> => {
  try {
    const parsed = raw ? JSON.parse(raw) : {};
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
};

export const variantPath = (revisionId: number, path: string) => `/xv/${revisionId}${path === "/" ? "" : path}`;
