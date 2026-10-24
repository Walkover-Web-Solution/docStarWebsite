import { AdminError, createRow, getRow, mapRow, updateRow, type Actor, type AdminRow } from "./adminTypes";
import type { Db } from "./db";
import { KNOWLEDGE_BUILD, KNOWLEDGE_DOCS } from "@/content/knowledge.generated";

// The website's marketing and engineering knowledge is Markdown in this repository (AGENTS.md, docs/**).
// The repository is the only source of truth. The admin shows the revision bundled into the running
// deployment ("effective"), and an edit becomes a pull request through the GitHub API. Nothing here is a
// second editable copy: a `knowledge_edit` row is a proposal and records where it is on its way in.
//
// Edit states: draft (saved here only, GitHub not used) · pending (pull request open, or merged and
// waiting for a deploy) · effective (the deployment contains it) · sync_failed · conflict · discarded.

export const STALE_AFTER_DAYS = 45;

export type Frontmatter = { covers: string[]; verified_at: string | null; verified_on: string | null; status: string | null; owner: string | null; source: string | null };

export function parseFrontmatter(text: string): { meta: Frontmatter; body: string } {
  const empty: Frontmatter = { covers: [], verified_at: null, verified_on: null, status: null, owner: null, source: null };
  const m = text.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!m) return { meta: empty, body: text };
  const meta = { ...empty };
  for (const line of m[1].split("\n")) {
    const kv = line.match(/^(\w+):\s*(.*)$/);
    if (!kv) continue;
    const [, k, v] = kv;
    if (k === "covers") meta.covers = v.replace(/^\[|\]$/g, "").split(",").map((x) => x.trim()).filter(Boolean);
    else if (k in meta) (meta as any)[k] = v.trim() || null;
  }
  return { meta, body: text.slice(m[0].length) };
}

