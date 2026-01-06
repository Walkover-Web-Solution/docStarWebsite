"use client";

import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

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

  // Always use dark navigation elements so they remain visible on light hero
  const textColor = "text-neutral-900";
  const hoverColor = "hover:text-neutral-600";
  const underlineColor = "bg-neutral-900";

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-10 ${
        isScrolled
          ? "bg-transparent backdrop-blur-md "
          : "bg-transparent backdrop-blur-md "
      }`}
    >
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between gap-8 items-center h-20">
          {/* Logo */}
          <div className="flex items-center ">
            <Logo size="md" className={`${textColor} transition-colors`} />
            <Link href="/" className={`text-2xl font-bold ${textColor}`}>
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
                  className={`relative min-w-fit group cursor-pointer ${textColor} ${hoverColor} bg-transparent border-0 p-0`}
                >
                  {item.name}
                  <div
                    className={`absolute -bottom-1 left-0 h-0.5 ${underlineColor} transition-all duration-300 ${isActiveLink ? "w-full" : "w-0 group-hover:w-full"}`}
                  />
                </button>
              ) : (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`relative min-w-fit group cursor-pointer ${textColor} ${hoverColor} no-underline`}
                >
                  {item.name}
                  <div
                    className={`absolute -bottom-1 left-0 h-0.5 ${underlineColor} transition-all duration-300 w-0 group-hover:w-full`}
                  />
                </a>
              );
            })}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4 gap-4">
            <a
              href="https://app.docstar.io/login"
              target="_blank"
              rel="noopener noreferrer"
              className={`btn btn-primary`}
            >
              Sign In
            </a>
          </div>
         </div>

          {/* Mobile Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`${textColor} ${hoverColor}`}
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
          <div className="md:hidden overflow-hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 bg-white/95 backdrop-blur-md rounded-lg mt-2 border border-neutral-200 shadow-lg">
                {dynamicNavItems.map((item, index) => {
                  const isAnchorLink = item.href.startsWith("#");
                  const isActiveLink =
                    item.isInternal && !isAnchorLink && pathname === item.href;

                  return item.isInternal ? (
                    <button
                      key={item.name}
                      onClick={() => handleNavClick(item.href)}
                      className={`block px-3 py-2 font-medium w-full text-left ${
                        isActiveLink
                          ? "text-neutral-900"
                          : "text-neutral-700 hover:text-neutral-900"
                      }`}
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
                      className="block px-3 py-2 text-neutral-700 hover:text-neutral-900 font-medium no-underline"
                    >
                      {item.name}
                    </a>
                  );
                })}

                <div className="px-3 py-2 space-y-2">
                  <a
                    href="https://app.docstar.io/login"
                    className="block text-neutral-700 hover:text-neutral-900 font-medium"
                  >
                    Sign In
                  </a>
                  <a
                    href="https://app.docstar.io/login"
                    className="block bg-neutral-900 text-white px-6 py-2 rounded-lg font-medium shadow-lg text-center hover:bg-neutral-800 transition-colors duration-200"
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
