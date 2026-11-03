import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SectionRenderer from "@/components/site/SectionRenderer";
import Breadcrumbs from "@/components/site/ui/Breadcrumbs";
import { PATH_TO_SLUG } from "@/content/pages";
import { getSitePage } from "@/content/source";
import { breadcrumbs, jsonLdScript, pageJsonLd, pageMetadata } from "@/lib/seo";

// Every website page except the homepage renders here, from the database (or the bundled copy in src/content).
export const dynamic = "force-dynamic";

type Params = { params: Promise<{ slug: string[] }> };

const slugFor = async ({ params }: Params) => PATH_TO_SLUG[`/${(await params).slug.join("/")}`];

export async function generateMetadata(props: Params): Promise<Metadata> {
  const slug = await slugFor(props);
  if (!slug) return {};
  return pageMetadata(await getSitePage(slug));
}

export default async function Page(props: Params) {
  const slug = await slugFor(props);
  if (!slug) notFound();
  const page = await getSitePage(slug);
  // Visible breadcrumbs on pages below a section (/for/…, /compare/…); every page has them in JSON-LD.
  const deep = page.path.split("/").filter(Boolean).length > 1;
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(pageJsonLd(page)) }} />
      {deep && <Breadcrumbs items={breadcrumbs(page)} />}
      <SectionRenderer sections={page.sections} />
    </>
  );
}
