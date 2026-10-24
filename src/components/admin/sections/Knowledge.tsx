"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { actOnKnowledgeEdit, getKnowledgeDoc, listKnowledge, saveKnowledgeEdit } from "@/lib/admin/api";
import { compact, diffLines } from "@/lib/admin/diff";
import { toast } from "../toast";
import { PageHead, Pill } from "../Ui";
import { timeAgo } from "../website/RevisionBadge";

// Repository documents, as deployed. Editing opens a pull request; nothing is "saved" into a second copy.
const STATE_HELP: Record<string, string> = {
  draft: "Saved here only. Not active, and not in the repository.",
  pending: "Pull request open (or merged, waiting for a deploy). Not active yet.",
  effective: "In the deployed site.",
  sync_failed: "GitHub refused it. Not active.",
  conflict: "The repository changed under this edit. Not active; re-apply it on the new revision.",
  discarded: "Dropped.",
};

function Diff({ before, after }: { before: string; after: string }) {
  const rows = useMemo(() => compact(diffLines(before, after)), [before, after]);
  return (
    <pre className="max-h-96 overflow-auto rounded-md border border-[var(--a-border)] p-2 text-xs leading-5">
      {rows.map((r, i) =>
        r.kind === "gap" ? (
          <div key={i} className="text-[var(--a-muted)]">… {r.hidden} unchanged lines …</div>
        ) : (
          <div key={i} className={r.kind === "add" ? "bg-green-100" : r.kind === "del" ? "bg-red-100 line-through decoration-red-300" : ""}>
            {r.kind === "add" ? "+ " : r.kind === "del" ? "- " : "  "}
            {r.text}
          </div>
        )
      )}
    </pre>
  );
}

