// import React from 'react';
import {
  Mail,
  Twitter,
  Github,
  Linkedin,
  Smartphone,
  ArrowRight,
} from "lucide-react";
import Logo from "./Logo";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  const footerSections = [
    {
      title: "Build with DocStar",
      links: [
        {
          name: "Help Documentation",
          href: "https://docstar.io/help",
        },
        {
          name: "Blogs",
          href: "https://docstar.io/blogs",
        },
        {
          name: "API Docs",
          href: "https://developers.docstar.io",
        },
        {
          name: "Pricing",
          href: "/pricing",
        },
        {
          name: "Contact us",
          href: "/support",
        },
        {
          name: "Sitemap",
          href: "/sitemap",
        },

        // { name: "Blogs", href: "#" },
        // { name: "Publish Docs", href: "https://app.docstar.io/p/getting-started?collectionId=fLMgydvRdvN7" },
        // { name: "AI Assist", href: "#" },
      ],
    },
    // {
    //   title: "Company",
    //   links: [
    //     { name: "About Us", href: "https://app.docstar.io/p/getting-started?collectionId=fLMgydvRdvN7" },
    //     // { name: "Terms of Service", href: "#" },
    //     // { name: "Privacy Policy", href: "#" },
    //     // { name: "Careers", href: "#" },
    //     // { name: "Blog", href: "#" },
    //   ],
    // },
    // {
    //   title: "Support",
    //   links: [
    //     { name: "Help Center", href: "https://cal.com/docstar-team" },
    //     // { name: "Contact Us", href: "#" },
    //     // { name: "Status", href: "#" },
    //     // { name: "Community", href: "#" },
    //     // { name: "Documentation", href: "#" },
    //   ],
    // },
  ];

  return (
    <footer className="bg-black text-white relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-start">
          {/* Logo + Description Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <Logo size="md" className="text-white" animated={true} />
              <span className="text-2xl font-bold text-white">DocStar</span>
            </div>

            <p className="text-gray-400 mb-6 leading-relaxed max-w-sm">
              Beautiful, fast, and reliable API Docs & FAQs built for teams.
              Transform your documentation workflow with AI.
            </p>

            {/* Social Links */}
            {/* <div className="flex space-x-3">
              {[
                {
                  icon: Github,
                  href: "https://github.com/Walkover-Web-Solution/hitman-ui",
                  label: "GitHub",
                },
                {
                  icon: Mail,
                  href: "mailto:support@docstar.io",
                  label: "Email",
                },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  title={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-all duration-300 p-2.5 rounded-lg hover:bg-white/5 border border-gray-800 hover:border-gray-600"
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div> */}
          </div>

          {/* Footer Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">
              Build with DocStar
            </h3>
            <ul className="space-y-2">
              {footerSections[0].links.map((link, linkIndex) => (
                <li key={linkIndex}>
                  {link.name === "Pricing" || link.name === "Contact us" || link.name === "Sitemap" ? (
                    <button
                      onClick={() => navigate(link.href)}
                      className="text-left w-full text-gray-400 hover:text-white transition-colors duration-300 text-sm"
                    >
                      {link.name}
                    </button>
                  ) : (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white transition-colors duration-300 text-sm"
                    >
                      {link.name}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Mobile App Section */}
          <div>
            <h3 className="text-white font-semibold mb-4">Mobile App</h3>

            {/* Android Button */}
            <a
              href="https://play.google.com/store/apps/details?id=com.tech_doc_mobile"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center text-gray-400 hover:text-white transition-all duration-300 p-2.5 rounded-lg hover:bg-white/5 border border-gray-800 hover:border-gray-600 mb-3"
            >
              <span className="text-sm">Get it on Android</span>
              <Smartphone className="h-4 w-4 ml-2" />
            </a>

            {/* Get Started Button */}
            <a
              href="https://app.docstar.io/login"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center text-black bg-white hover:text-white transition-all duration-300 p-2.5 rounded-lg hover:bg-white/5 border border-gray-800 hover:border-gray-600"
            >
              <span className="text-sm">Get Started Free</span>
              <ArrowRight className="h-5 w-5 ml-2" />
            </a>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-800 mt-8 pt-6">
          <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start space-y-3 sm:space-y-0">
            <div className="flex flex-col items-center sm:items-start sm:space-x-1">
              <div className="text-gray-400 text-sm flex flex-col sm:flex-row sm:items-center gap-2">
                <span>© 2025 DocStar. All rights reserved</span>
                <button
                  onClick={() => navigate("/privacy-policy")}
                  className="text-white hover:text-blue-400 transition-colors duration-300 "
                >
                  Privacy Policy
                </button>
              </div>
              <p className="text-gray-400 text-sm">
                A product by{" "}
                <a
                  href="https://walkover.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-blue-400 transition-colors duration-300"
                >
                  Walkover
                </a>
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-gray-400 text-sm">Contact:</span>
              <a
                href="mailto:support@docstar.io"
                className="text-white hover:text-blue-400 transition-colors duration-300 text-sm"
              >
                support@docstar.io
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
