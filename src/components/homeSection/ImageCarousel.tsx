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
    const checkTheme = () => {
      const theme = document.documentElement.getAttribute("data-theme");
      setIsDarkTheme(theme === "dark");
    };

    checkTheme();

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

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

  const handleTabClick = (index: number) => {
    setActiveTab(index);
    
    if (tabsSectionRef.current) {
      const { top } = tabsSectionRef.current.getBoundingClientRect();
      const scrollToPosition = top + window.pageYOffset - window.innerHeight * 0.15;
      
      window.scrollTo({
        top: scrollToPosition,
        behavior: 'smooth'
      });
    }
  };

  if (!tabs.length) return null;

  return (
    <div className="w-full py-8 md:py-12 lg:py-16 px-4 md:px-6 lg:px-8 relative">
      <div ref={tabsSectionRef} className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <div className="relative">
          {/* Tabs positioned on top border */}
          <div className="flex justify-center items-start absolute top-[-18px] sm:top-[-20px] md:top-[-22px] left-0 right-0 z-10">
            <div className="inline-flex items-center gap-1 sm:gap-2 overflow-x-auto max-w-full px-4 no-scrollbar">
              {tabs.map((tab, index) => (
                <button
                  key={index}
                  onClick={() => handleTabClick(index)}
                  className={`
                    relative px-4 sm:px-5 md:px-6 cursor-pointer py-2 md:py-2.5 text-xs sm:text-sm font-medium whitespace-nowrap
                    transition-all duration-300 rounded-full border shadow-sm
                    ${
                      activeTab === index
                        ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900 border-gray-900 dark:border-white"
                        : "bg-[var(--theme-bg)] border-[var(--theme-border-color)] text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-900"
                    }
                  `}
                >
                  {tab.name}
                </button>
              ))}
            </div>
          </div>

          {/* Main content card with border */}
          <div className="relative bg-[var(--theme-bg)] rounded border theme-border shadow-2xl overflow-hidden mt-6">
            {/* Browser-like header with macOS controls */}
            <div className="flex items-center gap-2 px-6 py-4 border-b theme-border bg-gray-50/50 dark:bg-gray-900/50 backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full border border-gray-300 dark:border-gray-600 bg-gray-200 dark:bg-gray-700" />
                <div className="w-3 h-3 rounded-full border border-gray-300 dark:border-gray-600 bg-gray-200 dark:bg-gray-700" />
                <div className="w-3 h-3 rounded-full border border-gray-300 dark:border-gray-600 bg-gray-200 dark:bg-gray-700" />
              </div>
            </div>

            {/* Content area with centered image and spacing on all sides */}
            <div className="relative min-h-[300px] sm:min-h-[400px] lg:min-h-[600px] bg-gray-100/50 dark:bg-gray-900/50 p-0">
              <AnimatePresence mode="wait">
                {tabs.map((tab, tabIndex) => (
                  activeTab === tabIndex && (
                    <motion.div
                      key={tabIndex}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute inset-0 flex items-end justify-center px-8 py-8"
                    >
                      {tab.images.map((img, index) => (
                        <Image
                          key={index}
                          src={img.url}
                          alt={img.alt}
                          width={1200}
                          height={800}
                          priority={index === 0 && tabIndex === 0}
                          sizes="(max-width: 640px) 95vw, (max-width: 768px) 90vw, (max-width: 1024px) 85vw, (max-width: 1280px) 80vw, 1200px"
                          className="rounded w-full h-auto object-cover object-top border-x border-t theme-border shadow-2xl"
                        />
                      ))}
                    </motion.div>
                  )
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageCarousel;
