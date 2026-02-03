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

const FeaturesList = ({ features }: { features: FeatureItem[] }) => {
  return (
    <div className="mx-auto container px-6 py-16 md:px-8 md:py-24">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => {
          const Icon =
            iconByFeatureId[feature.id] ?? iconCycle[index % iconCycle.length];
          return (
            <MotionWrapper
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              viewport={{ once: true }}
            >
              <Link
                href={feature.link || "#"}
                className="group relative block h-full"
                aria-label={`Learn more about ${feature.name}`}
              >
                <div className="relative h-full rounded-md border theme-border p-6 transition-all duration-300 hover:border-opacity-50">
                  <div className="flex flex-col h-full">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-md theme-bg-secondary border theme-border transition-transform duration-300 group-hover:scale-110">
                        <Icon className="h-7 w-7" strokeWidth={1.5} />
                      </div>
                      <ArrowRight className="h-5 w-5 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-60 group-hover:translate-x-0" />
                    </div>

                    <h3 className="mb-2 text-lg font-semibold leading-tight">
                      {feature.name}
                    </h3>

                    <p className="text-sm leading-relaxed opacity-60 line-clamp-3">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </Link>
            </MotionWrapper>
          );
        })}
      </div>
    </div>
  );
};

export default FeaturesList;
