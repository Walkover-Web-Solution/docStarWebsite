import type { Metadata } from "next";
import SectionRenderer from "@/components/site/SectionRenderer";
import { getSitePage } from "@/content/source";
import type { SitePage } from "@/content/types";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const { meta } = await getSitePage("home");
  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: { canonical: "/", types: { "text/markdown": "/index.md" } },
    openGraph: { title: meta.title, description: meta.description, url: SITE_URL, type: "website" },
    twitter: { card: "summary_large_image", title: meta.title, description: meta.description },
  };
}

function jsonLd(page: SitePage) {
  const faq = page.sections.find((x) => x.type === "faq");
  return [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "DocStar",
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Web",
      url: SITE_URL,
      description: page.meta.description,
    },
    faq && {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faq.items.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
  ].filter(Boolean);
}

export default async function Home() {
  const page = await getSitePage("home");
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd(page)) }} />
      <SectionRenderer sections={page.sections} />
    </>
  );
}
