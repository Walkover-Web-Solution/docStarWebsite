"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { HeroImage } from "@/types/data-types";
import { ChevronRight, ChevronLeft } from 'lucide-react';

const ImageCarousel = ({ heroImages }: { heroImages: HeroImage[] }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    // Check initial theme
    const checkTheme = () => {
      const theme = document.documentElement.getAttribute('data-theme');
      setIsDarkTheme(theme === 'dark');
    };

    checkTheme();

    // Watch for theme changes
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    return () => observer.disconnect();
  }, []);

  const images =
    heroImages?.flatMap(
      (hero) => {
        const imageUrls = isDarkTheme && hero.dark_images?.length
          ? hero.dark_images
          : hero.images;

        return imageUrls?.map((url) => ({
          url,
          alt: hero.name,
        })) ?? [];
      }
    ) ?? [];

  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isScrollingRef = useRef(false);

  // Scroll to active slide
  const scrollToIndex = (index: number) => {
    const container = containerRef.current;
    if (!container) return;

    isScrollingRef.current = true;

    // Account for the spacer element at index 0, so actual image is at index + 1
    const slide = container.children[index + 1] as HTMLElement;
    if (!slide) return;

    // Calculate the scroll position to center the slide
    const slideLeft = slide.offsetLeft;
    const slideWidth = slide.offsetWidth;
    const containerWidth = container.offsetWidth;
    const scrollLeft = slideLeft - (containerWidth - slideWidth) / 2;

    container.scrollTo({
      left: scrollLeft,
      behavior: "smooth",
    });

    // Reset flag after scroll animation completes
    setTimeout(() => {
      isScrollingRef.current = false;
    }, 500);
  };

  // Detect centered slide on scroll
  const handleScroll = () => {
    // Don't update activeIndex during programmatic scrolls
    if (isScrollingRef.current) return;

    const container = containerRef.current;
    if (!container) return;

    const center = container.scrollLeft + container.offsetWidth / 2;

    let closestIndex = 0;
    let closestDistance = Infinity;

    // Skip the first spacer element (index 0) and last spacer element
    const imageElements = Array.from(container.children).slice(1, -1);

    imageElements.forEach((child, index) => {
      const el = child as HTMLElement;
      const elCenter = el.offsetLeft + el.offsetWidth / 2;
      const distance = Math.abs(center - elCenter);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    setActiveIndex(closestIndex);
  };

  if (!images.length) return null;

  useEffect(() => {
    if (!containerRef.current) return;

    const middleIndex = Math.floor(images.length / 2);
    setActiveIndex(middleIndex);

    // Use our custom scrollToIndex function instead of scrollIntoView
    setTimeout(() => {
      scrollToIndex(middleIndex);
    }, 0);
  }, [images.length]);

  return (
    <div className="w-full py-20 px-2 md:px-8">
      {/* Title and Navigation */}
      <div className="mb-8 flex justify-center items-center gap-4">
        <button
          onClick={() => {
            if (activeIndex > 0) {
              const prevIndex = activeIndex - 1;
              setActiveIndex(prevIndex);
              scrollToIndex(prevIndex);
            }
          }}
          disabled={activeIndex === 0}
          className={`p-2 rounded-full border transition-opacity ${activeIndex === 0 ? "opacity-30 cursor-not-allowed" : "hover:opacity-80"
            }`}
          aria-label="Previous slide"
        >
          <ChevronLeft />
        </button>

        <span className="uppercase text-center text-2xl font-bold min-w-[250px]">
          {images[activeIndex]?.alt}
        </span>

        <button
          onClick={() => {
            if (activeIndex < images.length - 1) {
              const nextIndex = activeIndex + 1;
              setActiveIndex(nextIndex);
              scrollToIndex(nextIndex);
            }
          }}
          disabled={activeIndex === images.length - 1}
          className={`p-2 rounded-full border transition-opacity ${activeIndex === images.length - 1 ? "opacity-30 cursor-not-allowed" : "hover:opacity-80"
            }`}
          aria-label="Next slide"
        >
          <ChevronRight />
        </button>
      </div>

      {/* Carousel */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="
          flex gap-2 overflow-x-scroll scroll-smooth
          snap-x snap-mandatory scrollbar-width-none
        "
      >
        {/* Spacer element before first image */}
        <div className="flex-shrink-0 w-[50vw] sm:w-[45vw]" />

        {images.map((img, index) => (
          <div
            key={index}
            className={`
              flex-shrink-0 snap-center
              transition-all duration-500
              ${index === activeIndex ? "scale-100" : "scale-90 opacity-70"}
              w-[100vw] sm:w-[90vw] xl:max-w-[1100px] max-w-[1000px]
            `}
          >
            {/* Glossy laptop screen container */}
            <div>
              <div className="relative bg-transparent rounded-lg px-2 pt-8 pb-2 border theme-border">
                {/* Browser controls */}
                <div className="absolute top-2.5 left-4">
                  <svg width="52" height="12" viewBox="0 0 52 12">
                    <circle cx="6" cy="6" r="5" className="fill-red-500" />
                    <circle cx="26" cy="6" r="5" className="fill-yellow-400" />
                    <circle cx="46" cy="6" r="5" className="fill-green-500" />
                  </svg>
                </div>

                {/* Screen content */}
                <div className="relative rounded-md overflow-hidden">
                  <Image
                    src={img.url}
                    alt={img.alt}
                    width={1200}
                    height={800}
                    priority={index === 0}
                    sizes="(max-width: 768px) 90vw, 70vw"
                    className="rounded-md w-full h-auto object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Spacer element after last image */}
        <div className="flex-shrink-0 w-[50vw] sm:w-[45vw]" />
      </div>
    </div>
  );
};

export default ImageCarousel;
