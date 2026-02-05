import FeatureSchema from "@/components/seo/FeatureSchema"
import { buildFeaturePageMetadata, resolveFeatureContent } from "@/lib/featureMeta"
import PublicHomePage from "./PublicHomePage"

const PAGE_PATH = "/public-home-page"
const FALLBACK_CONTENT = {
  title: "Public Home Page | DocStar",
  description:
    "Create a beautiful public home page for your documentation. Showcase your content with a professional, customizable landing page that engages your users.",
  keywords: ["public home page", "documentation landing page", "docstar homepage", "custom homepage"],
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
      id="docstar-public-home-page-schema"
      title={featureContent.title}
      description={featureContent.description}
      path={PAGE_PATH}
      keywords={featureContent.keywords}
    >
      <PublicHomePage />
    </FeatureSchema>
  )
}

