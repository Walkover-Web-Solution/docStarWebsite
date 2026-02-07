 import FeatureSchema from "@/components/seo/FeatureSchema"
import { buildFeaturePageMetadata, resolveFeatureContent } from "@/lib/featureMeta"
import SearchSdk from "./SearchSdk"

const PAGE_PATH = "/search-sdk"
const FALLBACK_CONTENT = {
    title: "Search SDK | DocStar",
    description:
        "Search SDK for DocStar.",
    keywords: ["search sdk", "docstar search sdk"],
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
            id="docstar-search-sdk-schema"
            title={featureContent.title}
            description={featureContent.description}
            path={PAGE_PATH}
            keywords={featureContent.keywords}
        >
            <SearchSdk />
        </FeatureSchema>
    )
}

