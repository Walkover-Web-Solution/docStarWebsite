import FeatureSchema from "@/components/seo/FeatureSchema"
import { buildFeaturePageMetadata, resolveFeatureContent } from "@/lib/featureMeta"
import GalleryView from "./GalleryView"

const PAGE_PATH = "/gallery-view"
const FALLBACK_CONTENT = {
  title: "Gallery View | DocStar",
  description:
    "Organize and present your documentation with Gallery View. Create visual, scannable layouts that make content discovery intuitive and engaging.",
  keywords: ["gallery view", "visual documentation", "content organization", "docstar layouts"],
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
      id="docstar-gallery-view-schema"
      title={featureContent.title}
      description={featureContent.description}
      path={PAGE_PATH}
      keywords={featureContent.keywords}
    >
      <GalleryView />
    </FeatureSchema>
  )
}

