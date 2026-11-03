import type { Metadata } from "next";
import type { SitePage } from "@/content/types";
import { pageByPath, pageBySlug } from "@/content/pages";
import { SITE } from "@/content/site";
import { SITE_URL } from "./site";

// Search and share metadata for every website page: <head> tags (pageMetadata) and JSON-LD (pageJsonLd).
// Built from the page content, so the database copy and the bundled copy produce the same tags.

export const absolute = (path: string) => (path === "/" ? SITE_URL : `${SITE_URL}${path}`);
export const markdownPath = (path: string) => (path === "/" ? "/index.md" : `${path}.md`);
// Share image per page, prerendered by src/app/og/[image]/route.tsx.
export const ogImagePath = (slug: string) => `/og/${slug}.png`;

// Short page name: the bundled label, else the title without the brand suffix.
export const pageLabel = (page: SitePage) => pageBySlug(page.slug)?.label ?? page.meta.title.replace(/\s*\|\s*DocStar$/, "");

export function pageMetadata(page: SitePage): Metadata {
  const { title, description, keywords } = page.meta;
  const url = absolute(page.path);
  const image = { url: ogImagePath(page.slug), width: 1200, height: 630, alt: title };
  return {
    title: { absolute: title },
    description,
    keywords,
    alternates: { canonical: url, types: { "text/markdown": absolute(markdownPath(page.path)) } },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
    openGraph: { type: "website", siteName: "DocStar", locale: "en_US", url, title, description, images: [image] },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}

/** Home → any parent paths that are pages → this page. */
export function breadcrumbs(page: SitePage): { name: string; path: string }[] {
  if (page.path === "/") return [];
  const trail = [{ name: "Home", path: "/" }];
  const parts = page.path.split("/").filter(Boolean);
  for (let i = 1; i < parts.length; i++) {
    const parent = pageByPath(`/${parts.slice(0, i).join("/")}`);
    if (parent) trail.push({ name: pageLabel(parent), path: parent.path });
  }
  trail.push({ name: pageLabel(page), path: page.path });
  return trail;
}

const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

// Pages that describe the product, where SoftwareApplication applies.
const PRODUCT_PAGES = ["home", "mcp", "cli", "api-docs", "analytics", "white-label", "pricing"];
const PAGE_TYPES: Record<string, string> = { support: "ContactPage", about: "AboutPage", customers: "CollectionPage", compare: "CollectionPage", changelog: "CollectionPage" };

const organization = () => ({
  "@type": "Organization",
  "@id": ORG_ID,
  name: "DocStar",
  url: SITE_URL,
  logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png`, width: 256, height: 256 },
  description: `${SITE.tagline} Your coding agent writes the API docs; DocStar publishes them as a docs site, llms.txt, a hosted MCP server and a CLI.`,
  email: SITE.supportEmail,
  ...(SITE.social.length ? { sameAs: SITE.social.map((s) => s.href) } : {}),
  contactPoint: { "@type": "ContactPoint", contactType: "customer support", email: SITE.supportEmail, url: absolute("/support"), availableLanguage: "en" },
});

// Offers come from the pricing page itself, so the markup can never disagree with what's shown.
function offers() {
  const pricing = pageBySlug("pricing")?.sections.find((s) => s.type === "pricing");
  if (!pricing || pricing.type !== "pricing") return [];
  const out: object[] = [{ "@type": "Offer", name: "Free", price: "0", priceCurrency: "USD", url: absolute("/pricing") }];
  for (const plan of pricing.plans) {
    const price = plan.price.match(/^\$(\d+(?:\.\d+)?)$/)?.[1];
    if (!price) continue; // "Let's talk" and other non-numeric prices aren't offers
    out.push({
      "@type": "Offer",
      name: plan.title,
      price,
      priceCurrency: "USD",
      url: absolute("/pricing"),
      ...(/month/i.test(plan.priceNote || "") ? { priceSpecification: { "@type": "UnitPriceSpecification", price, priceCurrency: "USD", unitText: "MONTH" } } : {}),
    });
  }
  return out;
}

export function pageJsonLd(page: SitePage) {
  const url = absolute(page.path);
  const crumbs = breadcrumbs(page);
  const modified = page.updated;
  const graph: object[] = [
    organization(),
    {
      "@type": PAGE_TYPES[page.slug] ?? "WebPage",
      "@id": `${url}#webpage`,
      url,
      name: page.meta.title,
      description: page.meta.description,
      inLanguage: "en",
      isPartOf: { "@id": WEBSITE_ID },
      publisher: { "@id": ORG_ID },
      ...(modified ? { dateModified: modified } : {}),
      ...(crumbs.length ? { breadcrumb: { "@id": `${url}#breadcrumb` } } : {}),
    },
  ];
  if (page.path === "/") {
    graph.push({ "@type": "WebSite", "@id": WEBSITE_ID, url: SITE_URL, name: "DocStar", description: SITE.tagline, publisher: { "@id": ORG_ID }, inLanguage: "en" });
  }
  if (crumbs.length) {
    graph.push({
      "@type": "BreadcrumbList",
      "@id": `${url}#breadcrumb`,
      itemListElement: crumbs.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, item: absolute(c.path) })),
    });
  }
  if (PRODUCT_PAGES.includes(page.slug)) {
    graph.push({
      "@type": "SoftwareApplication",
      name: "DocStar",
      url: SITE_URL,
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Web",
      description: page.meta.description,
      publisher: { "@id": ORG_ID },
      offers: offers(),
    });
  }
  return { "@context": "https://schema.org", "@graph": graph };
}

/** The JSON-LD <script> body; `<` is escaped so page text can't close the tag. */
export const jsonLdScript = (data: object) => JSON.stringify(data).replace(/</g, "\\u003c");
