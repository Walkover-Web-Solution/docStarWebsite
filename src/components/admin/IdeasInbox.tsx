"use client";

import { useCallback, useEffect, useState } from "react";
import { toast } from "./toast";
import { ThumbsUp } from "lucide-react";
import Submitter from "./Submitter";
import { KIND_LABELS, getIdeaStats, listIdeas } from "@/lib/admin/api";
import StatusPill from "./StatusPill";
import IdeaDetail from "./IdeaDetail";

const STATUS_TABS = [
  ["open", "Open"],
  ["new", "New"],
  ["reviewing", "Reviewing"],
  ["planned", "Planned"],
  ["in_progress", "In progress"],
  ["shipped", "Shipped"],
  ["declined", "Declined"],
  ["duplicate", "Duplicates"],
  ["", "All"],
];

const ago = (iso: string) => {
  const m = Math.round((Date.now() - new Date(iso).getTime()) / 60000);
  if (m < 60) return `${Math.max(m, 1)}m`;
  const h = Math.round(m / 60);
  if (h < 24) return `${h}h`;
  return `${Math.round(h / 24)}d`;
};

function Stat({ label, value, note }: { label: string; value: number; note?: string }) {
  return (
    <div className="a-card px-4 py-3">
      <p className="text-xs uppercase tracking-wide text-[var(--a-muted)]">{label}</p>
      <p className="mt-1 text-2xl font-semibold">{value}</p>
      {note && <p className="text-xs text-[var(--a-muted)]">{note}</p>}
    </div>
  );
}

