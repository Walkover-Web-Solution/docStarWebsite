import FeatureSchema from "@/components/seo/FeatureSchema"
import { buildFeaturePageMetadata, resolveFeatureContent } from "@/lib/featureMeta"
import DocstarCli from "./DocstarCli"

const PAGE_PATH = "/cli"
const FALLBACK_CONTENT = {
    title: "DocStar CLI | Call your APIs from the terminal",
    description:
        "docstar-cli reads a DocStar docs site, discovers published modules and endpoints, and installs each one as a real CLI command — required parameters and all.",
    keywords: [
        "docstar cli",
        "docstar-cli",
        "api cli",
        "terminal api",
        "oclif",
        "api documentation",
        "mcp",
    ],
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
            id="docstar-cli-schema"
            title={featureContent.title}
            description={featureContent.description}
            path={PAGE_PATH}
            keywords={featureContent.keywords}
        >
            <DocstarCli />
        </FeatureSchema>
    )
}
