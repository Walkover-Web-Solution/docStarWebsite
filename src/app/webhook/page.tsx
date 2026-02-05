import FeatureSchema from "@/components/seo/FeatureSchema"
import { buildFeaturePageMetadata, resolveFeatureContent } from "@/lib/featureMeta"
import Webhook from "./Webhook"

const PAGE_PATH = "/webhook"
const FALLBACK_CONTENT = {
  title: "Webhooks | DocStar",
  description:
    "Real-time documentation sync with DocStar Webhooks. Get instant notifications for content changes, automate workflows, and keep your systems aligned automatically.",
  keywords: ["webhooks", "real-time sync", "documentation automation", "docstar webhooks", "api webhooks"],
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
      id="docstar-webhook-schema"
      title={featureContent.title}
      description={featureContent.description}
      path={PAGE_PATH}
      keywords={featureContent.keywords}
    >
      <Webhook />
    </FeatureSchema>
  )
}

