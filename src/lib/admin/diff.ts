// Line diff (longest common subsequence) for showing what a knowledge edit changes.
export type DiffLine = { kind: "same" | "add" | "del"; text: string };

export function diffLines(before: string, after: string): DiffLine[] {
  const a = before.split("\n");
  const b = after.split("\n");
  const n = a.length;
  const m = b.length;
  const lcs = Array.from({ length: n + 1 }, () => new Uint16Array(m + 1));
  for (let i = n - 1; i >= 0; i--) for (let j = m - 1; j >= 0; j--) lcs[i][j] = a[i] === b[j] ? lcs[i + 1][j + 1] + 1 : Math.max(lcs[i + 1][j], lcs[i][j + 1]);
  const out: DiffLine[] = [];
  let i = 0;
  let j = 0;
  while (i < n && j < m) {
    if (a[i] === b[j]) out.push({ kind: "same", text: a[i++] }), j++;
    else if (lcs[i + 1][j] >= lcs[i][j + 1]) out.push({ kind: "del", text: a[i++] });
    else out.push({ kind: "add", text: b[j++] });
  }
  while (i < n) out.push({ kind: "del", text: a[i++] });
  while (j < m) out.push({ kind: "add", text: b[j++] });
  return out;
}

/** Keeps changed lines with two lines of context; collapses long unchanged stretches. */
export function compact(lines: DiffLine[], context = 2): (DiffLine | { kind: "gap"; hidden: number })[] {
  const keep = lines.map((l, i) => l.kind !== "same" || lines.slice(Math.max(0, i - context), i + context + 1).some((x) => x.kind !== "same"));
  const out: (DiffLine | { kind: "gap"; hidden: number })[] = [];
  let hidden = 0;
  lines.forEach((l, i) => {
    if (keep[i]) {
      if (hidden) out.push({ kind: "gap", hidden }), (hidden = 0);
      out.push(l);
    } else hidden++;
  });
  if (hidden) out.push({ kind: "gap", hidden });
  return out;
}
