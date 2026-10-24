import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SectionRenderer from "@/components/site/SectionRenderer";
import { PATH_TO_SLUG } from "@/content/pages";
import { getSitePage, getVariantPage } from "@/content/source";
import { hasAdminSession } from "@/server/auth";

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
  // A signed-in operator can open any version of the page (including drafts) here, to preview a challenger.
  if (await hasAdminSession().catch(() => false)) {
    const previewed = await getVariantPage(pageSlug, revisionId, { preview: true });
    if (previewed) return previewed;
  }
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
