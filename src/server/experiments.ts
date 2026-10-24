import { z } from "zod";
import { AdminError, createRow, getRow, mapRow, updateRow, type Actor, type AdminRow } from "./adminTypes";
import { withTx, type Db } from "./db";
import { publishRevision } from "./content";

// A/B tests on docstar.io pages, stored as `experiment` rows of the `admin` table (parent = the page).
// Each variant is a page version. The website's middleware assigns visitors to a variant and tags their
// events with it (admin_events.variants); results are computed here from those events. Agents and
// crawlers always get the live page and are never counted.
//
// Goal: visitors who copied the prompt. Guardrails: their agent arrived, they clicked sign up.

export const GOAL = "prompt.copied";
export const GUARDRAILS = ["agent.arrived", "signup.clicked"];

// A winner needs all of these (shown in the admin; the autopilot decides with them).
export const DECISION = { minDays: 14, minVisitorsPerVariant: 300, winProbability: 0.95, guardrailHarm: 0.9 };

// At most this many tests run at once across the site (each page can run one). Starting takes a global lock,
// so concurrent jobs (the autopilot, two operators) cannot exceed it.
export const MAX_RUNNING = 2;
export const DEFAULT_REVIEW_DAYS = 42;
export const DEFAULT_ROLLBACK = "Stop the test: every visitor gets the live page (A) again. If a winner was promoted, roll the page back to the previous version in Website > Pages.";
// What every test measures and how, shown to operators; the code that implements it is in RESULTS_SQL and the middleware.
export const DESIGN = {
  assignmentUnit: "Anonymous visitor (ds_aid cookie), hashed with the test key; sticky for the test",
  exposure: "A human page.viewed on the tested path while assigned to a variant (assignment alone is not exposure)",
  excluded: "Agents, crawlers and HTTP clients; events with props.synthetic = true",
};

export const createSchema = z.object({
  slug: z.string().max(64),
  title: z.string().trim().min(3).max(200),
  hypothesis: z.string().trim().max(2000).optional(),
  // B (and C): versions of the page to test against the live one. A is always the live version.
  variants: z.array(z.object({ revisionId: z.number().int().positive(), weight: z.number().int().min(1).max(98).optional() })).min(1).max(2),
  controlWeight: z.number().int().min(1).max(99).optional(),
  // launch requirements: hypothesis, review date and rollback plan are checked again at start
  audience: z.string().trim().max(300).optional(),
  reviewBy: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  rollbackPlan: z.string().trim().max(1000).optional(),
  synthetic: z.boolean().optional(),
});
export type CreateExperiment = z.infer<typeof createSchema>;

const keyOf = (slug: string) => `${slug}-${new Date().toISOString().slice(0, 10)}-${Math.random().toString(36).slice(2, 6)}`;

async function findPage(db: Db, slug: string) {
  const row = await db.one("SELECT * FROM admin WHERE type = 'page' AND key = $1", [slug]);
  if (!row) throw new AdminError(404, `Page "${slug}" not found`);
  return mapRow(row);
}

async function findExperiment(db: Db, id: number, lock = false) {
  const row = await db.one(`SELECT * FROM admin WHERE id = $1 AND type = 'experiment' ${lock ? "FOR UPDATE" : ""}`, [id]);
  if (!row) throw new AdminError(404, "Experiment not found");
  return mapRow(row);
}

/** What is still missing before this draft may start. */
export function launchGaps(row: AdminRow) {
  const gaps: string[] = [];
  if (String(row.data.hypothesis || "").trim().length < 10) gaps.push("A hypothesis (what changes, for whom, and why it should help)");
  if (!row.data.rollbackPlan) gaps.push("A rollback plan");
  if (!row.data.reviewBy) gaps.push("A review date");
  else if (Date.parse(row.data.reviewBy) <= Date.now()) gaps.push("A review date in the future");
  return gaps;
}

function view(row: AdminRow, page?: AdminRow | null) {
  return {
    id: row.id,
    key: row.key as string,
    title: row.title as string,
    status: row.status as string,
    slug: page?.key as string | undefined,
    path: page?.data.path as string | undefined,
    hypothesis: row.data.hypothesis as string | null,
    variants: row.data.variants as { key: string; revisionId: number; weight: number }[],
    goal: row.data.goal as string,
    guardrails: row.data.guardrails as string[],
    startedAt: row.data.startedAt as string | null,
    endedAt: row.data.endedAt as string | null,
    winner: row.data.winner as string | null,
    reviewBy: (row.data.reviewBy ?? null) as string | null,
    rollbackPlan: (row.data.rollbackPlan ?? null) as string | null,
    audience: (row.data.audience ?? null) as string | null,
    synthetic: !!row.data.synthetic,
    phase: (row.data.phase ?? 1) as number,
    missingForLaunch: row.status === "draft" ? launchGaps(row) : [],
    design: DESIGN,
    // admin-only preview of each version on the real page (signed-in operators can open drafts)
    previews: page ? (row.data.variants as { key: string; revisionId: number }[]).map((v) => ({ key: v.key, path: `/xv/${v.revisionId}${page.data.path === "/" ? "" : page.data.path}` })) : [],
    actorType: row.actorType,
    actorName: row.actorName,
    createdAt: row.createdAt,
  };
}

