// Calls to this site's own admin API (/api/admin/*). Sign-in is a cookie, so nothing is attached by hand.

export class ApiError extends Error {
  constructor(public status: number, message: string, public data: any) {
    super(message);
  }
}

// Called when the session ends, so the shell can show the sign-in form again.
let onSignedOut: () => void = () => {};
export const setSignedOutHandler = (fn: () => void) => {
  onSignedOut = fn;
};

async function request<T = any>(path: string, { method = "GET", body }: { method?: string; body?: unknown } = {}): Promise<T> {
  const res = await fetch(`/api/admin${path}`, {
    method,
    headers: body === undefined ? undefined : { "content-type": "application/json" },
    body: body === undefined ? undefined : JSON.stringify(body),
    credentials: "same-origin",
  });
  const data = await res.json().catch(() => ({}));
  if (res.status === 401 && path !== "/login") onSignedOut();
  if (!res.ok) throw new ApiError(res.status, data?.message || `Request failed (${res.status})`, data);
  return data;
}

const query = (filters: Record<string, unknown>) => {
  const qs = new URLSearchParams(Object.entries(filters).filter(([, v]) => v !== undefined && v !== "" && v !== null) as [string, string][]).toString();
  return qs ? `?${qs}` : "";
};

// ---------- signing in ----------
export type Me = { email: string; name: string };
export const getMe = () => request<Me>("/me");
export const login = (email: string, password: string) => request<Me>("/login", { method: "POST", body: { email, password } });
export const logout = () => request("/logout", { method: "POST" });

// ---------- ideas & feedback ----------
export const listIdeas = (filters: Record<string, unknown> = {}) => request(`/ideas${query(filters)}`);
export const getIdeaStats = () => request("/ideas/stats");
export const getIdea = (id: number) => request(`/ideas/${id}`);
export const updateIdea = (id: number, changes: Record<string, unknown>) => request(`/ideas/${id}`, { method: "PATCH", body: changes });
export const mergeIdea = (id: number, intoId: number) => request(`/ideas/${id}/merge`, { method: "POST", body: { intoId } });

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
export const listSitePages = () => request("/pages");
export const getSitePage = (slug: string) => request(`/pages/${slug}`);
export const getSiteRevision = (id: number) => request(`/revisions/${id}`);
export const createSitePage = (body: unknown) => request("/pages", { method: "POST", body });
export const saveSiteRevision = (slug: string, body: unknown) => request(`/pages/${slug}/revisions`, { method: "POST", body });
export const publishSiteRevision = (id: number) => request(`/revisions/${id}/publish`, { method: "POST" });
export const rollbackSiteRevision = (id: number) => request(`/revisions/${id}/rollback`, { method: "POST" });
export const getSiteAnalytics = (days: number) => request(`/analytics?days=${days}`);

// ---------- A/B tests ----------
export const listExperiments = () => request("/experiments");
export const getExperiment = (id: number) => request(`/experiments/${id}`);
export const stopExperiment = (id: number) => request(`/experiments/${id}/stop`, { method: "POST" });
export const concludeExperiment = (id: number, winner: string) => request(`/experiments/${id}/conclude`, { method: "POST", body: { winner } });

// ---------- autopilot ----------
export const getAutopilot = () => request("/autopilot");
export const setAutopilotEnabled = (enabled: boolean) => request("/autopilot/enabled", { method: "POST", body: { enabled } });
export const runAutopilotNow = () => request("/autopilot/run", { method: "POST" });
export const rollbackAutopilotAction = (id: number) => request(`/autopilot/actions/${id}/rollback`, { method: "POST" });

// ---------- blog autopilot ----------
export const getBlog = () => request("/blog");
export const setBlogEnabled = (enabled: boolean) => request("/blog/enabled", { method: "POST", body: { enabled } });
export const runBlogNow = () => request("/blog/run", { method: "POST" });
export const approveBlogPost = (id: number) => request(`/blog/${id}/approve`, { method: "POST" });
export const rejectBlogPost = (id: number, reason: string) => request(`/blog/${id}/reject`, { method: "POST", body: { reason } });
// This website's bundled copy of every page, used to add pages that aren't in the editor yet.
export async function getBundledPages() {
  const res = await fetch("/content.json");
  if (!res.ok) throw new Error(`Couldn't load the bundled pages (${res.status})`);
  return (await res.json()).pages;
}

export const REVISION_STATUS_LABELS: Record<string, string> = { draft: "draft", published: "live", superseded: "old", rejected: "rejected" };
