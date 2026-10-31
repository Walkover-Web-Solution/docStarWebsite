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
import { ABOUT, CUSTOMERS, MSG91 } from "./pages/company";
import { COMPARE_PAGES } from "./pages/compare";
import { SOLUTION_PAGES } from "./pages/solutions";
import { CHANGELOG } from "./pages/changelog";
import { LLMS_CHECKER, MCP_READINESS } from "./pages/tools";

// Every live page on the website. Routing, markdown twins, llms.txt, the sitemap and the footer read from here.
// Hidden until launch (content kept in src/content/pages): hub.ts (HUB, /hub), drift.ts (DRIFT, /drift).
// To show one again, import it and add it to LIVE_PAGES.
// The bundled copy is the fallback; the live copy is the published version in the database (src/content/source.ts).
const LIVE_PAGES: SitePage[] = [HOME, MCP, CLI, API_DOCS, INTEGRATORS, AGENTS, ANALYTICS, WHITE_LABEL, PRICING, SUPPORT, PRIVACY, DATA_RETENTION, TERMS];

// Built but not launched: their copy has TODO-COPY / TODO-VERIFY placeholders (seo/PLAN.md). They are
// routed only when NEXT_PUBLIC_SHOW_DRAFT_PAGES=1 (local review), never in production. To launch one,
// replace its placeholders and move it into LIVE_PAGES; it then joins routing, the sitemap, llms.txt,
// llms-full.txt, the markdown twins and the footer at once.
export const DRAFT_PAGES: SitePage[] = [ABOUT, CUSTOMERS, MSG91, ...COMPARE_PAGES, ...SOLUTION_PAGES, CHANGELOG, LLMS_CHECKER, MCP_READINESS];

export const PAGES: SitePage[] = process.env.NEXT_PUBLIC_SHOW_DRAFT_PAGES === "1" ? [...LIVE_PAGES, ...DRAFT_PAGES] : LIVE_PAGES;

export const pageBySlug = (slug: string) => PAGES.find((p) => p.slug === slug);
export const pageByPath = (path: string) => PAGES.find((p) => p.path === path);

// URL path → slug, for routing and markdown negotiation (kept small for middleware).
export const PATH_TO_SLUG: Record<string, string> = Object.fromEntries(PAGES.map((p) => [p.path, p.slug]));
