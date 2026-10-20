"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { toast } from "../toast";
import { getPreviewLink, getSitePage, getSiteRevision, publishSiteRevision, rollbackSiteRevision, saveSiteRevision } from "@/lib/admin/api";
import FieldEditor from "./FieldEditor";
import RevisionBadge, { timeAgo } from "./RevisionBadge";

const clone = (v: any) => JSON.parse(JSON.stringify(v));
const same = (a: any, b: any) => JSON.stringify(a) === JSON.stringify(b);
const tool = "rounded-md border border-[var(--a-border)] px-2 py-0.5 text-xs hover:border-[var(--a-text)] disabled:opacity-30";

// Edit one docstar.io page by hand: sections as forms, save a draft, preview it on the website,
// publish, and restore old versions from the history. Day to day the AI autopilot does this.
export default function PageEditor({ slug }: { slug: string }) {
  const [page, setPage] = useState<any>(null);
  const [published, setPublished] = useState<any>(null);
  const [base, setBase] = useState<any>(null);
  const [content, setContent] = useState<any>(null);
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState("");

  const load = useCallback(
    async (revisionId?: number) => {
      const p: any = await getSitePage(slug);
      setPage(p);
      const live: any = p.publishedRevisionId ? await getSiteRevision(p.publishedRevisionId) : null;
      setPublished(live);
      const target = revisionId ?? p.revisions[0]?.id;
      const rev: any = target ? (target === live?.id ? live : await getSiteRevision(target)) : null;
      setBase(rev);
      setContent(rev ? clone(rev.content) : null);
      setNote("");
    },
    [slug]
  );

  useEffect(() => {
    load().catch((e) => toast.error(e.message));
  }, [load]);

  const dirty = useMemo(() => !!base && !!content && !same(base.content, content), [base, content]);
  const liveSections = useMemo(() => new Map<string, any>((published?.content.sections || []).map((x: any) => [x.key, x])), [published]);

  const run = async (label: string, fn: () => Promise<string | undefined>) => {
    setBusy(label);
    try {
      const message = await fn();
      if (message) toast.success(message);
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setBusy("");
    }
  };

  // Saves the working copy as a new revision when it has changes; returns the revision to act on.
  const saveIfDirty = async () => {
    if (!dirty) return base.id;
    const saved: any = await saveSiteRevision(slug, { content, note: note || undefined, basedOnRevisionId: base.id });
    return saved.id;
  };

  const save = () => run("save", async () => (await load(await saveIfDirty()), "Draft saved."));
  const publish = () =>
    run("publish", async () => {
      const rev: any = await publishSiteRevision(await saveIfDirty());
      await load(rev.id);
      return `v${rev.version} is live. The site updates within a minute.`;
    });
  const preview = () =>
    run("preview", async () => {
      // open the tab first so popup blockers allow it, then point it at the signed link
      const tab = window.open("about:blank", "_blank");
      const id = await saveIfDirty();
      if (id !== base.id) await load(id);
      const { url } = await getPreviewLink(slug);
      if (tab) tab.location.href = url;
      else window.open(url, "_blank");
      return "Preview opened (shows the newest draft for 10 minutes).";
    });
  const restore = (id: number, version: number) =>
    run("restore", async () => {
      if (!window.confirm(`Restore v${version} and publish it now?`)) return "";
      const rev: any = await rollbackSiteRevision(id);
      await load(rev.id);
      return `Restored v${version} as v${rev.version}. It's live.`;
    });

  const setSections = (sections: any[]) => setContent({ ...content, sections });
  const moveSection = (i: number, to: number) => {
    const sections = [...content.sections];
    const [item] = sections.splice(i, 1);
    sections.splice(to, 0, item);
    setSections(sections);
  };
  const duplicateSection = (i: number) => {
    const copy = clone(content.sections[i]);
    let key = `${copy.key}-copy`;
    for (let n = 2; content.sections.some((x: any) => x.key === key); n++) key = `${copy.key}-copy-${n}`;
    copy.key = key;
    const sections = [...content.sections];
    sections.splice(i + 1, 0, copy);
    setSections(sections);
  };
  const removeSection = (i: number) => window.confirm(`Remove section "${content.sections[i].key}"?`) && setSections(content.sections.filter((_: any, j: number) => j !== i));

  if (!page || !content || !base) return <p className="text-sm text-[var(--a-muted)]">Loading…</p>;

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_300px] xl:items-start">
      <div className="min-w-0">
        <Link href="/admin/website" className="text-sm text-[var(--a-muted)] no-underline">
          ← Website
        </Link>
        <h1 className="mt-1 text-2xl font-bold">{content.meta.title}</h1>
        <p className="mt-1 flex flex-wrap items-center gap-2 text-sm text-[var(--a-muted)]">
          <a href={page.path} target="_blank" rel="noopener noreferrer" className="font-mono text-xs text-[var(--a-text)] underline">
            {page.path}
          </a>
          · editing v{base.version} <RevisionBadge status={base.status} />
          {base.actorType === "agent" && <span className="rounded-full border border-[var(--ink)] bg-[var(--lime-soft)] px-2 py-0.5 text-xs">agent · {base.actorName}</span>}
          {dirty && <span className="rounded-full bg-[var(--a-accent-soft)] px-2 py-0.5 text-xs font-medium">unsaved changes</span>}
        </p>
        {base.note && <p className="mt-1 text-sm italic text-[var(--a-muted)]">“{base.note}”</p>}

        <div className="a-card sticky top-[57px] z-10 mt-4 flex flex-wrap items-center gap-2 p-3">
          <input className="box-border min-w-[200px] flex-1 rounded-lg border border-[var(--a-border)] px-3 py-1.5 text-sm" placeholder="What changed? (shown in history)" value={note} onChange={(e) => setNote(e.target.value)} />
          <button type="button" className="btn btn-sm" disabled={!!busy || !dirty} onClick={save}>
            {busy === "save" ? "Saving…" : "Save draft"}
          </button>
          <button type="button" className="btn btn-sm" disabled={!!busy} onClick={preview}>
            {busy === "preview" ? "Opening…" : "Preview"}
          </button>
          <button type="button" className="btn btn-sm btn-primary" disabled={!!busy || (!dirty && base.status === "published")} onClick={publish}>
            {busy === "publish" ? "Publishing…" : "Publish"}
          </button>
          {dirty && (
            <button type="button" className="text-sm underline" onClick={() => setContent(clone(base.content))}>
              Discard changes
            </button>
          )}
        </div>

          <div className="mt-4 grid gap-2">
            <details className="rounded-xl border border-[var(--a-border)] bg-[var(--a-surface)]" open>
              <summary className="flex cursor-pointer items-center gap-2 px-4 py-3 text-sm">
                <span className="rounded bg-[var(--a-text)] px-2 py-0.5 font-mono text-[11px] text-[var(--a-surface)]">meta</span> Title, description and keywords (SEO)
                {!same(content.meta, published?.content.meta) && <span className="rounded-full bg-[var(--a-accent-soft)] px-2 py-0.5 text-xs">edited</span>}
              </summary>
              <div className="border-t border-dashed border-[var(--a-border)] px-4 pb-4">
                <FieldEditor label="" value={content.meta} onChange={(meta) => setContent({ ...content, meta })} />
              </div>
            </details>

            {content.sections.map((section: any, i: number) => {
              const { type, key, ...rest } = section;
              const live = liveSections.get(key);
              const changed = !live || !same(live, section);
              return (
                <details key={`${key}-${i}`} className="rounded-xl border border-[var(--a-border)] bg-[var(--a-surface)]">
                  <summary className="flex cursor-pointer flex-wrap items-center gap-2 px-4 py-3 text-sm">
                    <span className="rounded bg-[var(--a-text)] px-2 py-0.5 font-mono text-[11px] text-[var(--a-surface)]">{type}</span>
                    <span className="font-mono text-xs text-[var(--a-muted)]">{key}</span>
                    {changed && <span className="rounded-full bg-[var(--a-accent-soft)] px-2 py-0.5 text-xs">{live ? "edited" : "new"}</span>}
                    <span className="ml-auto flex gap-1" onClick={(e) => e.preventDefault()}>
                      <button type="button" className={tool} disabled={i === 0} onClick={() => moveSection(i, i - 1)} aria-label="Move up">
                        ↑
                      </button>
                      <button type="button" className={tool} disabled={i === content.sections.length - 1} onClick={() => moveSection(i, i + 1)} aria-label="Move down">
                        ↓
                      </button>
                      <button type="button" className={tool} onClick={() => duplicateSection(i)}>
                        Duplicate
                      </button>
                      <button type="button" className={tool} onClick={() => removeSection(i)}>
                        Remove
                      </button>
                    </span>
                  </summary>
                  <div className="border-t border-dashed border-[var(--a-border)] px-4 pb-4">
                    <FieldEditor label="" value={rest} onChange={(v) => setSections(content.sections.map((x: any, j: number) => (j === i ? { ...v, type, key } : x)))} />
                  </div>
                </details>
              );
            })}
          </div>
      </div>

      <aside className="min-w-0 xl:sticky xl:top-[70px] xl:max-h-[calc(100vh-90px)] xl:overflow-auto">
        <h2 className="text-base font-semibold">History</h2>
        <ol className="mt-2 grid gap-2">
          {page.revisions.map((r: any) => (
            <li key={r.id} className={`rounded-lg border bg-[var(--a-surface)] p-3 ${r.id === base.id ? "border-[var(--a-text)]" : "border-[var(--a-border)]"}`}>
              <button type="button" className="grid w-full gap-0.5 text-left" onClick={() => run("load", async () => (await load(r.id), ""))}>
                <span className="flex items-center gap-2">
                  <strong>v{r.version}</strong> <RevisionBadge status={r.status} />
                </span>
                <span className="text-xs text-[var(--a-muted)]">
                  {r.actorType === "agent" ? "agent · " : ""}
                  {r.actorName} · {timeAgo(r.createdAt)}
                </span>
                {r.note && <span className="break-words text-xs">{r.note}</span>}
              </button>
              {(r.status === "superseded" || r.status === "rejected") && (
                <button type="button" className="mt-1 text-xs underline" onClick={() => restore(r.id, r.version)}>
                  Restore
                </button>
              )}
            </li>
          ))}
        </ol>
      </aside>
    </div>
  );
}
