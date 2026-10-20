"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "../toast";
import { getAutopilot, rollbackAutopilotAction, runAutopilotNow, setAutopilotEnabled } from "@/lib/admin/api";
import { timeAgo } from "./RevisionBadge";
import WebsiteNav from "./WebsiteNav";

// The website autopilot: on/off, its daily run, and everything it did or was blocked from doing.
const KIND: Record<string, string> = { experiment: "Started a test", page_change: "Published an edit", test_result: "Test result" };
const KIND_BLOCKED: Record<string, string> = { experiment: "Wanted to start a test", page_change: "Wanted to publish an edit", test_result: "Test result" };
const STATUS: Record<string, { label: string; tone: string }> = {
  applied: { label: "done", tone: "bg-green-100 text-green-900" },
  blocked: { label: "blocked", tone: "bg-amber-100 text-amber-900" },
  rolled_back: { label: "rolled back", tone: "bg-[var(--a-hover)] text-[var(--a-muted)]" },
};

export default function Autopilot() {
  const [data, setData] = useState<any>(null);
  const [busy, setBusy] = useState("");

  const load = useCallback(() => {
    getAutopilot()
      .then(setData)
      .catch((e) => toast.error(e.message));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  // while a run is going, check every 5 seconds
  useEffect(() => {
    if (!data?.running) return;
    const t = setInterval(load, 5000);
    return () => clearInterval(t);
  }, [data?.running, load]);

  const act = async (label: string, fn: () => Promise<any>, done: string) => {
    setBusy(label);
    try {
      const next = await fn();
      if (next?.actions) setData(next);
      else load();
      toast.success(done);
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setBusy("");
    }
  };

  const header = (
    <div>
      <h1 className="text-2xl font-bold">Website</h1>
      <p className="text-sm text-[var(--a-muted)]">The AI improves docstar.io on its own: it tests new wording with A/B tests, publishes what wins, and makes factual fixes. The server enforces the rules below.</p>
      <div className="mt-3">
        <WebsiteNav />
      </div>
    </div>
  );

  if (!data)
    return (
      <div className="grid max-w-5xl gap-4">
        {header}
        <p className="text-sm text-[var(--a-muted)]">Loading…</p>
      </div>
    );

  const last = data.lastRun;
  return (
    <div className="grid max-w-5xl gap-4">
      {header}

      <section className="a-card grid gap-3 p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className={`rounded-full px-3 py-1 font-mono text-xs font-semibold ${data.enabled ? "bg-[var(--lime)] text-[var(--ink)]" : "bg-[var(--a-hover)] text-[var(--a-muted)]"}`}>{data.enabled ? "ON" : "OFF"}</span>
            <p className="text-sm">
              {data.running ? "Running now…" : data.enabled ? `Next run ${new Date(data.nextRunAt).toLocaleString(undefined, { weekday: "short", hour: "2-digit", minute: "2-digit" })}` : "Paused. Nothing changes until you turn it on."}
            </p>
          </div>
          <div className="flex gap-2">
            <button type="button" className="btn btn-sm" disabled={!!busy || !data.enabled || data.running || !data.configured} onClick={() => act("run", runAutopilotNow, "Run started. It takes about a minute.")}>
              {busy === "run" ? "Starting…" : "Run now"}
            </button>
            <button type="button" className={`btn btn-sm ${data.enabled ? "" : "btn-primary"}`} disabled={!!busy || !data.configured} onClick={() => act("toggle", () => setAutopilotEnabled(!data.enabled), data.enabled ? "Autopilot paused." : "Autopilot on. It runs every day at 9:00.")}>
              {data.enabled ? "Pause" : "Turn on"}
            </button>
          </div>
        </div>
        {!data.configured && <p className="text-sm text-red-700">viaSocket isn't set up on the server (VIASOCKET_* in hitman-api's .env), so the AI can't run.</p>}
        {last && (
          <p className="text-sm text-[var(--a-muted)]">
            Last run {timeAgo(last.startedAt)}: {last.status === "failed" ? <span className="text-red-700">failed ({last.error})</span> : last.status === "running" ? "in progress" : last.summary || "nothing to do"}
          </p>
        )}
        <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs text-[var(--a-muted)]">
          <span>
            This week: {data.week.tests}/{data.limits.newTestsPerWeek} tests · {data.week.edits}/{data.limits.editsPerWeek} edits
          </span>
          <span>One test at a time · tests shown to {data.limits.testShareOfVisitors}% of visitors</span>
          <span>Never touches: {data.protectedPages.join(", ")}</span>
          <span>Model: {data.model}</span>
        </div>
      </section>

      <section className="grid gap-2">
        <h2 className="text-base font-semibold">What it did</h2>
        {data.actions.length === 0 && <p className="text-sm text-[var(--a-muted)]">Nothing yet.</p>}
        <ul className="grid gap-2">
          {data.actions.map((a: any) => (
            <li key={a.id} className="a-card grid gap-1.5 p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="flex flex-wrap items-center gap-2 text-xs text-[var(--a-muted)]">
                    <span className={`rounded-full px-2 py-0.5 font-mono text-[11px] ${STATUS[a.status]?.tone || ""}`}>{STATUS[a.status]?.label || a.status}</span>
                    {(a.status === "blocked" ? KIND_BLOCKED : KIND)[a.kind] || a.kind}
                    {a.page && <span className="font-mono">/{a.page === "home" ? "" : a.page}</span>}
                    <span>· {timeAgo(a.createdAt)}</span>
                  </p>
                  <p className="mt-1 text-sm font-semibold">{a.title}</p>
                </div>
                <div className="flex gap-2">
                  {a.kind === "experiment" && a.status === "applied" && (
                    <Link href="/admin/website/experiments" className="btn btn-sm no-underline">
                      See test
                    </Link>
                  )}
                  {a.canRollback && (
                    <button type="button" className="btn btn-sm" disabled={!!busy} onClick={() => act(`rb-${a.id}`, () => rollbackAutopilotAction(a.id), a.kind === "experiment" ? "Test stopped." : "Rolled back. The previous version is live again.")}>
                      Roll back
                    </button>
                  )}
                </div>
              </div>
              {a.reason && <p className="text-sm">{a.reason}</p>}
              {a.evidence && <p className="text-xs text-[var(--a-muted)]">Based on: {a.evidence}</p>}
              {a.blockReason && <p className="text-xs text-amber-900">Blocked: {a.blockReason}</p>}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
