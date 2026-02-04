import Link from "next/link";
import JsonLd from "@/components/seo/JsonLd";
import { buildCanonicalUrl, buildStructuredDataGraph } from "@/lib/structuredData";

export const metadata = {
  title: "DocStar Docs | Collections",
  description: "Browse DocStar documentation collections covering AI search, publishing, and integrations.",
};

const docsMap = [
  { slug: "ai-search", title: "AI Search" },
  { slug: "publishing", title: "Publishing" },
  { slug: "integrations", title: "Integrations" },
];

export default function DocsCollectionPage() {
  const pageTitle = typeof metadata.title === "string" ? metadata.title : "DocStar Docs";
  const pageDescription =
    typeof metadata.description === "string"
      ? metadata.description
      : "Browse DocStar documentation collections.";

  const structuredData = buildStructuredDataGraph({
    page: {
      title: pageTitle,
      description: pageDescription,
      url: buildCanonicalUrl("/docs"),
      keywords: ["docstar docs", "knowledge base"],
    },
    breadcrumbs: [
      { name: "Home", url: buildCanonicalUrl("/") },
      { name: "Docs", url: buildCanonicalUrl("/docs") },
    ],
  });

  return (
    <>
      <JsonLd id="docstar-docs-collection" data={structuredData} />
      <section className="mx-auto max-w-4xl px-6 py-16">
        <h1 className="text-4xl font-bold">Documentation Collections</h1>
        <p className="mt-4 text-lg opacity-80">Choose a guide to explore detailed articles.</p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {docsMap.map((doc) => (
            <Link
              key={doc.slug}
              className="rounded border border-white/10 p-6 transition hover:border-white/30"
              href={`/docs/${doc.slug}`}
            >
              <h2 className="text-2xl font-semibold">{doc.title}</h2>
              <p className="mt-2 opacity-70">Learn more about {doc.title.toLowerCase()} inside DocStar.</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