// ---------- admin ----------

export async function create(db: Db, input: CreateExperiment, actor: Actor) {
  const page = await findPage(db, input.slug);
  const live = page.data.publishedRevisionId as number | null;
  if (!live) throw new AdminError(409, "Publish the page before testing it: variant A is the live version");

  const ids = input.variants.map((v) => v.revisionId);
  if (ids.includes(live)) throw new AdminError(400, "Variant B must be a different version from the live one");
  if (new Set(ids).size !== ids.length) throw new AdminError(400, "Each variant must be a different version");
  const revisions = (await db.query("SELECT * FROM admin WHERE type = 'page_revision' AND parent_id = $1 AND id = ANY($2::int[])", [page.id, ids])).map(mapRow);
  if (revisions.length !== ids.length) throw new AdminError(400, "Every variant must be a version of this page");
  if (revisions.some((r) => r.status === "rejected")) throw new AdminError(400, "A rejected version can't be tested");

  // Even split unless weights are given; they must add up to 100.
  const even = Math.floor(100 / (ids.length + 1));
  const others = input.variants.map((v) => v.weight ?? even);
  const control = input.controlWeight ?? 100 - others.reduce((n, w) => n + w, 0);
  if (control + others.reduce((n, w) => n + w, 0) !== 100 || control < 1) throw new AdminError(400, "The split must add up to 100%");
  const variants = [{ key: "A", revisionId: live, weight: control }, ...input.variants.map((v, i) => ({ key: ["B", "C"][i], revisionId: v.revisionId, weight: others[i] }))];

  const row = await createRow(db, "experiment", {
    parentId: page.id,
    key: keyOf(page.key as string),
    title: input.title,
    actor,
    data: {
      variants,
      goal: GOAL,
      guardrails: GUARDRAILS,
      hypothesis: input.hypothesis || null,
      audience: input.audience || "All human visitors to the page",
      reviewBy: input.reviewBy || new Date(Date.now() + DEFAULT_REVIEW_DAYS * 86400000).toISOString().slice(0, 10),
      rollbackPlan: input.rollbackPlan || DEFAULT_ROLLBACK,
      synthetic: !!input.synthetic,
    },
  });
  return view(row, page);
}

export async function list(db: Db) {
  const rows = (await db.query("SELECT * FROM admin WHERE type = 'experiment' ORDER BY created_at DESC LIMIT 100")).map(mapRow);
  if (!rows.length) return [];
  const pages = (await db.query("SELECT * FROM admin WHERE type = 'page' AND id = ANY($1::int[])", [[...new Set(rows.map((r) => r.parentId))]])).map(mapRow);
  return rows.map((r) => view(r, pages.find((p) => p.id === r.parentId)));
}

export async function get(db: Db, id: number) {
  const row = await findExperiment(db, id);
  const page = await getRow(db, row.parentId as number);
  return { ...view(row, page), results: row.status === "draft" ? null : await results(db, row, page) };
}

/** Edits the launch fields of a draft. A running test's treatment is never edited; a changed treatment is a new test. */
export async function updateDraft(db: Db, id: number, input: { hypothesis?: string; audience?: string; reviewBy?: string; rollbackPlan?: string }) {
  const row = await findExperiment(db, id);
  if (row.status !== "draft") throw new AdminError(409, "Only a draft can be edited. Material changes to a started test need a new test (a new phase).");
  const data: Record<string, any> = {};
  for (const k of ["hypothesis", "audience", "reviewBy", "rollbackPlan"] as const) if (input[k] !== undefined) data[k] = input[k] || null;
  await updateRow(db, row, { data });
  return get(db, id);
}

