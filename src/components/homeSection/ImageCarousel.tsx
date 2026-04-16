"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { HeroImage } from "@/types/data-types";
import { motion, AnimatePresence } from "framer-motion";

const ImageCarousel = ({ heroImages }: { heroImages: HeroImage[] }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const tabsSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check initial theme
    const checkTheme = () => {
      const theme = document.documentElement.getAttribute("data-theme");
      setIsDarkTheme(theme === "dark");
    };

    checkTheme();

    // Watch for theme changes
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  // Group images by category (tab)
  const tabs =
    heroImages?.map((hero) => ({
      name: hero.name,
      images:
        (isDarkTheme && hero.dark_images?.length
          ? hero.dark_images
          : hero.images
        )?.map((url) => ({
          url,
          alt: hero.name,
        })) ?? [],
    })) ?? [];

  const currentTabImages = tabs[activeTab]?.images ?? [];

  const handleTabClick = (index: number) => {
    setActiveTab(index);
    
    // Check if tabs section is below viewport (user is in hero section)
    if (tabsSectionRef.current) {
      const rect = tabsSectionRef.current.getBoundingClientRect();
      // If tabs section is below the viewport, scroll to it with 100px offset
      if (rect.top > window.innerHeight * 0.3) {
        setTimeout(() => {
          const elementTop = tabsSectionRef.current!.getBoundingClientRect().top + window.scrollY;
          const offsetPosition = elementTop - 100;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  };

  if (!tabs.length) return null;

  return (
    <div className="w-full py-16 px-4 md:px-8 relative">
      {/* Subtle dotted background pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, currentColor 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Tabs Section */}
      <div ref={tabsSectionRef} className="mb-12 flex justify-center">
        <div className="inline-flex items-center gap-2 p-1.5 rounded-lg bg-gray-100/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200 dark:border-gray-800 overflow-x-auto max-w-full">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => handleTabClick(index)}
              className={`
                relative px-6 py-2.5 cursor-pointer rounded-lg text-sm md:text-base font-semibold uppercase tracking-wide
                transition-all duration-300 whitespace-nowrap
                ${
                  activeTab === index
                    ? "bg-black dark:bg-white text-white dark:text-black shadow-lg scale-105"
                    : "bg-transparent text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white hover:scale-102"
                }
              `}
            >
              {tab.name}
            </button>
          ))}
        </div>
      </div>

      {/* Image Grid Content */}
      <div className="relative max-w-7xl mx-auto lg:min-h-[600px]">
        {tabs.map((tab, tabIndex) => (
          <div
            key={tabIndex}
            className={`grid grid-cols-1 gap-8 transition-opacity duration-300 ease-in-out ${
              activeTab === tabIndex
                ? "opacity-100 relative"
                : "opacity-0 absolute inset-0 pointer-events-none"
            }`}
          >
            {tab.images.map((img, index) => (
              <div key={`${tabIndex}-${index}`} className="w-full">
                {/* Premium laptop screen container */}
                <div className="relative max-w-5xl mx-auto">
                  <div className="relative bg-white/50 dark:bg-black/50 backdrop-blur-sm rounded-xl px-3 pt-10 pb-3 border border-gray-200 dark:border-gray-800 shadow-xl">
                    {/* Minimal browser controls (gray dots) */}
                    <div className="absolute top-3.5 left-5">
                      <svg width="48" height="10" viewBox="0 0 48 10">
                        <circle
                          cx="5"
                          cy="5"
                          r="4"
                          className="fill-red-300 dark:fill-red-700"
                        />
                        <circle
                          cx="24"
                          cy="5"
                          r="4"
                          className="fill-yellow-300 dark:fill-yellow-700"
                        />
                        <circle
                          cx="43"
                          cy="5"
                          r="4"
                          className="fill-green-300 dark:fill-green-700"
                        />
                      </svg>
                    </div>

                    {/* Screen content with subtle shadow */}
                    <div className="relative rounded-lg overflow-hidden shadow-lg">
                      <Image
                        src={img.url}
                        alt={img.alt}
                        width={1200}
                        height={800}
                        priority={index === 0 && tabIndex === 0}
                        sizes="(max-width: 768px) 90vw, (max-width: 1280px) 80vw, 1200px"
                        className="rounded-lg w-full h-auto object-contain"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
