import FeatureSchema from "@/components/seo/FeatureSchema";
import { buildFeaturePageMetadata, resolveFeatureContent } from "@/lib/featureMeta";
import { GithubWorkflowClient } from './GithubWorkflowClient';

const PAGE_PATH = "/github-workflow";
const FALLBACK_CONTENT = {
  title: "GitHub Workflow Integration | DocStar",
  description: "Automatically sync markdown documentation files from a GitHub repository to your DocStar collection.",
  keywords: ["github", "workflow", "sync", "markdown", "documentation", "docstar"],
};

export async function generateMetadata() {
  return buildFeaturePageMetadata({
    path: PAGE_PATH,
    fallback: FALLBACK_CONTENT,
  });
}

export default async function GithubWorkflowPage() {
  const featureContent = await resolveFeatureContent({
    path: PAGE_PATH,
    fallback: FALLBACK_CONTENT,
  });

  return (
    <FeatureSchema
      id="docstar-github-workflow-schema"
      title={featureContent.title}
      description={featureContent.description}
      path={PAGE_PATH}
      keywords={featureContent.keywords}
    >
      <GithubWorkflowClient />
    </FeatureSchema>
  );
}
