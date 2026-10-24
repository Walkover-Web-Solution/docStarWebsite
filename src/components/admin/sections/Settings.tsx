"use client";

import { useCallback, useEffect, useState } from "react";
import { getAnalyses, getSettings, saveAnalysisSettings } from "@/lib/admin/api";
import { toast } from "../toast";
import { PageHead, Pill } from "../Ui";

// Connections (what is and is not connected), schedules and budgets, and the protected limits.
// Secrets live in the server's environment and are never shown here.
export default function Settings() {
  const [s, setS] = useState<any>(null);
  const [a, setA] = useState<any>(null);
  const load = useCallback(() => {
    getSettings().then(setS).catch((e) => toast.error(e.message));
    getAnalyses().then(setA).catch((e) => toast.error(e.message));
  }, []);
  useEffect(load, [load]);
  if (!s || !a) return <p className="text-sm text-[var(--a-muted)]">Loading…</p>;
  const save = (body: unknown) => saveAnalysisSettings(body).then(() => (toast.success("Saved"), load())).catch((e) => toast.error(e.message));
  const input = "w-24 rounded-lg border border-[var(--a-border)] px-2 py-1 text-sm";
  return (
    <div className="grid max-w-5xl gap-5">
      <PageHead title="Settings">Connections, schedules and limits. Free-text guidance never changes these limits; the server enforces them.</PageHead>

      <section className="a-card grid gap-2 p-4 text-sm">
        <h2 className="text-sm font-bold uppercase tracking-wide text-[var(--a-muted)]">Connections</h2>
        <ul className="grid gap-2">
          {s.connections.map((c: any) => (
            <li key={c.name} className="grid gap-0.5"><span className="flex flex-wrap items-center gap-2"><strong>{c.name}</strong> <Pill value={c.state} /></span><span className="text-xs text-[var(--a-muted)]">{c.detail}</span></li>
          ))}
        </ul>
      </section>

      <section className="a-card grid gap-3 p-4 text-sm">
        <h2 className="text-sm font-bold uppercase tracking-wide text-[var(--a-muted)]">Analysis schedule and budget</h2>
        <label className="flex items-center gap-2"><input type="checkbox" checked={!a.settings.paused} onChange={(e) => save({ paused: !e.target.checked })} /> Scheduled runs on</label>
        <label className="flex items-center gap-2">Daily run budget <input type="number" min={1} max={200} className={input} defaultValue={a.settings.maxRunsPerDay} onBlur={(e) => save({ maxRunsPerDay: Number(e.target.value) })} /> <span className="text-xs text-[var(--a-muted)]">{a.runsToday} used in the last 24h. No model cost: checks are mechanical; AI interpretation is manual.</span></label>
        <ul className="grid gap-1">
          {a.analyses.map((x: any) => (
            <li key={x.id} className="flex flex-wrap items-center gap-3">
              <label className="flex w-64 items-center gap-2"><input type="checkbox" checked={x.enabled} onChange={(e) => save({ enabled: { [x.id]: e.target.checked } })} /> {x.title}</label>
              every <input type="number" min={1} className={input} defaultValue={x.intervalHours} onBlur={(e) => Number(e.target.value) !== x.intervalHours && save({ intervalHours: { [x.id]: Number(e.target.value) } })} /> hours
            </li>
          ))}
        </ul>
      </section>

      <section className="a-card grid gap-1 p-4 text-sm">
        <h2 className="text-sm font-bold uppercase tracking-wide text-[var(--a-muted)]">Experiment policy (enforced by the server)</h2>
        <p>Up to {s.experimentPolicy.maxRunningSite} tests running site-wide; one baseline and at most 2 challengers per test; one test per page.</p>
        <p>A winner needs {s.experimentPolicy.decision.minDays}+ days, {s.experimentPolicy.decision.minVisitorsPerVariant}+ exposed visitors per variant and a {Math.round(s.experimentPolicy.decision.winProbability * 100)}% chance of beating the baseline, without hurting a guardrail. Default review date: {s.experimentPolicy.defaultReviewDays} days after creation.</p>
      </section>
      <section className="a-card grid gap-1 p-4 text-sm">
        <h2 className="text-sm font-bold uppercase tracking-wide text-[var(--a-muted)]">Autopilot authority (read-only here; see Website → Autopilot)</h2>
        <p>Protected pages (never edited by the AI): {s.autopilotAuthority.protectedPages.join(", ")}.</p>
        <p className="font-mono text-xs">{JSON.stringify(s.autopilotAuthority.limits)}</p>
      </section>
    </div>
  );
}
