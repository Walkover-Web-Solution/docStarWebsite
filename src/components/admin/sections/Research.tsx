"use client";

import { useCallback, useEffect, useState } from "react";
import { addCompetitor, getResearch, runResearch, saveResearchSettings, updateCompetitor } from "@/lib/admin/api";
import { toast } from "../toast";
import { PageHead, Pill } from "../Ui";
import { timeAgo } from "../website/RevisionBadge";

// The competitor watchlist and source-change checks. The checks are mechanical (fetch, hash, compare);
// what a competitor offers, and what to do about it, is written in docs/COMPETITORS.md by a person or agent.
export default function Research() {
  const [d, setD] = useState<any>(null);
  const [busy, setBusy] = useState("");
  const [form, setForm] = useState({ name: "", url: "", category: "direct", why: "" });

  const load = useCallback(() => {
    getResearch().then(setD).catch((e) => toast.error(e.message));
  }, []);
  useEffect(load, [load]);

  const act = async (label: string, fn: () => Promise<any>, done?: string) => {
    setBusy(label);
    try {
      const r = await fn();
      if (done) toast.success(typeof done === "string" ? done : "Done");
      if (r?.settings) setD(r);
      else load();
      return r;
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setBusy("");
    }
  };

  if (!d) return <p className="text-sm text-[var(--a-muted)]">Loading…</p>;
  const s = d.settings;
  const input = "rounded-lg border border-[var(--a-border)] px-3 py-1.5 text-sm";
  return (
    <div className="grid max-w-5xl gap-5">
      <PageHead
        title="Research"
        actions={
          <>
            <button type="button" className="btn" disabled={!!busy} onClick={() => act("run", async () => {
              const r = await runResearch();
              toast.success(r?.skipped ? `Skipped: ${r.skipped.replace("_", " ")}` : `Checked ${r.checked} entries; ${r.changed} changed`);
            })}>{busy === "run" ? "Checking…" : "Check sources now"}</button>
            <button type="button" className="btn" disabled={!!busy} onClick={() => act("pause", () => saveResearchSettings({ paused: !s.paused }), "Updated")}>{s.paused ? "Resume scheduled checks" : "Pause scheduled checks"}</button>
          </>
        }
      >
        Watchlist and source checks. A check fetches each listed page and records status, title and whether its text changed since last time. It does not judge what changed or what a competitor offers; findings and their dates are in <span className="font-mono">docs/COMPETITORS.md</span> and <span className="font-mono">docs/research/</span>.
      </PageHead>

      <section className="a-card grid gap-2 p-4 text-sm">
        <div className="flex flex-wrap items-center gap-3">
          <span>Scheduled checks: <Pill value={s.paused ? "not_connected" : "ok"} label={s.paused ? "paused" : "on"} /></span>
          <label className="flex items-center gap-2">Review every
            <input type="number" min={1} max={90} className={`${input} w-20`} defaultValue={s.cadenceDays} onBlur={(e) => Number(e.target.value) !== s.cadenceDays && act("cad", () => saveResearchSettings({ cadenceDays: Number(e.target.value) }), "Cadence saved")} /> days
          </label>
          <span className="text-xs text-[var(--a-muted)]">Last run: {s.lastRunAt ? `${timeAgo(s.lastRunAt)} (${s.lastRunStatus}${s.lastRunError ? `: ${s.lastRunError}` : ""})` : "never"}</span>
        </div>
        <label className="grid gap-1 text-xs text-[var(--a-muted)]">Research scope
          <input className={input} defaultValue={s.scope} onBlur={(e) => e.target.value !== s.scope && act("scope", () => saveResearchSettings({ scope: e.target.value }), "Scope saved")} />
        </label>
      </section>

      {d.competitors.length === 0 && (
        <section className="a-card grid gap-2 p-4 text-sm">
          <p>The watchlist is empty. The initial research (2026-10-24, see docs/research) suggests 10 candidates, none confirmed yet.</p>
          <div><button type="button" className="btn btn-primary" disabled={!!busy} onClick={() => act("seed", () => saveResearchSettings({ importSeed: true }), "Candidates added")}>Add the suggested candidates</button></div>
        </section>
      )}

      <ul className="grid gap-3">
        {d.competitors.map((c: any) => (
          <li key={c.id} className="a-card grid gap-2 p-4 text-sm">
            <div className="flex flex-wrap items-center gap-2">
              <strong>{c.name}</strong> <Pill value={c.status} /> <Pill value={c.category} /> <Pill value={c.freshness} />
              {c.lastCheck?.changed && <Pill value="attention" label="changed since last check" />}
              <a href={c.url} className="ml-auto text-xs underline" target="_blank" rel="noreferrer">official site</a>
            </div>
            <p className="text-[var(--a-muted)]">{c.why || "No reason recorded."}</p>
            {c.lastCheck ? (
              <ul className="grid gap-0.5 text-xs">
                {c.lastCheck.results.map((r: any) => (
                  <li key={r.url} className="font-mono">{r.status || "ERR"} · {r.url} · {r.title || r.error || "no title"} · {r.hash ? `hash ${r.hash}` : "no text hash (script-rendered?)"}{r.changed ? " · CHANGED" : ""}</li>
                ))}
                <li className="text-[var(--a-muted)]">checked {timeAgo(c.lastCheck.at)}</li>
              </ul>
            ) : <p className="text-xs text-[var(--a-muted)]">Never checked.</p>}
            <div className="flex flex-wrap gap-2">
              {c.status === "candidate" && <button type="button" className="btn btn-sm" onClick={() => act("c", () => updateCompetitor(c.id, { status: "confirmed" }), "Confirmed")}>Confirm as competitor</button>}
              {c.status !== "dropped" && <button type="button" className="btn btn-sm" onClick={() => act("d", () => updateCompetitor(c.id, { status: "dropped" }), "Dropped from the watchlist")}>Drop</button>}
              {c.status === "dropped" && <button type="button" className="btn btn-sm" onClick={() => act("r", () => updateCompetitor(c.id, { status: "candidate" }), "Restored")}>Restore</button>}
              <button type="button" className="btn btn-sm" disabled={!!busy} onClick={() => act("one", () => runResearch([c.id]), "Checked")}>Check now</button>
            </div>
            {c.approvedBy && <p className="text-xs text-[var(--a-muted)]">Confirmed by {c.approvedBy}</p>}
          </li>
        ))}
      </ul>

      <form className="a-card grid gap-2 p-4" onSubmit={(e) => { e.preventDefault(); act("add", () => addCompetitor({ ...form, why: form.why || undefined }), "Added as a candidate").then(() => setForm({ name: "", url: "", category: "direct", why: "" })); }}>
        <h2 className="text-sm font-bold">Add a candidate</h2>
        <div className="flex flex-wrap gap-2">
          <input aria-label="Name" className={input} placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          <input aria-label="Official URL" className={`${input} min-w-64 flex-1`} placeholder="https://official-site.example" type="url" value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} required />
          <select aria-label="Category" className={input} value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}><option value="direct">direct</option><option value="indirect">indirect</option><option value="substitute">substitute</option></select>
        </div>
        <input aria-label="Why it matters" className={input} placeholder="Why it matters to a DocStar buyer (optional)" value={form.why} onChange={(e) => setForm({ ...form, why: e.target.value })} />
        <div><button type="submit" className="btn" disabled={!!busy}>Add</button></div>
      </form>
    </div>
  );
}
