import type { CardsSection, Cta, FaqSection, Section, SitePage } from "./types";

// The home page's shared template. Some of the page is the same in every version — the audience and
// comparison sections and two links into the "what is DocStar" guide — because it is content for
// everyone rather than something an A/B test varies. Those parts are defined here once and composed
// into whichever version is being rendered, bundled or stored, live or arm, so all of it is in the
// server-rendered HTML. Nothing is injected in the browser.

const GUIDE = "/blog/what-is-docstar-how-it-works";

/** "Who DocStar is for", after the channels section. */
export const AUDIENCE_SECTION: CardsSection = {
  type: "cards",
  key: "who-for",
  kicker: "Audience",
  title: "Who DocStar is for.",
  columns: 3,
  items: [
    {
      title: "API companies and product teams",
      body: "Want customers' AI assistants (Claude, ChatGPT, Cursor) to use their API without mistakes.",
    },
    {
      title: "Developer experience and docs teams",
      body: "Want one place to write and publish API docs, an MCP server and a CLI.",
    },
    {
      title: "Internal platform teams",
      body: "Want their own engineers' agents to use internal APIs safely.",
    },
  ],
};

/** "How DocStar compares", before the FAQ. */
export const COMPARE_SECTION: CardsSection = {
  type: "cards",
  key: "how-compares",
  kicker: "Compare",
  title: "How DocStar compares.",
  sub: "See how DocStar stacks up against other API documentation tools.",
  columns: 3,
  items: [
    {
      title: "DocStar vs ReadMe",
      body: "Published comparison on the DocStar blog.",
      cta: { kind: "link", label: "DocStar vs ReadMe", href: "/blog/docstar-vs-readme-1" },
    },
    {
      title: "DocStar vs Mintlify",
      body: "Published comparison on the DocStar blog.",
      cta: { kind: "link", label: "DocStar vs Mintlify", href: "/blog/docstar-vs-mintlify" },
    },
    {
      title: "DocStar vs GitBook",
      body: "Published comparison on the DocStar blog.",
      cta: { kind: "link", label: "DocStar vs GitBook", href: "/blog/docstar-vs-gitbook" },
    },
    {
      title: "DocStar vs Fern",
      body: "Published comparison on the DocStar blog.",
      cta: { kind: "link", label: "DocStar vs Fern", href: "/blog/docstar-vs-fern" },
    },
    {
      title: "DocStar vs Document360",
      body: "Published comparison on the DocStar blog.",
      cta: { kind: "link", label: "DocStar vs Document360", href: "/blog/sleek-api-docs--smarter-faqs--simpler-than-document360" },
    },
  ],
};

/** Small muted link under the hero buttons, for visitors who don't know what DocStar is yet. */
export const HERO_NOTE: Cta = { kind: "link", label: "New to DocStar? Read what it is and how it works", href: GUIDE };

/** The guide link at the end of this answer. */
export const FAQ_LINK: { q: string; cta: Cta } = { q: "What is DocStar?", cta: { kind: "link", label: "Read the full guide", href: GUIDE } };

// Where the two shared sections sit, relative to sections every version has.
const PLACEMENT: { section: Section; after: string; before: string }[] = [
  { section: AUDIENCE_SECTION, after: "channels", before: "stays-true" },
  { section: COMPARE_SECTION, after: "agent-readable", before: "faq" },
];

/**
 * The sections of a version with the shared ones in place where they belong. The template owns these
 * sections, so its copy replaces whatever a stored version has for the same key: a revision saved
 * before a wording change (or with the old highlighted heading) still renders the current text.
 */
function withSharedSections(sections: Section[]): Section[] {
  const shared = new Map(PLACEMENT.map((p) => [p.section.key, p.section]));
  const out = sections.filter((s) => !shared.has(s.key));
  for (const { section, after, before } of PLACEMENT) {
    const at = out.findIndex((s) => s.key === after);
    if (at >= 0) out.splice(at + 1, 0, section);
    else {
      const end = out.findIndex((s) => s.key === before);
      if (end >= 0) out.splice(end, 0, section);
      else out.push(section);
    }
  }
  return out;
}

function withHeroNote(sections: Section[]): Section[] {
  return sections.map((s) => (s.type === "hero" && !s.note ? { ...s, note: HERO_NOTE } : s));
}

function withFaqLink(sections: Section[]): Section[] {
  return sections.map((s) => {
    if (s.type !== "faq") return s;
    const faq = s as FaqSection;
    const i = faq.items.findIndex((item) => item.q.trim().toLowerCase() === FAQ_LINK.q.toLowerCase());
    if (i < 0 || faq.items[i].link) return s;
    return { ...faq, items: faq.items.map((item, j) => (j === i ? { ...item, link: FAQ_LINK.cta } : item)) };
  });
}

/**
 * The home page template: fills in the parts that are the same in every version. A version that
 * already has a section, hero note or answer link keeps its own, so nothing is added twice and the
 * admin's copy wins. Applied on the server wherever a home page version is read.
 */
export function applyHomeTemplate(page: SitePage): SitePage {
  if (page.slug !== "home") return page;
  return { ...page, sections: withFaqLink(withHeroNote(withSharedSections(page.sections))) };
}
