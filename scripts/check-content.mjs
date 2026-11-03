// Content test: every page in src/content (live and draft) must pass the database schema
// (src/server/siteSchema.ts), so Admin can store it, and must meet the SEO rules for titles,
// descriptions, H1s and unique primary keywords. Run: npm run check:content
import { build } from "esbuild";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dir = mkdtempSync(join(tmpdir(), "ds-content-"));
const out = join(dir, "content.mjs");
await build({
  stdin: {
    contents: `export { PAGES, DRAFT_PAGES } from "./src/content/pages"; export { pageContentSchema, describeIssues } from "./src/server/siteSchema";`,
    resolveDir: root,
    loader: "ts",
  },
  bundle: true,
  platform: "node",
  format: "esm",
  outfile: out,
  alias: { "@": join(root, "src") },
  logLevel: "error",
});
const { PAGES, DRAFT_PAGES, pageContentSchema, describeIssues } = await import(pathToFileURL(out).href);
rmSync(dir, { recursive: true, force: true });

const all = [...PAGES, ...DRAFT_PAGES.filter((d) => !PAGES.some((p) => p.slug === d.slug))];
const errors = [];
const seen = { title: new Map(), description: new Map(), path: new Map(), keyword: new Map() };
for (const page of all) {
  const where = `${page.path} (${PAGES.includes(page) ? "live" : "draft"})`;
  const parsed = pageContentSchema.safeParse({ meta: page.meta, sections: page.sections });
  if (!parsed.success) errors.push(`${where}: content schema: ${describeIssues(parsed.error)}`);
  const { title, description, keywords = [] } = page.meta;
  if (title.length < 50 || title.length > 60) errors.push(`${where}: title is ${title.length} chars (50-60)`);
  if (!/ \| DocStar$/.test(title)) errors.push(`${where}: title should end with " | DocStar"`);
  if (description.length < 140 || description.length > 160) errors.push(`${where}: description is ${description.length} chars (140-160)`);
  const h1s = page.sections.filter((s) => s.type === "hero" || s.type === "pricing").length + page.sections.filter((s) => s.type === "prose" && /^# /m.test(s.body)).length;
  if (h1s !== 1) errors.push(`${where}: ${h1s} H1s (want 1)`);
  if (!page.label) errors.push(`${where}: no label (breadcrumbs)`);
  for (const [key, value] of [["title", title], ["description", description], ["path", page.path], ["keyword", keywords[0]?.toLowerCase()]]) {
    if (!value) continue;
    if (seen[key].has(value)) errors.push(`${where}: same ${key} as ${seen[key].get(value)}`);
    seen[key].set(value, page.path);
  }
}
for (const e of errors) console.log(`ERROR  ${e}`);
console.log(`\n${all.length} pages checked (${PAGES.length} live): ${errors.length} errors`);
process.exit(errors.length ? 1 : 0);
