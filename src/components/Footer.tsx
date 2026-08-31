"use client";

import { Mail, Smartphone } from "lucide-react";
import Logo from "./Logo";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="pt-20 lg:pt-24 border-t border-gray-200/50 dark:border-gray-800/50 bg-[var(--theme-bg)] relative overflow-hidden">
      {/* Background Blurs */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-[var(--theme-color)] to-blue-500 opacity-[0.03] dark:opacity-[0.05] blur-[120px] rounded-full pointer-events-none"></div>
      
      <div className="relative container mx-auto px-6 lg:px-8 text-sm">
        <div className="flex justify-between lg:flex-row flex-col gap-12 lg:gap-8 items-start mb-16">
          <div className="max-w-[400px]">
            <div className="flex items-center mb-6">
              <Logo size="md" className="-ml-2" animated />
              <span className="text-2xl -ml-2 font-bold">DocStar</span>
            </div>
            <p className="mb-8 leading-relaxed text-gray-600 dark:text-gray-400 text-base">
              Beautiful, fast, and reliable API Docs & FAQs built for teams. Transform your documentation with AI.
            </p>
            <div className="flex items-center space-x-4">
              <a
                href="mailto:support@docstar.io"
                title="Email"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-all duration-300 p-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 hover:bg-gray-100 dark:hover:bg-gray-800 hover:border-[var(--theme-color)]/30 group shadow-sm hover:shadow-md"
              >
                <Mail className="h-5 w-5 text-gray-500 dark:text-gray-400 group-hover:text-[var(--theme-color)] transition-colors" />
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=com.tech_doc_mobile"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center transition-all duration-300 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 hover:bg-gray-100 dark:hover:bg-gray-800 hover:border-[var(--theme-color)]/30 group shadow-sm hover:shadow-md"
              >
                <span className="text-sm font-medium text-gray-600 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">Get it on Android</span>
                <Smartphone className="h-4 w-4 ml-2 text-gray-500 dark:text-gray-400 group-hover:text-[var(--theme-color)] transition-colors" />
              </a>
            </div>
          </div>
          <div className="flex flex-wrap lg:flex-nowrap items-start gap-12 lg:gap-24">
            <div>
              <ul className="space-y-4">
                <li className="font-bold text-gray-900 dark:text-white text-base mb-2">Build with DocStar</li>
                <li><Link href="https://developers.docstar.io/" target="_blank" className="group relative inline-block text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">API Doc<div
                    className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-[var(--theme-color)] to-blue-500 rounded-full transition-all duration-300 w-0 group-hover:w-full"
                  /></Link></li>
                <li><Link href="/cli" className="group relative inline-block text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">DocStar CLI<div
                    className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-[var(--theme-color)] to-blue-500 rounded-full transition-all duration-300 w-0 group-hover:w-full"
                  /></Link></li>
                <li><Link href="https://docstar.io/help" target="_blank" className="group relative inline-block text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">Help Doc<div
                    className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-[var(--theme-color)] to-blue-500 rounded-full transition-all duration-300 w-0 group-hover:w-full"
                  /></Link></li>
                <li><Link href="https://docstar.io/help/changelog" target="_blank" className="group relative inline-block text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">Change Log<div
                    className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-[var(--theme-color)] to-blue-500 rounded-full transition-all duration-300 w-0 group-hover:w-full"
                  /></Link></li>
                <li><Link href="https://docstar.io/blogs" target="_blank" className="group relative inline-block text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">Blogs<div
                    className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-[var(--theme-color)] to-blue-500 rounded-full transition-all duration-300 w-0 group-hover:w-full"
                  /></Link></li>
              </ul>
            </div>
            <div>
              <ul className="space-y-4">
                <li className="font-bold text-gray-900 dark:text-white text-base mb-2">Company</li>
                <li><Link href="/support" target="_blank" className="group relative inline-block text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">Contact Us<div
                    className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-[var(--theme-color)] to-blue-500 rounded-full transition-all duration-300 w-0 group-hover:w-full"
                  /></Link></li>
                <li><Link href="/privacy-policy" target="_blank" className="group relative inline-block text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">Privacy Policy<div
                    className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-[var(--theme-color)] to-blue-500 rounded-full transition-all duration-300 w-0 group-hover:w-full"
                  /></Link></li>
                <li><Link href="/data-retention-policy" target="_blank" className="group relative inline-block text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">Data Retention Policy<div
                    className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-[var(--theme-color)] to-blue-500 rounded-full transition-all duration-300 w-0 group-hover:w-full"
                  /></Link></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Branding */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 pb-12 border-t border-gray-200/50 dark:border-gray-800/50 z-10 relative">
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} DocStar. All rights reserved.
          </p>
          <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
            <span>A product by</span>
            <a
              href="https://walkover.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-gray-900 dark:text-white hover:text-[var(--theme-color)] transition-colors duration-300"
            >
              Walkover
            </a>
          </div>
        </div>

        {/* Epic Background Text */}
        <div className="mx-auto opacity-[0.03] dark:opacity-[0.05] pointer-events-none select-none overflow-hidden absolute bottom-[-40px] left-0 w-full flex justify-center z-0">
          <span className="font-black text-[12vw] sm:text-[14vw] tracking-tighter leading-none text-gray-900 dark:text-white whitespace-nowrap">
            DocStar.io
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
