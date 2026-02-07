import FeatureSchema from "@/components/seo/FeatureSchema"
import { buildFeaturePageMetadata, resolveFeatureContent } from "@/lib/featureMeta"
import RevisionHistory from "./RevisionHistory"

const PAGE_PATH = "/revision-history"
const FALLBACK_CONTENT = {
  title: "Revision History | DocStar",
  description:
    "Track changes to your documentation with DocStar's revision history feature. Get insights into who made changes, when they were made, and what was changed.",
  keywords: ["revision history", "documentation revision history", "docstar revision history", "revision history"],
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
      id="docstar-revision-history-schema"
      title={featureContent.title}
      description={featureContent.description}
      path={PAGE_PATH}
      keywords={featureContent.keywords}
    >
      <RevisionHistory />
    </FeatureSchema>
  )
}

