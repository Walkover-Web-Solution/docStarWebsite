/**
 * One-click prompt for AI agents: copies an instruction that tells the agent to read the
 * DocStar MCP quickstart and use the DocStar MCP to do the user's work in DocStar.
 */
"use client";

import { useState } from "react";
import { Check, Copy, Sparkles } from "lucide-react";

const QUICKSTART_URL = "https://docstar.io/mcp/quickstart.md";

const AGENT_PROMPT = `Use the DocStar MCP (https://mcp.docstar.io/mcp) to do my work in DocStar.
First read ${QUICKSTART_URL} and follow it step by step.`;

const CopyAgentPrompt = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(AGENT_PROMPT);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("[CopyAgentPrompt] Unable to copy prompt:", error);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        type="button"
        onClick={handleCopy}
        aria-live="polite"
        className="group inline-flex cursor-pointer items-center gap-3 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-950 dark:bg-white px-8 py-5 text-lg font-semibold text-white dark:text-gray-950 shadow-xl transition-all hover:scale-[1.03]"
      >
        <Sparkles className="h-5 w-5" />
        <span>{copied ? "Prompt copied!" : "Copy prompt for your AI agent"}</span>
        {copied ? (
          <Check className="h-5 w-5 text-green-400 dark:text-green-600" />
        ) : (
          <Copy className="h-5 w-5 opacity-70" />
        )}
      </button>
      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
        Paste it into Claude, Cursor or Codex to work in DocStar via MCP.
      </p>
    </div>
  );
};

export default CopyAgentPrompt;
