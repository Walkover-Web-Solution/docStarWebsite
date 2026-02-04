import JsonLd from "@/components/seo/JsonLd";
import { fetchMeta } from "@/services/meta.api";
import { MetaItem } from "@/types/data-types";
import { generateSEOMetadata, normalizeKeywords } from "@/lib/seo";
import { buildStructuredDataGraph, buildCanonicalUrl } from "@/lib/structuredData";

type DocPageParams = {
  params: Promise<{ slug: string }>;
};

const DEFAULT_DESCRIPTION = "Deep-dive documentation article powered by DocStar.";

const slugToTitle = (slug: string) =>
  slug
    .split("-")
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(" ");

async function loadDocMeta(slug: string): Promise<MetaItem | null> {
  const normalized = slug.startsWith("/") ? slug : `/${slug}`;
  const [directMatch, docsMatch] = await Promise.all([
    fetchMeta(normalized),
    fetchMeta(`/docs${normalized}`),
  ]);
  return directMatch || docsMatch || null;
}

export async function generateMetadata({ params }: DocPageParams) {
  const { slug } = await Promise.resolve(params);
  const meta = await loadDocMeta(slug);
  const fallbackTitle = `${slugToTitle(slug)} | DocStar Docs`;

  return generateSEOMetadata({
    meta,
    defaultTitle: fallbackTitle,
    defaultDescription: meta?.description ?? DEFAULT_DESCRIPTION,
    pathname: `/docs/${slug}`,
  });
}

export default async function DocArticlePage({ params }: DocPageParams) {
  const { slug } = await Promise.resolve(params);
  const meta = await loadDocMeta(slug);
  const pageTitle = meta?.title ?? `${slugToTitle(slug)} | DocStar Docs`;
  const pageDescription = meta?.description ?? DEFAULT_DESCRIPTION;
  const keywords = normalizeKeywords(meta?.keywords, ["docstar", "documentation"]);
  const canonicalPath = `/docs/${slug}`;

  const structuredData = buildStructuredDataGraph({
    page: {
      title: pageTitle,
      description: pageDescription,
      url: buildCanonicalUrl(canonicalPath),
      keywords,
    },
    breadcrumbs: [
      { name: "Home", url: buildCanonicalUrl("/") },
      { name: "Docs", url: buildCanonicalUrl("/docs") },
      { name: slugToTitle(slug), url: buildCanonicalUrl(canonicalPath) },
    ],
    techArticle: {
      headline: pageTitle,
      authorName: "DocStar Docs Team",
      datePublished: meta?.createdat ?? new Date().toISOString(),
      dateModified: meta?.updatedat ?? meta?.createdat ?? new Date().toISOString(),
    },
  });

  return (
    <>
      <JsonLd id={`docstar-doc-${slug}-schema`} data={structuredData} />
      <article className="mx-auto max-w-4xl px-6 py-16 prose prose-invert">
        <p className="text-sm uppercase tracking-wide opacity-60">DocStar Docs</p>
        <h1 className="mt-2 text-4xl font-bold text-white">{pageTitle}</h1>
        <p className="mt-4 text-lg opacity-80">{pageDescription}</p>
        <section className="mt-10 space-y-6">
          <p>
            This dynamic article route renders structured content for <strong>{slug}</strong>.
            Replace this block with content fetched from your CMS or Markdown pipeline.
          </p>
          <p>
            Because the metadata comes from the same source powering your sitemap, the JSON-LD stays in
            sync with canonical URLs, authorship, and modification dates for every doc page.
          </p>
        </section>
      </article>
    </>
  );
}
