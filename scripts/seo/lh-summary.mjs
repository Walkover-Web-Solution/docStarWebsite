// Prints a table of Lighthouse scores and lab metrics from a folder of JSON reports.
//   node scripts/seo/lh-summary.mjs seo/lighthouse/before
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const dir = process.argv[2];
const rows = [];
for (const f of readdirSync(dir).filter((f) => f.endsWith(".json")).sort()) {
  const r = JSON.parse(readFileSync(join(dir, f), "utf8"));
  const c = r.categories || {};
  const a = r.audits || {};
  const score = (k) => (c[k]?.score == null ? "–" : Math.round(c[k].score * 100));
  const ms = (k) => (a[k]?.numericValue == null ? "–" : `${(a[k].numericValue / 1000).toFixed(2)}s`);
  rows.push(`| ${f.replace(/\.json$/, "").replace(".", " | ")} | ${score("performance")} | ${score("accessibility")} | ${score("best-practices")} | ${score("seo")} | ${ms("largest-contentful-paint")} | ${a["cumulative-layout-shift"]?.numericValue?.toFixed(3) ?? "–"} | ${a["total-blocking-time"] ? Math.round(a["total-blocking-time"].numericValue) + "ms" : "–"} | ${ms("server-response-time").replace("s", "s")} |`);
}
console.log("| Page | Form | Perf | A11y | BP | SEO | LCP | CLS | TBT | TTFB |\n|---|---|---|---|---|---|---|---|---|---|");
console.log(rows.join("\n"));
