"use client";

import { useMemo } from "react";
import Link from "next/link";
import MotionWrapper from "@/components/motion/MotionDivWrapper";
import { FeatureItem } from "@/types/data-types";

const abstractImages = [
  "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&q=80&w=1000",
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000",
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1000",
  "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=1000",
  "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&q=80&w=1000",
];

const FeaturesList = ({ features }: { features: FeatureItem[] }) => {
  const sortedFeatures = useMemo(
    () =>
      [...features].sort((a, b) => {
        const priorityA = a.priority !== undefined && a.priority !== null ? Number(a.priority) : 999999;
        const priorityB = b.priority !== undefined && b.priority !== null ? Number(b.priority) : 999999;
        return priorityA - priorityB;
      }),
    [features]
  );

  const getFeatureImage = (feature: FeatureItem, fallbackIndex: number) => {
    if (feature.images && Array.isArray(feature.images) && feature.images.length > 0) return feature.images[0];
    if (feature.image && typeof feature.image === "string") return feature.image;
    return abstractImages[fallbackIndex % abstractImages.length];
  };

  if (!features || features.length === 0) return null;

  return (
    <div className="mx-auto container px-4 sm:px-6 py-16 md:py-24">
      <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {sortedFeatures.map((feature, index) => (
          <MotionWrapper
            key={feature.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: (index % 6) * 0.05 }}
            viewport={{ once: true }}
          >
            <Link href={feature.link || "#"} className="group block">
              <div className="rounded-2xl overflow-hidden border theme-border aspect-[4/3] mb-4">
                <img
                  src={getFeatureImage(feature, index)}
                  alt={feature.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="text-lg font-bold leading-snug mb-1.5 group-hover:opacity-70 transition-opacity duration-300">
                {feature.name}
              </h3>
              <p className="text-sm opacity-60 leading-relaxed line-clamp-2">{feature.description}</p>
            </Link>
          </MotionWrapper>
        ))}
      </div>
    </div>
  );
};

export default FeaturesList;
