"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { toast } from "../toast";
import { createSitePage, getBundledPages, listSitePages, publishSiteRevision, saveSiteRevision } from "@/lib/admin/api";
import { timeAgo } from "./RevisionBadge";
import WebsiteNav from "./WebsiteNav";

// Every docstar.io page except pricing, all editable here and by the autopilot. A page still served
// from code is copied into the editor and published unchanged the first time this list opens, so
// visitors keep seeing the same page. Pricing stays in code and isn't shown.
const HIDDEN = ["pricing"];
const shortTitle = (t: string) => t.replace(/\s*[|\-–]\s*DocStar\s*$/i, "").replace(/^DocStar:\s*/i, "");

export default function WebsitePages() {
  const [pages, setPages] = useState<any[] | null>(null);
  const [bundled, setBundled] = useState<any[]>([]);
  const [syncing, setSyncing] = useState(false);
  const synced = useRef(false);

  const load = useCallback(() => listSitePages().then((r: any) => (setPages(r.pages), r.pages)), []);

  // Make every page editable: copy what's only in code (or never published) and publish it as is.
  useEffect(() => {
    Promise.all([load(), getBundledPages()])
      .then(async ([inEditor, code]: [any[], any[]]) => {
        const shown = code.filter((b) => !HIDDEN.includes(b.slug));
        setBundled(shown);
        if (synced.current) return;
        synced.current = true;
        const todo = shown.filter((b) => !inEditor.find((p) => p.slug === b.slug)?.published);
        if (!todo.length) return;
        setSyncing(true);
        for (const b of todo) {
          const content = { meta: b.meta, sections: b.sections };
          const existing = inEditor.find((p) => p.slug === b.slug);
          const rev: any = existing ? await saveSiteRevision(b.slug, { content, note: "Copied from code" }) : (await createSitePage({ slug: b.slug, path: b.path, content, note: "Copied from code" })).revision;
          await publishSiteRevision(rev.id);
        }
        await load();
        setSyncing(false);
      })
      .catch((e) => (setSyncing(false), toast.error(e.message)));
  }, [load]);

  const rows = bundled.map((b) => {
    const p = pages?.find((x) => x.slug === b.slug);
    const draft = p?.latest && p.latest.id !== p.published?.id && p.latest.status === "draft" ? p.latest : null;
    return { slug: b.slug, path: b.path, title: shortTitle(p?.title || b.meta.title), published: p?.published || null, draft };
  });

  return (
    <div className="grid max-w-5xl gap-4">
      <div>
        <h1 className="text-2xl font-bold">Website</h1>
        <p className="text-sm text-[var(--a-muted)]">Every page on docstar.io. The AI keeps them up to date; edit one only when you need to. Changes go live within a minute.</p>
        <div className="mt-3">
          <WebsiteNav />
        </div>
      </div>

      <div className="a-card overflow-x-auto">
        {(!pages || syncing) && <p className="p-6 text-sm text-[var(--a-muted)]">{syncing ? "Making every page editable…" : "Loading…"}</p>}
        {pages && !syncing && (
          <table className="w-full min-w-[560px] text-sm">
            <thead>
              <tr className="border-b border-[var(--a-border)] text-left text-xs uppercase text-[var(--a-muted)]">
                <th className="px-4 py-2.5">Page</th>
                <th className="px-4 py-2.5">Last change</th>
                <th className="px-4 py-2.5" />
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.slug} className="border-b border-[var(--a-border)] align-top last:border-0">
                  <td className="px-4 py-3">
                    <p className="font-medium">{r.title}</p>
                    <p className="font-mono text-xs text-[var(--a-muted)]">{r.path}</p>
                  </td>
                  <td className="px-4 py-3">
                    {r.published ? <p>{timeAgo(r.published.publishedAt)}</p> : <p className="text-[var(--a-muted)]">—</p>}
                    {r.draft && <p className="text-xs text-[var(--a-muted)]">Unpublished changes by {r.draft.actorType === "agent" ? "the AI" : r.draft.actorName}</p>}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link href={`/admin/website/${r.slug}`} className="btn btn-sm no-underline">
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