export async function start(db: Db, id: number) {
  await withTx(db, async () => {
    const row = await findExperiment(db, id, true);
    if (row.status !== "draft") throw new AdminError(409, `This test is already ${row.status}`);
    const gaps = launchGaps(row);
    if (gaps.length) throw new AdminError(400, `Before launch: ${gaps.join("; ")}.`);
    await db.query("SELECT pg_advisory_xact_lock(4255003)"); // one slot decision at a time, site-wide
    const active = await db.one<{ n: number }>("SELECT count(*)::int AS n FROM admin WHERE type = 'experiment' AND status = 'running'");
    if ((active?.n || 0) >= MAX_RUNNING) throw new AdminError(409, `${MAX_RUNNING} tests are already running, the site-wide limit. Stop or conclude one first.`);
    await db.query("SELECT 1 FROM admin WHERE id = $1 FOR UPDATE", [row.parentId]); // one start per page at a time
    const running = await db.one("SELECT 1 AS ok FROM admin WHERE type = 'experiment' AND parent_id = $1 AND status = 'running'", [row.parentId]);
    if (running) throw new AdminError(409, "This page already has a test running. Stop it first.");
    await updateRow(db, row, { status: "running", data: { startedAt: new Date() } });
  });
  return get(db, id);
}

// Versions that lost or were dropped with the test are marked rejected, so they don't sit around as drafts.
async function dropUnused(db: Db, row: AdminRow, keep?: string) {
  for (const v of row.data.variants as { key: string; revisionId: number }[]) {
    if (v.key === "A" || v.key === keep) continue;
    const rev = await getRow(db, v.revisionId, "page_revision");
    if (rev?.status === "draft") await updateRow(db, rev, { status: "rejected" });
  }
}

/** A change brief for whoever (or whatever) builds the challenger. Generation itself is not connected. */
export async function brief(db: Db, id: number) {
  const row = await findExperiment(db, id);
  const page = await getRow(db, row.parentId as number);
  return [
    `# Challenger brief: ${row.title}`,
    `Page: ${page?.data.path} (slug ${page?.key})`,
    `Hypothesis: ${row.data.hypothesis || "(missing: write it before launch)"}`,
    `Audience: ${row.data.audience || "All human visitors to the page"}`,
    `Primary outcome: visitors who copied the prompt (${GOAL}). Guardrails: ${GUARDRAILS.join(", ")}.`,
    `Constraints: change copy, layout (a section's built-in layout) or CTA wording only; keep data-section / data-cta attributes, links and facts; follow docs/POSITIONING.md approved claims and docs/BRAND.md voice. No new claims, prices or testimonials.`,
    `Deliver: a draft page version (Website > Pages > save as draft), then add it as variant B or C here. Do not publish it.`,
  ].join("\n");
}

export async function stop(db: Db, id: number) {
  const row = await findExperiment(db, id);
  if (row.status !== "running") throw new AdminError(409, "Only a running test can be stopped");
  await updateRow(db, row, { status: "stopped", data: { endedAt: new Date() } });
  await dropUnused(db, row);
  return get(db, id);
}

// Ends the test and makes the winner the live page for everyone.
export async function conclude(db: Db, id: number, winner: string, actor: Actor) {
  const row = await findExperiment(db, id);
  if (!["running", "stopped"].includes(row.status as string)) throw new AdminError(409, "Only a running or stopped test can be concluded");
  const variant = (row.data.variants as { key: string; revisionId: number }[]).find((v) => v.key === winner);
  if (!variant) throw new AdminError(400, `No variant ${winner} in this test`);
  // Publish first: if it fails, the test is unchanged and can be concluded again.
  // Winner A publishes nothing, so a version someone published during the test stays live.
  if (winner !== "A") {
    const page = (await getRow(db, row.parentId as number)) as AdminRow;
    if (page.data.publishedRevisionId !== variant.revisionId) await publishRevision(db, variant.revisionId, actor);
  }
  await updateRow(db, row, { status: "concluded", data: { winner, endedAt: row.data.endedAt || new Date() } });
  await dropUnused(db, row, winner);
  return get(db, id);
}

// ---------- the website's middleware ----------

/** Running tests: which pages, which versions, what split. */
export async function listRunning(db: Db) {
  const rows = (await db.query("SELECT * FROM admin WHERE type = 'experiment' AND status = 'running'")).map(mapRow);
  if (!rows.length) return [];
  const pages = (await db.query("SELECT * FROM admin WHERE type = 'page' AND id = ANY($1::int[])", [rows.map((r) => r.parentId)])).map(mapRow);
  return rows.map((r) => {
    const page = pages.find((p) => p.id === r.parentId);
    return {
      key: r.key as string,
      slug: page?.key as string,
      path: page?.data.path as string,
      variants: (r.data.variants as { key: string; revisionId: number; weight: number }[]).map((v) => ({ key: v.key, revisionId: v.revisionId, weight: v.weight })),
    };
  });
}

// ---------- results ----------

