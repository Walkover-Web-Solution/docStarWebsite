"use client";

import { useEffect } from "react";

function markdownTwinPath(pathname: string) {
  const path = pathname.replace(/\/$/, "") || "/";
  if (path === "/") return "/index.md";
  return path.endsWith(".md") ? path : `${path}.md`;
}

const TOOLS: ModelContextTool[] = [
  {
    name: "fetch_markdown",
    description: "Fetch the agent-readable markdown twin for a DocStar marketing page.",
    inputSchema: {
      type: "object",
      properties: {
        path: {
          type: "string",
          description: "Site path such as /mcp or /. Defaults to the current page.",
        },
      },
    },
    annotations: { readOnlyHint: true },
    async execute(input, { signal }) {
      const raw = typeof input.path === "string" && input.path.trim() ? input.path.trim() : window.location.pathname;
      const url = markdownTwinPath(raw.startsWith("/") ? raw : `/${raw}`);
      const res = await fetch(url, { signal, headers: { Accept: "text/markdown, text/plain, */*" } });
      if (!res.ok) throw new Error(`Could not load ${url} (${res.status})`);
      return { url, markdown: await res.text() };
    },
  },
  {
    name: "navigate",
    description: "Navigate the browser to another page on docstar.io.",
    inputSchema: {
      type: "object",
      properties: {
        path: {
          type: "string",
          description: "Same-origin path to open, for example /agents or /llms.txt.",
        },
      },
      required: ["path"],
    },
    annotations: { consequentialHint: true },
    execute(input, { signal }) {
      signal.throwIfAborted();
      const path = input.path;
      if (typeof path !== "string" || !path.startsWith("/")) throw new Error("path must be a same-origin path starting with /");
      const next = new URL(path, window.location.origin);
      if (next.origin !== window.location.origin) throw new Error("Only same-origin navigation is allowed");
      const target = `${next.pathname}${next.search}${next.hash}`;
      window.location.assign(target);
      return { navigatedTo: target };
    },
  },
];

// Registers WebMCP tools when the browser exposes document.modelContext.
export default function SiteWebMcp() {
  useEffect(() => {
    const modelContext = document.modelContext;
    if (!modelContext?.registerTool) return;

    const controller = new AbortController();
    const { signal } = controller;

    for (const tool of TOOLS) {
      void modelContext.registerTool(tool, { signal }).catch((err) => {
        if (signal.aborted) return;
        console.warn(`[SiteWebMcp] registerTool(${tool.name}) failed:`, err);
      });
    }

    return () => controller.abort();
  }, []);

  return null;
}