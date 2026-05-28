import FeatureSchema from "@/components/seo/FeatureSchema";
import { buildFeaturePageMetadata, resolveFeatureContent } from "@/lib/featureMeta";
import { ChangelogClient } from "./ChangelogClient";

const PAGE_PATH = "/changelog";
const FALLBACK_CONTENT = {
  title: "Changelog & Release Notes | DocStar",
  description: "Track and publish product updates for your documentation. Create changelogs manually or use AI to generate release notes automatically.",
  keywords: ["changelog", "release notes", "product updates", "ai changelog"],
};

export async function generateMetadata() {
  return buildFeaturePageMetadata({
    path: PAGE_PATH,
    fallback: FALLBACK_CONTENT,
  });
}

export default async function ChangelogPage() {
  const featureContent = await resolveFeatureContent({
    path: PAGE_PATH,
    fallback: FALLBACK_CONTENT,
  });

  return (
    <FeatureSchema
      id="docstar-changelog-schema"
      title={featureContent.title}
      description={featureContent.description}
      path={PAGE_PATH}
      keywords={featureContent.keywords}
    >
      <ChangelogClient />
    </FeatureSchema>
  );
}
