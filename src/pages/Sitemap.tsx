import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, FileText, Settings, Shield, Users, Zap, Globe, PenTool, Bot, DollarSign, Headphones } from 'lucide-react';

const Sitemap: React.FC = () => {
  const sitePages = [
    {
      title: "Main Pages",
      pages: [
        { name: "Home", path: "/", icon: Globe, description: "DocStar homepage with features and overview" },
        { name: "Pricing", path: "/pricing", icon: DollarSign, description: "View our pricing plans and features" },
        { name: "Support", path: "/support", icon: Headphones, description: "Contact us for help and support" },
      ]
    },
    {
      title: "Features & Solutions",
      pages: [
        { name: "API Documentation", path: "/api-documentation", icon: FileText, description: "API documentation and testing features" },
        { name: "Blogging Platform", path: "/blogging", icon: PenTool, description: "Create and publish blogs with ease" },
        { name: "AI Documentation", path: "/documentation-with-ai", icon: Bot, description: "AI-powered documentation tools" },
        { name: "Simple Website Builder", path: "/simple-website", icon: Globe, description: "Build websites without coding" },
        { name: "Editor", path: "/editor", icon: PenTool, description: "Advanced content editor" },
        { name: "Embed Editor", path: "/embed-editor", icon: Settings, description: "Embeddable editor component" },
      ]
    },
    {
      title: "Enterprise & Customization",
      pages: [
        { name: "White Labelling", path: "/white-labelling", icon: Settings, description: "Custom branding and domain solutions" },
        { name: "SSO Authentication", path: "/sso-authentication", icon: Shield, description: "Single sign-on integration" },
      ]
    },
    {
      title: "Legal & Policies",
      pages: [
        { name: "Privacy Policy", path: "/privacy-policy", icon: Shield, description: "Our privacy policy and data handling" },
      ]
    }
  ];

  const externalLinks = [
    { name: "DocStar Blog", url: "https://blogs.docstar.io", icon: PenTool, description: "Latest updates and insights" },
    { name: "DocStar App", url: "https://app.docstar.io/login", icon: ExternalLink, description: "Access the DocStar application" },
    { name: "Getting Started Guide", url: "https://app.docstar.io/p/getting-started?collectionId=fLMgydvRdvN7", icon: FileText, description: "Learn how to get started" },
    { name: "API Documentation", url: "https://app.docstar.io/p/api-documentation-and-integration?collectionId=fLMgydvRdvN7", icon: FileText, description: "Complete API documentation" },
    { name: "Schedule Demo", url: "https://cal.com/docstar-team", icon: Users, description: "Book a demo with our team" },
    { name: "Mobile App", url: "https://play.google.com/store/apps/details?id=com.tech_doc_mobile", icon: ExternalLink, description: "Download our Android app" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-20 px-6 lg:px-20">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-6">
            DocStar Sitemap
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Navigate through all pages and resources available on DocStar. Find everything you need to get started with our platform.
          </p>
        </div>

        {/* Internal Pages */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-black mb-8 flex items-center">
            <Globe className="w-8 h-8 mr-3 text-blue-600" />
            Website Pages
          </h2>
          
          {sitePages.map((section, sectionIndex) => (
            <div key={sectionIndex} className="mb-12">
              <h3 className="text-2xl font-semibold text-gray-800 mb-6 border-b-2 border-gray-200 pb-2">
                {section.title}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {section.pages.map((page, pageIndex) => (
                  <Link
                    key={pageIndex}
                    to={page.path}
                    className="group bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-blue-300"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <page.icon className="w-6 h-6 text-blue-600 group-hover:text-blue-700" />
                      </div>
                      <div className="flex-grow">
                        <h4 className="text-lg font-semibold text-black group-hover:text-blue-600 transition-colors">
                          {page.name}
                        </h4>
                        <p className="text-gray-600 text-sm mt-1">
                          {page.description}
                        </p>
                        <span className="text-xs text-gray-500 mt-2 block font-mono">
                          {page.path}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* External Links */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-black mb-8 flex items-center">
            <ExternalLink className="w-8 h-8 mr-3 text-green-600" />
            External Resources
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {externalLinks.map((link, linkIndex) => (
              <a
                key={linkIndex}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-green-300"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <link.icon className="w-6 h-6 text-green-600 group-hover:text-green-700" />
                  </div>
                  <div className="flex-grow">
                    <h4 className="text-lg font-semibold text-black group-hover:text-green-600 transition-colors flex items-center">
                      {link.name}
                      <ExternalLink className="w-4 h-4 ml-2 opacity-50" />
                    </h4>
                    <p className="text-gray-600 text-sm mt-1">
                      {link.description}
                    </p>
                    <span className="text-xs text-gray-500 mt-2 block font-mono break-all">
                      {link.url}
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-black text-white p-8 rounded-xl">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <Headphones className="w-6 h-6 mr-3" />
            Need Help?
          </h2>
          <p className="text-gray-300 mb-4">
            Can't find what you're looking for? Get in touch with our support team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="mailto:support@docstar.io"
              className="inline-flex items-center text-white hover:text-blue-300 transition-colors"
            >
              <span>support@docstar.io</span>
            </a>
            <Link
              to="/support"
              className="inline-flex items-center text-white hover:text-blue-300 transition-colors"
            >
              <span>Contact Form</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sitemap;
