import FeatureSchema from "@/components/seo/FeatureSchema";
import { buildFeaturePageMetadata, resolveFeatureContent } from "@/lib/featureMeta";
import EmbedEditorPageClient from "./EmbedEditorPageClient"

const PAGE_PATH = "/embed-editor"
const FALLBACK_CONTENT = {
  title: "Embed Editor | DocStar",
  description: "Seamlessly embed a Google Docs-like editor inside your product.",
  keywords: ["embed editor", "docstar editor", "collaborative editor"],
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
      id="docstar-embed-editor-schema"
      title={featureContent.title}
      description={featureContent.description}
      path={PAGE_PATH}
      keywords={featureContent.keywords}
    >
      <EmbedEditorPageClient />
    </FeatureSchema>
  )
}
