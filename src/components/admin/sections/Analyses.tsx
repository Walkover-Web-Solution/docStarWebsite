"use client";

import { useCallback, useEffect, useState } from "react";
import { getAnalyses, getAnalysisRuns, interpretRun, runAnalysisNow, saveAnalysisSettings } from "@/lib/admin/api";
import { toast } from "../toast";
import { LevelDot, PageHead, Pill } from "../Ui";
import { timeAgo } from "../website/RevisionBadge";

// Each analysis answers one question with mechanical checks. Observed facts and the AI's reading of them
// are shown apart, and a missing source is shown as missing, never as zero.
function Card({ a, aiConfigured, onChanged }: { a: any; aiConfigured: boolean; onChanged: () => void }) {
  const [busy, setBusy] = useState("");
  const [runs, setRuns] = useState<any[] | null>(null);
  const last = a.last;
  const act = async (label: string, fn: () => Promise<any>, done: (r: any) => string) => {
    setBusy(label);
    try {
      toast.success(done(await fn()));
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setBusy("");
      onChanged();
    }
  };
  return (
    <li className="a-card grid gap-2 p-4 text-sm">
      <div className="flex flex-wrap items-center gap-2">
        <strong>{a.title}</strong>
        {last ? <Pill value={last.status === "succeeded" ? last.state || "ok" : last.status} /> : <Pill value="not_connected" label="never run" />}
        {a.stale && <Pill value="stale" />}
        {!a.enabled && <Pill value="not_connected" label="disabled" />}
        <span className="ml-auto text-xs text-[var(--a-muted)]">every {a.intervalHours}h</span>
      </div>
      <p className="text-[var(--a-muted)]">{a.question}</p>
      {last && (
        <>
          <p className="text-xs text-[var(--a-muted)]">
            {last.trigger} run {timeAgo(last.startedAt)} · {last.attempts} attempt{last.attempts === 1 ? "" : "s"} · revision <span className="font-mono">{last.revision?.slice(0, 7) || "?"}</span>
            {last.window ? ` · data ${last.window.from.slice(0, 10)} to ${last.window.to.slice(0, 10)} (UTC)` : ""}
          </p>
          {last.error && <p className="text-xs text-red-800">Error: {last.error}</p>}
          <h3 className="text-xs font-bold uppercase tracking-wide text-[var(--a-muted)]">Observed</h3>
          <ul className="grid gap-1">
            {last.facts.map((f: any, i: number) => (
              <li key={i} className="flex gap-2"><LevelDot level={f.level} /><span>{f.text}{f.ref && <span className="ml-1 font-mono text-xs text-[var(--a-muted)]">{f.ref}</span>}</span></li>
            ))}
          </ul>
          {last.interpretation && (
            <div className="rounded-md bg-[var(--a-hover)] p-2">
              <h3 className="text-xs font-bold uppercase tracking-wide text-[var(--a-muted)]">AI interpretation (unverified, not a fact)</h3>
              <p>{last.interpretation.summary}</p>
              <p className="text-xs text-[var(--a-muted)]">Uncertainty: {last.interpretation.uncertainty}</p>
              <p className="text-xs">Proposed next action (a suggestion, not approved): {last.interpretation.proposedNextAction}</p>
            </div>
          )}
        </>
      )}
      <div className="flex flex-wrap gap-2">
        <button type="button" className="btn btn-sm" disabled={!!busy} onClick={() => act("run", () => runAnalysisNow(a.id), (r) => (r.skipped ? `Skipped: ${r.skipped.replace("_", " ")}` : `Run ${r.run.status}`))}>{busy === "run" ? "Running…" : "Run now"}</button>
        {last && last.status === "succeeded" && (
          <button type="button" className="btn btn-sm" disabled={!!busy || !aiConfigured} title={aiConfigured ? "" : "AI is not connected"} onClick={() => act("ai", () => interpretRun(last.id), () => "Interpretation added")}>{aiConfigured ? "Interpret with AI" : "Interpret with AI (not connected)"}</button>
        )}
        <button type="button" className="btn btn-sm" onClick={() => (runs ? setRuns(null) : getAnalysisRuns(a.id).then((r) => setRuns(r.runs)))}>{runs ? "Hide history" : "History"}</button>
        <button type="button" className="btn btn-sm" onClick={() => act("toggle", () => saveAnalysisSettings({ enabled: { [a.id]: !a.enabled } }), () => "Saved")}>{a.enabled ? "Disable schedule" : "Enable schedule"}</button>
      </div>
      {runs && (
        <ul className="grid gap-0.5 text-xs">
          {runs.map((r) => <li key={r.id} className="font-mono">{new Date(r.startedAt).toLocaleString()} · {r.trigger} · {r.status}{r.state ? ` / ${r.state}` : ""} · {r.facts.filter((f: any) => f.level !== "info").length} findings</li>)}
        </ul>
      )}
    </li>
  );
}

export default function Analyses() {
  const [d, setD] = useState<any>(null);
  const load = useCallback(() => {
    getAnalyses().then(setD).catch((e) => toast.error(e.message));
  }, []);
  useEffect(load, [load]);
  if (!d) return <p className="text-sm text-[var(--a-muted)]">Loading…</p>;
  return (
    <div className="grid max-w-5xl gap-4">
      <PageHead
        title="Analyses"
        actions={<button type="button" className="btn" onClick={() => saveAnalysisSettings({ paused: !d.settings.paused }).then(load).catch((e) => toast.error(e.message))}>{d.settings.paused ? "Resume schedule" : "Pause schedule"}</button>}
      >
        Mechanical checks of the delivered site, the measurement and the knowledge. Scheduled by the daily job ({d.settings.paused ? "currently paused" : "on"}); {d.runsToday} of {d.settings.maxRunsPerDay} daily runs used. Manual runs always work.
      </PageHead>
      <ul className="grid gap-3">{d.analyses.map((a: any) => <Card key={a.id} a={a} aiConfigured={d.aiConfigured} onChanged={load} />)}</ul>
    </div>
  );
}
