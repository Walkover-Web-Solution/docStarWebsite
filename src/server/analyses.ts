import { PAGES, PATH_TO_SLUG } from "@/content/pages";
import { getSitePage } from "@/content/source";
import { KNOWLEDGE_BUILD, KNOWLEDGE_DOCS } from "@/content/knowledge.generated";
import { AdminError, createRow, mapRow, updateRow, type Actor } from "./adminTypes";
import { askJson, isConfigured } from "./autopilot/ai";
import { BANNED } from "./autopilot/policy";
import type { Db } from "./db";
import * as experiments from "./experiments";
import { listDocs } from "./knowledge";
import { getSetting, setSetting } from "./settings";
import { overview as researchOverview } from "./research";

// Analyses answer one question each with mechanical checks (no model). Every run is an `analysis_run`
// row: what triggered it, the code revision, the data window, observed facts and an overall state.
// AI interpretation is separate, optional, and stored apart from the facts (see interpret()).
// Missing data is reported as missing, never as zero.

export type Level = "info" | "warn" | "error";
export type Fact = { level: Level; text: string; ref?: string };
export type Result = { state: "ok" | "attention" | "insufficient_data" | "not_connected" | "stale"; facts: Fact[]; window?: { from: string; to: string } };
type Ctx = { db: Db; origin: string };

export const SETTINGS_KEY = "analyses";
export const DEFAULTS = { paused: false, maxRunsPerDay: 24, enabled: {} as Record<string, boolean>, intervalHours: {} as Record<string, number> };
const DEFAULT_INTERVAL_HOURS = 24;
const STALE_RUN_MINUTES = 15;
const MAX_ATTEMPTS = 2;

const fact = (level: Level, text: string, ref?: string): Fact => ({ level, text, ref });
const finish = (facts: Fact[], extra: Partial<Result> = {}): Result => ({ state: facts.some((f) => f.level !== "info") ? "attention" : "ok", facts, ...extra });

async function fetchText(url: string) {
  try {
    const res = await fetch(url, { redirect: "manual", headers: { accept: "text/html", "user-agent": "DocStarSiteCheck/1.0" }, signal: AbortSignal.timeout(10_000) });
    return { status: res.status, headers: res.headers, text: res.status === 200 ? await res.text() : "", error: "" };
  } catch (error: any) {
    return { status: 0, headers: new Headers(), text: "", error: String(error?.message || error) };
  }
}

const strings = (node: unknown, out: string[] = []): string[] => {
  if (typeof node === "string") out.push(node);
  else if (Array.isArray(node)) node.forEach((n) => strings(n, out));
  else if (node && typeof node === "object") Object.values(node).forEach((n) => strings(n, out));
  return out;
};

// Legal text ("we cannot guarantee...") legitimately uses words the wording scan flags in marketing copy.
const LEGAL_SLUGS = ["privacy-policy", "data-retention-policy", "terms"];

