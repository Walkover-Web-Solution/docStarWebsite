 import FeatureSchema from "@/components/seo/FeatureSchema"
import { buildFeaturePageMetadata, resolveFeatureContent } from "@/lib/featureMeta"
import EditViaLink from "./EditViaLink"

const PAGE_PATH = "/edit-via-link"
const FALLBACK_CONTENT = {
    title: "Edit via Link | DocStar",
    description:"Edit documentation through secure shareable links. Enable seamless collaboration, collect updates from team members or external contributors, and manage content without requiring full workspace access.",
    keywords: ["edit document", "docstar edit via link","Edit via Link"],
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

