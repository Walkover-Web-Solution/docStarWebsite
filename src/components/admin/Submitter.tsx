"use client";

import { Bot, User } from "lucide-react";

// Who sent an idea: an AI agent (named), or a person (anyone can send one without an account).
export default function Submitter({ item }: { item: any }) {
  return item.submitterType === "agent" ? (
    <span className="inline-flex items-center gap-1 rounded-full border border-[var(--ink)] bg-[var(--lime-soft)] px-2 py-0.5 text-xs">
      <Bot size={12} /> {item.agentName || "agent"}
    </span>
  ) : (
    <span className="inline-flex items-center gap-1 text-xs text-[var(--a-muted)]">
      <User size={12} /> {item.contactEmail || "someone"}
    </span>
  );
}
