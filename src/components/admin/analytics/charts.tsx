"use client";

// Small, dependency-free charts for the admin. Bars use the series colour --a-s1 (validated on
// white); labels and values use text colours.

export function StatTile({ label, value, note }: { label: string; value: number | string; note?: string }) {
  return (
    <div className="a-card min-w-0 px-4 py-3">
      <p className="text-xs uppercase tracking-wide text-[var(--a-muted)]">{label}</p>
      <p className="mt-1 text-2xl font-semibold">{typeof value === "number" ? value.toLocaleString() : value}</p>
      {note && <p className="text-xs text-[var(--a-muted)]">{note}</p>}
    </div>
  );
}

// Horizontal bars for one series: label, bar, value at the tip.
type Row = { label: string; value: number; sub?: string };

export function BarList({ rows, suffix = "", max, empty = "No data yet" }: { rows: Row[]; suffix?: string; max?: number; empty?: string }) {
  if (!rows.length) return <p className="py-4 text-sm text-[var(--a-muted)]">{empty}</p>;
  const top = max ?? Math.max(...rows.map((r) => r.value), 1);
  return (
    <ul className="grid gap-2.5">
      {rows.map((r) => (
        <li key={r.label + (r.sub || "")} className="grid grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] items-center gap-3 text-sm" title={`${r.label}: ${r.value.toLocaleString()}${suffix}`}>
          <span className="break-words">
            {r.label}
            {r.sub && <span className="font-mono text-xs text-[var(--a-muted)]"> {r.sub}</span>}
          </span>
          <span className="flex min-w-0 items-center gap-2">
            <span className="h-3.5 flex-none rounded-r bg-[var(--a-s1)]" style={{ width: `calc(${Math.max(1.5, (r.value / top) * 100)}% - 56px)`, minWidth: 3 }} />
            <span className="whitespace-nowrap font-mono text-xs">
              {r.value.toLocaleString()}
              {suffix}
            </span>
          </span>
        </li>
      ))}
    </ul>
  );
}
