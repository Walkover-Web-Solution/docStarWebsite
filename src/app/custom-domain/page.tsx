// app/custom-domain/page.tsx
import FeatureSchema from "@/components/seo/FeatureSchema";
import { buildFeaturePageMetadata, resolveFeatureContent } from "@/lib/featureMeta";
import { CustomDomainClient } from "./CustomDomainClient";

const PAGE_PATH = "/custom-domain";
const FALLBACK_CONTENT = {
  title: "Custom Domain | DocStar",
  description: "Add a custom domain to your DocStar documentation and host your knowledge base on your own branded URL. Easily configure DNS, strengthen brand trust, and deliver a professional documentation experience.",
  keywords: ["white label docs", "docstar","Custom Domain"],
};

export async function generateMetadata() {
  return buildFeaturePageMetadata({
    path: PAGE_PATH,
    fallback: FALLBACK_CONTENT,
  });
}

export default async function WhiteLabelling() {
  const featureContent = await resolveFeatureContent({
    path: PAGE_PATH,
    fallback: FALLBACK_CONTENT,
  });

  return (
    <FeatureSchema
      id="docstar-custom-domain-schema"
      title={featureContent.title}
      description={featureContent.description}
      path={PAGE_PATH}
      keywords={featureContent.keywords}
    >
      <CustomDomainClient />
    </FeatureSchema>
  );
}