export const ANALYSES: { id: string; title: string; question: string; needs: "db" | "site" | "none"; run: (ctx: Ctx) => Promise<Result> }[] = [
  {
    id: "links",
    title: "Links and delivered pages",
    question: "Does every page respond, and does every internal link in the content point at a real page?",
    needs: "site",
    async run({ origin }) {
      const facts: Fact[] = [];
      const known = new Set([...Object.keys(PATH_TO_SLUG), "/llms.txt", "/llms-full.txt", "/sitemap.xml", "/mcp/quickstart.md", "/content.json"]);
      for (const page of PAGES) {
        const content = await getSitePage(page.slug);
        for (const s of strings(content.sections)) {
          for (const m of s.matchAll(/\]\((\/[^)\s]*)\)|^(\/[a-z0-9\-/._]*)$/gim)) {
            const target = (m[1] || m[2]).split(/[?#]/)[0].replace(/(.)\/$/, "$1");
            if (target && !known.has(target) && !(target.endsWith(".md") && PATH_TO_SLUG[target.slice(0, -3)])) facts.push(fact("warn", `Link to ${target} is not a known page (it may be a redirect; verify)`, page.path));
          }
        }
        const res = await fetchText(origin + page.path);
        if (res.status !== 200) facts.push(fact("error", `${page.path} answered ${res.status || "no response"}${res.error ? ` (${res.error})` : ""}`, page.path));
        const md = await fetchText(origin + (page.path === "/" ? "/index.md" : `${page.path}.md`));
        if (md.status !== 200) facts.push(fact("error", `Markdown twin of ${page.path} answered ${md.status || "no response"}`, page.path));
      }
      if (!facts.length) facts.push(fact("info", `${PAGES.length} pages and their markdown twins answered 200; no unknown internal links.`));
      return finish(facts);
    },
  },
  {
    id: "seo",
    title: "Search basics",
    question: "Are titles, descriptions, headings, canonical and indexing signals present and consistent on the delivered pages?",
    needs: "site",
    async run({ origin }) {
      const facts: Fact[] = [];
      const titles = new Map<string, string>();
      const descriptions = new Map<string, string>();
      for (const page of PAGES) {
        const res = await fetchText(origin + page.path);
        if (res.status !== 200) continue; // reported by the links analysis
        const html = res.text;
        const title = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.trim() || "";
        const desc = html.match(/<meta[^>]+name="description"[^>]+content="([^"]*)"/i)?.[1] || "";
        const h1s = (html.match(/<h1[\s>]/gi) || []).length;
        if (title.length < 15 || title.length > 70) facts.push(fact("warn", `Title is ${title.length} characters: "${title.slice(0, 60)}"`, page.path));
        if (desc.length < 70 || desc.length > 180) facts.push(fact("warn", `Description is ${desc.length} characters`, page.path));
        if (h1s !== 1) facts.push(fact("warn", `${h1s} <h1> elements (expected 1)`, page.path));
        if (!/<link[^>]+rel="canonical"/i.test(html)) facts.push(fact("error", "No canonical link", page.path));
        if (/<meta[^>]+name="robots"[^>]+noindex/i.test(html) || /noindex/i.test(res.headers.get("x-robots-tag") || "")) facts.push(fact("error", "A public page is marked noindex", page.path));
        if (!/application\/ld\+json/i.test(html)) facts.push(fact("warn", "No structured data", page.path));
        if (titles.has(title)) facts.push(fact("warn", `Same title as ${titles.get(title)}`, page.path));
        if (desc && descriptions.has(desc)) facts.push(fact("warn", `Same description as ${descriptions.get(desc)}`, page.path));
        titles.set(title, page.path);
        descriptions.set(desc, page.path);
      }
      const sitemap = await fetchText(origin + "/sitemap.xml");
      if (sitemap.status !== 200) facts.push(fact("error", `/sitemap.xml answered ${sitemap.status || "no response"}`));
      else for (const p of PAGES) if (p.path !== "/" && !sitemap.text.includes(p.path)) facts.push(fact("warn", "Not listed in the sitemap", p.path));
      const admin = await fetchText(origin + "/admin");
      if (!/noindex/i.test(admin.headers.get("x-robots-tag") || "")) facts.push(fact("error", "/admin is not sending X-Robots-Tag: noindex (noindex is not protection; sign-in is)"));
      facts.push(fact("info", "These are mechanical checks of delivered HTML. They are not search performance: no Search Console data is connected."));
      return finish(facts);
    },
  },
  {
    id: "claims",
    title: "Claims and consistency",
    question: "Does any page use over-promising wording, or quote a price outside the pricing page?",
    needs: "none",
    async run() {
      const facts: Fact[] = [];
      for (const page of PAGES) {
        if (LEGAL_SLUGS.includes(page.slug)) continue;
        const text = strings((await getSitePage(page.slug)).sections).join("\n");
        for (const re of BANNED) {
          const hit = text.match(re);
          if (hit) facts.push(fact("warn", `Over-promising wording: "${hit[0]}"`, page.path));
        }
        if (page.slug !== "pricing") for (const m of text.matchAll(/\$\s?\d[\d,.]*(\s?\/\s?\w+)?/g)) facts.push(fact("warn", `Price-like figure "${m[0]}" outside the pricing page; confirm it matches pricing`, page.path));
      }
      if (!facts.length) facts.push(fact("info", "No banned wording and no stray prices found. This does not verify that claims are true; see the claim register in POSITIONING.md."));
      return finish(facts);
    },
  },
  {
    id: "measurement",
    title: "Measurement health",
    question: "Are events arriving, and is there enough data to interpret the conversion journey?",
    needs: "db",
    async run({ db }) {
      const to = new Date();
      const from = new Date(to.getTime() - 14 * 86400000);
      const window = { from: from.toISOString(), to: to.toISOString() };
      const last = await db.one<{ ts: Date | null; n: number }>("SELECT max(ts) AS ts, count(*)::int AS n FROM admin_events");
      if (!last?.n) return { state: "not_connected", window, facts: [fact("error", "No events have ever been received. Check /api/e, /api/internal/events and the database connection.")] };
      const facts: Fact[] = [];
      const age = (Date.now() - new Date(last.ts!).getTime()) / 3600000;
      const stale = age > 48;
      if (stale) facts.push(fact("error", `The newest event is ${Math.round(age)} hours old; tracking may be broken.`));
      const rows = await db.query("SELECT event, actor_type, count(*)::int AS n, count(DISTINCT anon_id)::int AS visitors FROM admin_events WHERE ts >= $1 GROUP BY 1, 2", [from]);
      const count = (event: string, actor?: string) => rows.filter((r) => r.event === event && (!actor || r.actor_type === actor)).reduce((n, r) => n + r.n, 0);
      for (const e of ["page.viewed", "prompt.copied", "agent.quickstart_fetched", "signup.clicked"]) if (!count(e)) facts.push(fact("warn", `No "${e}" events in the last 14 days: either it did not happen or it is not instrumented; this is not a measured zero.`));
      const visitors = (await db.one<{ n: number }>("SELECT count(DISTINCT anon_id)::int AS n FROM admin_events WHERE ts >= $1 AND event = 'page.viewed' AND actor_type = 'human'", [from]))?.n || 0;
      facts.push(fact("info", `Last 14 days (UTC): ${visitors} human visitors (distinct anonymous ids) · ${count("prompt.copied", "human")} prompt copies · ${count("agent.quickstart_fetched")} quickstart fetches by agents · ${count("signup.clicked")} sign-up clicks.`));
      facts.push(fact("info", "Sign-up clicks are not sign-ups: completed sign-ups and activation happen in the product (app.docstar.io) and are not connected here."));
      let state: Result["state"] = facts.some((f) => f.level !== "info") ? "attention" : "ok";
      if (stale) state = "stale";
      else if (visitors < 100) {
        state = "insufficient_data";
        facts.push(fact("info", `Only ${visitors} human visitors in the window; rates would be noise.`));
      }
      return { state, facts, window };
    },
  },
  {
    id: "experiments",
    title: "Experiment health",
    question: "Are running experiments allocating as configured and within their review date?",
    needs: "db",
    async run({ db }) {
      const facts: Fact[] = [];
      const list = (await experiments.list(db)).filter((x) => x.status === "running");
      if (!list.length) return { state: "ok", facts: [fact("info", "No experiment is running.")] };
      for (const x of list) {
        const d = await experiments.get(db, x.id);
        const r = d.results;
        if (!r) continue;
        if (r.splitOff) facts.push(fact("error", "Visitor split does not match the weights (sample ratio mismatch); do not trust results.", x.title));
        if (x.reviewBy && Date.parse(x.reviewBy) < Date.now()) facts.push(fact("warn", `Review date ${x.reviewBy} has passed; decide, start a new phase, or retire.`, x.title));
        if (r.total < 100) facts.push(fact("info", `${r.total} exposed visitors after ${r.days} days: results are inconclusive.`, x.title));
      }
      return finish(facts);
    },
  },
  {
    id: "knowledge",
    title: "Knowledge freshness",
    question: "Which knowledge documents are stale or have no verification record?",
    needs: "db",
    async run({ db }) {
      const facts: Fact[] = [];
      for (const d of await listDocs(db)) {
        if (d.path.startsWith("docs/research/")) continue;
        if (d.freshness !== "fresh") facts.push(fact("warn", d.freshness === "stale" ? `Last verified ${d.verified_on}` : "No verification date in its header", d.path));
        for (const e of d.openEdits) facts.push(fact("info", `Edit #${e.id} is ${e.status}`, d.path));
      }
      facts.push(fact("info", `Bundled revision ${KNOWLEDGE_BUILD.commit.slice(0, 7)} of ${KNOWLEDGE_DOCS.length} documents.`));
      return finish(facts);
    },
  },
  {
    id: "competitors",
    title: "Competitor watchlist",
    question: "Is the watchlist current, and did any watched source change?",
    needs: "db",
    async run({ db }) {
      const o = await researchOverview(db);
      const live = o.competitors.filter((c: any) => c.status !== "dropped");
      if (!live.length) return { state: "not_connected", facts: [fact("warn", "The watchlist is empty. Add the suggested candidates in Research.")] };
      const facts: Fact[] = [];
      for (const c of live as any[]) {
        if (c.freshness === "never_checked") facts.push(fact("warn", "Never checked", c.name));
        else if (c.freshness === "stale") facts.push(fact("warn", `Last checked ${c.lastCheck.at.slice(0, 10)}, older than the ${o.settings.cadenceDays}-day cadence`, c.name));
        if (c.lastCheck?.changed) facts.push(fact("info", "A watched page changed since the previous check; review and update COMPETITORS.md", c.name));
        for (const r of c.lastCheck?.results || []) if (r.status !== 200) facts.push(fact("warn", `${r.url} answered ${r.status || "no response"}`, c.name));
      }
      return finish(facts);
    },
  },
];

