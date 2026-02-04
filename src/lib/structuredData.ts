import { Faq, MetaItem } from "@/types/data-types";
import { normalizeKeywords } from "@/lib/seo";

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://docstar.io";
const ORGANIZATION_ID = `${SITE_URL}#organization`;
const WEBSITE_ID = `${SITE_URL}#website`;
const LOGO_URL = `${SITE_URL}/favicon.ico`;

export type BreadcrumbItem = {
  name: string;
  url: string;
};

export type TechArticleConfig = {
  headline?: string;
  authorName?: string;
  datePublished: string;
  dateModified?: string;
};

export type FaqSchemaConfig = {
  faqs: Faq[];
  headline?: string;
};

export type PageSchemaConfig = {
  title: string;
  description?: string;
  url: string;
  keywords?: MetaItem["keywords"];
};

export type StructuredDataConfig = {
  page: PageSchemaConfig;
  breadcrumbs?: BreadcrumbItem[];
  techArticle?: TechArticleConfig;
  faq?: FaqSchemaConfig;
};

export type FeatureStructuredDataConfig = {
  path: string;
  title: string;
  description: string;
  keywords?: MetaItem["keywords"];
  breadcrumbs?: BreadcrumbItem[];
  publishedAt?: string;
  updatedAt?: string;
  faq?: FaqSchemaConfig;
};

const buildOrganizationNode = () => ({
  "@type": "Organization",
  "@id": ORGANIZATION_ID,
  name: "DocStar",
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    url: LOGO_URL,
  },
});

const buildWebsiteNode = () => ({
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: SITE_URL,
  name: "DocStar",
  publisher: {
    "@id": ORGANIZATION_ID,
  },
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE_URL}/search?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
});

const buildWebPageNode = ({ title, description, url, keywords }: PageSchemaConfig) => {
  const keywordList = normalizeKeywords(keywords, []);
  return {
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: title,
    description,
    isPartOf: {
      "@id": WEBSITE_ID,
    },
    inLanguage: "en",
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: LOGO_URL,
    },
    publisher: {
      "@id": ORGANIZATION_ID,
    },
    ...(keywordList.length ? { keywords: keywordList.join(", ") } : {}),
  };
};

const buildTechArticleNode = (pageUrl: string, config: TechArticleConfig, pageTitle: string, description?: string) => ({
  "@type": "TechArticle",
  "@id": `${pageUrl}#article`,
  headline: config.headline ?? pageTitle,
  name: pageTitle,
  description,
  author: {
    "@type": "Person",
    name: config.authorName ?? "DocStar Editorial Team",
  },
  datePublished: config.datePublished,
  dateModified: config.dateModified ?? config.datePublished,
  mainEntityOfPage: {
    "@id": `${pageUrl}#webpage`,
  },
  publisher: {
    "@id": ORGANIZATION_ID,
  },
});

const buildBreadcrumbListNode = (items: BreadcrumbItem[]) => ({
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});

const buildFaqNode = (config: FaqSchemaConfig, pageUrl: string) => {
  const normalizedFaqs = config.faqs.filter((faq) => faq.question && faq.answer);
  if (!normalizedFaqs.length) return null;

  return {
    "@type": "FAQPage",
    name: config.headline ?? "Frequently Asked Questions",
    mainEntity: normalizedFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
    mainEntityOfPage: {
      "@id": `${pageUrl}#webpage`,
    },
  };
};

export const buildStructuredDataGraph = ({ page, breadcrumbs, techArticle, faq }: StructuredDataConfig) => {
  const graph: Record<string, unknown>[] = [buildOrganizationNode(), buildWebsiteNode(), buildWebPageNode(page)];

  if (techArticle) {
    graph.push(buildTechArticleNode(page.url, techArticle, page.title, page.description));
  }

  if (breadcrumbs?.length) {
    graph.push(buildBreadcrumbListNode(breadcrumbs));
  }

  if (faq?.faqs?.length) {
    const faqNode = buildFaqNode(faq, page.url);
    if (faqNode) {
      graph.push(faqNode);
    }
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
};

export const buildCanonicalUrl = (pathname: string) => {
  if (!pathname || pathname === "/") {
    return `${SITE_URL}/`;
  }
  return `${SITE_URL}${pathname.startsWith("/") ? pathname : `/${pathname}`}`;
};

export const buildFeaturePageStructuredData = ({
  path,
  title,
  description,
  keywords,
  breadcrumbs,
  publishedAt,
  updatedAt,
  faq,
}: FeatureStructuredDataConfig) => {
  const pageUrl = buildCanonicalUrl(path);
  const resolvedBreadcrumbs =
    breadcrumbs && breadcrumbs.length
      ? breadcrumbs
      : [
          { name: "Home", url: buildCanonicalUrl("/") },
          { name: "Features", url: buildCanonicalUrl("/features") },
          { name: title, url: pageUrl },
        ];

  const techArticle = publishedAt
    ? {
        headline: title,
        datePublished: publishedAt,
        dateModified: updatedAt ?? publishedAt,
      }
    : undefined;

  return buildStructuredDataGraph({
    page: {
      title,
      description,
      url: pageUrl,
      keywords,
    },
    breadcrumbs: resolvedBreadcrumbs,
    techArticle,
    faq,
  });
};
