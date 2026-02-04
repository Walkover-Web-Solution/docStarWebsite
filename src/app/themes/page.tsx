import FeatureSchema from "@/components/seo/FeatureSchema"
import { buildFeaturePageMetadata, resolveFeatureContent } from "@/lib/featureMeta"
import { CustomizeLayoutsPage } from "./CustomizeLayoutsPage"

const PAGE_PATH = "/themes"
const FALLBACK_CONTENT = {
  title: "Layouts & Themes | DocStar",
  description:
    "Design documentation that reflects your brand. With DocStar, customize layouts, apply themes, and publish content seamlessly with professional workflows.",
  keywords: ["docstar themes", "docs layout", "custom branding"],
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
      id="docstar-themes-schema"
      title={featureContent.title}
      description={featureContent.description}
      path={PAGE_PATH}
      keywords={featureContent.keywords}
    >
      <CustomizeLayoutsPage />
    </FeatureSchema>
  )
}
