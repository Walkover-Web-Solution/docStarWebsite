"use client";

import { useEffect, useState } from "react";
import { toast } from "../toast";
import { getBundledPages, getSiteAnalytics } from "@/lib/admin/api";
import { BarList, StatTile } from "./charts";

// docstar.io analytics, only what we act on: the funnel from visit to agent, agent reads,
// where homepage visitors drop off, and which buttons work.
const RANGES = [1, 7, 30, 90];
const pct = (a: number, b: number) => (b ? Math.round((a / b) * 100) : 0);

function Panel({ title, note, children }: { title: string; note?: string; children: React.ReactNode }) {
  return (
    <section className="a-card min-w-0 p-4">
      <h2 className="text-base font-semibold">{title}</h2>
      {note && <p className="mb-3 text-xs text-[var(--a-muted)]">{note}</p>}
      <div className={note ? "" : "mt-3"}>{children}</div>
    </section>
  );
}

export default function SiteAnalytics() {
  const [days, setDays] = useState(7);
  const [data, setData] = useState<any>(null);
  const [homeOrder, setHomeOrder] = useState<string[]>([]);

  // sections in the order they appear on the homepage, so a drop-off reads top to bottom
  useEffect(() => {
    getBundledPages()
      .then((pages: any[]) => setHomeOrder((pages.find((p) => p.slug === "home")?.sections || []).map((x: any) => x.key)))
      .catch(() => {});
  }, []);

  useEffect(() => {
    setData(null);
    getSiteAnalytics(days)
      .then(setData)
      .catch((e) => toast.error(e.message));
  }, [days]);

  const f = data?.funnel;
  const agentReads: number = data?.traffic.filter((t: any) => t.actorType !== "human").reduce((n: number, t: any) => n + t.reads, 0) || 0;
  const topAgents = (data?.agents || []).slice(0, 3).map((a: any) => a.name).join(", ");
  const rank = (key: string) => (homeOrder.indexOf(key) === -1 ? homeOrder.length : homeOrder.indexOf(key));
  const sections = [...(data?.sections || [])].sort((a: any, b: any) => rank(a.section) - rank(b.section));

  return (
    <div className="grid max-w-6xl gap-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Website analytics</h1>
          <p className="text-sm text-[var(--a-muted)]">Does docstar.io turn visitors into agents using DocStar? First-party, no third-party trackers.</p>
        </div>
        <div className="inline-flex overflow-hidden rounded-lg border-[1.5px] border-[var(--ink)] bg-[var(--a-surface)] text-xs" role="group" aria-label="Time range">
          {RANGES.map((r) => (
            <button key={r} type="button" aria-pressed={days === r} onClick={() => setDays(r)} className={`px-3 py-1.5 font-mono ${days === r ? "bg-[var(--lime)] font-semibold" : ""}`}>
              {r === 1 ? "24h" : `${r}d`}
            </button>
          ))}
        </div>
      </div>

      {!data && <p className="text-sm text-[var(--a-muted)]">Loading…</p>}

      {data && f && (
        <>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
            <StatTile label="People" value={f.visitors} note="unique visitors" />
            <StatTile label="Copied the prompt" value={f.copied} note={`${pct(f.copied, f.visitors)}% of people`} />
            <StatTile label="Agent arrived" value={f.agent_arrived} note={`${pct(f.agent_arrived, f.copied)}% of copies`} />
            <StatTile label="Clicked sign up" value={f.signup_clicked} note={`${pct(f.signup_clicked, f.visitors)}% of people`} />
            <StatTile label="Agent reads" value={agentReads} note={topAgents ? `mostly ${topAgents}` : "none yet"} />
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <Panel title="Homepage sections reached" note="Share of homepage visitors who saw each section, top of the page first. A sharp drop shows where people leave.">
              <BarList max={100} suffix="%" rows={sections.map((x: any) => ({ label: x.section, value: pct(x.visitors, data.homeVisitors) }))} />
            </Panel>
            <Panel title="What agents read" note="Pages and .md files fetched by agents and crawlers.">
              <BarList rows={data.agentPaths.map((x: any) => ({ label: x.path, value: x.fetches }))} empty="No agent reads yet" />
            </Panel>
          </div>

          <Panel title="Buttons">
            {data.ctas.length === 0 ? (
              <p className="text-sm text-[var(--a-muted)]">No clicks yet</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-xs uppercase text-[var(--a-muted)]">
                      <th className="py-1">Button</th>
                      <th>Section</th>
                      <th>Clicks</th>
                      <th>Of people</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.ctas.map((c: any) => (
                      <tr key={`${c.cta}-${c.placement}`} className="border-t border-[var(--a-border)]">
                        <td className="py-1.5 font-mono text-xs">{c.cta}</td>
                        <td>{c.placement || "—"}</td>
                        <td>{c.clicks.toLocaleString()}</td>
                        <td>{pct(c.visitors, f.visitors)}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Panel>
        </>
      )}
    </div>
  );
}