export const analysisById = (id: string) => ANALYSES.find((a) => a.id === id);

// ---------- running ----------

const runView = (r: ReturnType<typeof mapRow>) => ({
  id: r.id,
  analysis: r.key as string,
  status: r.status as string,
  trigger: r.data.trigger as string,
  attempts: r.data.attempts as number,
  revision: r.data.revision as string | null,
  window: r.data.window as { from: string; to: string } | null,
  state: r.data.state as string | null,
  facts: r.data.facts as Fact[],
  interpretation: r.data.interpretation as any,
  error: r.data.error as string | null,
  startedAt: r.createdAt,
  finishedAt: r.data.finishedAt as string | null,
});

export async function overview(db: Db) {
  const settings = await getSetting(db, SETTINGS_KEY, DEFAULTS);
  const runs = (await db.query("SELECT DISTINCT ON (key) * FROM admin WHERE type = 'analysis_run' ORDER BY key, created_at DESC")).map(mapRow).map(runView);
  const runsToday = (await db.one<{ n: number }>("SELECT count(*)::int AS n FROM admin WHERE type = 'analysis_run' AND created_at > now() - interval '24 hours'"))?.n || 0;
  return {
    settings,
    runsToday,
    aiConfigured: isConfigured(),
    analyses: ANALYSES.map((a) => {
      const last = runs.find((r) => r.analysis === a.id) || null;
      const interval = settings.intervalHours[a.id] ?? DEFAULT_INTERVAL_HOURS;
      const stale = !!(last?.finishedAt && Date.now() - Date.parse(last.finishedAt) > interval * 2 * 3600000);
      return { id: a.id, title: a.title, question: a.question, enabled: settings.enabled[a.id] !== false, intervalHours: interval, last, neverRun: !last, stale };
    }),
  };
}

