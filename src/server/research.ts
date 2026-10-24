import { z } from "zod";
import seed from "@/content/competitors.seed.json";
import { AdminError, createRow, getRow, mapRow, updateRow, type Actor } from "./adminTypes";
import type { Db } from "./db";
import { sha256 } from "./http";
import { getSetting, setSetting } from "./settings";

// Competitor watchlist and source-change research. The watchlist is operational state an operator edits;
// the findings and their interpretation live in docs/COMPETITORS.md and docs/research/*. A research run
// only does mechanical work: it fetches each listed source and records status, title, a content hash and
// whether the hash changed since the last check. It never states what a competitor does or doesn't offer;
// reading a changed page and updating the knowledge is a human or agent task that cites these records.

export const SETTINGS_KEY = "research";
export const DEFAULTS = { paused: false, cadenceDays: 7, scope: "Official home and pricing pages of watchlist entries", lastRunAt: null as string | null, lastRunStatus: null as string | null, lastRunError: null as string | null };
const LOCK_NAME = "research-lock";
const LOCK_MINUTES = 10; // a run that died holds the claim for at most this long

const source = z.object({ label: z.string().trim().min(1).max(60), url: z.string().url().max(400) });
export const competitorSchema = z.object({
  name: z.string().trim().min(2).max(100),
  url: z.string().url().max(300),
  category: z.enum(["direct", "indirect", "substitute"]),
  why: z.string().trim().max(600).optional(),
  status: z.enum(["candidate", "confirmed", "dropped"]).optional(),
  sources: z.array(source).max(6).optional(),
});

// Only public https hosts: the URLs are typed by operators, but a fetch from our server must not reach internal ones.
export function safeUrl(raw: string) {
  const u = new URL(raw);
  if (u.protocol !== "https:") throw new AdminError(400, "Sources must be https URLs");
  if (u.username || u.password || /^(localhost|.*\.local|.*\.internal)$/i.test(u.hostname) || /^[\d.]+$/.test(u.hostname) || u.hostname.includes(":")) throw new AdminError(400, "Sources must be public host names");
  return u;
}

const view = (r: ReturnType<typeof mapRow>) => ({ id: r.id, name: r.key as string, status: r.status as string, ...(r.data as any), updatedAt: r.updatedAt });

export async function overview(db: Db) {
  const rows = (await db.query("SELECT * FROM admin WHERE type = 'competitor' ORDER BY status, key")).map(mapRow);
  const settings = await getSetting(db, SETTINGS_KEY, DEFAULTS);
  const due = (c: ReturnType<typeof view>) => !c.lastCheck || Date.now() - Date.parse(c.lastCheck.at) > settings.cadenceDays * 86400000;
  return { settings, competitors: rows.map(view).map((c) => ({ ...c, freshness: !c.lastCheck ? "never_checked" : due(c) ? "stale" : "fresh" })) };
}

export async function addCompetitor(db: Db, input: z.infer<typeof competitorSchema>, actor: Actor) {
  safeUrl(input.url);
  input.sources?.forEach((s) => safeUrl(s.url));
  const row = await createRow(db, "competitor", {
    key: input.name,
    status: input.status || "candidate",
    actor,
    data: { url: input.url, category: input.category, why: input.why || null, sources: input.sources || [], approvedBy: input.status === "confirmed" ? actor.name.slice(0, 64) : null },
  }).catch((e) => {
    if (e?.code === "23505") throw new AdminError(409, "A watchlist entry with this name already exists");
    throw e;
  });
  return view(row);
}

export async function updateCompetitor(db: Db, id: number, input: Partial<z.infer<typeof competitorSchema>>, actor: Actor) {
  const row = await getRow(db, id, "competitor");
  if (!row) throw new AdminError(404, "Not found");
  if (input.url) safeUrl(input.url);
  input.sources?.forEach((s) => safeUrl(s.url));
  const data: Record<string, any> = {};
  for (const k of ["url", "category", "why", "sources"] as const) if (input[k] !== undefined) data[k] = input[k];
  // Only a person promotes a candidate to confirmed; the approver is recorded.
  if (input.status === "confirmed" && row.status !== "confirmed") data.approvedBy = actor.name.slice(0, 64);
  const updated = await updateRow(db, row, { status: input.status, key: input.name, data });
  return view(updated);
}

/** Adds the researched candidates that are not on the watchlist yet (matched by name). */
export async function importSeed(db: Db, actor: Actor) {
  const have = new Set((await db.query("SELECT key FROM admin WHERE type = 'competitor'")).map((r) => r.key));
  let added = 0;
  for (const c of seed) {
    if (have.has(c.name)) continue;
    await addCompetitor(db, { ...c, category: c.category as "direct" | "indirect" | "substitute", status: "candidate" }, actor);
    added++;
  }
  return { added };
}

