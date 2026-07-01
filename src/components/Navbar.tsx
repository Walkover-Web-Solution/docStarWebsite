"use client";

import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const homeLikePaths = [
    "/",
    "/sso-authentication",
    "/faq",
    "/api-documentation-platform",
    "/publish-page",
  ];

  const isHomePage = homeLikePaths.includes(pathname);

  const dynamicNavItems = [
    { name: "Home", href: "/", isInternal: true },
    {
      name: "Features",
      href: "/features",
      isInternal: true,
    },
    { name: "Blogs", href: "https://docstar.io/blogs", isInternal: false },
    { name: "Pricing", href: "/pricing", isInternal: true },
    { name: "Contact us", href: "/support", isInternal: true },
  ];

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    if (href.startsWith("#")) {
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        router.push(`/${href}`);
      }
    } else {
      router.push(href);
    }
  };

  const textColor = "";
  const hoverColor = "";
  const underlineColor = "";

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 dark:bg-gray-950/80 backdrop-blur-lg border-b border-gray-200/50 dark:border-gray-800/50 shadow-sm py-1"
          : "bg-transparent py-4"
      }`}
    >
      <div className="mx-auto container px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between gap-8 items-center h-16">
          {/* Logo */}
          <div className="flex items-center ">
            <Logo size="md" className="transition-colors" />
            <Link href="/" className="text-2xl font-bold">
              DocStar
            </Link>
          </div>

         <div className="flex items-center justify-between gap-8">
           {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {dynamicNavItems.map((item, index) => {
              const isAnchorLink = item.href.startsWith("#");
              const isActiveLink =
                item.isInternal && !isAnchorLink && pathname === item.href;

              return item.isInternal ? (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.href)}
                  aria-current={isActiveLink ? "page" : undefined}
                  className="relative min-w-fit group cursor-pointer bg-transparent border-0 p-0 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-950 dark:hover:text-white transition-colors"
                >
                  {item.name}
                  <div
                    className={`absolute -bottom-1.5 left-0 h-0.5 bg-gradient-to-r from-[var(--theme-color)] to-blue-500 rounded-full transition-all duration-300 ${isActiveLink ? "w-full opacity-100" : "w-0 opacity-0 group-hover:w-full group-hover:opacity-100"}`}
                  />
                </button>
              ) : (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative min-w-fit group cursor-pointer no-underline text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-950 dark:hover:text-white transition-colors"
                >
                  {item.name}
                  <div
                    className="absolute -bottom-1.5 left-0 h-0.5 bg-gradient-to-r from-[var(--theme-color)] to-blue-500 rounded-full transition-all duration-300 w-0 opacity-0 group-hover:w-full group-hover:opacity-100"
                  />
                </a>
              );
            })}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4 gap-4">
            <ThemeToggle />
            <a
              href="https://app.docstar.io/login"
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-flex items-center justify-center px-6 py-2.5 text-sm font-bold text-white bg-gray-950 dark:bg-white dark:text-gray-950 rounded-xl transition-all shadow-md hover:scale-[1.02] hover:shadow-lg"
            >
              Sign In
            </a>
          </div>
         </div>

          {/* Mobile Toggle */}
          <div className="md:hidden flex items-center gap-3">
            <ThemeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className=""
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMobileMenuOpen && (
          <div className="md:hidden overflow-hidden absolute top-full left-0 w-full px-4">
              <div className="px-4 pt-4 pb-6 space-y-2 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-2xl mt-2 shadow-2xl border border-gray-200/50 dark:border-gray-800/50">
                {dynamicNavItems.map((item, index) => {
                  const isAnchorLink = item.href.startsWith("#");
                  const isActiveLink =
                    item.isInternal && !isAnchorLink && pathname === item.href;

                  return item.isInternal ? (
                    <button
                      key={item.name}
                      onClick={() => handleNavClick(item.href)}
                      className={`block px-3 py-2 font-medium w-full text-left ${isActiveLink ? '' : 'opacity-80'}`}
                    >
                      {item.name}
                    </button>
                  ) : (
                    <a
                      key={item.name}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block px-3 py-2 font-medium no-underline opacity-80"
                    >
                      {item.name}
                    </a>
                  );
                })}

                <div className="px-3 py-2 space-y-2">
                  <a
                    href="https://app.docstar.io/login"
                    className="block font-medium opacity-80"
                  >
                    Sign In
                  </a>
                  <a
                    href="https://app.docstar.io/login"
                    className="btn btn-primary block text-center"
                  >
                    Get Started Free
                  </a>
                </div>
              </div>
            </div>
          )}
      </div>
    </nav>
  );
};

export default Navbar;
