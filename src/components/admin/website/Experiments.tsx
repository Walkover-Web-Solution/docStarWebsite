"use client";

import { useCallback, useEffect, useState } from "react";
import { toast } from "../toast";
import { concludeExperiment, createExperiment, getExperiment, getExperimentBrief, getSitePage, listExperiments, listSitePages, startExperiment, stopExperiment, updateExperimentDraft } from "@/lib/admin/api";
import RevisionBadge, { timeAgo } from "./RevisionBadge";
import WebsiteNav from "./WebsiteNav";

// A/B tests on docstar.io pages, created and run by the AI autopilot. A is the live version; B is
// another version of the same page. A variant wins on "copied the prompt" without hurting "agent
// arrived" or "clicked sign up". Admins can watch, stop a test, or end it with a winner.
const STATUS_TONE: Record<string, string> = {
  draft: "bg-[var(--a-hover)]",
  running: "bg-[var(--lime)] text-[var(--ink)]",
  stopped: "bg-amber-100 text-amber-900",
  concluded: "bg-green-100 text-green-900",
};
const VERDICT: Record<string, string> = {
  collecting: "Collecting data",
  wins: "Wins",
  loses: "Loses",
  no_difference: "No clear difference",
};
const pct = (a: number, b: number) => (b ? `${((a / b) * 100).toFixed(1)}%` : "—");

