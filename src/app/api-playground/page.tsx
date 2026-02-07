 import FeatureSchema from "@/components/seo/FeatureSchema"
import { buildFeaturePageMetadata, resolveFeatureContent } from "@/lib/featureMeta"
import ApiPlayground from "./ApiPlayground"

const PAGE_PATH = "/api-playground"
const FALLBACK_CONTENT = {
    title: "API Playground | DocStar",
    description:
        "Explore and test DocStar's API with ease.",
    keywords: ["api playground", "api documentation", "api organization", "docstar api"],
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
            id="docstar-api-playground-schema"
            title={featureContent.title}
            description={featureContent.description}
            path={PAGE_PATH}
            keywords={featureContent.keywords}
        >
            <ApiPlayground />
        </FeatureSchema>
    )
}

