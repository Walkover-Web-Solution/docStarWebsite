import { FileText, Globe, Smile } from "lucide-react";
import Link from "next/link";

export default function APITemplateSection() {
  return (
    <section
      className="w-full bg-[#f8f9fa] py-20 px-6"
      id="docs-templates-section"
    >
      <div className="container mx-auto flex flex-col gap-12 bg-white p-6">
        <div className="grid lg:grid-cols-2 gap-20 items-start">
          {/* Left Content */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded border border-gray-200">
              <div className="w-6 h-6 bg-black rounded flex items-center justify-center">
                <FileText className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-gray-900">API Doc</span>
            </div>

            <div className="flex flex-col gap-1">
              <h3 className="h3">
                Clean, Interactive API Docs platform for Modern Teams
              </h3>

              <p className="text-lg text-gray-600 leading-relaxed">
                From REST APIs to webhooks - Create structured, developer-ready
                documentation.
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
              <div className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
                <FileText className="w-8 h-8 text-gray-700 mb-4" />
                <h4 className="h4">Interactive API playground</h4>
                <p className="line-clamp-3 text-sm">
                  Test endpoints, tweak parameters, and copy ready-to-run code
                  snippets
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
                <Globe className="w-8 h-8 text-gray-700 mb-4" />
                <h4 className="h4">API token management</h4>
                <p className="line-clamp-3 text-sm">
                  Allows users to securely create, manage, and control the API
                  tokens.
                </p>
              </div>

              <div
                className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow"
                style={{ gridColumn: "span 2" }}
              >
                <Smile className="w-8 h-8 text-gray-700 mb-4" />
                <h4 className="h4">Themes</h4>
                <p className="line-clamp-3 text-sm">
                  Lets you personalize the look and structure of your workspace,
                  ensuring it matches your brand style and fits your unique
                  needs.
                </p>
              </div>
            </div>
          </div>

          {/* Right Content - Documentation Preview */}
          <div className="relative w-full h-full overflow-hidden">
            <img
              src="/template-section-images/docstar-api.webp"
              alt="Documentation Interface Preview"
              className="w-full h-full object-cover object-left"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-white/60 via-white/30 via-40% to-transparent to-70% pointer-events-none"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
