import { z } from "zod";
import type { Db } from "./db";

// First-party analytics for docstar.io. Browsers send beacons to /api/e and the middleware logs agent
// reads; both end up here. Only what the admin's Analytics tab and A/B tests use is kept: no referrer,
// country or user-agent data, and no personal data.

// Allowed event names. Add new ones here and in src/lib/analytics.ts and /api/e.
export const SITE_EVENTS = [
  // browser (people)
  "page.viewed",
  "section.viewed",
  "cta.clicked",
  "prompt.copied",
  "signup.clicked",
  // server (agents, crawlers, CLI and HTTP clients; they don't run JavaScript)
  "agent.page_fetched",
  "agent.markdown_fetched",
  "agent.llms_fetched",
  "agent.quickstart_fetched",
] as const;

export const ACTOR_TYPES = ["human", "ai_agent", "ai_crawler", "ai_search", "http_client", "bot"] as const;

const optionalStr = (max: number) => z.string().max(max).nullish();

export const eventSchema = z.object({
  event: z.enum(SITE_EVENTS),
  ts: z.string().optional(),
  actorType: z.enum(ACTOR_TYPES),
  agentName: optionalStr(64),
  anonId: optionalStr(64),
  path: optionalStr(512),
  ref: optionalStr(64),
  // test key → variant (A | B | C): which version of a page the visitor saw
  variants: z.record(z.string().max(64), z.string().max(64)).nullish(),
  props: z.record(z.string(), z.any()).nullish(),
});
export type SiteEvent = z.infer<typeof eventSchema>;

const MAX_PROPS_BYTES = 2048;
const TS_SKEW_MS = 24 * 60 * 60 * 1000;

/** Stores up to 50 events in one insert. Events whose extras are too large are dropped, not stored. */
export async function ingestEvents(db: Db, events: SiteEvent[]) {
  const now = Date.now();
  const rows = events
    .slice(0, 50)
    .filter((e) => !e.props || JSON.stringify(e.props).length <= MAX_PROPS_BYTES)
    .filter((e) => !e.variants || Object.keys(e.variants).length <= 10);
  if (rows.length) {
    const values: unknown[] = [];
    const tuples = rows.map((e, i) => {
      const parsed = e.ts ? Date.parse(e.ts) : now;
      const ts = Number.isFinite(parsed) && Math.abs(parsed - now) <= TS_SKEW_MS ? new Date(parsed) : new Date(now);
      values.push(ts, e.event, e.actorType, e.agentName ?? null, e.anonId ?? null, e.path ?? null, e.ref ?? null, e.variants ? JSON.stringify(e.variants) : null, e.props ? JSON.stringify(e.props) : null);
      const n = i * 9;
      return `($${n + 1}, $${n + 2}, $${n + 3}, $${n + 4}, $${n + 5}, $${n + 6}, $${n + 7}, $${n + 8}::jsonb, $${n + 9}::jsonb)`;
    });
    await db.query(`INSERT INTO admin_events (ts, event, actor_type, agent_name, anon_id, path, ref, variants, props) VALUES ${tuples.join(", ")}`, values);
  }
  return { accepted: rows.length, dropped: events.length - rows.length };
}

// ---------- analytics for the admin ----------

export async function overview(db: Db, days: number) {
  const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
  const q = (text: string) => db.query(text, [since]);
  const W = "ts >= $1";
  const [traffic, agents, agentPaths, ctas, sections, pageViews, funnel] = await Promise.all([
    // reads by actor type: people's page views, agents' and crawlers' fetches
    q(`SELECT actor_type AS "actorType", COUNT(*)::int AS reads
         FROM admin_events WHERE ${W} AND event IN ('page.viewed','agent.page_fetched','agent.markdown_fetched','agent.llms_fetched','agent.quickstart_fetched')
        GROUP BY actor_type ORDER BY reads DESC`),
    q(`SELECT COALESCE(agent_name, 'unknown') AS name, COUNT(*)::int AS fetches
         FROM admin_events WHERE ${W} AND actor_type <> 'human' AND event LIKE 'agent.%' GROUP BY 1 ORDER BY fetches DESC LIMIT 5`),
    q(`SELECT path, COUNT(*)::int AS fetches FROM admin_events
        WHERE ${W} AND actor_type <> 'human' AND event LIKE 'agent.%' GROUP BY path ORDER BY fetches DESC LIMIT 10`),
    q(`SELECT props->>'cta_id' AS cta, props->>'placement' AS placement, COUNT(*)::int AS clicks, COUNT(DISTINCT anon_id)::int AS visitors
         FROM admin_events WHERE ${W} AND event = 'cta.clicked' AND actor_type = 'human'
        GROUP BY 1, 2 ORDER BY clicks DESC LIMIT 15`),
    q(`SELECT props->>'section_key' AS section, COUNT(DISTINCT anon_id)::int AS visitors
         FROM admin_events WHERE ${W} AND event = 'section.viewed' AND actor_type = 'human' AND path = '/'
        GROUP BY 1 ORDER BY visitors DESC`),
    q(`SELECT COUNT(DISTINCT anon_id)::int AS visitors
         FROM admin_events WHERE ${W} AND event = 'page.viewed' AND actor_type = 'human' AND path = '/'`),
    // prompt funnel: copies → an agent fetched the quickstart with the same ref
    q(`WITH copies AS (
         SELECT DISTINCT ref, anon_id FROM admin_events WHERE ${W} AND event = 'prompt.copied' AND ref IS NOT NULL
       ), fetched AS (
         SELECT DISTINCT ref FROM admin_events WHERE ${W} AND event = 'agent.quickstart_fetched' AND ref IS NOT NULL
       )
       SELECT (SELECT COUNT(DISTINCT anon_id) FROM admin_events WHERE ${W} AND event = 'page.viewed' AND actor_type = 'human')::int AS visitors,
              (SELECT COUNT(DISTINCT anon_id) FROM copies)::int AS copied,
              (SELECT COUNT(*) FROM copies c WHERE c.ref IN (SELECT ref FROM fetched))::int AS agent_arrived,
              (SELECT COUNT(DISTINCT anon_id) FROM admin_events WHERE ${W} AND event = 'signup.clicked')::int AS signup_clicked`),
  ]);
  return { days, traffic, agents, agentPaths, ctas, sections, homeVisitors: pageViews[0]?.visitors || 0, funnel: funnel[0] };
}