export async function saveSettings(db: Db, input: { paused?: boolean; cadenceDays?: number; scope?: string }, actor: Actor) {
  const current = await getSetting(db, SETTINGS_KEY, DEFAULTS);
  const next = {
    ...current,
    ...(input.paused !== undefined && { paused: input.paused }),
    ...(input.cadenceDays !== undefined && { cadenceDays: Math.min(90, Math.max(1, Math.round(input.cadenceDays))) }),
    ...(input.scope !== undefined && { scope: input.scope.slice(0, 300) }),
  };
  await setSetting(db, SETTINGS_KEY, next, actor);
  return next;
}

// ---------- the run ----------

const strip = (html: string) =>
  html
    .replace(/<(script|style|noscript|svg)[\s\S]*?<\/\1>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z#0-9]+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();

async function check(url: string) {
  const started = Date.now();
  try {
    safeUrl(url);
    const res = await fetch(url, { redirect: "follow", headers: { "user-agent": "DocStarResearchBot/1.0 (+https://docstar.io)", accept: "text/html" }, signal: AbortSignal.timeout(12_000) });
    const html = (await res.text()).slice(0, 600_000);
    const text = strip(html);
    return {
      url,
      status: res.status,
      title: html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.replace(/\s+/g, " ").trim().slice(0, 160) || null,
      hash: text.length > 200 ? (await sha256(text)).slice(0, 16) : null, // too little text: probably script-rendered, so no change signal
      chars: text.length,
      ms: Date.now() - started,
    };
  } catch (error: any) {
    return { url, status: 0, error: String(error?.message || error).slice(0, 120), title: null, hash: null, chars: 0, ms: Date.now() - started };
  }
}

/** Checks entries that are due (or all with `force`). One run at a time across servers. */
export async function run(db: Db, opts: { force?: boolean; ids?: number[]; trigger: "manual" | "schedule" }) {
  const settings = await getSetting(db, SETTINGS_KEY, DEFAULTS);
  if (settings.paused && opts.trigger === "schedule") return { skipped: "paused" as const };
  // Atomic claim on a settings row (not a session advisory lock: pooled connections, e.g. Hyperdrive, may not keep one).
  const claimed = await db.one(
    `INSERT INTO admin (type, key, actor_type, data) VALUES ('setting', $1, 'system', jsonb_build_object('value', jsonb_build_object('at', now())))
     ON CONFLICT (type, key) WHERE type IN ('user', 'page', 'experiment', 'setting')
     DO UPDATE SET data = EXCLUDED.data, updated_at = now()
       WHERE admin.data->'value'->>'at' IS NULL OR (admin.data->'value'->>'at')::timestamptz < now() - ($2 || ' minutes')::interval
     RETURNING id`,
    [LOCK_NAME, String(LOCK_MINUTES)]
  );
  if (!claimed) return { skipped: "already_running" as const };
  let checked = 0;
  let changed = 0;
  try {
    const rows = (await db.query("SELECT * FROM admin WHERE type = 'competitor' AND status <> 'dropped' ORDER BY key")).map(mapRow);
    for (const row of rows) {
      if (opts.ids && !opts.ids.includes(row.id)) continue;
      const last = row.data.lastCheck as { at: string; results: any[] } | null;
      if (!opts.force && last && Date.now() - Date.parse(last.at) < settings.cadenceDays * 86400000) continue;
      const urls = [row.data.url as string, ...(row.data.sources as { url: string }[]).map((s) => s.url)].filter((u, i, a) => a.indexOf(u) === i);
      const results = [];
      for (const url of urls) {
        const r: any = await check(url);
        const before = last?.results.find((x) => x.url === url);
        r.changed = !!(before?.hash && r.hash && before.hash !== r.hash);
        results.push(r);
      }
      const didChange = results.some((r: any) => r.changed);
      await updateRow(db, row, { data: { lastCheck: { at: new Date().toISOString(), results, changed: didChange } } });
      checked++;
      if (didChange) changed++;
    }
    await setSetting(db, SETTINGS_KEY, { ...settings, lastRunAt: new Date().toISOString(), lastRunStatus: "ok", lastRunError: null }, { type: "system", id: "research", name: "Research run" });
    return { checked, changed };
  } catch (error: any) {
    await setSetting(db, SETTINGS_KEY, { ...settings, lastRunAt: new Date().toISOString(), lastRunStatus: "failed", lastRunError: String(error?.message || error).slice(0, 300) }, { type: "system", id: "research", name: "Research run" });
    throw error;
  } finally {
    await db.query("UPDATE admin SET data = jsonb_build_object('value', jsonb_build_object('at', null)) WHERE type = 'setting' AND key = $1", [LOCK_NAME]);
  }
}
