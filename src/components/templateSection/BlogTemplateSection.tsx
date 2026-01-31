import { BookOpen, Sparkles, Languages, Tag } from "lucide-react";
import Link from "next/link";

export default function BlogTemplateSection() {
  return (
    <section
      className="w-full py-20 px-6 theme-bg-secondary"
      id="docs-templates-section"
    >
      <div className="container mx-auto flex flex-col gap-12 p-6 ">
        <div className="grid lg:grid-cols-2 gap-20 items-start">
          {/* Left Content */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-md border">
              <div className="w-6 h-6 rounded-md flex items-center justify-center theme-badge">
                <BookOpen className="w-4 h-4" />
              </div>
              <span className="font-semibold">Blogs</span>
            </div>

            <div className="flex flex-col gap-1">
              <h3 className="h3">The best blogging platform for teams</h3>

              <p className="text-lg leading-relaxed opacity-80">
                Effortlessly run your blog with a team. Customize everything —
                map a domain, subdomain, or use a company sub-path.
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
              <div className="p-6 rounded-lg hover:shadow-lg transition-shadow border theme-border">
                <Sparkles className="w-8 h-8 mb-4 opacity-80" />
                <h4 className="h4">Turn Ideas Easily with AI</h4>
                <p className="text-sm line-clamp-3">
                  Helps you generate well-structured, professional documents in
                  seconds, transforming your thoughts into polished content with
                  minimal effort.
                </p>
              </div>

              <div className="p-6 rounded-lg hover:shadow-lg transition-shadow border theme-border">
                <Languages className="w-8 h-8 mb-4 opacity-80" />
                <h4 className="h4">Multi-Language Support</h4>
                <p className="text-sm line-clamp-3">
                  Allows your platform to be used in different languages, making
                  it accessible and user friendly for a global audience.
                </p>
              </div>

              <div
                className="p-6 rounded-lg hover:shadow-lg transition-shadow border theme-border"
                style={{ gridColumn: "span 2" }}
              >
                <Tag className="w-8 h-8 mb-4 opacity-80" />
                <h4 className="h4">Meta tags</h4>
                <p className="text-sm line-clamp-3">
                  Meta Tags let you add SEO-friendly title, description, and
                  keywords to your documentation pages. This helps search
                  engines understand your content better and improves your page
                  visibility and ranking on Google and other search platforms
                </p>
              </div>
            </div>
          </div>

          {/* Right Content - Documentation Preview */}
          <div className="relative w-full h-full overflow-hidden">
            <img
              src="/template-section-images/blog-img.webp"
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
