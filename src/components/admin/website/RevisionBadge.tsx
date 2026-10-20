import { REVISION_STATUS_LABELS as STATUS_LABELS } from "@/lib/admin/api";

const TONE: Record<string, string> = {
  published: "bg-green-100 text-green-800",
  draft: "bg-[var(--a-hover)]",
  superseded: "text-[var(--a-muted)]",
  rejected: "text-[var(--a-muted)]",
};

export default function RevisionBadge({ status }: { status: string }) {
  return <span className={`inline-block rounded-full border border-[var(--a-border)] px-2 py-0.5 font-mono text-[11px] ${TONE[status] || ""}`}>{STATUS_LABELS[status] || status}</span>;
}

export const timeAgo = (iso?: string | null) => {
  if (!iso) return "";
  const seconds = Math.round((Date.now() - new Date(iso).getTime()) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.round(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return new Date(iso).toLocaleDateString(undefined, { day: "numeric", month: "short" });
};
