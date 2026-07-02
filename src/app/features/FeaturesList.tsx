"use client";

import Link from "next/link";
import MotionWrapper from "@/components/motion/MotionDivWrapper";
import { FeatureItem } from "@/types/data-types";
import {
  LucideIcon,
  Sparkles,
  ShieldCheck,
  Workflow,
  Zap,
  BookOpen,
  Globe2,
  Users,
  Search,
  Languages,
  Palette,
  ArrowRight,
} from "lucide-react";

const iconCycle: LucideIcon[] = [
  Sparkles,
  ShieldCheck,
  Workflow,
  Zap,
  BookOpen,
  Globe2,
  Users,
  Search,
];

const iconByFeatureId: Record<number, LucideIcon> = {
  1: ShieldCheck,
  2: Globe2,
  3: Workflow,
  4: Languages,
  5: Search,
  6: Users,
  7: Palette,
  8: Sparkles,
};

const abstractImages = [
  "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&q=80&w=1000",
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000",
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1000",
  "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=1000",
  "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&q=80&w=1000",
];

const FeaturesList = ({ features }: { features: FeatureItem[] }) => {
  if (!features || features.length === 0) return null;

  // Sort features by priority (ascending). Items without a priority will be placed at the end.
  const sortedFeatures = [...features].sort((a, b) => {
    const priorityA = a.priority !== undefined && a.priority !== null ? Number(a.priority) : 999999;
    const priorityB = b.priority !== undefined && b.priority !== null ? Number(b.priority) : 999999;
    return priorityA - priorityB;
  });

  const getFeatureImage = (feature: FeatureItem, fallbackIndex: number) => {
    if (feature.images && Array.isArray(feature.images) && feature.images.length > 0) return feature.images[0];
    if (feature.image && typeof feature.image === 'string') return feature.image;
    // Fallback to abstract images if db image is missing
    return abstractImages[fallbackIndex % abstractImages.length];
  };

  const renderVisualCard = (feature: FeatureItem, index: number) => {
    const Icon = iconByFeatureId[feature.id] ?? iconCycle[index % iconCycle.length];
    const imageSrc = getFeatureImage(feature, index + 1);

    return (
      <MotionWrapper
        key={feature.id}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: (index % 3) * 0.1 }}
        viewport={{ once: true }}
        className="flex-1 group"
      >
        <Link href={feature.link || "#"} className="block h-full">
          <div className="rounded-md border theme-border overflow-hidden flex flex-col h-full min-h-[300px] hover:shadow-xl transition-all duration-300 relative group">
            {/* Background Image */}
            <div className="absolute inset-0 w-full h-full">
              <img 
                src={imageSrc} 
                alt={feature.name}
                className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent transition-colors duration-300"></div>
            </div>

            <div className="p-8 flex flex-col h-full justify-end relative z-10 text-white">
              <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/20 backdrop-blur-md border border-white/30 text-white mb-4">
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="text-2xl font-bold mb-2">{feature.name}</h3>
              <p className="text-sm opacity-90 font-extralight text-gray-300 line-clamp-2 mb-4">
                {feature.description}
              </p>
              <div>
                <span className="inline-flex items-center justify-center px-4 py-1.5 text-xs font-semibold border border-white/30 rounded-md hover:bg-white/20 backdrop-blur-md transition-colors text-white">
                  Learn more
                </span>
              </div>
            </div>
          </div>
        </Link>
      </MotionWrapper>
    );
  };

  const renderHeroCard = (feature: FeatureItem, index: number) => {
    const HeroIcon = iconByFeatureId[feature.id] ?? iconCycle[index % iconCycle.length];
    
    return (
      <MotionWrapper
        key={feature.id}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="group"
      >
        <Link href={feature.link || "#"} className="block h-full">
          <div className="rounded-xl border theme-border overflow-hidden flex flex-col h-full min-h-[500px] hover:shadow-xl transition-all duration-300 relative group">
            {/* Background Image */}
            <div className="absolute inset-0 w-full h-full">
              <img 
                src={getFeatureImage(feature, index)} 
                alt={feature.name}
                className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent transition-colors duration-300"></div>
            </div>

            <div className="p-8 md:p-10 flex flex-col h-full justify-end relative z-10 text-white">
              <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/20 backdrop-blur-md border border-white/30 text-white mb-6">
                <HeroIcon className="w-6 h-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{feature.name}</h2>
              <p className="text-base opacity-90 leading-relaxed font-extralight text-gray-300 max-w-2xl mb-6">
                {feature.description}
              </p>
              <div>
                <span className="inline-flex items-center justify-center px-5 py-2 text-sm font-semibold bg-white text-black rounded hover:bg-gray-100 transition-colors">
                  Explore Feature
                </span>
              </div>
            </div>
          </div>
        </Link>
      </MotionWrapper>
    );
  };

  const renderNormalCard = (feature: FeatureItem, index: number) => {
    const Icon = iconByFeatureId[feature.id] ?? iconCycle[index % iconCycle.length];
    
    return (
      <MotionWrapper
        key={feature.id}
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: (index % 3) * 0.05 }}
        viewport={{ once: true }}
      >
        <Link
          href={feature.link || "#"}
          className="group relative block h-full"
        >
          <div className="relative h-full rounded border theme-border bg-[var(--theme-bg)] p-6 md:p-8 transition-all duration-300 hover:shadow-xl hover:shadow-[var(--theme-color)]/5 hover:-translate-y-1 flex flex-col justify-between">
            <div className="flex flex-col relative z-10">
              <div className="flex items-start justify-between mb-6">
                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-[var(--theme-bg-secondary)] border theme-border transition-colors duration-300 group-hover:border-[var(--theme-color)] group-hover:text-[var(--theme-color)] group-hover:bg-[var(--theme-color)]/5">
                  <Icon className="h-6 w-6" strokeWidth={1.5} />
                </div>
                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[var(--theme-color)]/10 opacity-0 -translate-x-3 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                  <ArrowRight className="h-4 w-4 text-[var(--theme-color)]" />
                </div>
              </div>

              <h3 className="mb-3 text-xl font-bold leading-tight group-hover:text-[var(--theme-color)] transition-colors duration-300">
                {feature.name}
              </h3>

              <p className="text-sm leading-relaxed text-gray-700 font-extralight opacity-70 line-clamp-3 dark:text-gray-300">
                {feature.description}
              </p>
            </div>
          </div>
        </Link>
      </MotionWrapper>
    );
  };

  // Group features into repeating chunks of 6 (3 for the top image block + 3 for the normal line block)
  const chunks: FeatureItem[][] = [];
  for (let i = 0; i < sortedFeatures.length; i += 6) {
    chunks.push(sortedFeatures.slice(i, i + 6));
  }

  return (
    <div className="mx-auto container px-4 sm:px-6 py-16 md:py-24 space-y-12">
      {chunks.map((chunk, chunkIndex) => {
        const bentoFeatures = chunk.slice(0, 3);
        const normalFeatures = chunk.slice(3, 6);
        const baseIndex = chunkIndex * 6;

        return (
          <div key={chunkIndex} className="space-y-12">
            {/* Image Block: 1 Big + 2 Small stacked */}
            {bentoFeatures.length > 0 && (
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Left Hero */}
                {bentoFeatures[0] && renderHeroCard(bentoFeatures[0], baseIndex)}

                {/* Right Stacked */}
                {bentoFeatures.length > 1 && (
                  <div className="flex flex-col gap-6">
                    {bentoFeatures.slice(1).map((f, i) => renderVisualCard(f, baseIndex + 1 + i))}
                  </div>
                )}
              </div>
            )}

            {/* Normal Cards Line */}
            {normalFeatures.length > 0 && (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {normalFeatures.map((f, i) => renderNormalCard(f, baseIndex + 3 + i))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default FeaturesList;
