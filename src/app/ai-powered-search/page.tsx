// app/ai-powered-search/page.tsx
import FeatureSchema from "@/components/seo/FeatureSchema"
import { buildFeaturePageMetadata, resolveFeatureContent } from "@/lib/featureMeta"
import { AIPoweredSearchClient } from "./AIPoweredSearchClient"

const PAGE_PATH = "/ai-powered-search"
const FALLBACK_CONTENT = {
  title: "AI-Powered Search | DocStar",
  description: "Discover the most relevant content across documentation and knowledge bases",
  keywords: ["AI search", "intelligent documentation search", "docstar search", "contextual search"],
}

export async function generateMetadata() {
  return buildFeaturePageMetadata({
    path: PAGE_PATH,
    fallback: FALLBACK_CONTENT,
  })
}

const AIPoweredSearchPage = async () => {
  const featureContent = await resolveFeatureContent({
    path: PAGE_PATH,
    fallback: FALLBACK_CONTENT,
  })

  return (
    <FeatureSchema
      id="docstar-ai-powered-search-schema"
      title={featureContent.title}
      description={featureContent.description}
      path={PAGE_PATH}
      keywords={featureContent.keywords}
    >
      <AIPoweredSearchClient />
    </FeatureSchema>
  )
}

export default AIPoweredSearchPage
