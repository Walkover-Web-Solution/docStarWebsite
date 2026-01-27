"use client";

import { Mail, Smartphone } from "lucide-react";
import Logo from "./Logo";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="pt-20 theme-bg-secondary">
      <div className="relative container mx-auto px-6 text-sm">
        <div className="flex justify-between lg:flex-row flex-col gap-8 items-start">
          <div>
            <div className="flex items-center mb-2">
              <Logo size="md" className="-ml-2" animated />
              <span className="text-2xl -ml-2 font-bold">DocStar</span>
            </div>
            <p className="mb-6 leading-relaxed max-w-[500px] opacity-70">
              © {new Date().getFullYear()} DocStar. All rights reserved. - Beautiful, fast, and reliable API Docs & FAQs built for teams.
              Transform your documentation with AI.<br />
              A product by{" "}
              <a
                href="https://walkover.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors duration-300"
              >
                Walkover
              </a>
            </p>
            <div className="flex items-center space-x-3">
              <a
                href="mailto:support@docstar.io"
                title="Email"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-all duration-300 p-2 rounded-lg border opacity-70"
              >
                <Mail className="h-4 w-4" />
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=com.tech_doc_mobile"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center transition-all duration-300 p-2 rounded-lg border opacity-70"
              >
                <span className="text-sm">Get it on Android</span>
                <Smartphone className="h-4 w-4 ml-2" />
              </a>
            </div>
          </div>
          <div className="flex items-start gap-20">
            <div>
              <ul className="space-y-3">
                <li className="font-semibold">Build with DocStar</li>
                <li><Link href="https://developers.docstar.io/" target="_blank" className="group relative inline-block">API Doc<div
                    className="absolute -bottom-1 left-0 h-0.5 transition-all duration-300 w-0 group-hover:w-full theme-underline"
                  /></Link></li>
                <li><Link href="https://docstar.io/help" target="_blank" className="group relative inline-block">Help Doc<div
                    className="absolute -bottom-1 left-0 h-0.5 transition-all duration-300 w-0 group-hover:w-full theme-underline"
                  /></Link></li>
                <li><Link href="https://docstar.io/blogs" target="_blank" className="group relative inline-block">Blogs<div
                    className="absolute -bottom-1 left-0 h-0.5 transition-all duration-300 w-0 group-hover:w-full theme-underline"
                  /></Link></li>
              </ul>
            </div>
            <div>
              <ul className="space-y-3">
                <li className="font-semibold">Company</li>
                <li><Link href="/support" target="_blank" className="group relative inline-block">Contact Us<div
                    className="absolute -bottom-1 left-0 h-0.5 transition-all duration-300 w-0 group-hover:w-full theme-underline"
                  /></Link></li>
                <li><Link href="/privacy-policy" target="_blank" className="group relative inline-block">Privacy Policy<div
                    className="absolute -bottom-1 left-0 h-0.5 transition-all duration-300 w-0 group-hover:w-full theme-underline"
                  /></Link></li>
                <li><Link href="/data-retention-policy" target="_blank" className="group relative inline-block">Data Retention Policy<div
                    className="absolute -bottom-1 left-0 h-0.5 transition-all duration-300 w-0 group-hover:w-full theme-underline"
                  /></Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mx-auto opacity-20">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 180">
            <text x="50%" y="170"
              textAnchor="middle"
              fontFamily="Poppins, Arial, sans-serif"
              fontWeight="900"
              fontSize="120"
              fill="currentColor">
              DocStar.io
            </text>
          </svg>
        </div>
        <div className="pointer-events-none absolute bottom-0 left-0 h-20 w-full theme-gradient-fade" />
      </div>
    </footer>
  );
};

export default Footer;
