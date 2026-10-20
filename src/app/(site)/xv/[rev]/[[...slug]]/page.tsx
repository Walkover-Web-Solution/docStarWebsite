import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SectionRenderer from "@/components/site/SectionRenderer";
import { PATH_TO_SLUG } from "@/content/pages";
import { getSitePage, getVariantPage } from "@/content/source";

// One version of a page in a running A/B test. The middleware rewrites people in that variant here,
// so the address bar keeps the real path; each version is cached on its own. Never indexed. If the
// test has ended, the live page is shown.
export const revalidate = 60;

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
  return { title: page.meta.title, description: page.meta.description, alternates: { canonical: page.path }, robots: { index: false, follow: false } };
}

export default async function VariantPage(props: Params) {
  const page = await load(props);
  if (!page) notFound();
  return <SectionRenderer sections={page.sections} />;
}