// Normal approximation of two Beta posteriors (uniform prior): P(rate of y > rate of x).
function erf(x: number) {
  const t = 1 / (1 + 0.3275911 * Math.abs(x));
  const y = 1 - ((((1.061405429 * t - 1.453152027) * t + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-x * x);
  return x >= 0 ? y : -y;
}
const phi = (z: number) => 0.5 * (1 + erf(z / Math.SQRT2));
function probBeats(y: { n: number; c: number }, x: { n: number; c: number }) {
  const post = (v: { n: number; c: number }) => {
    const m = (v.c + 1) / (v.n + 2);
    return { m, s2: (m * (1 - m)) / (v.n + 3) };
  };
  const a = post(x);
  const b = post(y);
  return phi((b.m - a.m) / Math.sqrt(a.s2 + b.s2));
}

// $1 = test key, $2 = page path, $3 = start, $4 = end
const RESULTS_SQL = `
  WITH exposed AS (
    SELECT anon_id, MIN(ts) AS first_ts, MIN(variants->>$1) AS variant
      FROM admin_events
     WHERE event = 'page.viewed' AND actor_type = 'human' AND path = $2 AND COALESCE(props->>'synthetic', '') <> 'true'
       AND variants->>$1 IS NOT NULL AND anon_id IS NOT NULL AND ts BETWEEN $3 AND $4
     GROUP BY anon_id
  ), later AS (
    SELECT e.event, e.anon_id, e.ref FROM admin_events e JOIN exposed x ON x.anon_id = e.anon_id
     WHERE e.event IN ('prompt.copied', 'signup.clicked') AND COALESCE(e.props->>'synthetic', '') <> 'true' AND e.ts >= x.first_ts AND e.ts <= $4
  ), arrived AS (
    SELECT DISTINCT l.anon_id FROM later l
     WHERE l.event = 'prompt.copied' AND l.ref IN (SELECT ref FROM admin_events WHERE event = 'agent.quickstart_fetched' AND ref IS NOT NULL AND ts >= $3)
  )
  SELECT x.variant,
         COUNT(*)::int AS visitors,
         COUNT(*) FILTER (WHERE x.anon_id IN (SELECT anon_id FROM later WHERE event = 'prompt.copied'))::int AS copied,
         COUNT(*) FILTER (WHERE x.anon_id IN (SELECT anon_id FROM arrived))::int AS arrived,
         COUNT(*) FILTER (WHERE x.anon_id IN (SELECT anon_id FROM later WHERE event = 'signup.clicked'))::int AS signups
    FROM exposed x GROUP BY x.variant`;

async function results(db: Db, row: AdminRow, page: AdminRow | null) {
  const start = row.data.startedAt ? new Date(row.data.startedAt) : new Date(row.createdAt);
  const end = row.data.endedAt ? new Date(row.data.endedAt) : new Date();
  const rows = await db.query(RESULTS_SQL, [row.key, page?.data.path || "/", start, end]);
  const byKey = new Map(rows.map((r) => [r.variant, r]));
  const variants = (row.data.variants as { key: string; revisionId: number; weight: number }[]).map((v) => {
    const r = byKey.get(v.key) || { visitors: 0, copied: 0, arrived: 0, signups: 0 };
    return { key: v.key, revisionId: v.revisionId, weight: v.weight, visitors: r.visitors as number, copied: r.copied as number, arrived: r.arrived as number, signups: r.signups as number };
  });
  const control = variants[0];
  const total = variants.reduce((n, v) => n + v.visitors, 0);
  const days = Math.floor((end.getTime() - start.getTime()) / 86400000);

  // Sample ratio check: visitors should split like the weights; a big gap usually means a bug.
  const splitOff =
    total >= 100 &&
    variants.some((v) => {
      const w = v.weight / 100;
      return Math.abs(v.visitors - total * w) / Math.sqrt(total * w * (1 - w)) > 3.3;
    });

  const compared = variants.slice(1).map((v) => {
    const beats = probBeats({ n: v.visitors, c: v.copied }, { n: control.visitors, c: control.copied });
    const harmArrived = 1 - probBeats({ n: v.visitors, c: v.arrived }, { n: control.visitors, c: control.arrived });
    const harmSignups = 1 - probBeats({ n: v.visitors, c: v.signups }, { n: control.visitors, c: control.signups });
    const rate = (x: { visitors: number; copied: number }) => (x.visitors ? x.copied / x.visitors : 0);
    const lift = rate(control) ? (rate(v) - rate(control)) / rate(control) : null;
    const enough = days >= DECISION.minDays && v.visitors >= DECISION.minVisitorsPerVariant && control.visitors >= DECISION.minVisitorsPerVariant;
    const guardrailsOk = harmArrived < DECISION.guardrailHarm && harmSignups < DECISION.guardrailHarm;
    const verdict = !enough ? "collecting" : beats >= DECISION.winProbability && guardrailsOk ? "wins" : beats <= 1 - DECISION.winProbability ? "loses" : "no_difference";
    return { key: v.key, probBeatsA: beats, lift, guardrailsOk, verdict };
  });

  return { days, total, splitOff, variants, compared, decision: DECISION };
}
