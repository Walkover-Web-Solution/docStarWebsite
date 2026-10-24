"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getOverview } from "@/lib/admin/api";
import { toast } from "../toast";
import { ItemLink, LevelDot, PageHead, Pill } from "../Ui";

// What needs attention, the conversion journey with its denominators, and the state of the moving parts.
const pct = (n: number | null, d: number | null) => (n == null || d == null ? "not measured" : d ? `${n} (${((n / d) * 100).toFixed(1)}%)` : String(n));

export default function Overview() {
  const [d, setD] = useState<any>(null);
  useEffect(() => {
    getOverview().then(setD).catch((e) => toast.error(e.message));
  }, []);
  if (!d) return <p className="text-sm text-[var(--a-muted)]">Loading…</p>;
  const j = d.journey;
  return (
    <div className="grid max-w-5xl gap-6">
      <PageHead title="Overview">What needs a decision or an action. Nothing here is a score: if data is missing it says so.</PageHead>

      <section className="a-card grid gap-2 p-4" aria-labelledby="attention">
        <h2 id="attention" className="text-sm font-bold uppercase tracking-wide text-[var(--a-muted)]">Needs attention</h2>
        {d.items.length === 0 && <p className="text-sm">Nothing needs attention right now.</p>}
        <ul className="grid gap-1.5 text-sm">
          {d.items.map((i: any, k: number) => (
            <li key={k} className="flex gap-2">
              <LevelDot level={i.level} />
              <ItemLink href={i.href}>{i.text}</ItemLink>
            </li>
          ))}
        </ul>
      </section>

      <section className="a-card grid gap-2 p-4" aria-labelledby="journey">
        <h2 id="journey" className="text-sm font-bold uppercase tracking-wide text-[var(--a-muted)]">Journey, last {j.days} days</h2>
        <dl className="grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
          <div><dt className="text-xs text-[var(--a-muted)]">Human visitors</dt><dd className="text-lg font-semibold">{j.visitors ?? "not measured"}</dd></div>
          <div><dt className="text-xs text-[var(--a-muted)]">Copied the prompt</dt><dd className="text-lg font-semibold">{pct(j.copied, j.visitors)}</dd></div>
          <div><dt className="text-xs text-[var(--a-muted)]">Agent arrived</dt><dd className="text-lg font-semibold">{pct(j.agentArrived, j.visitors)}</dd></div>
          <div><dt className="text-xs text-[var(--a-muted)]">Clicked sign up</dt><dd className="text-lg font-semibold">{pct(j.signupClicked, j.visitors)}</dd></div>
        </dl>
        <p className="text-xs text-[var(--a-muted)]">{!j.measured ? "No events arrived in this window. " : j.enough ? "" : "Too few visitors to read rates. "}{j.note} Percentages are of human visitors (distinct anonymous ids). <Link href="/admin/analytics" className="underline">Full analytics</Link></p>
      </section>

      <div className="grid gap-4 sm:grid-cols-2">
        <section className="a-card grid gap-1 p-4 text-sm">
          <h2 className="text-sm font-bold uppercase tracking-wide text-[var(--a-muted)]">Experiments</h2>
          <p>{d.experiments.running} of {d.experiments.max} slots running · {d.experiments.drafts} draft{d.experiments.drafts === 1 ? "" : "s"}</p>
          <Link href="/admin/website/experiments" className="underline">Manage experiments</Link>
        </section>
        <section className="a-card grid gap-1 p-4 text-sm">
          <h2 className="text-sm font-bold uppercase tracking-wide text-[var(--a-muted)]">Knowledge</h2>
          <p>{d.knowledge.documents} documents · {d.knowledge.stale} stale or unverified · writeback <Pill value={d.knowledge.writeback} /></p>
          <p className="text-xs text-[var(--a-muted)]">Deployed revision {d.knowledge.build.commit.slice(0, 7)}</p>
          <Link href="/admin/knowledge" className="underline">Open knowledge</Link>
        </section>
      </div>
    </div>
  );
}