function Editor({ path, onBack }: { path: string; onBack: () => void }) {
  const [doc, setDoc] = useState<any>(null);
  const [text, setText] = useState("");
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState("");
  const [restore, setRestore] = useState<any>(null);

  const load = useCallback(() => {
    getKnowledgeDoc(path)
      .then((d) => (setDoc(d), setText(d.content)))
      .catch((e) => toast.error(e.message));
  }, [path]);
  useEffect(load, [load]);

  if (!doc) return <p className="text-sm text-[var(--a-muted)]">Loading…</p>;
  const connected = doc.connection.writeback === "connected";
  const changed = text !== doc.content;

  const save = async (submit: boolean) => {
    setBusy(submit ? "submit" : "draft");
    try {
      const edit = await saveKnowledgeEdit({ path, content: text, baseSha: doc.sha, note, submit });
      toast.success(submit ? `Pull request opened: ${edit.prUrl}` : "Draft saved. It is not active.");
      load();
    } catch (e: any) {
      toast.error(e.message);
      load();
    } finally {
      setBusy("");
    }
  };
  const act = async (id: number, action: "submit" | "refresh" | "discard") => {
    try {
      await actOnKnowledgeEdit(id, action);
      load();
    } catch (e: any) {
      toast.error(e.message);
      load();
    }
  };

  return (
    <div className="grid gap-4">
      <button type="button" className="w-fit text-sm text-[var(--a-muted)] underline" onClick={onBack}>← All documents</button>
      <PageHead title={doc.title}>
        <span className="font-mono">{doc.path}</span> · revision <span className="font-mono">{doc.sha.slice(0, 7)}</span> · <Pill value={doc.freshness} /> {doc.verified_on ? `verified ${doc.verified_on}` : ""}
        {doc.owner ? ` · owner ${doc.owner}` : " · owner unknown"}
      </PageHead>
      {doc.repoAhead && <p className="rounded-md bg-amber-100 p-2 text-sm text-amber-900">The repository has a newer revision than this deployment (merged but not deployed, or edited elsewhere). What you see is the deployed one; a new edit will be checked against the repository and refused if it conflicts.</p>}
      {!connected && <p className="rounded-md bg-[var(--a-hover)] p-2 text-sm">GitHub writeback is not connected, so edits can be saved as drafts but cannot become active. {doc.connection.needs}</p>}

      <textarea aria-label={`Contents of ${doc.path}`} className="box-border min-h-[24rem] w-full rounded-lg border border-[var(--a-border)] p-3 font-mono text-xs leading-5" value={text} onChange={(e) => setText(e.target.value)} spellCheck={false} />
      {changed && (
        <>
          <h2 className="text-sm font-bold">Your changes</h2>
          <Diff before={doc.content} after={text} />
        </>
      )}
      <div className="flex flex-wrap items-center gap-2">
        <input aria-label="Note for the pull request" className="min-w-64 flex-1 rounded-lg border border-[var(--a-border)] px-3 py-1.5 text-sm" placeholder="Why this change (optional)" value={note} onChange={(e) => setNote(e.target.value)} />
        <button type="button" className="btn" disabled={!changed || !!busy} onClick={() => save(false)}>Save draft</button>
        <button type="button" className="btn btn-primary" disabled={!changed || !!busy || !connected} onClick={() => save(true)} title={connected ? "" : "GitHub writeback is not connected"}>Open pull request</button>
      </div>

      <section className="grid gap-2">
        <h2 className="text-sm font-bold uppercase tracking-wide text-[var(--a-muted)]">History of edits made here</h2>
        {doc.history.length === 0 && <p className="text-sm text-[var(--a-muted)]">No edits made from the admin yet. Full history is in git.</p>}
        <ul className="grid gap-2">
          {doc.history.map((h: any) => (
            <li key={h.id} className="a-card grid gap-1 p-3 text-sm">
              <div className="flex flex-wrap items-center gap-2">
                <Pill value={h.status} /> <span>#{h.id} by {h.actorName} · {timeAgo(h.createdAt)}</span>
                {h.prUrl && <a href={h.prUrl} className="underline" target="_blank" rel="noreferrer">pull request</a>}
              </div>
              <p className="text-xs text-[var(--a-muted)]">{STATE_HELP[h.status]} {h.error || ""} {h.note ? `Note: ${h.note}` : ""}</p>
              <div className="flex flex-wrap gap-2">
                <button type="button" className="btn btn-sm" onClick={() => setRestore(restore?.id === h.id ? null : h)}>{restore?.id === h.id ? "Hide diff" : "Diff vs deployed"}</button>
                <button type="button" className="btn btn-sm" onClick={() => (setText(h.content), window.scrollTo({ top: 0 }))}>Load into editor (restore)</button>
                {["pending"].includes(h.status) && <button type="button" className="btn btn-sm" onClick={() => act(h.id, "refresh")}>Check status</button>}
                {["draft", "sync_failed"].includes(h.status) && connected && <button type="button" className="btn btn-sm" onClick={() => act(h.id, "submit")}>Open pull request</button>}
                {["draft", "sync_failed", "conflict"].includes(h.status) && <button type="button" className="btn btn-sm" onClick={() => act(h.id, "discard")}>Discard</button>}
              </div>
              {restore?.id === h.id && <Diff before={doc.content} after={h.content} />}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default function Knowledge() {
  const router = useRouter();
  const params = useSearchParams();
  const path = params.get("path");
  const [data, setData] = useState<any>(null);
  useEffect(() => {
    if (!path) listKnowledge().then(setData).catch((e) => toast.error(e.message));
  }, [path]);

  if (path) return <Editor path={path} onBack={() => router.push("/admin/knowledge")} />;
  if (!data) return <p className="text-sm text-[var(--a-muted)]">Loading…</p>;
  return (
    <div className="grid max-w-5xl gap-4">
      <PageHead title="Knowledge">The repository's marketing and engineering documents as deployed (revision {data.connection.build.commit.slice(0, 7)}). Agents read the same files from the repository; an edit here becomes a pull request and is effective once merged and deployed.</PageHead>
      <p className="text-sm">Writeback: <Pill value={data.connection.writeback} /> {data.connection.needs}</p>
      <div className="a-card overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs uppercase text-[var(--a-muted)]"><th className="p-2">Document</th><th>Status</th><th>Verified</th><th>Open edits</th></tr>
          </thead>
          <tbody>
            {data.docs.map((d: any) => (
              <tr key={d.path} className="border-t border-[var(--a-border)]">
                <td className="p-2"><a href={`/admin/knowledge?path=${encodeURIComponent(d.path)}`} className="font-medium underline">{d.title}</a><div className="font-mono text-xs text-[var(--a-muted)]">{d.path}</div></td>
                <td><Pill value={d.freshness} /></td>
                <td className="text-xs">{d.verified_on || "never"}</td>
                <td>{d.openEdits.length ? d.openEdits.map((e: any) => <Pill key={e.id} value={e.status} />) : <span className="text-xs text-[var(--a-muted)]">none</span>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
