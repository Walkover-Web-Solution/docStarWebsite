// app/support/page.tsx

import { fetchMeta } from "@/services/meta.api";
import { generateSEOMetadata } from "@/lib/seo";
import { cache } from "react";
import JsonLd from "@/components/seo/JsonLd";
import { buildStructuredDataGraph, buildCanonicalUrl } from "@/lib/structuredData";

import { Mail, Calendar, MessageCircle, HelpCircle } from "lucide-react";

const CONTACT = {
  EMAIL: "support@docstar.io",
  DEMO_LINK: "https://cal.com/docstar-team",
};

export const dynamic = "force-dynamic";
export const runtime = "edge";

const getCachedMeta = cache(async () => {
  try {
    return await fetchMeta("/support");
  } catch (error) {
    console.error("[SupportPage] Unable to load meta from API:", error);
    return null;
  }
});

export async function generateMetadata() {
  const meta = await getCachedMeta();

  return generateSEOMetadata({
    meta,
    pathname: "/support",
  });
}

export default async function SupportPage() {
  const meta = await getCachedMeta();

  const pageTitle = meta?.title ?? "Support | DocStar";
  const pageDescription =
    meta?.description ??
    "Need help? Our support team is ready to assist you with setup, documentation, or technical questions. Contact us today.";
  const pageUrl = buildCanonicalUrl("/support");

  const structuredData = buildStructuredDataGraph({
    page: {
      title: pageTitle,
      description: pageDescription,
      url: pageUrl,
      keywords: meta?.keywords ? (Array.isArray(meta.keywords) ? meta.keywords : [meta.keywords]) : ["docstar support", "docstar contact", "docstar help"],
    },
    breadcrumbs: [
      { name: "Home", url: buildCanonicalUrl("/") },
      { name: "Support", url: pageUrl },
    ],
  });

  return (
    <>
      <JsonLd id="docstar-support-schema" data={structuredData} />
      <div className="py-20 lg:py-32 relative overflow-hidden bg-[var(--theme-bg)] min-h-screen">
        {/* Modern Background Blurs */}
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-[var(--theme-color)] to-blue-500 opacity-[0.05] dark:opacity-[0.08] blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-to-tl from-purple-500 to-[var(--theme-color)] opacity-[0.05] dark:opacity-[0.08] blur-[120px] rounded-full pointer-events-none"></div>

        <div className="container mx-auto px-6 py-16 mt-10 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--theme-color)]/20 shadow-sm text-sm font-medium bg-[var(--theme-color)]/5 mb-6">
              <MessageCircle className="w-4 h-4 text-[var(--theme-color)]" />
              <span className="text-[var(--theme-color)]">We're here to help</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight leading-tight mb-6 text-gray-950 dark:text-white">
              Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-blue-500">Support</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
              Whether you’re just getting started, launching your documentation hub, or have a technical question. Reach out, and we’ll respond promptly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-20">
            {/* Contact Support */}
            <section
              className="group relative p-8 md:p-10 bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-3xl shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
              aria-label="Contact Support"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--theme-color)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl pointer-events-none"></div>
              
              <div className="w-14 h-14 rounded-2xl bg-[var(--theme-color)]/10 flex items-center justify-center mb-6 border border-[var(--theme-color)]/20 shadow-inner">
                <Mail className="w-7 h-7 text-[var(--theme-color)]" />
              </div>
              
              <h2 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">Email Us</h2>
              <p className="mb-8 text-gray-600 dark:text-gray-400 leading-relaxed">
                Our technical support team typically replies within 24 hours on business days to ensure you get unstuck fast.
              </p>
              
              <div className="mt-auto">
                <a 
                  href={`mailto:${CONTACT.EMAIL}`} 
                  className="inline-flex items-center text-[var(--theme-color)] font-semibold hover:text-blue-600 transition-colors group/link"
                >
                  {CONTACT.EMAIL}
                  <svg className="w-4 h-4 ml-2 transform group-hover/link:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </section>

            {/* Demo Section */}
            <section
              className="group relative p-8 md:p-10 bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-3xl shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
              aria-label="Schedule a Demo"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl pointer-events-none"></div>

              <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6 border border-blue-500/20 shadow-inner">
                <Calendar className="w-7 h-7 text-blue-500" />
              </div>
              
              <h2 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">Schedule a 1:1 Demo</h2>
              <p className="mb-8 text-gray-600 dark:text-gray-400 leading-relaxed">
                Want a guided tour? Book a demo with our product specialist—we’ll show you the features, best practices, and answer any questions.
              </p>
              
              <div className="mt-auto">
                <a
                  href={CONTACT.DEMO_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-white bg-gray-950 dark:bg-white dark:text-gray-950 rounded-xl transition-all shadow-md hover:scale-[1.02] hover:shadow-lg w-full sm:w-auto"
                >
                  Book your Demo
                  <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </section>
          </div>
          
          {/* FAQ Link / Extra Help */}
          <div className="text-center">
            <p className="text-gray-500 dark:text-gray-400">
              Looking for quick answers?{" "}
              <a href="/faq" className="text-[var(--theme-color)] hover:underline font-medium inline-flex items-center">
                Check our FAQ
                <HelpCircle className="w-4 h-4 ml-1.5" />
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
