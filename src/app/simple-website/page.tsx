import FeatureSchema from "@/components/seo/FeatureSchema";
import { buildFeaturePageMetadata, resolveFeatureContent } from "@/lib/featureMeta";

const PAGE_PATH = "/simple-website";
const FALLBACK_CONTENT = {
  title: "Build Simple Websites | DocStar",
  description: "Launch personal or product websites without code using DocStar.",
  keywords: ["no-code website", "docstar website builder", "personal site"],
};

export async function generateMetadata() {
  return buildFeaturePageMetadata({
    path: PAGE_PATH,
    fallback: FALLBACK_CONTENT,
  });
}

export default async function SimpleWebsite() {
  const featureContent = await resolveFeatureContent({
    path: PAGE_PATH,
    fallback: FALLBACK_CONTENT,
  });

  return (
    <FeatureSchema
      id="docstar-simple-website-schema"
      title={featureContent.title}
      description={featureContent.description}
      path={PAGE_PATH}
      keywords={featureContent.keywords}
    >
      <div className="min-h-screen px-6 py-20 lg:px-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-6">
            Build Your Personal Website Without Code
          </h1>
          <p className="text-lg mb-10 opacity-80">
            With the intuitive features of <span className="font-semibold">DocStar</span>, you can create your own personal website without needing a developer team or any coding skills.
            Turn your ideas and vision into a fully functional website, and let the world explore what you've built—<span className="italic">no tech expertise required</span>!
          </p>

          <div className="p-10 rounded-xl shadow-md ">
            <h2 className="text-2xl font-semibold mb-4">
              Fast, Easy, and No-Code
            </h2>
            <p className="text-lg opacity-80">
              Build your website in no time and showcase your ideas to the world with ease.
            </p>
          </div>
        </div>
      </div>
    </FeatureSchema>
  );
}
