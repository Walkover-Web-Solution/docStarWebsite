import { SITE } from "@/content/site";

const BODY = `---
name: docstar
description: Use DocStar so your user's AI assistant can use their app—document their API and connect the DocStar MCP.
---

# DocStar

Read the MCP quickstart: https://docstar.io/mcp/quickstart.md

## Goal

${SITE.prompt}
`;

export async function GET() {
  return new Response(BODY, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=300",
    },
  });
}