function Results({ r }: { r: any }) {
  if (!r) return null;
  const control = r.variants[0];
  return (
    <div className="grid gap-2">
      {r.splitOff && <p className="rounded-md bg-amber-100 p-2 text-xs text-amber-900">The visitor split doesn't match the weights. Results may be wrong; check the setup.</p>}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs uppercase text-[var(--a-muted)]">
              <th className="py-1">Variant</th>
              <th>Visitors</th>
              <th>Copied the prompt</th>
              <th>Agent arrived</th>
              <th>Signed up</th>
              <th>Chance it beats A</th>
              <th>Result</th>
            </tr>
          </thead>
          <tbody>
            {r.variants.map((v: any) => {
              const c = r.compared.find((x: any) => x.key === v.key);
              return (
                <tr key={v.key} className="border-t border-[var(--a-border)]">
                  <td className="py-1.5 font-mono text-xs">
                    {v.key} {v.key === "A" ? "(live)" : ""} · {v.weight}%
                  </td>
                  <td>{v.visitors.toLocaleString()}</td>
                  <td>
                    {pct(v.copied, v.visitors)}
                    {c?.lift != null && <span className="ml-1 text-xs text-[var(--a-muted)]">({c.lift >= 0 ? "+" : ""}{Math.round(c.lift * 100)}%)</span>}
                  </td>
                  <td>{pct(v.arrived, v.visitors)}</td>
                  <td>{pct(v.signups, v.visitors)}</td>
                  <td>{c ? `${Math.round(c.probBeatsA * 100)}%` : "—"}</td>
                  <td>{c ? `${VERDICT[c.verdict]}${c.guardrailsOk ? "" : " · hurts a guardrail"}` : ""}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-[var(--a-muted)]">
        {r.days} days, {r.total.toLocaleString()} visitors. A winner needs {r.decision.minDays}+ days, {r.decision.minVisitorsPerVariant}+ visitors per variant and a {Math.round(r.decision.winProbability * 100)}% chance of beating A
        {control.visitors ? "" : "; no visitors yet"}.
      </p>
    </div>
  );
}

function Previews({ x }: { x: any }) {
  if (!x.previews?.length) return null;
  return (
    <p className="flex flex-wrap items-center gap-2 text-xs text-[var(--a-muted)]">
      Preview (signed-in only):
      {x.previews.map((p: any) => (
        <a key={p.key} href={p.path} target="_blank" rel="noreferrer" className="underline">
          {p.key}
        </a>
      ))}
    </p>
  );
}

function Draft({ x, busy, act }: { x: any; busy: string; act: (label: string, fn: () => Promise<any>, done: string) => void }) {
  const [f, setF] = useState({ hypothesis: x.hypothesis || "", reviewBy: x.reviewBy || "", rollbackPlan: x.rollbackPlan || "" });
  const [brief, setBrief] = useState("");
  const input = "box-border w-full rounded-lg border border-[var(--a-border)] px-2 py-1 text-sm";
  return (
    <div className="grid gap-2 text-sm">
      <p className="flex flex-wrap items-center gap-2 text-xs text-[var(--a-muted)]">
        {x.variants.map((v: any) => (
          <span key={v.key}>
            {v.key}: version #{v.revisionId} · {v.weight}%
          </span>
        ))}
        <RevisionBadge status="draft" />
      </p>
      <label className="grid gap-1 text-xs text-[var(--a-muted)]">
        Hypothesis (what changes, for whom, why it should help)
        <textarea className={input} rows={2} value={f.hypothesis} onChange={(e) => setF({ ...f, hypothesis: e.target.value })} />
      </label>
      <div className="grid gap-2 sm:grid-cols-2">
        <label className="grid gap-1 text-xs text-[var(--a-muted)]">
          Review by (decide or retire on this date)
          <input type="date" className={input} value={f.reviewBy} onChange={(e) => setF({ ...f, reviewBy: e.target.value })} />
        </label>
        <label className="grid gap-1 text-xs text-[var(--a-muted)]">
          Rollback plan
          <input className={input} value={f.rollbackPlan} onChange={(e) => setF({ ...f, rollbackPlan: e.target.value })} />
        </label>
      </div>
      {x.missingForLaunch.length > 0 && <p className="rounded-md bg-amber-100 p-2 text-xs text-amber-900">Before launch: {x.missingForLaunch.join("; ")}.</p>}
      <div className="flex flex-wrap gap-2">
        <button type="button" className="btn btn-sm" disabled={!!busy} onClick={() => act("save", () => updateExperimentDraft(x.id, f), "Saved")}>Save</button>
        <button type="button" className="btn btn-sm btn-primary" disabled={!!busy || x.missingForLaunch.length > 0} onClick={() => act("start", () => startExperiment(x.id), "Test started")}>Launch</button>
        <button type="button" className="btn btn-sm" onClick={() => getExperimentBrief(x.id).then((r) => setBrief(r.brief))}>Change brief</button>
      </div>
      {brief && (
        <div className="grid gap-1">
          <pre className="whitespace-pre-wrap rounded-md border border-[var(--a-border)] p-2 text-xs">{brief}</pre>
          <p className="text-xs text-[var(--a-muted)]">Generating a challenger from this brief is not connected: a person or coding agent writes the draft version in Website → Pages, then adds it here.</p>
        </div>
      )}
    </div>
  );
}

function NewTest({ onCreated }: { onCreated: () => void }) {
  const [open, setOpen] = useState(false);
  const [pages, setPages] = useState<any[]>([]);
  const [revs, setRevs] = useState<any[]>([]);
  const [f, setF] = useState<any>({ slug: "", title: "", hypothesis: "", b: "", c: "", split: 50 });
  const [busy, setBusy] = useState(false);
  useEffect(() => {
    if (open && !pages.length) listSitePages().then((r: any) => setPages(r.pages));
  }, [open, pages.length]);
  useEffect(() => {
    setRevs([]);
    if (f.slug) getSitePage(f.slug).then((r: any) => setRevs(r.revisions.filter((v: any) => v.status === "draft")));
  }, [f.slug]);
  const input = "box-border w-full rounded-lg border border-[var(--a-border)] px-2 py-1 text-sm";
  if (!open) return <div><button type="button" className="btn" onClick={() => setOpen(true)}>New experiment</button></div>;
  const variants = [f.b && { revisionId: Number(f.b) }, f.c && { revisionId: Number(f.c) }].filter(Boolean);
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      // the share of visitors who see the challengers is split evenly between them
      const each = Math.floor(Number(f.split) / variants.length);
      await createExperiment({ slug: f.slug, title: f.title, hypothesis: f.hypothesis || undefined, variants: variants.map((v: any) => ({ ...v, weight: each })), controlWeight: 100 - each * variants.length });
      toast.success("Draft created. Add the launch details, then launch.");
      setOpen(false);
      onCreated();
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setBusy(false);
    }
  };
  return (
    <form onSubmit={submit} className="a-card grid gap-2 p-4 text-sm">
      <h2 className="font-bold">New experiment</h2>
      <p className="text-xs text-[var(--a-muted)]">A is always the live page. B and C are draft versions of the same page (create them in Website → Pages first). Nothing starts until you launch it.</p>
      <select aria-label="Page" className={input} value={f.slug} onChange={(e) => setF({ ...f, slug: e.target.value, b: "", c: "" })} required>
        <option value="">Choose the page to test…</option>
        {pages.map((p) => <option key={p.slug} value={p.slug}>{p.path}</option>)}
      </select>
      <input aria-label="Title" className={input} placeholder="Title, e.g. Home hero names the outcome" value={f.title} onChange={(e) => setF({ ...f, title: e.target.value })} required minLength={3} />
      <textarea aria-label="Hypothesis" className={input} rows={2} placeholder="Hypothesis" value={f.hypothesis} onChange={(e) => setF({ ...f, hypothesis: e.target.value })} />
      <div className="grid gap-2 sm:grid-cols-3">
        <select aria-label="Challenger B" className={input} value={f.b} onChange={(e) => setF({ ...f, b: e.target.value })} required><option value="">Challenger B (draft version)…</option>{revs.map((r) => <option key={r.id} value={r.id}>v{r.version} · {r.note || "no note"}</option>)}</select>
        <select aria-label="Challenger C (optional)" className={input} value={f.c} onChange={(e) => setF({ ...f, c: e.target.value })}><option value="">Challenger C (optional)</option>{revs.filter((r) => String(r.id) !== f.b).map((r) => <option key={r.id} value={r.id}>v{r.version} · {r.note || "no note"}</option>)}</select>
        <label className="flex items-center gap-2 text-xs text-[var(--a-muted)]">Visitors in challengers
          <input type="number" min={2} max={90} className={`${input} w-20`} value={f.split} onChange={(e) => setF({ ...f, split: e.target.value })} />%</label>
      </div>
      <div><button type="submit" className="btn btn-primary" disabled={busy || !variants.length}>Create draft</button> <button type="button" className="btn" onClick={() => setOpen(false)}>Cancel</button></div>
    </form>
  );
}

function TestCard({ x, onChanged }: { x: any; onChanged: () => void }) {
  const [detail, setDetail] = useState<any>(null);
  const [busy, setBusy] = useState("");

  const load = useCallback(() => {
    if (x.status === "draft") return setDetail(null);
    getExperiment(x.id)
      .then(setDetail)
      .catch((e) => toast.error(e.message));
  }, [x.id, x.status]);
  useEffect(load, [load]);

  const act = async (label: string, fn: () => Promise<any>, done: string) => {
    setBusy(label);
    try {
      await fn();
      toast.success(done);
      onChanged();
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setBusy("");
    }
  };

  const open = x.status === "running" || x.status === "stopped";
  return (
    <li className="a-card grid gap-3 p-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="flex flex-wrap items-center gap-2 text-sm font-semibold">
            {x.title} <span className={`rounded-full px-2 py-0.5 font-mono text-[11px] ${STATUS_TONE[x.status] || ""}`}>{x.status}</span>
          </p>
          <p className="text-xs text-[var(--a-muted)]">
            <span className="font-mono">{x.path}</span> · {x.actorType === "agent" ? "by agent " : "by "}
            {x.actorName} · {x.startedAt ? `started ${timeAgo(x.startedAt)}` : `created ${timeAgo(x.createdAt)}`}
            {x.winner ? ` · winner ${x.winner}` : ""}
          </p>
          {x.hypothesis && <p className="mt-1 text-sm italic text-[var(--a-muted)]">“{x.hypothesis}”</p>}
        </div>
        <div className="flex flex-wrap gap-2">
          {x.status === "running" && (
            <button type="button" className="btn btn-sm" disabled={!!busy} onClick={() => act("stop", () => stopExperiment(x.id), "Test stopped. Everyone sees the live page again.")}>
              Stop
            </button>
          )}
          {open &&
            x.variants.map((v: any) => (
              <button key={v.key} type="button" className="btn btn-sm" disabled={!!busy} onClick={() => act(`win-${v.key}`, () => concludeExperiment(x.id, v.key), v.key === "A" ? "Ended. The live page stays." : `Ended. ${v.key} is now live for everyone.`)}>
                {v.key === "A" ? "Keep A" : `Make ${v.key} live`}
              </button>
            ))}
        </div>
      </div>
      {x.status === "draft" ? <Draft x={x} busy={busy} act={act} /> : <Results r={detail?.results} />}
      <Previews x={x} />
    </li>
  );
}

export default function Experiments() {
  const [list, setList] = useState<any[] | null>(null);
  const load = useCallback(() => {
    listExperiments()
      .then((r: any) => setList(r.experiments))
      .catch((e) => toast.error(e.message));
  }, []);
  useEffect(load, [load]);

  return (
    <div className="grid max-w-5xl gap-4">
      <div>
        <h1 className="text-2xl font-bold">Website</h1>
        <p className="text-sm text-[var(--a-muted)]">A/B/C tests, created by operators or the autopilot: part of the visitors see a different version of a page, and the one that gets more people to copy the prompt is kept. Agents and crawlers always see the live page. Stop = pause and return everyone to A; Make B/C live = promote; Keep A = retire. Low traffic stays “collecting data”, never a winner.</p>
        <div className="mt-3">
          <WebsiteNav />
        </div>
      </div>
      {list?.[0]?.design && (
        <p className="text-xs text-[var(--a-muted)]">
          Assignment: {list[0].design.assignmentUnit}. Exposure: {list[0].design.exposure}. Excluded: {list[0].design.excluded}.
        </p>
      )}
      <NewTest onCreated={load} />
      {!list && <p className="text-sm text-[var(--a-muted)]">Loading…</p>}
      {list?.length === 0 && <p className="text-sm text-[var(--a-muted)]">No tests yet.</p>}
      <ul className="grid gap-3">
        {list?.map((x) => (
          <TestCard key={`${x.id}-${x.status}`} x={x} onChanged={load} />
        ))}
      </ul>
    </div>
  );
}
