'use client';

import Link from "next/link"
import MotionWrapper from "@/components/motion/MotionDivWrapper"
import { FeatureItem } from "@/types/data-types"
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
    ChevronRight,
} from "lucide-react"


const iconCycle: LucideIcon[] = [Sparkles, ShieldCheck, Workflow, Zap, BookOpen, Globe2, Users, Search]
const gradientCycle = [
    "from-rose-100/70 via-transparent to-transparent",
    "from-amber-100/70 via-transparent to-transparent",
    "from-blue-100/60 via-transparent to-transparent",
    "from-emerald-100/60 via-transparent to-transparent",
]

const iconByFeatureId: Record<number, LucideIcon> = {
    1: ShieldCheck,
    2: Globe2,
    3: Workflow,
    4: Languages,
    5: Search,
    6: Users,
    7: Palette,
    8: Sparkles,
}

const FeaturesList = ({ features }: { features: FeatureItem[] }) => {
    return (
        <div className="relative mx-auto max-w-7xl p-6 md:p-10">
            <div className="relative grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {features.map((feature, index) => {
                    const Icon = iconByFeatureId[feature.id] ?? iconCycle[index % iconCycle.length]
                    const accent = gradientCycle[index % gradientCycle.length]
                    return (
                        <Link
                            key={index}
                            href={feature.link}
                            className="group block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                            aria-label={`Learn more about ${feature.name}`}
                        >
                            <MotionWrapper
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: (index % 3) * 0.08 }}
                                viewport={{ once: true, margin: "-50px" }}
                                className="relative flex h-full flex-col overflow-hidden shadow-sm theme-bg theme-border"
                            >

                                <div className="flex flex-1 flex-col gap-5 p-6 sm:p-8">
                                    <div className="flex items-center gap-3">
                                        <span className="inline-flex h-11 w-11 items-center justify-center rounded-full shadow-sm ring-1 ring-inset theme-bg opacity-90">
                                            <Icon className="h-5 w-5 opacity-80" />
                                        </span>
                                        <h3 className="text-lg font-semibold sm:text-xl">{feature.name}</h3>
                                    </div>

                                    <p className="text-sm leading-relaxed sm:text-base opacity-80">{feature.description}</p>

                                    <div className="mt-auto pt-2 inline-flex items-center gap-2 text-sm font-semibold transition-colors">
                                        Learn more
                                        <ChevronRight className="h-4 w-4" />
                                    </div>
                                </div>
                            </MotionWrapper>
                        </Link>
                    )
                })}
            </div>
        </div>
    );
};

export default FeaturesList;