import { readFile } from "node:fs/promises";
import path from "node:path";
import { renderPageMarkdown } from "@/content/markdown";
import { pageBySlug } from "@/content/pages";
import { getSitePage } from "@/content/source";
import { withDb } from "./db";
import { normalizeSubmission, submit, submitSchema } from "./ideas";

/** Read-only MCP over the docstar.io marketing site (not the product API at mcp.docstar.io). */

const CONTENT_OUTPUT = {
  type: "object",
  properties: {
    content: { type: "string", description: "Response body as UTF-8 text." },
    contentType: { type: "string", description: "MIME type of content." },
  },
  required: ["content", "contentType"],
} as const;

const IDEA_OUTPUT = {
  type: "object",
  properties: {
    id: { type: "string" },
    status: { type: "string" },
    followUpUrl: { type: "string", format: "uri" },
  },
  required: ["id", "status", "followUpUrl"],
} as const;

export const SITE_MCP_INSTRUCTIONS = [
  "This MCP server is for the docstar.io marketing website only (pages, llms.txt, quickstart).",
  "Use get_llms_txt to list pages and agent entry points; get_page_markdown to read a page twin; get_mcp_quickstart for the DocStar product MCP onboarding doc.",
  "Use submit_website_feedback to file product or site issues (same as POST /api/ideas). For DocStar product APIs use https://mcp.docstar.io/mcp after sign-in.",
].join(" ");

export const SITE_MCP_TOOLS = [
  {
    name: "get_llms_txt",
    description: "Fetch the live llms.txt index for docstar.io (page list and agent links).",
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
    outputSchema: CONTENT_OUTPUT,
    annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true },
  },
  {
    name: "get_page_markdown",
    description: "Return the markdown twin of a live marketing page by slug (for example home, mcp, agents).",
    inputSchema: {
      type: "object",
      properties: {
        slug: { type: "string", description: "Page slug from content/pages.ts, e.g. home or tools-llms-txt-checker." },
      },
      required: ["slug"],
      additionalProperties: false,
    },
    outputSchema: CONTENT_OUTPUT,
    annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true },
  },
  {
    name: "get_mcp_quickstart",
    description: "Return public/mcp/quickstart.md (how agents document an API with DocStar).",
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
    outputSchema: CONTENT_OUTPUT,
    annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true },
  },
  {
    name: "submit_website_feedback",
    description: "File a feature request, bug or feedback about DocStar (creates an idea row; no sign-in).",
    inputSchema: {
      type: "object",
      properties: {
        title: { type: "string", minLength: 3, maxLength: 200 },
        body: { type: "string", maxLength: 10000 },
        kind: { type: "string", enum: ["feature", "idea", "bug", "feedback"] },
        contactEmail: { type: "string", format: "email" },
      },
      required: ["title"],
      additionalProperties: false,
    },
    outputSchema: IDEA_OUTPUT,
    annotations: { readOnlyHint: false, destructiveHint: true, idempotentHint: false },
  },
] as const;

async function llmsTxtBody(origin: string): Promise<string> {
  const res = await fetch(`${origin}/llms.txt`, { headers: { Accept: "text/plain" } });
  if (!res.ok) throw new Error(`llms.txt returned ${res.status}`);
  return res.text();
}

async function callTool(name: string, args: Record<string, unknown> | undefined, origin: string) {
  switch (name) {
    case "get_llms_txt": {
      const content = await llmsTxtBody(origin);
      return { content, contentType: "text/plain; charset=utf-8" };
    }
    case "get_page_markdown": {
      const slug = String(args?.slug ?? "").trim();
      if (!slug || !pageBySlug(slug)) throw new Error("Unknown or missing slug");
      const page = await getSitePage(slug);
      return { content: renderPageMarkdown(page), contentType: "text/markdown; charset=utf-8" };
    }
    case "get_mcp_quickstart": {
      const file = path.join(process.cwd(), "public/mcp/quickstart.md");
      const content = await readFile(file, "utf8");
      return { content, contentType: "text/markdown; charset=utf-8" };
    }
    case "submit_website_feedback": {
      const input = submitSchema.parse(
        normalizeSubmission({
          ...args,
          source: "mcp",
          agent: { name: "docstar.io site MCP" },
        }),
      );
      const { followUpSecret, id, status } = await withDb(async (db) =>
        submit(db, input, { userAgent: "docstar-site-mcp", senderHash: "site-mcp" }),
      );
      return { id: String(id), status, followUpUrl: `${origin}/api/ideas/public/${followUpSecret}` };
    }
    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}

export type JsonRpcRequest = { jsonrpc?: string; id?: string | number | null; method?: string; params?: any };

export function siteMcpCapabilities() {
  return { tools: { listChanged: false } };
}

export async function handleSiteMcp(req: JsonRpcRequest, origin: string): Promise<{ result?: unknown; error?: { code: number; message: string } }> {
  const method = req.method;
  if (method === "initialize") {
    return {
      result: {
        protocolVersion: "2024-11-05",
        capabilities: siteMcpCapabilities(),
        serverInfo: { name: "docstar-website", version: "1.0.0", title: "DocStar marketing site MCP" },
        instructions: SITE_MCP_INSTRUCTIONS,
      },
    };
  }
  if (method === "notifications/initialized" || method === "ping") {
    return { result: {} };
  }
  if (method === "tools/list") {
    return { result: { tools: SITE_MCP_TOOLS } };
  }
  if (method === "tools/call") {
    const name = req.params?.name;
    const toolArgs = req.params?.arguments;
    if (typeof name !== "string") return { error: { code: -32602, message: "params.name required" } };
    try {
      const structuredContent = await callTool(name, toolArgs && typeof toolArgs === "object" ? toolArgs : {}, origin);
      return {
        result: {
          content: [{ type: "text", text: JSON.stringify(structuredContent, null, 2) }],
          structuredContent,
          isError: false,
        },
      };
    } catch (e: any) {
      return {
        result: {
          content: [{ type: "text", text: e?.message || "Tool failed" }],
          isError: true,
        },
      };
    }
  }
  return { error: { code: -32601, message: `Method not found: ${method}` } };
}

export function mcpSse(payload: object): string {
  return `event: message\ndata: ${JSON.stringify(payload)}\n\n`;
}