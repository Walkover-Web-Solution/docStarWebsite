 import FeatureSchema from "@/components/seo/FeatureSchema"
import { buildFeaturePageMetadata, resolveFeatureContent } from "@/lib/featureMeta"
import ApiToken from "./ApiToken"

const PAGE_PATH = "/api-token"
const FALLBACK_CONTENT = {
    title: "API Token | DocStar",
    description:
        "Generate and manage API tokens for secure access to DocStar's API.",
    keywords: ["api token", "api documentation", "api organization", "docstar api"],
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
            id="docstar-api-token-schema"
            title={featureContent.title}
            description={featureContent.description}
            path={PAGE_PATH}
            keywords={featureContent.keywords}
        >
            <ApiToken />
        </FeatureSchema>
    )
}