export default function IdeasInbox() {
  const [filters, setFilters] = useState({ status: "open", kind: "", source: "", submitterType: "", q: "", sort: "newest" });
  const [search, setSearch] = useState("");
  const [data, setData] = useState<any>(null);
  const [stats, setStats] = useState<any>(null);
  const [selected, setSelected] = useState<number | null>(null);

  const load = useCallback(() => {
    listIdeas(filters)
      .then(setData)
      .catch((e) => toast.error(e.message));
    getIdeaStats()
      .then(setStats)
      .catch(() => {});
  }, [filters]);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    const t = setTimeout(() => setFilters((f) => (f.q === search ? f : { ...f, q: search })), 300);
    return () => clearTimeout(t);
  }, [search]);

  const set = (key: string) => (e: React.ChangeEvent<HTMLSelectElement>) => setFilters((f) => ({ ...f, [key]: e.target.value }));
  const s = stats?.byStatus || {};
  const open = (s.new || 0) + (s.reviewing || 0) + (s.planned || 0) + (s.in_progress || 0);
  const agents = stats?.bySubmitter?.agent || 0;
  const auto = stats?.bySubmitter?.auto || 0;
  const total = (stats?.bySubmitter?.human || 0) + agents + auto;

  return (
    <div className="grid gap-4">
      <div>
        <h1 className="text-2xl font-bold">Ideas & feedback</h1>
        <p className="text-sm text-[var(--a-muted)]">Feature requests, ideas, bugs and feedback about DocStar, from people and their AI agents.</p>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
        <Stat label="Open" value={open} />
        <Stat label="New, untriaged" value={s.new || 0} />
        <Stat label="Planned" value={(s.planned || 0) + (s.in_progress || 0)} note={`${s.in_progress || 0} in progress`} />
        <Stat label="Shipped" value={s.shipped || 0} />
        <Stat label="From agents" value={agents + auto} note={total ? `${Math.round(((agents + auto) / total) * 100)}% of all${auto ? ` · ${auto} auto-filed` : ""}` : undefined} />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <div className="flex flex-wrap gap-1 rounded-lg border border-[var(--a-border)] bg-[var(--a-surface)] p-1 text-sm">
          {STATUS_TABS.map(([value, label]) => (
            <button key={label} type="button" onClick={() => setFilters((f) => ({ ...f, status: value }))} className={`rounded-md px-2.5 py-1 text-sm ${filters.status === value ? "bg-[var(--a-text)] text-[var(--a-surface)]" : "text-[var(--a-muted)] hover:bg-[var(--a-hover)]"}`}>
              {label}
            </button>
          ))}
        </div>
        <select className="border border-[var(--a-border)] rounded-lg px-3 py-1.5 min-w-0 box-border w-auto text-sm" value={filters.kind} onChange={set("kind")} aria-label="Type">
          <option value="">All types</option>
          {Object.entries(KIND_LABELS).map(([k, l]) => (
            <option key={k} value={k}>
              {l}
            </option>
          ))}
        </select>
        <select className="border border-[var(--a-border)] rounded-lg px-3 py-1.5 min-w-0 box-border w-auto text-sm" value={filters.submitterType} onChange={set("submitterType")} aria-label="Submitted by">
          <option value="">People and agents</option>
          <option value="human">People</option>
          <option value="agent">Agents</option>
          <option value="anonymous">Anonymous (not signed in)</option>
          <option value="auto">Auto-filed (MCP failures)</option>
        </select>
        <select className="border border-[var(--a-border)] rounded-lg px-3 py-1.5 min-w-0 box-border w-auto text-sm" value={filters.source} onChange={set("source")} aria-label="Source">
          <option value="">All sources</option>
          {["app", "website", "mcp", "cli", "api"].map((x) => (
            <option key={x} value={x}>
              {x.toUpperCase()}
            </option>
          ))}
        </select>
        <select className="border border-[var(--a-border)] rounded-lg px-3 py-1.5 min-w-0 box-border w-auto text-sm" value={filters.sort} onChange={set("sort")} aria-label="Sort">
          <option value="newest">Newest</option>
          <option value="votes">Most asked for</option>
          <option value="updated">Recently updated</option>
          <option value="oldest">Oldest</option>
        </select>
        <input className="border border-[var(--a-border)] rounded-lg px-3 py-1.5 min-w-0 box-border w-60 text-sm" placeholder="Search title, details, email, workspace" value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>

      <div className={`grid gap-4 ${selected ? "lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]" : ""}`}>
        <div className="a-card self-start overflow-hidden">
          {!data && <p className="p-6 text-sm text-[var(--a-muted)]">Loading…</p>}
          {data?.items.length === 0 && <p className="p-6 text-sm text-[var(--a-muted)]">Nothing here.</p>}
          <ul className="divide-y divide-[var(--a-border)]">
            {data?.items.map((item: any) => (
              <li key={item.id}>
                <button type="button" onClick={() => setSelected(item.id)} className={`grid w-full grid-cols-[minmax(0,1fr)_auto] gap-3 px-4 py-3 text-left hover:bg-[var(--a-hover)] ${selected === item.id ? "bg-[var(--a-accent-soft)]" : ""}`}>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">
                      <span className="text-[var(--a-muted)]">#{item.id}</span> {item.title}
                    </p>
                    <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[var(--a-muted)]">
                      <span>{KIND_LABELS[item.kind]}</span>
                      <Submitter item={item} />
                      <span>{item.source.toUpperCase()}</span>
                      {item.orgName && <span className="truncate">{item.orgName}</span>}
                      {item.priority && <span className="font-medium text-red-700">{item.priority}</span>}
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <StatusPill status={item.status} />
                    <span className="inline-flex items-center gap-2 text-xs text-[var(--a-muted)]">
                      <span className="inline-flex items-center gap-1">
                        <ThumbsUp size={12} /> {item.votes}
                      </span>
                      {ago(item.createdAt)}
                    </span>
                  </div>
                </button>
              </li>
            ))}
          </ul>
          {data && data.total > data.items.length && (
            <p className="border-t border-[var(--a-border)] px-4 py-2 text-xs text-[var(--a-muted)]">
              Showing {data.items.length} of {data.total}
            </p>
          )}
        </div>

        {selected && <IdeaDetail id={selected} onClose={() => setSelected(null)} onChanged={load} onOpen={(id: number) => setSelected(id)} />}
      </div>
    </div>
  );
}
