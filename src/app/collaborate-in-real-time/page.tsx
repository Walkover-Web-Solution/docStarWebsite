import FeatureSchema from "@/components/seo/FeatureSchema";
import { buildFeaturePageMetadata, resolveFeatureContent } from "@/lib/featureMeta";
import CollaborateContent from "./CollaborateContent";

const PAGE_PATH = "/collaborate-in-real-time";
const FALLBACK_CONTENT = {
  title: "Real Time Collaboration | DocStar",
  description: "Work together on documentation with live collaborative editing. See changes instantly, coordinate with teammates, and keep content accurate and up to date.",
  keywords: ["real-time collaboration", "doc collaboration", "docstar","Real Time Collaboration"],
};

export async function generateMetadata() {
  return buildFeaturePageMetadata({
    path: PAGE_PATH,
    fallback: FALLBACK_CONTENT,
  });
}

export default async function CollaboratePage() {
  const featureContent = await resolveFeatureContent({
    path: PAGE_PATH,
    fallback: FALLBACK_CONTENT,
  });

  return (
    <FeatureSchema
      id="docstar-collaboration-schema"
      title={featureContent.title}
      description={featureContent.description}
      path={PAGE_PATH}
      keywords={featureContent.keywords}
    >
      <CollaborateContent />
    </FeatureSchema>
  );
}
