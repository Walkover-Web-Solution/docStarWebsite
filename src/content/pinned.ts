import type { Cta, SitePage } from "./types";

// Site-wide parts that every version of a page shows: A/B arms and the published revision from the
// database get them at render time, so content meant for everyone is not something a running test can
// hide, and it does not wait for every stored version to be edited and republished. `SitePage.pinned`
// only says *what* applies everywhere; the bundled copy in src/content holds the text, so nothing is
// written twice. A version that already has its own section, hero note or answer link keeps it, and
// nothing is ever added twice once the stored revision matches the bundled copy.

type Section = SitePage["sections"][number];
const keyOf = (s: Section) => s.key;

/**
 * Puts the pinned sections a version is missing where the bundled copy puts them: after the nearest
 * section the bundled copy places before them, else before the nearest one it places after them.
 * The live page's copy wins when it has the section, so an arm matches what the whole page shows.
 */
function withPinnedSections(page: SitePage, bundled: SitePage, live: SitePage | undefined): Section[] {
  const pinned = (bundled.pinned?.sections || [])
    .map((key) => live?.sections.find((s) => keyOf(s) === key) || bundled.sections.find((s) => keyOf(s) === key))
    .filter((s): s is Section => !!s);
  const present = new Set(page.sections.map(keyOf));
  const missing = pinned.filter((s) => !present.has(keyOf(s)));
  if (!missing.length) return page.sections;
  const out = [...page.sections];
  for (const s of missing) {
    const at = bundled.sections.findIndex((b) => keyOf(b) === keyOf(s));
    const before = bundled.sections
      .slice(0, at)
      .reverse()
      .find((b) => out.some((x) => keyOf(x) === keyOf(b)));
    const after = bundled.sections.slice(at + 1).find((b) => out.some((x) => keyOf(x) === keyOf(b)));
    const i = before ? out.findIndex((x) => keyOf(x) === keyOf(before)) + 1 : after ? out.findIndex((x) => keyOf(x) === keyOf(after)) : out.length;
    out.splice(i, 0, s);
  }
  return out;
}

/** The bundled hero's note link, for a version whose hero has none. */
function bundledHeroNote(bundled: SitePage): Cta | undefined {
  const hero = bundled.sections.find((s) => s.type === "hero");
  return hero?.type === "hero" ? hero.note : undefined;
}

/** The bundled link at the end of the answer to `q`, or of the first answer when no question matches. */
function bundledFaqLink(bundled: SitePage, q: string): { at: number; cta: Cta } | undefined {
  const faq = bundled.sections.find((s) => s.type === "faq");
  if (faq?.type !== "faq") return undefined;
  const i = faq.items.findIndex((item) => item.q.trim().toLowerCase() === q.trim().toLowerCase());
  const at = i >= 0 ? i : 0;
  const cta = faq.items[at]?.link;
  return cta ? { at, cta } : undefined;
}

/**
 * Adds the code-owned parts of a page (see `SitePage.pinned`) to a version read from the database.
 * Only adds what is missing: a version's own note, answer link or section always wins.
 * `live` is the published page, used as the source for a variant's pinned sections.
 */
export function withPinned(page: SitePage, bundled: SitePage | undefined, live?: SitePage): SitePage {
  const pinned = bundled?.pinned;
  if (!bundled || !pinned) return page;
  const note = pinned.heroNote ? bundledHeroNote(bundled) : undefined;
  const faqLink = pinned.faqLink ? bundledFaqLink(bundled, pinned.faqLink) : undefined;
  const sections = withPinnedSections(page, bundled, live).map((s) => {
    if (s.type === "hero" && note && !s.note) return { ...s, note };
    if (s.type === "faq" && faqLink && !s.items[faqLink.at]?.link) {
      return { ...s, items: s.items.map((item, j) => (j === faqLink.at ? { ...item, link: faqLink.cta } : item)) };
    }
    return s;
  });
  return { ...page, sections };
}
