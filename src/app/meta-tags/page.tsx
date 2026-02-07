import FeatureSchema from "@/components/seo/FeatureSchema"
import { buildFeaturePageMetadata, resolveFeatureContent } from "@/lib/featureMeta"
import MetaTags from "./MetaTags"

const PAGE_PATH = "/meta-tags"
const FALLBACK_CONTENT = {
  title: "Meta Tags | DocStar",
  description:
    "Optimize your documentation for search engines and social platforms. Control SEO titles, descriptions, and social sharing metadata for better visibility and engagement.",
  keywords: ["meta tags", "documentation meta tags", "docstar meta tags", "custom meta tags"],
}

export async function generateMetadata() {
  return buildFeaturePageMetadata({
    path: PAGE_PATH,
    fallback: FALLBACK_CONTENT,
  })
}

export default async function Page() {
  const featureContent = await resolveFeatureContent({
    path: PAGE_PATH,
    fallback: FALLBACK_CONTENT,
  })

  return (
    <FeatureSchema
      id="docstar-meta-tags-schema"
      title={featureContent.title}
      description={featureContent.description}
      path={PAGE_PATH}
      keywords={featureContent.keywords}
    >
      <MetaTags />
    </FeatureSchema>
  )
}

