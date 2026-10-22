import { z } from "zod";

// Validates docstar.io page content. Mirrors src/content/types.ts: a page is meta + an ordered list of
// typed sections. Keep the two in step when adding a section type. Rich text marks the lime highlight
// with ==double equals==. Empty strings are refused (like the old API), so clear a field by removing it.

const text = (max: number) => z.string().trim().min(1).max(max);
const key = z.string().regex(/^[a-z0-9-]+$/, "use lowercase letters, numbers and dashes").max(64);

const cta = z.discriminatedUnion("kind", [
  z.object({ kind: z.literal("copy-prompt"), label: text(60), copiedLabel: text(80).optional() }).strict(),
  z.object({ kind: z.literal("copy-text"), label: text(60), text: text(1000), copiedLabel: text(80).optional() }).strict(),
  z.object({ kind: z.literal("link"), label: text(60), href: z.string().max(500).regex(/^(https?:\/\/|\/|#|mailto:)/, "must start with https://, /, # or mailto:") }).strict(),
]);

const runLine = z.object({ who: z.enum(["you", "agent"]), text: text(200), done: z.boolean().optional() }).strict();

// Built-in looks per section (mirrors LAYOUTS in src/content/types.ts); the first is the default.
export const LAYOUTS: Record<string, string[]> = {
  hero: ["split", "centered", "ink"],
  steps: ["cards", "timeline"],
  channels: ["grid", "list"],
};
const layout = (type: string) => z.enum(LAYOUTS[type] as [string, ...string[]]).optional();

const base = { key };

const sectionSchemas = [
  z.object({
    ...base,
    type: z.literal("hero"),
    layout: layout("hero"),
    kicker: text(80),
    title: text(160),
    sub: text(400),
    primary: cta,
    secondary: cta.optional(),
    works: text(200).optional(),
    run: z.object({ title: text(40), time: text(20).optional(), lines: z.array(runLine).min(1).max(12), summary: text(120).optional() }).strict().optional(),
    code: z.object({ title: text(60), body: text(1500) }).strict().optional(),
  }).strict(),
  z.object({ ...base, type: z.literal("works-with"), label: text(40), items: z.array(text(40)).min(1).max(16) }).strict(),
  z.object({
    ...base,
    type: z.literal("steps"),
    layout: layout("steps"),
    kicker: text(80),
    title: text(160),
    sub: text(400).optional(),
    steps: z.array(z.object({ title: text(80), body: text(400), code: text(600).optional() }).strict()).min(1).max(6),
  }).strict(),
  z.object({
    ...base,
    type: z.literal("channels"),
    layout: layout("channels"),
    kicker: text(80),
    title: text(160),
    sub: text(400).optional(),
    items: z.array(z.object({ name: text(60), reader: text(40), body: text(400), sample: text(200) }).strict()).min(1).max(8),
  }).strict(),
  z.object({
    ...base,
    type: z.literal("pillars"),
    kicker: text(80),
    title: text(160),
    sub: text(400).optional(),
    items: z
      .array(z.object({ feature: key, glyph: text(4), title: text(80), body: text(400), points: z.array(text(60)).max(6).optional() }).strict())
      .min(1)
      .max(8),
  }).strict(),
  z.object({
    ...base,
    type: z.literal("hub"),
    kicker: text(80),
    title: text(160),
    sub: text(400),
    primary: cta,
    secondary: cta.optional(),
    run: z.object({ title: text(40), lines: z.array(runLine).min(1).max(12) }).strict(),
  }).strict(),
  z.object({
    ...base,
    type: z.literal("agent-readable"),
    kicker: text(80),
    title: text(160),
    sub: text(400),
    commands: z.array(z.object({ cmd: text(300), output: text(1000) }).strict()).min(1).max(4),
  }).strict(),
  z.object({
    ...base,
    type: z.literal("faq"),
    kicker: text(80).optional(),
    title: text(160),
    items: z.array(z.object({ q: text(200), a: text(1200) }).strict()).min(1).max(20),
  }).strict(),
  z.object({ ...base, type: z.literal("cta"), title: text(160), sub: text(400).optional(), primary: cta, secondary: cta.optional() }).strict(),
  z.object({
    ...base,
    type: z.literal("cards"),
    kicker: text(80).optional(),
    title: text(160),
    sub: text(400).optional(),
    columns: z.union([z.literal(2), z.literal(3)]).optional(),
    items: z
      .array(z.object({ title: text(80), body: text(600), label: text(40).optional(), code: text(800).optional(), cta: cta.optional() }).strict())
      .min(1)
      .max(12),
  }).strict(),
  z.object({
    ...base,
    type: z.literal("pricing"),
    title: text(160),
    sub: text(400).optional(),
    free: z.object({ title: text(120), sub: text(400), features: z.array(text(120)).max(40), link: cta.optional() }).strict(),
    plans: z
      .array(
        z.object({
          title: text(60),
          price: text(40),
          priceNote: text(60).optional(),
          description: text(400),
          features: z.array(text(120)).max(30),
          cta,
          highlight: z.boolean().optional(),
        }).strict()
      )
      .min(1)
      .max(6),
  }).strict(),
  z.object({ ...base, type: z.literal("prose"), body: text(30000) }).strict(),
] as const;

const section = z.discriminatedUnion("type", [...sectionSchemas]);

export const pageContentSchema = z
  .object({
    meta: z.object({ title: text(120), description: text(320), keywords: z.array(text(60)).max(20).optional() }).strict(),
    sections: z.array(section).min(1).max(30),
  })
  .strict()
  .superRefine((page, ctx) => {
    const seen = new Set<string>();
    page.sections.forEach((s, i) => {
      if (seen.has(s.key)) ctx.addIssue({ code: "custom", path: ["sections", i, "key"], message: `section key "${s.key}" is used twice` });
      seen.add(s.key);
    });
  });

export type PageContent = z.infer<typeof pageContentSchema>;

// Human-readable list of what's wrong, e.g. `sections.2.title: Too small: expected string to have >=1 characters`.
export function describeIssues(error: z.ZodError) {
  return error.issues
    .slice(0, 5)
    .map((i) => `${i.path.length ? i.path.join(".") + ": " : ""}${i.message}`)
    .join("; ");
}

export const SLUG = z.string().regex(/^[a-z0-9-]+$/).max(64);
export const PATH = z.string().regex(/^\/[a-z0-9\-/]*$/).max(255);
