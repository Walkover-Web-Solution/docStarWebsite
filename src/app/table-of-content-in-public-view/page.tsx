import FeatureSchema from "@/components/seo/FeatureSchema"
import { buildFeaturePageMetadata, resolveFeatureContent } from "@/lib/featureMeta"
import TableOfContentInPublicView from "./TableOfContentInPublicView"

const PAGE_PATH = "/table-of-content-in-public-view"
const FALLBACK_CONTENT = {
  title: "Table of Contents in Public View | DocStar",
  description:
    "Enhance navigation with public table of contents. Help users find content quickly with an organized, accessible navigation structure in your documentation.",
  keywords: ["table of contents", "documentation navigation", "public toc", "docstar navigation"],
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
      id="docstar-table-of-content-schema"
      title={featureContent.title}
      description={featureContent.description}
      path={PAGE_PATH}
      keywords={featureContent.keywords}
    >
      <TableOfContentInPublicView />
    </FeatureSchema>
  )
}

