"use client";

import { Bot, User, Zap } from "lucide-react";

// Who sent an idea: a person, or an AI agent (named). Anonymous = sent without signing in.
function Anonymous() {
  return <span className="rounded-full border border-dashed border-[var(--a-muted)] px-1.5 text-[11px] text-[var(--a-muted)]">anonymous</span>;
}

export default function Submitter({ item }: { item: any }) {
  if (item.submitterType === "auto") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full border border-dashed border-[var(--ink)] px-2 py-0.5 text-xs" title="Filed automatically from repeated MCP failures">
        <Zap size={12} /> auto-filed
      </span>
    );
  }
  const who = item.submitterType === "agent" ? (
    <span className="inline-flex items-center gap-1 rounded-full border border-[var(--ink)] bg-[var(--lime-soft)] px-2 py-0.5 text-xs">
      <Bot size={12} /> {item.agentName || "agent"}
    </span>
  ) : (
    <span className="inline-flex items-center gap-1 text-xs text-[var(--a-muted)]">
      <User size={12} /> {item.userName || item.userEmail || item.contactEmail || (item.anonymous ? "someone" : "user")}
    </span>
  );
  return item.anonymous ? (
    <span className="inline-flex items-center gap-1">
      {who} <Anonymous />
    </span>
  ) : (
    who
  );
}
