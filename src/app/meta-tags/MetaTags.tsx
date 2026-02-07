"use client";

import { motion } from "framer-motion";
import {
    Search,
    Share2,
    FileText,
    TrendingUp,
    CheckCircle,
    Sparkles,
    Target,
    Layout,
} from "lucide-react";

export default function MetaTags() {
    const whyItMatters = [
        {
            icon: <Search className="w-6 h-6" />,
            title: "Improve Search Visibility",
            description:
                "Improve search visibility and rankings",
        },
        {
            icon: <FileText className="w-6 h-6" />,
            title: "Control Titles & Descriptions",
            description:
                "Control page titles and descriptions",
        },
        {
            icon: <Share2 className="w-6 h-6" />,
            title: "Optimize Sharing",
            description:
                "Optimize how links appear when shared",
        },
        {
            icon: <TrendingUp className="w-6 h-6" />,
            title: "Drive Qualified Traffic",
            description:
                "Drive more qualified traffic to your docs",
        },
    ];

    const keyFeatures = [
        {
            icon: <Search className="w-6 h-6" />,
            title: "SEO Title & Description",
            description:
                "Define custom page titles and meta descriptions to improve search performance.",
        },
        {
            icon: <Share2 className="w-6 h-6" />,
            title: "Social Sharing Control",
            description:
                "Manage how your pages appear when shared on platforms like LinkedIn, Twitter, and Slack.",
        },
        {
            icon: <Target className="w-6 h-6" />,
            title: "Page-Level Customization",
            description:
                "Set metadata individually for each page to target specific keywords and audiences.",
        },
        {
            icon: <Layout className="w-6 h-6" />,
            title: "Consistent SEO Structure",
            description:
                "Maintain clean and optimized metadata across your entire documentation site.",
        },
    ];

    const benefits = [
        "Better visibility on search engines",
        "Higher click-through rates from search and social",
        "More control over content presentation",
        "Stronger SEO performance across docs",
        "Easy optimization without technical effort",
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
                            Metadata
                        </span>
                    </motion.div>

                    <motion.h1
                        className="h1 mb-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        Optimize Every Page for <span className="text-gradient">Search and Sharing</span>
                    </motion.h1>

                    <motion.p
                        className="text-sm md:text-base mb-6 max-w-3xl mx-auto leading-snug opacity-70"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        Control how your content appears in search engines and social platforms.
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
                {/* Why Metadata Matters Section */}
                <section className="py-8 sm:py-10 md:py-12 lg:py-16 px-4 sm:px-5 md:px-6">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-medium mb-4 leading-tight">
                        Why Metadata Matters
                    </h2>
                    <p className="text-sm md:text-base mb-8 leading-snug opacity-70">
                        Search engines and social platforms rely on metadata to understand your content. Metadata helps you:
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
                        Key Features of Metadata
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
                                <div className="flex items-center">
                                    <CheckCircle className="w-4 h-4 mr-2 text-[var(--theme-color)]" />
                                    <h3 className="text-lg font-medium">{benefit}</h3>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>

                {/* Final CTA Section */}
                <section className="py-8 sm:py-10 md:py-12 lg:py-16 px-4 sm:px-5 md:px-6">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-medium mb-4 leading-tight">
                        Make Your Docs Easy to Find
                    </h2>

                    <p className="text-sm md:text-base mb-6 opacity-70 leading-snug">
                        With DocStar's Metadata controls, your documentation doesn't just exist—it gets discovered. Optimize every page, attract the right audience, and maximize the reach of your content.
                    </p>

                    <button
                        className="btn btn-primary"
                        onClick={() => {
                            window.open("https://app.docstar.io/login");
                        }}
                    >
                        Get Started with DocStar
                    </button>
                </section>
            </div>
        </>
    );
}