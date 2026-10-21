import { clearToken, getToken } from "./auth";

// hitman-api calls for docstar.io/admin, made from the browser with the signed-in user's token.

const API_URL = (process.env.NEXT_PUBLIC_DOCSTAR_API_URL || "https://api.docstar.io").replace(/\/$/, "");

export class ApiError extends Error {
  constructor(public status: number, message: string, public data: any) {
    super(message);
  }
}

// Called when the token stops working, so the shell can show "Sign in" again.
let onSignedOut: () => void = () => {};
export const setSignedOutHandler = (fn: () => void) => {
  onSignedOut = fn;
};

async function request<T = any>(path: string, { method = "GET", body }: { method?: string; body?: unknown } = {}): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers: { "content-type": "application/json", proxy_auth_token: getToken() || "" },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (res.status === 401) {
    clearToken();
    onSignedOut();
  }
  if (!res.ok) throw new ApiError(res.status, data?.message || `Request failed (${res.status})`, data);
  return data;
}

const query = (filters: Record<string, unknown>) => {
  const qs = new URLSearchParams(Object.entries(filters).filter(([, v]) => v !== undefined && v !== "" && v !== null) as [string, string][]).toString();
  return qs ? `?${qs}` : "";
};

// ---------- ideas & feedback ----------
export const getAdminMe = () => request<{ isAdmin: boolean; email: string | null }>("/admin/me");
export const listIdeas = (filters: Record<string, unknown> = {}) => request(`/admin/ideas${query(filters)}`);
export const getIdeaStats = () => request("/admin/ideas/stats");
export const getIdea = (id: number) => request(`/admin/ideas/${id}`);
export const updateIdea = (id: number, changes: Record<string, unknown>) => request(`/admin/ideas/${id}`, { method: "PATCH", body: changes });
export const mergeIdea = (id: number, intoId: number) => request(`/admin/ideas/${id}/merge`, { method: "POST", body: { intoId } });

export const KIND_LABELS: Record<string, string> = { feature: "Feature request", idea: "Idea", bug: "Bug", feedback: "Feedback" };
export const IDEA_STATUS_LABELS: Record<string, string> = {
  new: "New",
  reviewing: "Reviewing",
  planned: "Planned",
  in_progress: "In progress",
  shipped: "Shipped",
  declined: "Declined",
  duplicate: "Duplicate",
};

// ---------- website content ----------
export const listSitePages = () => request("/admin/site/pages");
export const getSitePage = (slug: string) => request(`/admin/site/pages/${slug}`);
export const getSiteRevision = (id: number) => request(`/admin/site/revisions/${id}`);
export const createSitePage = (body: unknown) => request("/admin/site/pages", { method: "POST", body });
export const saveSiteRevision = (slug: string, body: unknown) => request(`/admin/site/pages/${slug}/revisions`, { method: "POST", body });
export const publishSiteRevision = (id: number) => request(`/admin/site/revisions/${id}/publish`, { method: "POST" });
export const rollbackSiteRevision = (id: number) => request(`/admin/site/revisions/${id}/rollback`, { method: "POST" });
export const getPreviewLink = (slug: string) => request<{ url: string }>(`/admin/site/pages/${slug}/preview-link`, { method: "POST" });
export const getSiteAnalytics = (days: number) => request(`/admin/site/analytics?days=${days}`);

// ---------- A/B tests ----------
export const listExperiments = () => request("/admin/site/experiments");
export const getExperiment = (id: number) => request(`/admin/site/experiments/${id}`);
export const stopExperiment = (id: number) => request(`/admin/site/experiments/${id}/stop`, { method: "POST" });
export const concludeExperiment = (id: number, winner: string) => request(`/admin/site/experiments/${id}/conclude`, { method: "POST", body: { winner } });

// ---------- autopilot ----------
export const getAutopilot = () => request("/admin/site/autopilot");
export const setAutopilotEnabled = (enabled: boolean) => request("/admin/site/autopilot/enabled", { method: "POST", body: { enabled } });
export const runAutopilotNow = () => request("/admin/site/autopilot/run", { method: "POST" });
export const rollbackAutopilotAction = (id: number) => request(`/admin/site/autopilot/actions/${id}/rollback`, { method: "POST" });

// This website's bundled copy of every page, used to add pages that aren't in the editor yet.
export async function getBundledPages() {
  const res = await fetch("/content.json");
  if (!res.ok) throw new Error(`Couldn't load the bundled pages (${res.status})`);
  return (await res.json()).pages;
}

export const REVISION_STATUS_LABELS: Record<string, string> = { draft: "draft", published: "live", superseded: "old", rejected: "rejected" };