export async function history(db: Db, id: string) {
  return (await db.query("SELECT * FROM admin WHERE type = 'analysis_run' AND key = $1 ORDER BY created_at DESC LIMIT 15", [id])).map(mapRow).map(runView);
}

/** Runs one analysis with durable state. Never runs two of the same analysis at once; honours pause and the daily budget. */
export async function runAnalysis(db: Db, id: string, opts: { trigger: "manual" | "schedule" | "event"; origin: string }) {
  const analysis = analysisById(id);
  if (!analysis) throw new AdminError(404, "Unknown analysis");
  const settings = await getSetting(db, SETTINGS_KEY, DEFAULTS);
  if (settings.paused && opts.trigger !== "manual") return { skipped: "paused" as const };
  if (opts.trigger === "schedule" && settings.enabled[id] === false) return { skipped: "disabled" as const };
  const today = (await db.one<{ n: number }>("SELECT count(*)::int AS n FROM admin WHERE type = 'analysis_run' AND created_at > now() - interval '24 hours'"))?.n || 0;
  if (today >= settings.maxRunsPerDay) return { skipped: "budget" as const };

  // a run that died without finishing must not block this analysis forever
  await db.query(
    "UPDATE admin SET status = 'failed', data = data || jsonb_build_object('error', 'The run did not finish (server stopped).', 'finishedAt', now()), updated_at = now() WHERE type = 'analysis_run' AND key = $1 AND status IN ('queued','running') AND created_at < now() - ($2 || ' minutes')::interval",
    [id, String(STALE_RUN_MINUTES)]
  );
  let row;
  try {
    row = await createRow(db, "analysis_run", { key: id, status: "running", actor: { type: opts.trigger === "manual" ? "human" : "system", id: opts.trigger, name: opts.trigger }, data: { trigger: opts.trigger, revision: KNOWLEDGE_BUILD.commit } });
  } catch (error: any) {
    if (error?.code === "23505") return { skipped: "already_running" as const };
    throw error;
  }
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    try {
      const result = await analysis.run({ db, origin: opts.origin });
      row = await updateRow(db, row, { status: "succeeded", data: { attempts: attempt, state: result.state, facts: result.facts.slice(0, 200), window: result.window ?? null, finishedAt: new Date().toISOString(), error: null } });
      return { run: runView(row) };
    } catch (error: any) {
      row = await updateRow(db, row, { data: { attempts: attempt, error: String(error?.message || error).slice(0, 1500) } });
    }
  }
  row = await updateRow(db, row, { status: "failed", data: { finishedAt: new Date().toISOString() } });
  return { run: runView(row) };
}

