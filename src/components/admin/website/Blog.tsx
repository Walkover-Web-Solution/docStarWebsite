"use client";

import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "../toast";
import { approveBlogPost, getBlog, rejectBlogPost, runBlogNow, setBlogEnabled } from "@/lib/admin/api";
import { timeAgo } from "./RevisionBadge";
import WebsiteNav from "./WebsiteNav";

// The blog autopilot: on/off, its daily run, and the drafts waiting for review. A draft is an unpublished page
// in the DocStar "Blogs" collection; Approve publishes it on docstar.io/blog, Reject deletes it.
const STATUS: Record<string, { label: string; tone: string }> = {
  writing: { label: "writing", tone: "bg-[var(--lime)] text-[var(--ink)]" },
  draft: { label: "waiting for review", tone: "bg-amber-100 text-amber-900" },
  published: { label: "published", tone: "bg-green-100 text-green-900" },
  rejected: { label: "rejected", tone: "bg-[var(--a-hover)] text-[var(--a-muted)]" },
  skipped: { label: "skipped", tone: "bg-[var(--a-hover)] text-[var(--a-muted)]" },
  failed: { label: "failed", tone: "bg-red-100 text-red-900" },
};

export default function Blog() {
  const [data, setData] = useState<any>(null);
  const [busy, setBusy] = useState("");
  const [rejecting, setRejecting] = useState<number | null>(null);
  const [reason, setReason] = useState("");
  const focus = Number(useSearchParams().get("draft")) || null;

  const load = useCallback(() => {
    getBlog()
      .then(setData)
      .catch((e) => toast.error(e.message));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  // while a post is being written, check every 10 seconds
  useEffect(() => {
    if (!data?.running) return;
    const t = setInterval(load, 10000);
    return () => clearInterval(t);
  }, [data?.running, load]);

  // the Slack link opens ?draft=<id>: bring that post into view
  useEffect(() => {
    if (focus && data) document.getElementById(`post-${focus}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [focus, !!data]);

  const act = async (label: string, fn: () => Promise<any>, done: string) => {
    setBusy(label);
    try {
      const next = await fn();
      if (next?.posts) setData(next);
      else load();
      toast.success(done);
      return true;
    } catch (e: any) {
      toast.error(e.message);
      return false;
    } finally {
      setBusy("");
    }
  };

  const header = (
    <div>
      <h1 className="text-2xl font-bold">Website</h1>
      <p className="text-sm text-[var(--a-muted)]">
        Every day the AI picks a trending AI topic that relates to DocStar, writes a post and saves it as a draft in the DocStar Blogs collection. Nothing goes live on docstar.io/blog until someone approves it here.
      </p>
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

  const ready = data.configured.ai && data.configured.docstar;
  return (
    <div className="grid max-w-5xl gap-4">
      {header}

      <section className="a-card grid gap-3 p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className={`rounded-full px-3 py-1 font-mono text-xs font-semibold ${data.enabled ? "bg-[var(--lime)] text-[var(--ink)]" : "bg-[var(--a-hover)] text-[var(--a-muted)]"}`}>{data.enabled ? "ON" : "OFF"}</span>
            <p className="text-sm">
              {data.running ? "Writing a post… (a few minutes)" : data.enabled ? `Next post ${new Date(data.nextRunAt).toLocaleString(undefined, { weekday: "short", hour: "2-digit", minute: "2-digit" })}` : "Paused. No posts are written until you turn it on."}
            </p>
          </div>
          <div className="flex gap-2">
            <button type="button" className="btn btn-sm" disabled={!!busy || !data.enabled || data.running || !ready} onClick={() => act("run", runBlogNow, "Done. See the newest post below.")}>
              {busy === "run" ? "Writing… (2–3 min)" : "Write one now"}
            </button>
            <button type="button" className={`btn btn-sm ${data.enabled ? "" : "btn-primary"}`} disabled={!!busy || !ready} onClick={() => act("toggle", () => setBlogEnabled(!data.enabled), data.enabled ? "Blog autopilot paused." : "Blog autopilot on. It writes a post every day at 9:00.")}>
              {data.enabled ? "Pause" : "Turn on"}
            </button>
          </div>
        </div>
        {!data.configured.ai && <p className="text-sm text-red-700">viaSocket isn't set up on the server (VIASOCKET_ORG_ID, VIASOCKET_PROJECT_ID and VIASOCKET_EMBED_SECRET), so the AI can't write.</p>}
        {!data.configured.docstar && <p className="text-sm text-red-700">DOCSTAR_API_TOKEN isn't set on the server, so drafts can't be saved to the DocStar Blogs collection.</p>}
        {!data.configured.slack && <p className="text-sm text-[var(--a-muted)]">No Slack message: BLOG_NOTIFY_WEBHOOK_URL (the viaSocket flow's webhook) isn't set. Drafts still appear here.</p>}
        <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs text-[var(--a-muted)]">
          <span>
            Waiting for review: {data.waiting}/{data.maxWaiting} (it stops writing at {data.maxWaiting})
          </span>
          <span>One post a day</span>
          <span>Model: {data.model}</span>
        </div>
      </section>

      <section className="grid gap-2">
        <h2 className="text-base font-semibold">Posts</h2>
        {data.posts.length === 0 && <p className="text-sm text-[var(--a-muted)]">Nothing yet.</p>}
        <ul className="grid gap-2">
          {data.posts.map((p: any) => (
            <li key={p.id} id={`post-${p.id}`} className={`a-card grid gap-2 p-4 ${focus === p.id ? "outline outline-2 outline-[var(--lime)]" : ""}`}>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="flex flex-wrap items-center gap-2 text-xs text-[var(--a-muted)]">
                    <span className={`rounded-full px-2 py-0.5 font-mono text-[11px] ${STATUS[p.status]?.tone || ""}`}>{STATUS[p.status]?.label || p.status}</span>
                    {p.format && <span className="rounded-full border border-[var(--a-border)] px-2 py-0.5 font-mono text-[11px]">{p.format}</span>}
                    {p.topic && <span>{p.topic}</span>}
                    <span>· {timeAgo(p.createdAt)}</span>
                    {p.decidedBy && <span>· by {p.decidedBy}</span>}
                  </p>
                  <p className="mt-1 text-sm font-semibold">{p.title}</p>
                  {p.slug && p.status !== "published" && <p className="font-mono text-xs text-[var(--a-muted)]">/blog/{p.slug}</p>}
                </div>
                <div className="flex flex-wrap gap-2">
                  {p.editUrl && (p.status === "draft" || p.status === "published") && (
                    <a href={p.editUrl} target="_blank" rel="noreferrer" className="btn btn-sm no-underline">
                      Edit in DocStar
                    </a>
                  )}
                  {p.publicUrl && (
                    <a href={p.publicUrl} target="_blank" rel="noreferrer" className="btn btn-sm no-underline">
                      View post
                    </a>
                  )}
                  {p.status === "draft" && (
                    <>
                      <button type="button" className="btn btn-sm" disabled={!!busy} onClick={() => (setRejecting(rejecting === p.id ? null : p.id), setReason(""))}>
                        Reject
                      </button>
                      <button type="button" className="btn btn-sm btn-primary" disabled={!!busy} onClick={() => act(`ok-${p.id}`, () => approveBlogPost(p.id), "Published on docstar.io/blog.")}>
                        {busy === `ok-${p.id}` ? "Publishing…" : "Approve & publish"}
                      </button>
                    </>
                  )}
                </div>
              </div>
              {p.coverUrl && p.status === "draft" && <img src={p.coverUrl} alt="Cover image" className="max-h-48 w-auto rounded-md border border-[var(--a-border)]" />}
              {p.whyNow && <p className="text-sm">{p.whyNow}</p>}
              {p.metaDescription && <p className="text-xs text-[var(--a-muted)]">Meta description: {p.metaDescription}</p>}
              {p.sources.length > 0 && (
                <p className="flex flex-wrap gap-x-3 gap-y-1 text-xs">
                  <span className="text-[var(--a-muted)]">Sources:</span>
                  {p.sources.map((s: any) => (
                    <a key={s.url} href={s.url} target="_blank" rel="noreferrer" className="underline">
                      {s.title}
                    </a>
                  ))}
                </p>
              )}
              {p.reason && <p className={`text-xs ${p.status === "failed" ? "text-red-700" : "text-[var(--a-muted)]"}`}>{p.status === "rejected" ? "Rejected: " : p.status === "skipped" ? "Skipped: " : p.status === "failed" ? "Failed: " : ""}{p.reason}</p>}
              {p.markdown && (
                <details open={focus === p.id}>
                  <summary className="cursor-pointer text-xs font-medium">Read the post</summary>
                  <pre className="mt-2 max-h-[480px] overflow-auto whitespace-pre-wrap rounded-md border border-[var(--a-border)] p-3 font-sans text-sm leading-relaxed">{p.markdown}</pre>
                  <p className="mt-1 text-xs text-[var(--a-muted)]">Changes made in the DocStar editor are what gets published; this is the AI's first version.</p>
                </details>
              )}
              {rejecting === p.id && (
                <div className="grid gap-2">
                  <textarea
                    className="box-border w-full rounded-lg border border-[var(--a-border)] px-3 py-2 text-sm"
                    rows={2}
                    maxLength={2000}
                    placeholder="Why? (the AI reads this so it doesn't pitch the same thing again)"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                  />
                  <div>
                    <button
                      type="button"
                      className="btn btn-sm"
                      disabled={!!busy}
                      onClick={async () => {
                        if (await act(`no-${p.id}`, () => rejectBlogPost(p.id, reason), "Rejected. The DocStar draft was deleted.")) setRejecting(null);
                      }}
                    >
                      {busy === `no-${p.id}` ? "Rejecting…" : "Reject and delete the draft"}
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
