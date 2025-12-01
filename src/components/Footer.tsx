/**
 * Renders the site footer with navigation shortcuts, mobile app links, and contact details.
 * The component is client-side only because it leverages Next.js routing for internal link handling.
 */
"use client"

import { Mail, Smartphone, ArrowRight } from "lucide-react"
import Logo from "./Logo"
import { useRouter } from "next/navigation"
import Link from "next/link"

/**
 * Site-wide footer component exposing quick access links, socials, and legal information.
 */
const Footer = () => {
  const router = useRouter()
  // Router is required for button-based navigation to internal Next.js routes.

  // Primary footer navigation sections with a mix of internal and external destinations.
  const footerSections = [
    {
      title: "Build with DocStar",
      links: [
        {
          name: "Blogs",
          href: "https://docstar.io/blogs",
        },
        {
          name: "Help Doc",
          href: "https://docstar.io/help",
        },
        {
          name: "API Doc",
          href: "https://apidoc.docstar.io",
        },
        {
          name: "Embed Editor",
          href: "/embed-editor", // internal
        },
        {
          name: "Pricing",
          href: "/pricing", // internal
        },
        {
          name: "Contact us",
          href: "/support", // internal
        },
      ],
    },
  ]

  return (
    <footer className="bg-white text-black relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"></div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-start">
          {/* Logo + Description Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <Logo size="md" className="text-black" animated />
              <span className="text-2xl font-bold text-black">DocStar</span>
            </div>

            <p className="text-gray-600 mb-6 leading-relaxed max-w-sm">
              Beautiful, fast, and reliable API Docs & FAQs built for teams.
              Transform your documentation workflow with AI.
            </p>

            {/* Social Links */}
            <div className="flex space-x-3">
              <a
                href="mailto:support@docstar.io"
                title="Email"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-black transition-all duration-300 p-2.5 rounded-lg hover:bg-black/5 border border-gray-200 hover:border-gray-400"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Footer Links */}
          <div>
            <h3 className="text-black font-semibold mb-4">
              Build with DocStar
            </h3>
            <ul className="space-y-2">
              {footerSections[0].links.map((link, linkIndex) => (
                <li key={linkIndex}>
                  {link.href.startsWith("http") ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cursor-pointer text-gray-600 hover:text-black transition-colors duration-300 text-sm"
                    >
                      {link.name}
                    </a>
                  ) : (
                    <button
                      // Use the Next.js router for internal destinations to avoid a full page refresh.
                      onClick={() => router.push(link.href)}
                      className="cursor-pointer text-left w-full text-gray-600 hover:text-black transition-colors duration-300 text-sm"
                    >
                      {link.name}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Mobile App Section */}
          <div>
            <h3 className="text-black font-semibold mb-4">Mobile App</h3>

            {/* Android Button */}
            <a
              href="https://play.google.com/store/apps/details?id=com.tech_doc_mobile"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center text-gray-600 hover:text-black transition-all duration-300 p-2.5 rounded-lg hover:bg-black/5 border border-gray-200 hover:border-gray-400 mb-3"
            >
              <span className="text-sm">Get it on Android</span>
              <Smartphone className="h-4 w-4 ml-2" />
            </a>

            {/* Get Started Button */}
            <a
              href="https://app.docstar.io/login"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center text-white bg-black hover:bg-black/90 transition-all duration-300 p-2.5 rounded-lg border border-gray-900"
            >
              <span className="text-sm">Get Started Free</span>
              <ArrowRight className="h-5 w-5 ml-2" />
            </a>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-200 mt-8 pt-6">
          <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start space-y-3 sm:space-y-0">
            <div className="flex flex-col items-center sm:items-start sm:space-x-1">
              <div className="text-gray-600 text-sm flex flex-col sm:flex-row sm:items-center gap-2">
                <span>© 2025 DocStar. All rights reserved</span>
                <div className="flex flex-col sm:flex-row gap-2">
                  <button
                   // Internal policy link goes through the router so it respects locale/routing settings.
                    onClick={() => router.push("/privacy-policy")}
                    className="text-black hover:text-blue-600 transition-colors duration-300 "
                  >
                    Privacy Policy
                  </button>
                  <button
                    onClick={() => router.push("/data-retention-policy")}
                    className="text-black hover:text-blue-600 transition-colors duration-300 "
                  >
                    Data Retention Policy
                  </button>
                </div>
              </div>
              <p className="text-gray-600 text-sm">
                A product by{" "}
                <a
                  href="https://walkover.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black hover:text-blue-600 transition-colors duration-300"
                >
                  Walkover
                </a>
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-gray-600 text-sm">Contact:</span>
              <a
                href="mailto:support@docstar.io"
                // Provide a direct mail link for quick support contact.
                className="text-black hover:text-blue-600 transition-colors duration-300 text-sm"
              >
                support@docstar.io
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
