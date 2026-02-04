import FeatureSchema from "@/components/seo/FeatureSchema"
import { buildFeaturePageMetadata, resolveFeatureContent } from "@/lib/featureMeta"
import { IdeasWithAIClient } from "./IdeasWithAIClient"

const PAGE_PATH = "/ideas-with-ai"
const FALLBACK_CONTENT = {
  title: "Turn Your Ideas into Documents with AI – DocStar",
  description:
    "Transform raw notes, brainstorming, or outlines into structured documents with DocStar’s AI-powered documentation platform.",
  keywords: ["ai documentation", "idea to doc", "docstar ai"],
}

export async function generateMetadata() {
  return buildFeaturePageMetadata({
    path: PAGE_PATH,
    fallback: FALLBACK_CONTENT,
  })
}

export default async function IdeasWithAIPage() {
  const featureContent = await resolveFeatureContent({
    path: PAGE_PATH,
    fallback: FALLBACK_CONTENT,
  })

  return (
    <FeatureSchema
      id="docstar-ideas-with-ai-schema"
      title={featureContent.title}
      description={featureContent.description}
      path={PAGE_PATH}
      keywords={featureContent.keywords}
    >
      <IdeasWithAIClient />
    </FeatureSchema>
  )
}
