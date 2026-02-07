 import FeatureSchema from "@/components/seo/FeatureSchema"
import { buildFeaturePageMetadata, resolveFeatureContent } from "@/lib/featureMeta"
import EditViaLink from "./EditViaLink"

const PAGE_PATH = "/edit-via-link"
const FALLBACK_CONTENT = {
    title: "Edit via Link | DocStar",
    description:
        "Edit your document via link.",
    keywords: ["edit via link", "edit document", "docstar edit via link"],
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
            id="docstar-edit-via-link-schema"
            title={featureContent.title}
            description={featureContent.description}
            path={PAGE_PATH}
            keywords={featureContent.keywords}
        >
            <EditViaLink />
        </FeatureSchema>
    )
}

