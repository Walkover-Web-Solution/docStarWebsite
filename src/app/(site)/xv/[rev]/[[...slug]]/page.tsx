import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SectionRenderer from "@/components/site/SectionRenderer";
import { PATH_TO_SLUG } from "@/content/pages";
import { getSitePage, getVariantPage } from "@/content/source";
import { jsonLdScript, pageJsonLd, pageMetadata } from "@/lib/seo";

// One version of a page in a running A/B test. The middleware rewrites people in that variant here,
// so the address bar keeps the real path; each version is cached on its own. Never indexed. If the
// test has ended, the live page is shown.
export const dynamic = "force-dynamic";

type Params = { params: Promise<{ rev: string; slug?: string[] }> };

async function load({ params }: Params) {
  const { rev, slug } = await params;
  const path = `/${(slug || []).join("/")}`;
  const pageSlug = PATH_TO_SLUG[path];
  const revisionId = Number(rev);
  if (!pageSlug || !Number.isInteger(revisionId)) return null;
  return (await getVariantPage(pageSlug, revisionId)) || (await getSitePage(pageSlug));
}

export async function generateMetadata(props: Params): Promise<Metadata> {
  const page = await load(props);
  if (!page) return {};
  // Same tags as the live page, canonical included. No robots noindex here: this HTML is served at the
  // real URL, so noindex would de-index the live page if a crawler were ever bucketed. Direct /xv/ hits
  // get X-Robots-Tag from the middleware and are disallowed in robots.txt.
  return pageMetadata(page);
}

export default async function VariantPage(props: Params) {
  const page = await load(props);
  if (!page) notFound();
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(pageJsonLd(page)) }} />
      <SectionRenderer sections={page.sections} />
    </>
  );
}
