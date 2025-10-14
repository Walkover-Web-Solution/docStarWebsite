"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import MotionWrapper from "./motion/MotionDivWrapper";

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
    isHomePage
      ? { name: "Features", href: "#features", isInternal: true }
      : { name: "Home", href: "/", isInternal: true },
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

  // Updated color logic
  const textColor = isHomePage
    ? isScrolled
      ? "text-black"
      : "text-white"
    : "text-black";

  const hoverColor = isHomePage
    ? isScrolled
      ? "hover:text-gray-600"
      : "hover:text-gray-300"
    : "hover:text-gray-600";

  const underlineColor = isHomePage
    ? isScrolled
      ? "bg-black"
      : "bg-white"
    : "bg-black";

  return (
    <motion.nav
      className={`fixed w-full top-0 z-50 ${
        isScrolled ? "bg-white/95 backdrop-blur-md shadow-lg" : "bg-transparent"
      } transition-all duration-300`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between gap-8 items-center h-20">
          {/* Logo */}
          <MotionWrapper className="flex items-center ">
            <Logo size="md" className={`${textColor} transition-colors`} />
            <Link href="/" className={`text-2xl font-bold ${textColor}`}>
              DocStar
            </Link>
          </MotionWrapper>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {dynamicNavItems.map((item, index) => {
              const isAnchorLink = item.href.startsWith("#");
              const isActiveLink =
                item.isInternal && !isAnchorLink && pathname === item.href;

              return item.isInternal ? (
                <MotionWrapper
                  as="button"
                  key={item.name}
                  onClick={() => handleNavClick(item.href)}
                  aria-current={isActiveLink ? "page" : undefined}
                  className={`relative min-w-fit group font-bold cursor-pointer ${textColor} ${hoverColor} bg-transparent border-0 p-0`}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -2 }}
                >
                  {item.name}
                  <MotionWrapper
                    className={`absolute -bottom-1 left-0 h-0.5 ${underlineColor} transition-all duration-300 ${isActiveLink ? "w-full" : "w-0 group-hover:w-full"}`}
                    animate={{ width: isActiveLink ? "100%" : "0%" }}
                    whileHover={{ width: "100%" }}
                  />
                </MotionWrapper>
              ) : (
                <MotionWrapper
                  as="a"
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`relative min-w-fit group font-bold cursor-pointer ${textColor} ${hoverColor}`}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -2 }}
                >
                  {item.name}
                  <MotionWrapper
                    className={`absolute -bottom-1 left-0 h-0.5 ${underlineColor} transition-all duration-300 w-0 group-hover:w-full`}
                    whileHover={{ width: "100%" }}
                  />
                </MotionWrapper>
              );
            })}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <MotionWrapper
              as="a"
              href="https://app.docstar.io/login"
              target="_blank"
              rel="noopener noreferrer"
              className={`${textColor} ${hoverColor} font-medium min-w-fit cursor-pointer`}
              whileHover={{ scale: 1.05 }}
            >
              Sign In
            </MotionWrapper>
            <MotionWrapper
              as="a"
              href="https://app.docstar.io/login"
              target="_blank"
              rel="noopener noreferrer"
              className={`group min-w-fit relative px-6 py-3 rounded-2xl font-semibold text-lg transition-all duration-300 flex items-center cursor-pointer ${
                isHomePage
                  ? isScrolled
                    ? "bg-black text-white hover:bg-gray-800"
                    : "bg-white/10 backdrop-blur-xl border border-white/20 text-white hover:bg-white/20"
                  : "bg-black text-white hover:bg-gray-800"
              } shadow-lg hover:shadow-xl`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started Free
            </MotionWrapper>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden">
            <MotionWrapper
            as="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`${textColor} ${hoverColor}`}
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <MotionWrapper
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-6 w-6" />
                  </MotionWrapper>
                ) : (
                  <MotionWrapper
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-6 w-6" />
                  </MotionWrapper>
                )}
              </AnimatePresence>
            </MotionWrapper>
          </div>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <MotionWrapper
              className="md:hidden overflow-hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="px-2 pt-2 pb-3 space-y-1 bg-black/95 backdrop-blur-md rounded-lg mt-2">
                {dynamicNavItems.map((item, index) => {
                  const isAnchorLink = item.href.startsWith("#");
                  const isActiveLink =
                    item.isInternal && !isAnchorLink && pathname === item.href;

                  return item.isInternal ? (
                    <MotionWrapper
                      as="button"
                      key={item.name}
                      onClick={() => handleNavClick(item.href)}
                      className={`block px-3 py-2 font-medium w-full text-left ${
                        isActiveLink ? "text-white" : "text-white hover:text-gray-300"
                      }`}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {item.name}
                    </MotionWrapper>
                  ) : (
                    <MotionWrapper
                      key={item.name}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block px-3 py-2 text-white hover:text-gray-300 font-medium"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {item.name}
                    </MotionWrapper>
                  );
                })}

                <div className="px-3 py-2 space-y-2">
                  <MotionWrapper
                    as="a"
                    href="https://app.docstar.io/login"
                    className="block text-white hover:text-gray-300 font-medium"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: dynamicNavItems.length * 0.1 }}
                  >
                    Sign In
                  </MotionWrapper>
                  <MotionWrapper
                    as="a"
                    href="https://app.docstar.io/login"
                    className="block bg-white text-black px-6 py-2 rounded-lg font-medium shadow-lg text-center"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: (dynamicNavItems.length + 1) * 0.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Get Started Free
                  </MotionWrapper>
                </div>
              </div>
            </MotionWrapper>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
