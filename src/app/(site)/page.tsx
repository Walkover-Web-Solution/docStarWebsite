import type { Metadata } from "next";
import SectionRenderer from "@/components/site/SectionRenderer";
import { getSitePage } from "@/content/source";
import { jsonLdScript, pageJsonLd, pageMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata(await getSitePage("home"));
}

export default async function Home() {
  const page = await getSitePage("home");
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(pageJsonLd(page)) }} />
      <SectionRenderer sections={page.sections} />
    </>
  );
}