const titleOf = (path: string, body: string) => body.match(/^#\s+(.+)$/m)?.[1] || path;

function freshness(meta: Frontmatter) {
  if (!meta.verified_on) return "unverified" as const;
  const age = (Date.now() - Date.parse(meta.verified_on)) / 86400000;
  return age > STALE_AFTER_DAYS ? ("stale" as const) : ("fresh" as const);
}

// ---------- GitHub ----------

const REPO = () => process.env.GITHUB_REPO; // owner/name
const BASE = () => process.env.KNOWLEDGE_BASE_BRANCH || "main";
export const githubConfigured = () => !!(process.env.GITHUB_TOKEN && REPO());

async function gh(path: string, init: RequestInit = {}) {
  const res = await fetch(`${process.env.GITHUB_API_URL || "https://api.github.com"}/repos/${REPO()}${path}`, {
    ...init,
    headers: { authorization: `Bearer ${process.env.GITHUB_TOKEN}`, accept: "application/vnd.github+json", "user-agent": "docstar-website-admin", "content-type": "application/json", ...(init.headers || {}) },
    signal: AbortSignal.timeout(15_000),
  });
  const data: any = await res.json().catch(() => ({}));
  if (!res.ok) throw Object.assign(new Error(data?.message || `GitHub ${res.status}`), { status: res.status });
  return data;
}

export const connection = () => ({
  writeback: githubConfigured() ? ("connected" as const) : ("not_connected" as const),
  repo: githubConfigured() ? REPO()! : null,
  baseBranch: BASE(),
  build: KNOWLEDGE_BUILD,
  needs: githubConfigured() ? null : "Set GITHUB_TOKEN (contents + pull requests write) and GITHUB_REPO=owner/name on the server. Until then edits can be saved as drafts but never become active.",
});

/** The document's current revision on the base branch, or null when GitHub isn't connected or unreachable. */
async function remoteHead(path: string): Promise<{ sha: string } | null> {
  if (!githubConfigured()) return null;
  try {
    const data = await gh(`/contents/${path.split("/").map(encodeURIComponent).join("/")}?ref=${encodeURIComponent(BASE())}`);
    return { sha: data.sha };
  } catch {
    return null;
  }
}

// ---------- reading ----------

const bundled = (path: string) => KNOWLEDGE_DOCS.find((d) => d.path === path);

const editView = (r: AdminRow) => ({
  id: r.id,
  path: r.key as string,
  status: r.status as string,
  note: r.data.note as string | null,
  prUrl: r.data.prUrl as string | null,
  error: r.data.error as string | null,
  baseSha: r.data.baseSha as string,
  actorName: r.actorName,
  createdAt: r.createdAt,
  updatedAt: r.updatedAt,
});

export async function listDocs(db: Db) {
  const edits = (await db.query("SELECT * FROM admin WHERE type = 'knowledge_edit' AND status NOT IN ('effective', 'discarded') ORDER BY created_at DESC")).map(mapRow);
  return KNOWLEDGE_DOCS.map((d) => {
    const { meta, body } = parseFrontmatter(d.content);
    const open = edits.filter((e) => e.key === d.path);
    return { path: d.path, title: titleOf(d.path, body), sha: d.sha, ...meta, freshness: freshness(meta), openEdits: open.map(editView) };
  });
}

export async function getDoc(db: Db, path: string) {
  const doc = bundled(path);
  if (!doc) throw new AdminError(404, "No such document");
  const { meta, body } = parseFrontmatter(doc.content);
  const history = (await db.query("SELECT * FROM admin WHERE type = 'knowledge_edit' AND key = $1 ORDER BY created_at DESC LIMIT 30", [path])).map(mapRow);
  const head = await remoteHead(path);
  return {
    path,
    title: titleOf(path, body),
    content: doc.content,
    sha: doc.sha,
    ...meta,
    freshness: freshness(meta),
    // the repository has a newer revision than the running deployment: merged, awaiting deploy (or an outside edit)
    repoAhead: head ? head.sha !== doc.sha : null,
    repoSha: head?.sha ?? null,
    connection: connection(),
    history: history.map((r) => ({ ...editView(r), content: r.data.content as string })),
  };
}

// ---------- editing ----------

export async function saveEdit(db: Db, input: { path: string; content: string; baseSha: string; note?: string; submit: boolean }, actor: Actor) {
  const doc = bundled(input.path);
  if (!doc) throw new AdminError(404, "No such document");
  if (!input.content.trim()) throw new AdminError(400, "A document can't be empty");
  if (input.content === doc.content) throw new AdminError(400, "No changes");
  const row = await createRow(db, "knowledge_edit", { key: input.path, status: "draft", actor, data: { content: input.content, baseSha: input.baseSha, note: input.note?.slice(0, 500) || null } });
  return input.submit ? submitEdit(db, row.id, actor) : editView(row);
}

/** Opens a pull request for a draft edit. A stale base revision is a conflict, never an overwrite. */
export async function submitEdit(db: Db, id: number, actor: Actor) {
  const row = await getRow(db, id, "knowledge_edit");
  if (!row) throw new AdminError(404, "Edit not found");
  if (!["draft", "sync_failed", "conflict"].includes(row.status as string)) throw new AdminError(409, `This edit is already ${row.status}`);
  if (!githubConfigured()) throw new AdminError(503, connection().needs!);
  const path = row.key as string;
  const fail = async (status: "sync_failed" | "conflict", error: string) => {
    await updateRow(db, row, { status, data: { error: error.slice(0, 1000) } });
    throw new AdminError(status === "conflict" ? 409 : 502, error);
  };
  try {
    const head = await gh(`/contents/${path.split("/").map(encodeURIComponent).join("/")}?ref=${encodeURIComponent(BASE())}`);
    if (head.sha !== row.data.baseSha) return fail("conflict", "The document changed in the repository after you opened it. Reload it and re-apply your edit on the new revision.");
    const base = await gh(`/git/ref/heads/${encodeURIComponent(BASE())}`);
    const branch = `knowledge/${path.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}-${Date.now().toString(36)}`;
    await gh("/git/refs", { method: "POST", body: JSON.stringify({ ref: `refs/heads/${branch}`, sha: base.object.sha }) });
    const message = `Update ${path} from the website admin`;
    const put = await gh(`/contents/${path.split("/").map(encodeURIComponent).join("/")}`, {
      method: "PUT",
      body: JSON.stringify({ message, content: btoa(unescape(encodeURIComponent(row.data.content))), sha: head.sha, branch }),
    });
    const pr = await gh("/pulls", {
      method: "POST",
      body: JSON.stringify({ title: message, head: branch, base: BASE(), body: `Edited by ${actor.name} in the website admin.${row.data.note ? `\n\nNote: ${row.data.note}` : ""}\n\nThe change is effective once this pull request is merged and deployed.` }),
    });
    await updateRow(db, row, { status: "pending", data: { prUrl: pr.html_url, prNumber: pr.number, branch, error: null, resultSha: put.content?.sha || null } });
  } catch (error: any) {
    if (error instanceof AdminError) throw error;
    return fail("sync_failed", `GitHub refused the change: ${error.message}`);
  }
  return editView((await getRow(db, id))!);
}

/** Moves a pending edit forward by looking at the pull request and at the deployed bundle. */
export async function refreshEdit(db: Db, id: number) {
  const row = await getRow(db, id, "knowledge_edit");
  if (!row) throw new AdminError(404, "Edit not found");
  if (row.status === "pending") {
    const deployed = bundled(row.key as string);
    if (row.data.resultSha && deployed?.sha === row.data.resultSha) {
      await updateRow(db, row, { status: "effective" });
    } else if (githubConfigured() && row.data.prNumber) {
      const pr = await gh(`/pulls/${row.data.prNumber}`);
      if (pr.state === "closed" && !pr.merged) await updateRow(db, row, { status: "discarded", data: { error: "The pull request was closed without merging." } });
      else if (pr.merged) await updateRow(db, row, { data: { error: "Merged. Waiting for the next deployment before it is effective." } });
    }
  }
  return editView((await getRow(db, id))!);
}

export async function discardEdit(db: Db, id: number) {
  const row = await getRow(db, id, "knowledge_edit");
  if (!row) throw new AdminError(404, "Edit not found");
  if (row.status === "pending" || row.status === "effective") throw new AdminError(409, "Close the pull request on GitHub instead; this edit is already submitted.");
  await updateRow(db, row, { status: "discarded" });
  return editView((await getRow(db, id))!);
}
