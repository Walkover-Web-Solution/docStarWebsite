import { FileText, BarChart, List, Link as LinkIcon } from "lucide-react";
import Link from "next/link";

export default function DocsTemplatesSection() {
  return (
    <section
      className="w-full py-20 px-6 theme-bg-secondary"
      id="docs-templates-section"
    >
      <div className="container mx-auto flex flex-col gap-12 p-6 theme-bg">
        <div className="grid lg:grid-cols-2 gap-20 items-start">
          {/* Left Content */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded theme-bg border">
              <div className="w-6 h-6 rounded flex items-center justify-center theme-badge">
                <FileText className="w-4 h-4" />
              </div>
              <span className="font-semibold">
                Knowledge base/FAQ
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <h3 className="h3">
                Turn Information into Actionable Knowledge base
              </h3>

              <p className="text-lg leading-relaxed opacity-80">
                Create and publish beautiful, AI-optimized documentation and
                knowledge bases that always stay up-to-date, accelerate
                onboarding and surface in AI-powered search
              </p>
            </div>

            <Link href="/features" target="_blank" className="btn btn-primary flex items-center justify-center gap-2 w-fit">
              Explore more
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-6 rounded-lg hover:shadow-lg transition-shadow theme-bg border border-color">
                <BarChart className="w-8 h-8 mb-4 opacity-80" />
                <h4 className="h4">Page Analytics</h4>
                <p className="text-sm line-clamp-3">
                  Helps you understand how your documentation is performing. It
                  shows important data about user activity, page health, and
                  feedback so you can improve your content based on real
                  insights.
                </p>
              </div>

              <div className="p-6 rounded-lg hover:shadow-lg transition-shadow theme-bg border border-color">
                <List className="w-8 h-8 mb-4 opacity-80" />
                <h4 className="h4">Table of content in public view</h4>
                <p className="text-sm line-clamp-3">
                  Generates a structured outline for every public page. It helps
                  readers quickly navigate through sections and headings,
                  improving readability, accessibility, and overall user
                  experience.
                </p>
              </div>

              <div
                className="p-6 rounded-lg hover:shadow-lg transition-shadow theme-bg border border-color"
                style={{ gridColumn: "span 2" }}
              >
                <LinkIcon className="w-8 h-8 mb-4 opacity-80" />
                <h4 className="h4">Edit via link</h4>
                <p className="text-sm line-clamp-3">
                  Allows you to open a document directly in edit mode using a
                  secure, shareable link. Instead of navigating through
                  collections, you can jump straight to editing the specific
                  page—making updates faster and more convenient for your team
                </p>
              </div>
            </div>
          </div>

          {/* Right Content - Documentation Preview */}
          <div className="relative w-full h-full overflow-hidden">
            <img
              src="/template-section-images/docstar-docs.webp"
              alt="Documentation Interface Preview"
              className="w-full h-full object-cover object-left"
            />
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-l from-white/60 via-white/30 to-transparent"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
