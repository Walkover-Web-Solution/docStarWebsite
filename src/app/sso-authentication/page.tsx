import FeatureSchema from "@/components/seo/FeatureSchema"
import { buildFeaturePageMetadata, resolveFeatureContent } from "@/lib/featureMeta"
import { SsoAuthentication } from "./SsoAuthentication"

const PAGE_PATH = "/sso-authentication"
const FALLBACK_CONTENT = {
  title: "SSO Authentication | DocStar",
  description:
    "DocStar's Single Sign-On authentication solution makes digital access both secure and effortless. One set of credentials, instant secure access across all connected services.",
  keywords: ["sso", "single sign-on", "docstar security"],
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
      id="docstar-sso-authentication-schema"
      title={featureContent.title}
      description={featureContent.description}
      path={PAGE_PATH}
      keywords={featureContent.keywords}
    >
      <SsoAuthentication />
    </FeatureSchema>
  )
}
