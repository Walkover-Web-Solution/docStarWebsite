import FeatureSchema from "@/components/seo/FeatureSchema"
import { buildFeaturePageMetadata, resolveFeatureContent } from "@/lib/featureMeta"
import PageAnalytics from "./PageAnalytics"

const PAGE_PATH = "/page-analytics"
const FALLBACK_CONTENT = {
    title: "Page Analytics | DocStar",
    description:
        "Track and analyze page performance with DocStar's comprehensive page analytics. Monitor visitor engagement, page views, and content performance metrics.",
    keywords: ["page analytics", "visual documentation", "content organization", "docstar layouts"],
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
            id="docstar-page-analytics-schema"
            title={featureContent.title}
            description={featureContent.description}
            path={PAGE_PATH}
            keywords={featureContent.keywords}
        >
            <PageAnalytics />
        </FeatureSchema>
    )
}

