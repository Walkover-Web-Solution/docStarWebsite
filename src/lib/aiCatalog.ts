import { SITE_URL } from "./site";

/** Well-known path for the site’s AI Catalog (Agentic Resource Discovery). */
export const AI_CATALOG_PATH = "/.well-known/ai-catalog.json";

/** Agent-facing artifacts published on docstar.io that this app serves. */
export function aiCatalog() {
  const base = SITE_URL.replace(/\/$/, "");
  return {
    specVersion: "1.0",
    host: {
      displayName: "DocStar",
      documentationUrl: `${base}/agents`,
    },
    entries: [
      {
        identifier: "urn:air:docstar.io:mcp:docstar",
        type: "application/mcp-server-card+json",
        url: `${base}/mcp/server-card.json`,
      },
      {
        identifier: "urn:air:docstar.io:openapi:public",
        displayName: "DocStar website public API",
        type: "application/vnd.oai.openapi+json",
        url: `${base}/openapi.json`,
      },
      {
        identifier: "urn:air:docstar.io:docs:agents",
        displayName: "Agent instructions",
        type: "text/markdown",
        url: `${base}/agents.md`,
      },
      {
        identifier: "urn:air:docstar.io:llms:site",
        displayName: "Site index for agents",
        type: "text/plain",
        url: `${base}/llms.txt`,
      },
      {
        identifier: "urn:air:docstar.io:skill:docstar",
        displayName: "Document an API with DocStar",
        type: "application/agent-skills+md",
        url: `${base}/skills/docstar/SKILL.md`,
      },
    ],
  };
}