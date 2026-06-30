"use client";

import { motion } from "framer-motion";
import {
    Grid,
    Eye,
    Layers,
    Zap,
    CheckCircle,
    Sparkles,
    Scan,
    MousePointer,
    LayoutGrid,
    Compass,
    ArrowRight,
} from "lucide-react";
import Link from "next/link";
import CTASection from "@/components/CTASection";

export default function GalleryView() {
    const whyItMatters = [
        {
            icon: <Scan className="w-6 h-6" />,
            title: "Easier to Scan",
            description:
                "Making content easier to scan and understand at a glance",
        },
        {
            icon: <Compass className="w-6 h-6" />,
            title: "Encourages Exploration",
            description:
                "Encouraging exploration through visual organization",
        },
        {
            icon: <Layers className="w-6 h-6" />,
            title: "Reduces Friction",
            description:
                "Reducing friction in navigating large documentation sets",
        },
        {
            icon: <Zap className="w-6 h-6" />,
            title: "Faster Navigation",
            description:
                "Helping users reach the right page faster",
        },
    ];

    const keyFeatures = [
        {
            icon: <LayoutGrid className="w-6 h-6" />,
            title: "Visual Content Organization",
            description:
                "Present docs, guides, and resources in a structured gallery that's easy to browse and inviting to explore.",
        },
        {
            icon: <Eye className="w-6 h-6" />,
            title: "Clear Content Representation",
            description:
                "Each page is displayed in a way that helps users instantly understand what it's about before opening it.",
        },
        {
            icon: <Grid className="w-6 h-6" />,
            title: "Flexible Layout Experience",
            description:
                "Adapt how content is presented to suit different use cases—whether it's onboarding guides, API references, or best practices.",
        },
        {
            icon: <MousePointer className="w-6 h-6" />,
            title: "Improved Content Discovery",
            description:
                "A cleaner layout naturally guides users toward relevant content, increasing engagement and time spent reading.",
        },
    ];

    const benefits = [
        {
            title: "Faster discovery of relevant documentation",
            description: "Find what you need quickly",
        },
        {
            title: "Better reading experience with less cognitive load",
            description: "Easier to understand and navigate",
        },
        {
            title: "Higher engagement with docs and guides",
            description: "Users spend more time learning",
        },
        {
            title: "Reduced dependency on support teams",
            description: "Self-service becomes effortless",
        },
        {
            title: "Documentation that feels modern and easy to use",
            description: "Professional and inviting",
        },
    ];

    return (
        <>
            {/* Hero Section */}
            <div className="relative min-h-[75vh] flex items-center border-b theme-border overflow-hidden">
                <div className="absolute inset-0 theme-bg-secondary">
                    {/* Subtle Grid Background */}
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--theme-bg)] to-transparent"></div>
                </div>

                {/* Floating elements */}
                <div className="absolute top-20 right-10 w-72 h-72 bg-[var(--theme-color)]/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 left-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

                <div className="container mx-auto px-4 sm:px-6 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-12 items-center pt-20 pb-16">
                        <motion.div 
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            className="max-w-2xl"
                        >
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border theme-border bg-[var(--theme-bg)] shadow-sm backdrop-blur-md mb-6">
                                <LayoutGrid className="w-4 h-4 text-[var(--theme-color)]" />
                                <span className="text-xs font-semibold tracking-wide uppercase">
                                    Gallery View
                                </span>
                            </div>

                            <h1 className="h1 mb-6 leading-tight">
                                Documentation That's <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-bl from-[var(--theme-color)] to-cyan-500">
                                    Easy to Explore.
                                </span>
                            </h1>

                            <p className="text-base sm:text-lg opacity-70 mb-8 leading-relaxed max-w-xl">
                                Turn long lists into a visual, organized experience that invites users to browse and discover.
                            </p>

                            <div className="flex flex-wrap gap-4">
                                <Link
                                    href="https://app.docstar.io/login"
                                    target="_blank"
                                    className="btn btn-primary shadow-lg shadow-[var(--theme-color)]/20"
                                >
                                    Get Started with DocStar
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </Link>
                            </div>
                        </motion.div>

                        {/* Hero Visual */}
                        <motion.div 
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="relative hidden lg:block"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-[var(--theme-color)]/20 to-cyan-500/20 rounded-2xl transform rotate-3 scale-105 blur-xl"></div>
                            
                            {/* Abstract Gallery UI Mockup */}
                            <div className="relative z-10 bg-background border theme-border rounded-xl shadow-2xl p-6 transform -rotate-2 hover:rotate-0 transition-transform duration-500">
                                <div className="flex justify-between items-center mb-6">
                                    <div className="h-6 w-32 bg-black/10 dark:bg-white/10 rounded-md"></div>
                                    <div className="flex gap-2">
                                        <div className="h-6 w-6 bg-[var(--theme-color)]/20 rounded-md"></div>
                                        <div className="h-6 w-6 bg-black/10 dark:bg-white/10 rounded-md"></div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div key={i} className="border theme-border rounded-lg p-4 bg-[var(--theme-bg)] hover:border-[var(--theme-color)] transition-colors">
                                            <div className="w-8 h-8 rounded-md bg-cyan-500/20 mb-3 flex items-center justify-center">
                                                <Compass className="w-4 h-4 text-cyan-500" />
                                            </div>
                                            <div className="h-3 w-3/4 bg-black/20 dark:bg-white/20 rounded-sm mb-2"></div>
                                            <div className="h-2 w-full bg-black/10 dark:bg-white/10 rounded-sm mb-1"></div>
                                            <div className="h-2 w-5/6 bg-black/10 dark:bg-white/10 rounded-sm"></div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            
                            {/* Floating Badge */}
                            <div className="absolute -bottom-6 -left-6 p-4 rounded-xl theme-bg-secondary border theme-border shadow-xl flex items-center gap-4 z-20 animate-bounce" style={{ animationDuration: '3s'}}>
                                <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center">
                                    <Grid className="w-5 h-5 text-cyan-500" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-wider">Layout</p>
                                    <p className="text-sm font-medium opacity-80">Grid Active</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto">
                {/* Why Gallery View Matters Section */}
                <div className="py-16 md:py-24 px-4 sm:px-6 relative">
                    <div className="text-center mb-16 max-w-3xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-semibold mb-4 tracking-tight">
                            Why Gallery View Matters
                        </h2>
                        <p className="text-base md:text-lg opacity-60 leading-relaxed">
                            Traditional documentation often feels dense and hard to navigate. Gallery View solves this by:
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                        {whyItMatters.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="group relative"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-[var(--theme-color)]/20 to-cyan-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                <div className="h-full p-6 md:p-8 rounded-2xl border theme-border theme-bg-secondary relative z-10 hover:-translate-y-1 transition-transform duration-300 shadow-sm">
                                    <div className="w-14 h-14 rounded-xl bg-[var(--theme-color)]/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                                        {feature.icon}
                                    </div>
                                    <h3 className="text-xl font-bold mb-3 leading-tight">{feature.title}</h3>
                                    <p className="text-sm opacity-70 leading-relaxed">{feature.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Key Features Section */}
                <div className="py-16 md:py-24 relative">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--theme-border-color)]/20 to-transparent"></div>
                    
                    <div className="relative z-10 px-4 sm:px-6">
                        <div className="text-center mb-16">
                            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-cyan-500/10 text-cyan-500 mb-4">
                                <Grid className="w-6 h-6" />
                            </div>
                            <h2 className="text-3xl md:text-4xl font-semibold mb-4 tracking-tight">
                                Key Features of Gallery View
                            </h2>
                            <p className="text-base md:text-lg opacity-60 max-w-2xl mx-auto">
                                Visual organization that transforms how users discover content.
                            </p>
                        </div>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                            {keyFeatures.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    className="group relative"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-[var(--theme-color)]/20 to-cyan-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                    <div className="h-full p-6 md:p-8 rounded-2xl border theme-border theme-bg-secondary relative z-10 hover:-translate-y-1 transition-transform duration-300 shadow-sm">
                                        <div className="w-14 h-14 rounded-xl bg-[var(--theme-color)]/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                                            {feature.icon}
                                        </div>
                                        <h3 className="text-xl font-bold mb-3 leading-tight">{feature.title}</h3>
                                        <p className="text-sm opacity-70 leading-relaxed">{feature.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Benefits Section - Premium Glowing Card */}
                <div className="py-16 md:py-24 px-4 sm:px-6">
                    <div className="max-w-4xl mx-auto relative group">
                        <div className="absolute inset-0 bg-gradient-to-r from-[var(--theme-color)] to-cyan-500 rounded-3xl blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-700"></div>
                        
                        <div className="relative p-8 md:p-12 rounded-3xl bg-[var(--theme-bg)] border theme-border overflow-hidden">
                            <div className="absolute top-0 right-0 p-8 opacity-10">
                                <Eye className="w-48 h-48" />
                            </div>
                            
                            <div className="flex items-center gap-4 mb-8 relative z-10">
                                <div className="w-12 h-12 rounded-xl bg-[var(--theme-color)]/10 flex items-center justify-center">
                                    <Eye className="w-6 h-6 text-[var(--theme-color)]" />
                                </div>
                                <h3 className="text-2xl md:text-3xl font-bold">Benefits for Your Users and Teams</h3>
                            </div>
                            
                            <div className="grid sm:grid-cols-2 gap-4 relative z-10">
                                {benefits.map((benefit, index) => (
                                    <div key={index} className="flex items-start gap-4 p-4 rounded-xl theme-bg-secondary border theme-border hover:-translate-y-1 transition-transform duration-300 shadow-sm">
                                        <CheckCircle className="w-6 h-6 flex-shrink-0 text-cyan-500 mt-0.5" />
                                        <div>
                                            <p className="text-sm font-medium opacity-90 leading-relaxed">{benefit.title}</p>
                                            <p className="text-xs opacity-60 mt-1 leading-relaxed">{benefit.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <CTASection
                    title="Turn Documentation Into an Experience"
                    description="With Gallery View, DocStar turns documentation into more than just pages—it becomes a space users want to explore. Clean, organized, and built for discovery."
                />
            </div>
        </>
    );
}