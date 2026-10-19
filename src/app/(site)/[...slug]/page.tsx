import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SectionRenderer from "@/components/site/SectionRenderer";
import { PATH_TO_SLUG } from "@/content/pages";
import { getSitePage } from "@/content/source";
import type { SitePage } from "@/content/types";
import { SITE_URL } from "@/lib/site";

// Every website page except the homepage renders here, from src/content (or hitman-api).
export const revalidate = 60;

type Params = { params: Promise<{ slug: string[] }> };

const slugFor = async ({ params }: Params) => PATH_TO_SLUG[`/${(await params).slug.join("/")}`];

export async function generateMetadata(props: Params): Promise<Metadata> {
  const slug = await slugFor(props);
  if (!slug) return {};
  const { meta, path } = await getSitePage(slug);
  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: { canonical: path, types: { "text/markdown": `${path}.md` } },
    openGraph: { title: meta.title, description: meta.description, url: `${SITE_URL}${path}`, type: "website" },
    twitter: { card: "summary_large_image", title: meta.title, description: meta.description },
  };
}

function jsonLd(page: SitePage) {
  const faq = page.sections.find((x) => x.type === "faq");
  return [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: page.meta.title,
      description: page.meta.description,
      url: `${SITE_URL}${page.path}`,
      isPartOf: { "@type": "WebSite", name: "DocStar", url: SITE_URL },
    },
    faq && {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faq.items.map((item) => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })),
    },
  ].filter(Boolean);
}

export default async function Page(props: Params) {
  const slug = await slugFor(props);
  if (!slug) notFound();
  const page = await getSitePage(slug);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd(page)) }} />
      <SectionRenderer sections={page.sections} />
    </>
  );
}
