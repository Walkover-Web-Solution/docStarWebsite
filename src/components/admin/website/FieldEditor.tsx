"use client";

// Generic editor for website content: strings become inputs, arrays become reorderable lists,
// objects become groups. Driven by the data itself, so new section types need no admin code.
// `type` and `kind` are shown but not editable, since the content schema depends on them.

const LOCKED = new Set(["type", "kind"]);
const INPUT = "box-border w-full rounded-lg font-[inherit] border border-[var(--a-border)] px-3 py-1.5 text-sm";

// Stored content is JSONB, which reorders keys; show fields in reading order instead.
const ORDER = ["type", "kind", "kicker", "label", "title", "name", "reader", "q", "sub", "description", "body", "a", "text", "price", "priceNote", "features", "items", "steps", "points", "code", "sample", "cmd", "output", "primary", "secondary", "cta", "link", "href", "works", "run", "lines", "summary", "time", "keywords"];
const rank = (k: string) => {
  const i = ORDER.indexOf(k);
  return i === -1 ? ORDER.length : i;
};

export const humanize = (key: string) =>
  String(key)
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[-_]/g, " ")
    .replace(/^\w/, (c) => c.toUpperCase());

// An empty copy of an item, used as the template when adding to a list.
export function blank(value: any): any {
  if (typeof value === "string") return "";
  if (typeof value === "number") return 0;
  if (typeof value === "boolean") return false;
  if (Array.isArray(value)) return value.length ? [blank(value[0])] : [];
  if (value && typeof value === "object") return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, LOCKED.has(k) ? v : blank(v)]));
  return null;
}

const move = (list: any[], from: number, to: number) => {
  const next = [...list];
  const [item] = next.splice(from, 1);
  next.splice(to, 0, item);
  return next;
};

const tool = "rounded-md border border-[var(--a-border)] px-2 py-0.5 text-xs hover:border-[var(--a-text)] disabled:opacity-30";

type Props = { label: string; value: any; onChange: (v: any) => void };

export default function FieldEditor({ label, value, onChange }: Props) {
  if (typeof value === "string") {
    const multi = value.length > 70 || value.includes("\n");
    return (
      <label className="grid gap-1">
        <span className="text-xs font-semibold text-[var(--a-muted)]">{humanize(label)}</span>
        {multi ? <textarea className={INPUT} value={value} rows={Math.min(10, Math.max(2, value.split("\n").length + Math.floor(value.length / 90)))} onChange={(e) => onChange(e.target.value)} /> : <input className={INPUT} value={value} onChange={(e) => onChange(e.target.value)} />}
      </label>
    );
  }

  if (typeof value === "boolean") {
    return (
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" checked={value} onChange={(e) => onChange(e.target.checked)} /> {humanize(label)}
      </label>
    );
  }

  if (typeof value === "number") {
    return (
      <label className="grid gap-1">
        <span className="text-xs font-semibold text-[var(--a-muted)]">{humanize(label)}</span>
        <input className={INPUT} type="number" value={value} onChange={(e) => onChange(Number(e.target.value))} />
      </label>
    );
  }

  if (Array.isArray(value)) {
    return (
      <fieldset className="min-w-0 rounded-lg border border-[var(--a-border)] px-3 pb-3 pt-1">
        <legend className="px-1 text-xs font-semibold text-[var(--a-muted)]">
          {humanize(label)} ({value.length})
        </legend>
        <ol className="my-2 grid gap-2">
          {value.map((item: any, i: number) => (
            <li key={i} className="rounded-r-md border-l-2 border-[var(--lime)] bg-[var(--a-hover)] p-2">
              <div className="mb-1 flex items-center gap-1">
                <span className="font-mono text-xs text-[var(--a-muted)]">{i + 1}</span>
                <button type="button" className={tool} disabled={i === 0} onClick={() => onChange(move(value, i, i - 1))} aria-label="Move up">
                  ↑
                </button>
                <button type="button" className={tool} disabled={i === value.length - 1} onClick={() => onChange(move(value, i, i + 1))} aria-label="Move down">
                  ↓
                </button>
                <button type="button" className={tool} onClick={() => onChange(value.filter((_: any, j: number) => j !== i))} aria-label="Remove">
                  ✕
                </button>
              </div>
              <FieldEditor label={typeof item === "object" ? "" : `${label} ${i + 1}`} value={item} onChange={(v) => onChange(value.map((x: any, j: number) => (j === i ? v : x)))} />
            </li>
          ))}
        </ol>
        {value.length > 0 && (
          <button type="button" className={tool} onClick={() => onChange([...value, blank(value[value.length - 1])])}>
            + Add
          </button>
        )}
      </fieldset>
    );
  }

  if (value && typeof value === "object") {
    const body = (
      <div className="grid gap-3 pt-2">
        {Object.entries(value)
          .sort(([a], [b]) => rank(a) - rank(b))
          .map(([k, v]) =>
            LOCKED.has(k) ? (
              <p key={k} className="text-xs text-[var(--a-muted)]">
                {humanize(k)}: <code>{String(v)}</code>
              </p>
            ) : (
              <FieldEditor key={k} label={k} value={v} onChange={(nv) => onChange({ ...value, [k]: nv })} />
            )
          )}
      </div>
    );
    return label ? (
      <fieldset className="min-w-0 rounded-lg border border-[var(--a-border)] px-3 pb-3 pt-1">
        <legend className="px-1 text-xs font-semibold text-[var(--a-muted)]">{humanize(label)}</legend>
        {body}
      </fieldset>
    ) : (
      body
    );
  }

  return null;
}
