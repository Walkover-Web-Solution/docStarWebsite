"use client";

import { useState } from "react";
import type { Cta } from "@/content/types";
import { SITE } from "@/content/site";
import { makeRef, track } from "@/lib/analytics";
import s from "./ui.module.css";

type Variant = "primary" | "ink" | "link";

const copy = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error("[CtaButton] Unable to copy:", error);
    return false;
  }
};

// One button for every CTA kind in the content model. `id` and `placement` are
// emitted as data attributes so analytics can attribute clicks per section.
export default function CtaButton({ cta, variant = "primary", id, placement }: { cta: Cta; variant?: Variant; id?: string; placement?: string }) {
  const [copied, setCopied] = useState(false);
  const className = s[variant];
  const data = { "data-cta": id || cta.label, "data-placement": placement };

  if (cta.kind === "link") {
    const external = cta.href.startsWith("http");
    return (
      <a href={cta.href} className={className} {...data} {...(external ? { rel: "noopener" } : {})}>
        {cta.label}
        {variant === "link" && <span aria-hidden> →</span>}
      </a>
    );
  }

  // Each copied prompt carries its own ref on the quickstart URL, so the agent's fetch can be traced to this copy.
  const textFor = (ref: string) => (cta.kind === "copy-prompt" ? SITE.prompt.replace("/mcp/quickstart.md", `/mcp/quickstart.md?ref=${ref}`) : cta.text);
  const copiedLabel = cta.copiedLabel || "Copied. Paste it into your agent";

  return (
    <button
      type="button"
      className={className}
      aria-live="polite"
      data-copied={copied || undefined}
      onClick={async () => {
        const ref = makeRef();
        if (await copy(textFor(ref))) {
          if (cta.kind === "copy-prompt") track("prompt.copied", { cta_id: id || cta.label, placement: placement || null }, { ref });
          setCopied(true);
          setTimeout(() => setCopied(false), 2200);
        }
      }}
      {...data}
    >
      {copied ? copiedLabel : cta.label}
    </button>
  );
}
