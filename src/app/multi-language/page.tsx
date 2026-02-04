import FeatureSchema from "@/components/seo/FeatureSchema"
import { buildFeaturePageMetadata, resolveFeatureContent } from "@/lib/featureMeta"
import MultiLanguageClient from "./MultiLanguageClient"

const PAGE_PATH = "/multi-language"
const FALLBACK_CONTENT = {
  title: "Multi-Language Support | DocStar",
  description:
    "Deliver documentation in multiple languages with DocStar. Expand global reach, boost SEO, and engage international teams effortlessly.",
  keywords: ["multi language docs", "localized documentation", "docstar"],
}

export async function generateMetadata() {
  return buildFeaturePageMetadata({
    path: PAGE_PATH,
    fallback: FALLBACK_CONTENT,
  })
}

export default async function MultiLanguagePage() {
  const featureContent = await resolveFeatureContent({
    path: PAGE_PATH,
    fallback: FALLBACK_CONTENT,
  })

  return (
    <FeatureSchema
      id="docstar-multi-language-schema"
      title={featureContent.title}
      description={featureContent.description}
      path={PAGE_PATH}
      keywords={featureContent.keywords}
    >
      <MultiLanguageClient />
    </FeatureSchema>
  )
}
