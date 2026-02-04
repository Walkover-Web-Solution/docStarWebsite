// app/support/page.tsx

import FeatureSchema from "@/components/seo/FeatureSchema";
import { buildFeaturePageMetadata, resolveFeatureContent } from "@/lib/featureMeta";

const CONTACT = {
  EMAIL: "support@docstar.io",
  DEMO_LINK: "https://cal.com/docstar-team",
};

const PAGE_PATH = "/support";
const FALLBACK_CONTENT = {
  title: "Support | DocStar",
  description:
    "Need help? Our support team is ready to assist you with setup, documentation, or technical questions. Contact us today.",
  keywords: ["docstar support", "docstar contact", "docstar help"],
};

export async function generateMetadata() {
  return buildFeaturePageMetadata({
    path: PAGE_PATH,
    fallback: FALLBACK_CONTENT,
  });
}

export default async function SupportPage() {
  const featureContent = await resolveFeatureContent({
    path: PAGE_PATH,
    fallback: FALLBACK_CONTENT,
  });

  return (
    <FeatureSchema
      id="docstar-support-schema"
      title={featureContent.title}
      description={featureContent.description}
      keywords={featureContent.keywords}
      path={PAGE_PATH}
    >
      <div className="py-20">
        <div className="container mx-auto px-6 py-16 mt-10">
          <h1 className="text-4xl font-extrabold mb-4 text-center">Support</h1>
          <p className="text-lg text-center mb-14 max-w-2xl mx-auto opacity-80">
            Need help? Our team is ready to assist you—whether you’re just getting started, launching your documentation
            hub, or have a technical question. Reach out, and we’ll respond promptly.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 mb-20">
            {/* Contact Support */}
            <section
              className="shadow-lg rounded-xl p-8 hover:shadow-2xl transition border"
              aria-label="Contact Support"
            >
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">Contact Support</h2>
              <p className="mb-6 opacity-80">Our support team typically replies within 24 hours on business days.</p>
              <ul className="space-y-5 text-base leading-relaxed">
                <li className="flex gap-2 items-center">
                  <b>Email:</b>
                  <a href={`mailto:${CONTACT.EMAIL}`} className="text-blue-600 hover:underline">
                    {CONTACT.EMAIL}
                  </a>
                </li>
              </ul>
            </section>

            {/* Demo Section */}
            <section
              className="shadow-lg rounded-xl p-8 hover:shadow-2xl transition border"
              aria-label="Schedule a Demo"
            >
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">Schedule a 1:1 Demo</h2>
              <p className="mb-6 opacity-80">
                Want a guided tour? Book a demo with our product specialist—we’ll show you the features and answer any
                questions.
              </p>
              <a
                href={CONTACT.DEMO_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary w-fit"
              >
                Book a Demo
              </a>
            </section>
          </div>
        </div>
      </div>
    </FeatureSchema>
  );
}
