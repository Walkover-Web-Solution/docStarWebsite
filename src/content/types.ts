// Website content model. Pages are ordered lists of typed sections, so the same
// data can render as HTML, as markdown for agents, and later be edited from the
// admin panel or by an agent through the API.
//
// Rich text: wrap words in ==double equals== to get the lime highlight.

export type Cta =
  | { kind: "copy-prompt"; label: string; copiedLabel?: string }
  | { kind: "copy-text"; label: string; text: string; copiedLabel?: string }
  | { kind: "link"; label: string; href: string };

export type RunLine = { who: "you" | "agent"; text: string; done?: boolean };

export type CodePanel = { title: string; body: string };

// Built-in looks a section can switch between (A/B testable; the first is the default).
export const LAYOUTS = {
  hero: ["split", "centered", "ink"],
  steps: ["cards", "timeline"],
  channels: ["grid", "list"],
} as const;

export type HeroSection = {
  type: "hero";
  key: string;
  layout?: (typeof LAYOUTS.hero)[number];
  kicker: string;
  title: string;
  sub: string;
  primary: Cta;
  secondary?: Cta;
  works?: string;
  // the visual beside the copy: an agent run log, a code panel, or neither
  run?: { title: string; time?: string; lines: RunLine[]; summary?: string };
  code?: CodePanel;
};

export type WorksWithSection = {
  type: "works-with";
  key: string;
  label: string;
  items: string[];
};

export type StepsSection = {
  type: "steps";
  key: string;
  layout?: (typeof LAYOUTS.steps)[number];
  kicker: string;
  title: string;
  sub?: string;
  steps: { title: string; body: string; code?: string }[];
};

export type ChannelsSection = {
  type: "channels";
  key: string;
  layout?: (typeof LAYOUTS.channels)[number];
  kicker: string;
  title: string;
  sub?: string;
  items: { name: string; reader: string; body: string; sample: string }[];
};

export type PillarsSection = {
  type: "pillars";
  key: string;
  kicker: string;
  title: string;
  sub?: string;
  // `feature` links an item to a site feature slug (availability, early access, analytics).
  items: { feature: string; glyph: string; title: string; body: string; points?: string[] }[];
};

export type HubSection = {
  type: "hub";
  key: string;
  kicker: string;
  title: string;
  sub: string;
  primary: Cta;
  secondary?: Cta;
  run: { title: string; lines: RunLine[] };
};

export type AgentReadableSection = {
  type: "agent-readable";
  key: string;
  kicker: string;
  title: string;
  sub: string;
  commands: { cmd: string; output: string }[];
};

// Grid of cards: features, tools, contact options. `code` shows a snippet, `cta` a link or copy button.
export type CardsSection = {
  type: "cards";
  key: string;
  kicker?: string;
  title: string;
  sub?: string;
  columns?: 2 | 3;
  items: { title: string; body: string; label?: string; code?: string; cta?: Cta }[];
};

export type PricingPlan = {
  title: string;
  price: string;
  priceNote?: string;
  description: string;
  features: string[];
  cta: Cta;
  highlight?: boolean;
};

export type PricingSection = {
  type: "pricing";
  key: string;
  title: string;
  sub?: string;
  free: { title: string; sub: string; features: string[]; link?: Cta };
  plans: PricingPlan[];
};

// Long-form text (legal pages, support). `body` is simple markdown: ## headings, paragraphs, - lists, [links](url), **bold**.
export type ProseSection = {
  type: "prose";
  key: string;
  body: string;
};

export type FaqSection = {
  type: "faq";
  key: string;
  kicker?: string;
  title: string;
  items: { q: string; a: string }[];
};

export type CtaSection = {
  type: "cta";
  key: string;
  title: string;
  sub?: string;
  primary: Cta;
  secondary?: Cta;
};

export type Section =
  | HeroSection
  | WorksWithSection
  | StepsSection
  | ChannelsSection
  | PillarsSection
  | HubSection
  | AgentReadableSection
  | FaqSection
  | CtaSection
  | CardsSection
  | PricingSection
  | ProseSection;

export type SitePage = {
  slug: string;
  path: string;
  // Short name for breadcrumbs and links, e.g. "MCP server". Structural, so it lives in code only (not the database).
  label?: string;
  // When the page last changed: in code, the date the bundled copy was edited (YYYY-MM-DD); from the
  // database, when the live version was published. Used for the sitemap's lastmod and dateModified.
  updated?: string;
  meta: { title: string; description: string; keywords?: string[] };
  sections: Section[];
};

export type NavLink = { label: string; href: string };

export type SiteSettings = {
  prompt: string;
  nav: NavLink[];
  signIn: NavLink;
  start: NavLink;
  // Footer links to website pages that aren't live yet (see DRAFT_PAGES) are left out automatically.
  footer: { title: string; links: NavLink[] }[];
  tagline: string;
  supportEmail: string;
  // The company's public profiles: footer icons and Organization.sameAs in the JSON-LD.
  social: NavLink[];
};