/** Scheduled entry point: runs each enabled analysis that is due. */
export async function runDue(db: Db, origin: string) {
  const settings = await getSetting(db, SETTINGS_KEY, DEFAULTS);
  if (settings.paused) return { skipped: "paused" as const };
  const ran: Record<string, string> = {};
  for (const a of ANALYSES) {
    if (settings.enabled[a.id] === false) continue;
    const last = await db.one("SELECT created_at FROM admin WHERE type = 'analysis_run' AND key = $1 AND status IN ('succeeded','running','queued') ORDER BY created_at DESC LIMIT 1", [a.id]);
    const interval = (settings.intervalHours[a.id] ?? DEFAULT_INTERVAL_HOURS) * 3600000;
    if (last && Date.now() - new Date(last.created_at).getTime() < interval) continue;
    const r = await runAnalysis(db, a.id, { trigger: "schedule", origin });
    ran[a.id] = "skipped" in r ? r.skipped! : r.run!.status;
  }
  return { ran };
}

export async function saveSettings(db: Db, input: { paused?: boolean; maxRunsPerDay?: number; enabled?: Record<string, boolean>; intervalHours?: Record<string, number> }, actor: Actor) {
  const cur = await getSetting(db, SETTINGS_KEY, DEFAULTS);
  const next = {
    ...cur,
    ...(input.paused !== undefined && { paused: input.paused }),
    ...(input.maxRunsPerDay !== undefined && { maxRunsPerDay: Math.min(200, Math.max(1, Math.round(input.maxRunsPerDay))) }),
    enabled: { ...cur.enabled, ...(input.enabled || {}) },
    intervalHours: { ...cur.intervalHours, ...Object.fromEntries(Object.entries(input.intervalHours || {}).map(([k, v]) => [k, Math.min(24 * 30, Math.max(1, Math.round(v)))])) },
  };
  return setSetting(db, SETTINGS_KEY, next, actor);
}

// ---------- AI interpretation (optional, kept apart from the facts) ----------

export async function interpret(db: Db, runId: number) {
  const row = await db.one("SELECT * FROM admin WHERE id = $1 AND type = 'analysis_run'", [runId]);
  if (!row) throw new AdminError(404, "Run not found");
  if (!isConfigured()) throw new AdminError(503, "AI is not connected: set VIASOCKET_ORG_ID, VIASOCKET_PROJECT_ID and VIASOCKET_EMBED_SECRET. The facts above are unaffected.");
  const run = mapRow(row);
  const answer = await askJson<{ summary: string; uncertainty: string; proposedNextAction: string }>({
    threadId: `analysis-${runId}`,
    prompt: "You interpret mechanical website checks for a marketing lead. Use only the facts given. Separate what is observed from what you infer. Never invent numbers. Propose at most one next action, as a suggestion only.",
    message: JSON.stringify({ analysis: run.key, state: run.data.state, window: run.data.window, facts: run.data.facts }),
    schemaName: "interpretation",
    schema: { type: "object", additionalProperties: false, required: ["summary", "uncertainty", "proposedNextAction"], properties: { summary: { type: "string" }, uncertainty: { type: "string" }, proposedNextAction: { type: "string" } } },
  });
  await updateRow(db, run, { data: { interpretation: { ...answer, by: "AI (unverified)", at: new Date().toISOString() } } });
  return runView(mapRow(await db.one("SELECT * FROM admin WHERE id = $1", [runId])));
}
