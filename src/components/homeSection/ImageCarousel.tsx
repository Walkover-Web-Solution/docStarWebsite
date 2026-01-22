"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { HeroImage } from "@/types/data-types";

const ImageCarousel = ({ heroImages }: { heroImages: HeroImage[] }) => {
  const images =
    heroImages?.flatMap(
      (hero) =>
        hero.images?.map((url) => ({
          url,
          alt: hero.name,
        })) ?? []
    ) ?? [];

  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Scroll to active slide
  const scrollToIndex = (index: number) => {
    const container = containerRef.current;
    if (!container) return;

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
  };

  // Detect centered slide on scroll
  const handleScroll = () => {
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
              relative flex-shrink-0 snap-center
              transition-all duration-500
              ${index === activeIndex ? "scale-100" : "scale-90 opacity-70"}
              w-[100vw] sm:w-[90vw] xl:max-w-[1100px] max-w-[1000px]
            `}
          >
            {/* Glossy laptop screen container */}
            <div>
              <div className="bg-transparent rounded-lg px-2 pt-8" style={{ border: '1px solid rgba(0, 0, 0, 0.2)' }}>
                {/* Browser controls */}
                <div className="absolute top-3 left-4">
                  <svg width="52" height="12" viewBox="0 0 52 12">
                    <circle cx="6" cy="6" r="5" className="fill-red-500" />
                    <circle cx="26" cy="6" r="5" className="fill-yellow-400" />
                    <circle cx="46" cy="6" r="5" className="fill-green-500" />
                  </svg>
                </div>

                {/* Screen content */}
                <div className="relative rounded aspect-[16/9] overflow-hidden theme-bg">
                  <Image
                    src={img.url}
                    alt={img.alt}
                    fill
                    priority={index === 0}
                    sizes="(max-width: 768px) 90vw, 70vw"
                    className="rounded object-contain object-top"
                  />
                </div>
              </div>
              <p className="w-full bg-transparent text-center text-md py-2">
                {img.alt}
              </p>
            </div>
          </div>
        ))}

        {/* Spacer element after last image */}
        <div className="flex-shrink-0 w-[50vw] sm:w-[45vw]" />
      </div>

      {/* Dots */}
      <div className="mt-8 flex justify-center gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setActiveIndex(index);
              scrollToIndex(index);
            }}
            className={`
              h-2.5 w-2.5 rounded-full transition-all
              ${index === activeIndex ? "scale-110" : "opacity-50"} theme-badge
            `}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
