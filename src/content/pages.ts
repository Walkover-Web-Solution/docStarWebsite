import type { SitePage } from "./types";
import { HOME } from "./home";
import { MCP } from "./pages/mcp";
import { CLI } from "./pages/cli";
import { API_DOCS } from "./pages/apiDocs";
import { INTEGRATORS } from "./pages/integrators";
import { AGENTS } from "./pages/agents";
import { ANALYTICS } from "./pages/analytics";
import { WHITE_LABEL } from "./pages/whiteLabel";
import { PRICING } from "./pages/pricing";
import { SUPPORT } from "./pages/support";
import { PRIVACY } from "./pages/privacy-policy";
import { DATA_RETENTION } from "./pages/data-retention-policy";
import { TERMS } from "./pages/terms";

// Every live page on the website. Routing, markdown twins, llms.txt and the sitemap read from here.
// Hidden until launch (content kept in src/content/pages): hub.ts (HUB, /hub), drift.ts (DRIFT, /drift).
// To show one again, import it and add it to PAGES.
// The bundled copy is the fallback; the live copy comes from hitman-api (src/content/source.ts).
export const PAGES: SitePage[] = [HOME, MCP, CLI, API_DOCS, INTEGRATORS, AGENTS, ANALYTICS, WHITE_LABEL, PRICING, SUPPORT, PRIVACY, DATA_RETENTION, TERMS];

export const pageBySlug = (slug: string) => PAGES.find((p) => p.slug === slug);
export const pageByPath = (path: string) => PAGES.find((p) => p.path === path);

// URL path → slug, for routing and markdown negotiation (kept small for middleware).
export const PATH_TO_SLUG: Record<string, string> = Object.fromEntries(PAGES.map((p) => [p.path, p.slug]));
