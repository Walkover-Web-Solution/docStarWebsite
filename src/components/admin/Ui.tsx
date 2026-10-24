import Link from "next/link";
import type { ReactNode } from "react";

// Small shared pieces for the admin sections: a page heading and honest status pills.
const TONES: Record<string, string> = {
  ok: "bg-green-100 text-green-900",
  succeeded: "bg-green-100 text-green-900",
  fresh: "bg-green-100 text-green-900",
  connected: "bg-green-100 text-green-900",
  effective: "bg-green-100 text-green-900",
  attention: "bg-amber-100 text-amber-900",
  warn: "bg-amber-100 text-amber-900",
  stale: "bg-amber-100 text-amber-900",
  pending: "bg-amber-100 text-amber-900",
  insufficient_data: "bg-amber-100 text-amber-900",
  unverified: "bg-amber-100 text-amber-900",
  never_checked: "bg-amber-100 text-amber-900",
  error: "bg-red-100 text-red-900",
  failed: "bg-red-100 text-red-900",
  conflict: "bg-red-100 text-red-900",
  sync_failed: "bg-red-100 text-red-900",
  not_connected: "bg-[var(--a-hover)] text-[var(--a-muted)]",
  running: "bg-[var(--lime)] text-[var(--ink)]",
};

export function Pill({ value, label }: { value: string; label?: string }) {
  return <span className={`inline-block whitespace-nowrap rounded-full px-2 py-0.5 font-mono text-[11px] ${TONES[value] || "bg-[var(--a-hover)]"}`}>{label || value.replace(/_/g, " ")}</span>;
}

export function PageHead({ title, children, actions }: { title: string; children?: ReactNode; actions?: ReactNode }) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-3">
      <div>
        <h1 className="text-2xl font-bold">{title}</h1>
        {children && <p className="max-w-3xl text-sm text-[var(--a-muted)]">{children}</p>}
      </div>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </div>
  );
}

export const LevelDot = ({ level }: { level: string }) => <span aria-label={level} className={`mt-1.5 inline-block h-2 w-2 shrink-0 rounded-full ${level === "error" ? "bg-red-600" : level === "warn" ? "bg-amber-500" : "bg-[var(--a-border)]"}`} />;

export const ItemLink = ({ href, children }: { href: string; children: ReactNode }) => (
  <Link href={href} className="no-underline hover:underline">
    {children}
  </Link>
);
