import type { Cta, Section, SitePage } from "./types";
import { SITE } from "./site";

// Markdown twin of a page, rendered from the same content as the HTML so agents and people read the same thing.

export const SITE_ORIGIN = "https://docstar.io";

const plain = (text: string) => text.replace(/==(.+?)==/g, "$1");
// Absolute URL for a link on the page at `path`; "#anchor" stays on that page.
const abs = (href: string, path = "/") =>
  /^(https?:|mailto:)/.test(href) ? href : href.startsWith("#") ? `${SITE_ORIGIN}${path === "/" ? "/" : path}${href}` : `${SITE_ORIGIN}${href.startsWith("/") ? "" : "/"}${href}`;

function cta(c: Cta, path: string): string {
  if (c.kind === "link") return `[${c.label}](${abs(c.href, path)})`;
  if (c.kind === "copy-prompt") return `${c.label}: paste this into your agent:\n\n\`\`\`text\n${SITE.prompt}\n\`\`\``;
  return `${c.label}:\n\n\`\`\`bash\n${c.text}\n\`\`\``;
}

function head(kicker: string | undefined, title: string, sub?: string, level = 2) {
  const out = [`${"#".repeat(level)} ${plain(title)}`];
  if (kicker) out.push(`_${kicker}_`);
  if (sub) out.push(sub);
  return out.join("\n\n");
}

function section(x: Section, path: string): string {
  switch (x.type) {
    case "hero":
      return [
        head(x.kicker, x.title, x.sub, 1),
        cta(x.primary, path),
        x.secondary ? cta(x.secondary, path) : "",
        x.works ? `Works with: ${x.works.split(" · ").join(", ")}` : "",
        x.run ? "What the agent does:\n\n" + x.run.lines.map((l) => `- ${l.who}: ${l.text}`).join("\n") : "",
        x.code ? `${x.code.title}:\n\n\`\`\`text\n${x.code.body}\n\`\`\`` : "",
      ]
        .filter(Boolean)
        .join("\n\n");
    case "works-with":
      return `**${x.label}:** ${x.items.join(", ")}`;
    case "steps":
      return [head(x.kicker, x.title, x.sub), x.steps.map((s, i) => `${i + 1}. **${s.title}.** ${s.body}`).join("\n")].join("\n\n");
    case "channels":
      return [head(x.kicker, x.title, x.sub), x.items.map((c) => `- **${c.name}** (${c.reader}): ${c.body} Example: \`${c.sample}\``).join("\n")].join("\n\n");
    case "pillars":
      return [head(x.kicker, x.title, x.sub), x.items.map((p) => `### ${p.title}\n\n${p.body}${p.points ? `\n\n${p.points.map((pt) => `- ${pt}`).join("\n")}` : ""}`).join("\n\n")].join("\n\n");
    case "hub":
      return [head(x.kicker, x.title, x.sub), cta(x.primary, path), x.secondary ? cta(x.secondary, path) : ""].filter(Boolean).join("\n\n");
    case "agent-readable":
      return [head(x.kicker, x.title, x.sub), x.commands.map((c) => `\`\`\`bash\n${c.cmd}\n\`\`\``).join("\n\n")].join("\n\n");
    case "faq":
      return [head(x.kicker, x.title), x.items.map((i) => `### ${i.q}\n\n${i.a}`).join("\n\n")].join("\n\n");
    case "cta":
      return [head(undefined, x.title, x.sub), cta(x.primary, path), x.secondary ? cta(x.secondary, path) : ""].filter(Boolean).join("\n\n");
    case "cards":
      return [
        head(x.kicker, x.title, x.sub),
        x.items
          .map((i) => [`### ${i.title}`, i.label ? `_${i.label}_` : "", i.body, i.code ? `\`\`\`text\n${i.code}\n\`\`\`` : "", i.cta ? cta(i.cta, path) : ""].filter(Boolean).join("\n\n"))
          .join("\n\n"),
      ].join("\n\n");
    case "pricing":
      return [
        head(undefined, x.title, x.sub, 1),
        `## ${x.free.title}\n\n${x.free.sub}\n\n${x.free.features.map((f) => `- ${f}`).join("\n")}`,
        ...x.plans.map((p) => `## ${p.title}: ${p.price}${p.priceNote ? ` (${p.priceNote})` : ""}\n\n${p.description}\n\n${p.features.map((f) => `- ${f}`).join("\n")}\n\n${cta(p.cta, path)}`),
      ].join("\n\n");
    case "table": {
      const cell = (t: string) => t.replace(/\|/g, "\\|").replace(/\n/g, " ");
      const rows = [`| | ${x.columns.map(cell).join(" | ")} |`, `|---|${x.columns.map(() => "---").join("|")}|`, ...x.rows.map((r) => `| **${cell(r.label)}** | ${r.cells.map(cell).join(" | ")} |`)];
      return [head(x.kicker, x.title, x.sub), rows.join("\n"), x.note ? `_${x.note}_` : ""].filter(Boolean).join("\n\n");
    }
    case "changelog":
      return [
        head(x.kicker, x.title, x.sub),
        x.entries
          .map((e) => [`### ${e.date}: ${e.title}`, e.body, e.items ? e.items.map((i) => `- ${i}`).join("\n") : "", e.link ? cta(e.link, path) : ""].filter(Boolean).join("\n\n"))
          .join("\n\n"),
      ].join("\n\n");
    case "tool":
      return [head(x.kicker, x.title, x.sub), x.tool === "llms-txt-checker" ? `Agents can call the checker directly: \`GET ${SITE_ORIGIN}/api/tools/llms-check?url=<site>\` returns JSON.` : ""].filter(Boolean).join("\n\n");
    case "prose":
      return x.body.replace(/\]\(((?:\/|#)[^)]*)\)/g, (_, href) => `](${abs(href, path)})`);
    default:
      return "";
  }
}

export function renderPageMarkdown(page: SitePage): string {
  const front = ["---", `title: ${JSON.stringify(page.meta.title)}`, `description: ${JSON.stringify(page.meta.description)}`, `url: ${abs(page.path)}`, "---"].join("\n");
  return `${front}\n\n${page.sections.map((x) => section(x, page.path)).filter(Boolean).join("\n\n")}\n`;
}

export const markdownUrl = (page: SitePage) => abs(page.path === "/" ? "/index.md" : `${page.path}.md`);
