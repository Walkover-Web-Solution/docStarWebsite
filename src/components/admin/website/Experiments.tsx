"use client";

import { useCallback, useEffect, useState } from "react";
import { toast } from "../toast";
import { concludeExperiment, getExperiment, listExperiments, stopExperiment } from "@/lib/admin/api";
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
      {x.status === "draft" ? (
        <p className="flex flex-wrap items-center gap-2 text-xs text-[var(--a-muted)]">
          {x.variants.map((v: any) => (
            <span key={v.key}>
              {v.key}: version #{v.revisionId} · {v.weight}%
            </span>
          ))}
          <RevisionBadge status="draft" />
        </p>
      ) : (
        <Results r={detail?.results} />
      )}
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
        <p className="text-sm text-[var(--a-muted)]">A/B tests the AI runs: part of the visitors see a different version of a page, and the one that gets more people to copy the prompt is kept. Agents and crawlers always see the live page.</p>
        <div className="mt-3">
          <WebsiteNav />
        </div>
      </div>
      {!list && <p className="text-sm text-[var(--a-muted)]">Loading…</p>}
      {list?.length === 0 && <p className="text-sm text-[var(--a-muted)]">No tests yet. The AI starts them once the autopilot is on.</p>}
      <ul className="grid gap-3">
        {list?.map((x) => (
          <TestCard key={`${x.id}-${x.status}`} x={x} onChanged={load} />
        ))}
      </ul>
    </div>
  );
}
