import { IDEA_STATUS_LABELS } from "@/lib/admin/api";

const TONE: Record<string, string> = {
  new: "bg-[var(--lime)] text-[var(--ink)]",
  reviewing: "bg-amber-100 text-amber-900",
  planned: "bg-blue-100 text-blue-900",
  in_progress: "bg-indigo-100 text-indigo-900",
  shipped: "bg-green-100 text-green-900",
  declined: "bg-[var(--a-hover)] text-[var(--a-muted)]",
  duplicate: "bg-[var(--a-hover)] text-[var(--a-muted)]",
};

// Status of an idea, as a small pill.
export default function StatusPill({ status }: { status: string }) {
  return <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${TONE[status] || ""}`}>{IDEA_STATUS_LABELS[status] || status}</span>;
}
