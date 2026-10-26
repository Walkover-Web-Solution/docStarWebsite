import { LAYOUTS, describeIssues, pageContentSchema } from "../siteSchema";

// The autopilot's rules. The server enforces these on every action; the AI only proposes.

// Pages the AI never changes (everything else is open).
// Pricing and the legal pages are never edited or tested by the autopilot, and their text is not sent to the AI.
export const PROTECTED_PAGES = ["pricing", "privacy-policy", "terms", "data-retention-policy"];

export const LIMITS = {
  testsRunningAtOnce: 1, // our traffic supports one test at a time
  newTestsPerWeek: 2,
  editsPerWeek: 5,
  changesPerAction: 8, // text fields changed in one action
  testShareOfVisitors: 50, // % of visitors who see the new version
};

// A factual edit goes live without a test, so it may not touch what persuades: the hero and the order.
export const STORY_SECTIONS = ["hero"];
// (A section's `layout`, its look, can also change only through a test; see applyChanges.)

// Words that over-promise. A change containing one is refused.
const BANNED = [/\bguarantee/i, /\b#\s?1\b/i, /\bnumber one\b/i, /\bbest in the world\b/i, /\bworld'?s best\b/i, /\b100% (accurate|uptime|secure)\b/i, /\bnever fails?\b/i, /\brevolutionary\b/i, /\bunlimited\b/i, /\bfree forever\b/i];

// Links the AI may use: DocStar's own sites, relative paths and anchors.
const ALLOWED_LINK = /^(\/|#|https:\/\/([a-z0-9-]+\.)*docstar\.io(\/|$))/i;

export type TextChange = { section: string; field: string; value: string };

export class PolicyError extends Error {}

const clone = <T>(v: T): T => JSON.parse(JSON.stringify(v));

// field: a dot path inside the section, e.g. "title", "items.2.a", "primary.label"
function setText(section: any, field: string, value: string) {
  const parts = field.split(".").filter(Boolean);
  if (!parts.length || ["type", "key", "kind", "href"].includes(parts[parts.length - 1])) throw new PolicyError(`"${field}" can't be changed`);
  let node = section;
  for (const p of parts.slice(0, -1)) {
    node = node?.[/^\d+$/.test(p) ? Number(p) : p];
    if (node == null || typeof node !== "object") throw new PolicyError(`"${field}" doesn't exist in section "${section.key}"`);
  }
  const last = parts[parts.length - 1];
  const key = /^\d+$/.test(last) ? Number(last) : last;
  const old = node[key];
  if (typeof old !== "string") throw new PolicyError(`"${field}" in section "${section.key}" is not text`);
  if (value.length > old.length * 2 + 80) throw new PolicyError(`New text for "${field}" is much longer than the old one`);
  node[key] = value;
}

function checkText(value: string) {
  const banned = BANNED.find((re) => re.test(value));
  if (banned) throw new PolicyError(`Over-promising wording: "${value.match(banned)?.[0]}"`);
  for (const url of value.match(/\]\(([^)]+)\)|https?:\/\/[^\s)]+/g) || []) {
    const href = url.startsWith("](") ? url.slice(2, -1) : url;
    if (!ALLOWED_LINK.test(href)) throw new PolicyError(`Link to an unknown site: ${href}`);
  }
}

/** Applies the AI's changes to a copy of the live content and checks the result. Returns the new content. */
export function applyChanges(live: any, changes: TextChange[], order: string[], opts: { storyAllowed: boolean }) {
  if (changes.length === 0 && order.length === 0) throw new PolicyError("No changes");
  if (changes.length > LIMITS.changesPerAction) throw new PolicyError(`At most ${LIMITS.changesPerAction} text changes per action`);
  const content = clone(live);
  const byKey = new Map<string, any>(content.sections.map((s: any) => [s.key, s]));

  for (const c of changes) {
    checkText(c.value);
    if (c.section === "meta") {
      if (!["title", "description"].includes(c.field)) throw new PolicyError(`meta.${c.field} can't be changed`);
      setText(content.meta, c.field, c.value);
      continue;
    }
    const section = byKey.get(c.section);
    if (!section) throw new PolicyError(`No section "${c.section}" on this page`);
    // A section's look: one of its built-in layouts, and only through an A/B test.
    if (c.field === "layout") {
      if (!opts.storyAllowed) throw new PolicyError("A section's look can only change through an A/B test");
      if (!LAYOUTS[section.type]?.includes(c.value)) throw new PolicyError(`"${c.value}" isn't a look for ${section.type} sections`);
      section.layout = c.value;
      continue;
    }
    if (!opts.storyAllowed && (STORY_SECTIONS.includes(section.type) || STORY_SECTIONS.includes(section.key))) {
      throw new PolicyError("The hero can only change through an A/B test");
    }
    setText(section, c.field, c.value);
  }

  if (order.length) {
    if (!opts.storyAllowed) throw new PolicyError("Section order can only change through an A/B test");
    const current = content.sections.map((s: any) => s.key);
    if (order.length !== current.length || order.some((k) => !byKey.has(k)) || new Set(order).size !== order.length) throw new PolicyError("The new order must list every section once");
    content.sections = order.map((k) => byKey.get(k));
  }

  const parsed = pageContentSchema.safeParse(content);
  if (!parsed.success) throw new PolicyError(`The page would be invalid: ${describeIssues(parsed.error)}`);
  if (JSON.stringify(parsed.data) === JSON.stringify(live)) throw new PolicyError("The changes don't change anything");
  return parsed.data;
}
