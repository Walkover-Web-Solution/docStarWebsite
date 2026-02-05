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
} from "lucide-react";

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
            <section className="py-8 sm:py-10 md:py-12 lg:py-16 theme-bg-secondary border-b theme-border">
                <div className="container mx-auto px-4 sm:px-5 md:px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="mb-4 mt-20"
                    >
                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-md border theme-border text-xs font-medium">
                            <Sparkles className="w-4 h-4 text-[var(--theme-color)]" />
                            Gallery View
                        </span>
                    </motion.div>

                    <motion.h1
                        className="h1 mb-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        Effortless <span className="text-gradient">Content Discovery</span>
                    </motion.h1>

                    <motion.p
                        className="text-sm md:text-base mb-6 max-w-3xl mx-auto leading-snug opacity-70"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        Finding the right content shouldn't feel overwhelming—it should feel effortless. With DocStar's Gallery View, your documentation is transformed into a visually organized experience that helps users quickly discover and explore what they need. Instead of long text lists, Gallery View presents your content in a clean, engaging layout that invites users to click, browse, and learn.
                    </motion.p>

                    <button
                        className="btn btn-primary mx-auto"
                        onClick={() => {
                            window.open("https://app.docstar.io/login");
                        }}
                    >
                        Get Started with DocStar
                    </button>
                </div>
            </section>

            <div className="container mx-auto">
                {/* Why Gallery View Matters Section */}
                <section className="py-8 sm:py-10 md:py-12 lg:py-16 px-4 sm:px-5 md:px-6">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-medium mb-4 leading-tight">
                        Why Gallery View Matters
                    </h2>
                    <p className="text-sm md:text-base mb-8 leading-snug opacity-70">
                        Traditional documentation often feels dense and hard to navigate. Gallery View solves this by:
                    </p>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
                        {whyItMatters.map((feature, index) => (
                            <article
                                key={index}
                                className="p-5 md:p-6 rounded-md theme-bg-secondary border theme-border hover:border-[var(--theme-color)] transition-colors duration-300"
                            >
                                <div className="w-10 h-10 rounded-md border theme-border flex items-center justify-center mb-3">
                                    {feature.icon}
                                </div>
                                <h3 className="text-lg font-medium mb-2 leading-tight">
                                    {feature.title}
                                </h3>
                                <p className="text-sm opacity-70 leading-snug">
                                    {feature.description}
                                </p>
                            </article>
                        ))}
                    </div>
                </section>

                {/* Key Features Section */}
                <section className="py-8 sm:py-10 md:py-12 lg:py-16 px-4 sm:px-5 md:px-6">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-medium mb-8 leading-tight">
                        Key Features of Gallery View
                    </h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
                        {keyFeatures.map((feature, index) => (
                            <article
                                key={index}
                                className="p-5 md:p-6 rounded-md border theme-border bg-[var(--theme-bg)] hover:border-[var(--theme-color)] transition-colors duration-300"
                            >
                                <div className="w-10 h-10 rounded-md border theme-border flex items-center justify-center mb-3">
                                    {feature.icon}
                                </div>
                                <h3 className="text-lg font-medium mb-2 leading-tight">
                                    {feature.title}
                                </h3>
                                <p className="text-sm opacity-70 leading-snug">
                                    {feature.description}
                                </p>
                            </article>
                        ))}
                    </div>
                </section>

                {/* Benefits Section */}
                <section className="py-8 sm:py-10 md:py-12 lg:py-16 px-4 sm:px-5 md:px-6">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-medium mb-8 leading-tight">
                        Benefits for Your Users and Teams
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-4.5 md:gap-5">
                        {benefits.map((benefit, index) => (
                            <article
                                key={index}
                                className="p-5 md:p-6 rounded-md theme-bg-secondary border theme-border hover:border-[var(--theme-color)] transition-colors duration-300"
                            >
                                <div className="flex items-center mb-2">
                                    <CheckCircle className="w-4 h-4 mr-2 text-[var(--theme-color)]" />
                                    <h3 className="text-lg font-medium">{benefit.title}</h3>
                                </div>
                                <p className="text-sm opacity-70 leading-snug">
                                    {benefit.description}
                                </p>
                            </article>
                        ))}
                    </div>

                    <div className="mt-8 p-6 md:p-8 rounded-md theme-bg-secondary border theme-border">
                        <h3 className="text-xl md:text-2xl font-medium mb-3 leading-tight">
                            Turn Documentation Into an Experience
                        </h3>
                        <p className="text-sm md:text-base opacity-70 leading-snug">
                            With Gallery View, DocStar turns documentation into more than just pages—it becomes a space users want to explore. Clean, organized, and built for discovery, Gallery View helps your content stand out and keeps users coming back for more.
                        </p>
                    </div>
                </section>
            </div>
        </>
    );
}