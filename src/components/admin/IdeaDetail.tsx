"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "./toast";
import { X } from "lucide-react";
import { KIND_LABELS, IDEA_STATUS_LABELS as STATUS_LABELS, commentOnIdea, getIdea, mergeIdea, updateIdea } from "@/lib/admin/api";
import StatusPill from "./StatusPill";
import Submitter from "./Submitter";

const PRIORITIES = ["", "low", "medium", "high", "urgent"];
const EVENT_TEXT: Record<string, (e: any) => string> = {
  created: () => "submitted",
  status_changed: (e) => `status ${STATUS_LABELS[e.fromValue] || e.fromValue} → ${STATUS_LABELS[e.toValue] || e.toValue}`,
  priority_changed: (e) => `priority ${e.fromValue || "none"} → ${e.toValue || "none"}`,
  kind_changed: (e) => `type ${KIND_LABELS[e.fromValue] || e.fromValue} → ${KIND_LABELS[e.toValue] || e.toValue}`,
  merged: (e) => `merged into ${e.toValue}`,
  merged_in: (e) => `${e.fromValue} merged in (${e.toValue} asking now)`,
};

type Props = { id: number; onClose: () => void; onChanged: () => void; onOpen: (id: number) => void };

export default function IdeaDetail({ id, onClose, onChanged, onOpen }: Props) {
  const [item, setItem] = useState<any>(null);
  const [tags, setTags] = useState("");
  const [comment, setComment] = useState("");
  const [visibility, setVisibility] = useState("internal");
  const [mergeInto, setMergeInto] = useState("");
  const [busy, setBusy] = useState(false);

  const load = useCallback(() => {
    getIdea(id)
      .then((x) => {
        setItem(x);
        setTags((x.tags || []).join(", "));
      })
      .catch((e) => toast.error(e.message));
  }, [id]);

  useEffect(() => {
    setItem(null);
    load();
  }, [load]);

  const act = async (fn: () => Promise<any>, success?: string) => {
    setBusy(true);
    try {
      const next = await fn();
      if (next?.id === id) {
        setItem(next);
        setTags((next.tags || []).join(", "));
      } else if (next?.id) {
        onOpen(next.id);
      }
      onChanged();
      if (success) toast.success(success);
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setBusy(false);
    }
  };

  const timeline = useMemo(() => {
    if (!item) return [];
    const events = (item.events || []).map((e: any) => ({ at: e.createdAt, kind: "event", e }));
    const comments = (item.comments || []).map((c: any) => ({ at: c.createdAt, kind: "comment", c }));
    return [...events, ...comments].sort((a: any, b: any) => new Date(a.at).getTime() - new Date(b.at).getTime());
  }, [item]);

  if (!item) return <div className="a-card p-6 text-sm text-[var(--a-muted)]">Loading…</div>;

  const ctx = item.context || {};

  return (
    <div className="a-card self-start lg:sticky lg:top-16">
      <div className="flex items-start justify-between gap-3 border-b border-[var(--a-border)] p-4">
        <div className="min-w-0">
          <p className="text-xs text-[var(--a-muted)]">
            #{item.id} · {KIND_LABELS[item.kind]} · {new Date(item.createdAt).toLocaleString()}
          </p>
          <h2 className="mt-1 text-lg font-semibold">{item.title}</h2>
          <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-[var(--a-muted)]">
            <StatusPill status={item.status} />
            <Submitter item={item} />
            {item.agentModel && <span className="text-[var(--a-muted)]">{item.agentModel}</span>}
            <span>{item.userEmail || (item.contactEmail ? `contact: ${item.contactEmail}` : item.anonymous ? "no contact given" : "")}</span>
            {item.orgName && <span>· {item.orgName}</span>}
            <span>· via {item.source.toUpperCase()}</span>
            <span>· {item.votes} asking</span>
          </div>
        </div>
        <button type="button" onClick={onClose} aria-label="Close" className="rounded p-1 hover:bg-[var(--a-hover)]">
          <X size={16} />
        </button>
      </div>

      <div className="grid gap-4 p-4">
        {item.body ? <p className="whitespace-pre-wrap text-sm">{item.body}</p> : <p className="text-sm italic text-[var(--a-muted)]">No details given.</p>}
        {item.autoStats && (
          <p className="rounded-md border border-dashed border-[var(--a-border)] p-2 text-xs text-[var(--a-muted)]">
            Live counts: {item.autoStats.hits} failures from {item.autoStats.agents} agents or sessions in the last {item.autoStats.windowDays} days · last seen {new Date(item.autoStats.lastSeen).toLocaleString()}
          </p>
        )}
        {(ctx.url || ctx.tool || ctx.collectionId) && (
          <p className="rounded-md bg-[var(--a-bg)] p-2 font-mono text-xs text-[var(--a-muted)]">
            {ctx.url && <>page: {ctx.url} </>}
            {ctx.collectionId && <>· collection: {ctx.collectionId} </>}
            {ctx.tool && <>· tool: {ctx.tool}</>}
          </p>
        )}

        <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
          <label className="grid gap-1 text-xs font-medium text-[var(--a-muted)]">
            Status
            <select className="border border-[var(--a-border)] rounded-lg px-3 py-1.5 min-w-0 box-border w-full text-sm" value={item.status} disabled={busy || item.status === "duplicate"} onChange={(e) => act(() => updateIdea(id, { status: e.target.value }), "Status updated")}>
              {Object.entries(STATUS_LABELS)
                .filter(([k]) => k !== "duplicate" || item.status === "duplicate")
                .map(([k, l]) => (
                  <option key={k} value={k}>
                    {l}
                  </option>
                ))}
            </select>
          </label>
          <label className="grid gap-1 text-xs font-medium text-[var(--a-muted)]">
            Priority
            <select className="border border-[var(--a-border)] rounded-lg px-3 py-1.5 min-w-0 box-border w-full text-sm" value={item.priority || ""} disabled={busy} onChange={(e) => act(() => updateIdea(id, { priority: e.target.value || null }))}>
              {PRIORITIES.map((p) => (
                <option key={p} value={p}>
                  {p || "None"}
                </option>
              ))}
            </select>
          </label>
          <label className="grid gap-1 text-xs font-medium text-[var(--a-muted)]">
            Type
            <select className="border border-[var(--a-border)] rounded-lg px-3 py-1.5 min-w-0 box-border w-full text-sm" value={item.kind} disabled={busy} onChange={(e) => act(() => updateIdea(id, { kind: e.target.value }))}>
              {Object.entries(KIND_LABELS).map(([k, l]) => (
                <option key={k} value={k}>
                  {l}
                </option>
              ))}
            </select>
          </label>
          <label className="col-span-2 grid gap-1 text-xs font-medium text-[var(--a-muted)] md:col-span-3">
            Tags (comma separated)
            <input
              className="border border-[var(--a-border)] rounded-lg px-3 py-1.5 min-w-0 box-border w-full text-sm"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              onBlur={() => {
                const next = tags
                  .split(",")
                  .map((t) => t.trim().toLowerCase())
                  .filter(Boolean);
                if (next.join(",") !== (item.tags || []).join(",")) act(() => updateIdea(id, { tags: next }));
              }}
            />
          </label>
        </div>

        {item.status !== "duplicate" && (
          <div className="rounded-lg border border-[var(--a-border)] p-3">
            <p className="text-xs font-medium text-[var(--a-muted)]">Duplicate of another item?</p>
            {item.similar?.length > 0 && (
              <ul className="mt-2 grid gap-1">
                {item.similar.map((x: any) => (
                  <li key={x.id} className="flex items-center justify-between gap-2 text-sm">
                    <button type="button" className="min-w-0 truncate text-left hover:underline" onClick={() => onOpen(x.id)}>
                      <span className="text-[var(--a-muted)]">#{x.id}</span> {x.title} <span className="text-xs text-[var(--a-muted)]">({x.votes} asking)</span>
                    </button>
                    <button type="button" className="btn btn-sm shrink-0" disabled={busy} onClick={() => act(() => mergeIdea(id, x.id), `Merged into #${x.id}`)}>
                      Merge into #{x.id}
                    </button>
                  </li>
                ))}
              </ul>
            )}
            <div className="mt-2 flex gap-2">
              <input className="border border-[var(--a-border)] rounded-lg px-3 py-1.5 min-w-0 box-border w-32 text-sm" placeholder="#id" value={mergeInto} onChange={(e) => setMergeInto(e.target.value.replace(/\D/g, ""))} />
              <button type="button" className="btn btn-sm" disabled={busy || !mergeInto} onClick={() => act(() => mergeIdea(id, Number(mergeInto)), `Merged into #${mergeInto}`)}>
                Merge
              </button>
            </div>
          </div>
        )}
        {item.duplicateOfId && (
          <p className="text-sm">
            Duplicate of{" "}
            <button type="button" className="underline" onClick={() => onOpen(item.duplicateOfId)}>
              #{item.duplicateOfId}
            </button>
          </p>
        )}
        {item.duplicates?.length > 0 && (
          <div>
            <p className="text-xs font-medium text-[var(--a-muted)]">Merged duplicates</p>
            <ul className="mt-1 grid gap-1 text-sm">
              {item.duplicates.map((d: any) => (
                <li key={d.id}>
                  <button type="button" className="hover:underline" onClick={() => onOpen(d.id)}>
                    <span className="text-[var(--a-muted)]">#{d.id}</span> {d.title}
                  </button>{" "}
                  <span className="text-xs text-[var(--a-muted)]">{d.submitterType === "agent" ? d.agentName : d.userEmail}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div>
          <p className="text-xs font-medium text-[var(--a-muted)]">Timeline</p>
          <ol className="mt-2 grid gap-2">
            {timeline.map((t: any, i: number) =>
              t.kind === "event" ? (
                <li key={`e${i}`} className="text-xs text-[var(--a-muted)]">
                  {new Date(t.at).toLocaleString()} · {t.e.actorName}: {(EVENT_TEXT[t.e.type] || (() => t.e.type))(t.e)}
                </li>
              ) : (
                <li key={`c${i}`} className={`rounded-lg p-2 text-sm ${t.c.visibility === "public" ? "bg-[var(--a-accent-soft)]" : "bg-[var(--a-note-soft)]"}`}>
                  <p className="text-xs text-[var(--a-muted)]">
                    {t.c.authorType === "team" ? t.c.authorName : t.c.authorType === "agent" ? `agent · ${t.c.authorName}` : t.c.authorName} · {new Date(t.at).toLocaleString()} · {t.c.visibility === "public" ? "visible to submitter" : "internal note"}
                  </p>
                  <p className="mt-1 whitespace-pre-wrap">{t.c.body}</p>
                </li>
              )
            )}
          </ol>
        </div>

        <form
          className="grid gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            act(() => commentOnIdea(id, comment, visibility), visibility === "public" ? "Reply sent" : "Note added").then(() => setComment(""));
          }}
        >
          <textarea className="border border-[var(--a-border)] rounded-lg px-3 py-1.5 min-w-0 box-border w-full text-sm" rows={3} value={comment} onChange={(e) => setComment(e.target.value)} placeholder={visibility === "public" ? "Reply to the submitter (they will see this)" : "Internal note (team only)"} />
          <div className="flex items-center justify-between gap-2">
            <div className="flex gap-1 rounded-md border border-[var(--a-border)] p-0.5 text-xs">
              {[
                ["internal", "Internal note"],
                ["public", "Reply to submitter"],
              ].map(([v, l]) => (
                <button key={v} type="button" onClick={() => setVisibility(v)} className={`rounded px-2 py-1 ${visibility === v ? "bg-[var(--ink)] text-[var(--card)]" : "text-[var(--a-muted)]"}`}>
                  {l}
                </button>
              ))}
            </div>
            <button type="submit" className="btn btn-sm btn-primary" disabled={busy || !comment.trim()}>
              {visibility === "public" ? "Send reply" : "Add note"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
