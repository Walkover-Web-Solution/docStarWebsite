import FeatureSchema from "@/components/seo/FeatureSchema"
import { buildFeaturePageMetadata, resolveFeatureContent } from "@/lib/featureMeta"
import LastUpdated from "./Logs"

const PAGE_PATH = "/last-updated"
const FALLBACK_CONTENT = {
  title: "Last Updated | DocStar",
  description:
    "Build trust with automatic last updated timestamps. Show readers when content was last revised and maintain credibility with transparent, up-to-date documentation.",
  keywords: ["last updated", "documentation last updated", "docstar last updated", "custom last updated"],
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
      id="docstar-logs-schema"
      title={featureContent.title}
      description={featureContent.description}
      path={PAGE_PATH}
      keywords={featureContent.keywords}
    >
      <LastUpdated />
    </FeatureSchema>
  )
}

