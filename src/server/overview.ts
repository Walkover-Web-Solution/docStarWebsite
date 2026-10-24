import { KNOWLEDGE_BUILD } from "@/content/knowledge.generated";
import { isConfigured as aiConfigured, AI_MODEL, AI_SERVICE } from "./autopilot/ai";
import { LIMITS, PROTECTED_PAGES } from "./autopilot/policy";
import type { Db } from "./db";
import { overview as events } from "./events";
import * as experiments from "./experiments";
import { connection, listDocs } from "./knowledge";
import * as analyses from "./analyses";
import * as research from "./research";

// What the admin Overview shows: only things that need a decision or an action, plus the journey with its
// denominators. Anything unknown is shown as unknown.

type Item = { level: "error" | "warn" | "info"; text: string; href: string };

export async function overview(db: Db) {
  const items: Item[] = [];
  const [docs, an, rs, xs, funnel, ideas, anyEvents] = await Promise.all([
    listDocs(db),
    analyses.overview(db),
    research.overview(db),
    experiments.list(db),
    events(db, 14),
    db.one<{ n: number }>("SELECT count(*)::int AS n FROM admin WHERE type = 'idea' AND status = 'new'"),
    db.one<{ n: number }>("SELECT count(*)::int AS n FROM admin_events WHERE ts > now() - interval '14 days'"),
  ]);

  for (const d of docs) for (const e of d.openEdits) if (["conflict", "sync_failed"].includes(e.status)) items.push({ level: "error", text: `Edit of ${d.path} is ${e.status.replace("_", " ")}`, href: `/admin/knowledge?path=${encodeURIComponent(d.path)}` });
  const stale = docs.filter((d) => d.freshness !== "fresh" && !d.path.startsWith("docs/research/"));
  if (stale.length) items.push({ level: "warn", text: `${stale.length} knowledge document${stale.length > 1 ? "s are" : " is"} stale or unverified`, href: "/admin/knowledge" });

  for (const a of an.analyses) {
    if (a.neverRun) items.push({ level: "info", text: `${a.title} has never run`, href: "/admin/analyses" });
    else if (a.last?.status === "failed") items.push({ level: "error", text: `${a.title} failed on its last run`, href: "/admin/analyses" });
    else if (a.last?.state === "attention" || a.last?.state === "not_connected" || a.last?.state === "stale") items.push({ level: "warn", text: `${a.title}: ${a.last.state.replace("_", " ")}`, href: "/admin/analyses" });
    else if (a.stale) items.push({ level: "warn", text: `${a.title} has not run on schedule`, href: "/admin/analyses" });
  }
  if (an.settings.paused) items.push({ level: "info", text: "Scheduled analyses are paused", href: "/admin/settings" });

  if (!rs.competitors.length) items.push({ level: "warn", text: "The competitor watchlist is empty", href: "/admin/research" });
  const due = rs.competitors.filter((c: any) => c.status !== "dropped" && c.freshness !== "fresh").length;
  if (due) items.push({ level: "warn", text: `${due} competitor entr${due > 1 ? "ies are" : "y is"} unchecked or past cadence`, href: "/admin/research" });
  const changed = rs.competitors.filter((c: any) => c.lastCheck?.changed).length;
  if (changed) items.push({ level: "info", text: `${changed} watched competitor page${changed > 1 ? "s" : ""} changed since the last check`, href: "/admin/research" });

  const running = xs.filter((x) => x.status === "running");
  for (const x of running) if (x.reviewBy && Date.parse(x.reviewBy) < Date.now()) items.push({ level: "warn", text: `Experiment "${x.title}" is past its review date`, href: "/admin/website/experiments" });
  if (!anyEvents?.n) items.push({ level: "error", text: "No events received in the last 14 days: tracking is broken or there is no traffic", href: "/admin/analyses" });
  if (ideas?.n) items.push({ level: "info", text: `${ideas.n} new idea${ideas.n > 1 ? "s" : ""} in the inbox`, href: "/admin/ideas" });

  const visitors = funnel.funnel?.visitors ?? 0;
  const conn = connection();
  return {
    items,
    // no events at all in the window means "not measured", not zero
    journey: { days: 14, measured: !!anyEvents?.n, visitors: anyEvents?.n ? visitors : null, copied: anyEvents?.n ? funnel.funnel?.copied ?? null : null, agentArrived: anyEvents?.n ? funnel.funnel?.agent_arrived ?? null : null, signupClicked: anyEvents?.n ? funnel.funnel?.signup_clicked ?? null : null, enough: visitors >= 100, note: "Sign-up clicks are not sign-ups; completed sign-ups and activation are not connected." },
    experiments: { running: running.length, drafts: xs.filter((x) => x.status === "draft").length, max: experiments.MAX_RUNNING },
    knowledge: { documents: docs.length, stale: stale.length, build: KNOWLEDGE_BUILD, writeback: conn.writeback },
  };
}

export function settingsView() {
  const set = (name: string) => !!process.env[name];
  return {
    connections: [
      { name: "Website database", state: "connected", detail: "Reached for this request (Postgres via Hyperdrive or DATABASE_URL)." },
      { name: "Knowledge writeback (GitHub pull requests)", state: connection().writeback, detail: connection().needs || `Edits open pull requests on ${connection().repo} against ${connection().baseBranch}.` },
      { name: "AI (viaSocket)", state: aiConfigured() ? "connected" : "not_connected", detail: aiConfigured() ? `${AI_SERVICE} / ${AI_MODEL} for autopilot and analysis interpretation. Credentials are server-side only.` : "Set VIASOCKET_ORG_ID, VIASOCKET_PROJECT_ID, VIASOCKET_EMBED_SECRET. Autopilot and AI interpretation stay off." },
      { name: "Scheduler (GitHub Actions → /api/cron/*)", state: set("CRON_SECRET") ? "configured_here" : "not_connected", detail: set("CRON_SECRET") ? "CRON_SECRET is set on this server. Whether the workflow runs needs the repository secrets SITE_URL and CRON_SECRET (not verifiable from here)." : "Set CRON_SECRET here and in the repository secrets." },
      { name: "Search Console", state: "not_connected", detail: "No integration exists. Search performance (queries, indexing) is unmeasured; page-level checks come from the SEO analysis." },
      { name: "Web analytics (GTM)", state: "client_only", detail: "Google Tag Manager is loaded in the browser; its data is not readable from this admin." },
      { name: "Product activation / CRM", state: "not_connected", detail: "Sign-ups and activation happen in app.docstar.io; no contract exists to read them (see docs/CONTRACTS.md)." },
      { name: "Coding-agent challenger generation", state: "not_connected", detail: "Experiments expose a change brief; nothing generates a variant automatically." },
    ],
    experimentPolicy: { maxRunningSite: experiments.MAX_RUNNING, maxVariantsPerTest: 3, decision: experiments.DECISION, defaultReviewDays: experiments.DEFAULT_REVIEW_DAYS },
    autopilotAuthority: { limits: LIMITS, protectedPages: PROTECTED_PAGES },
  };
}
