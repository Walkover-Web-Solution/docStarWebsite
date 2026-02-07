"use client";

import { motion } from "framer-motion";
import {
    FileText,
    ThumbsUp,
    Search,
    Link2,
    CheckCircle,
    Sparkles,
    Eye,
    BarChart3,
    Users,
    TrendingUp,
} from "lucide-react";

export default function PageAnalytics() {
    const whyItMatters = [
        {
            icon: <Eye className="w-6 h-6" />,
            title: "Know which pages are live and which are still drafts",
        },
        {
            icon: <Users className="w-6 h-6" />,
            title: "Understand how users feel about your content",
        },
        {
            icon: <Search className="w-6 h-6" />,
            title: "Track SEO health and visibility",
        },
        {
            icon: <TrendingUp className="w-6 h-6" />,
            title: "Measure how traffic is reaching your pages",
        },
    ];

    const keyFeatures = [
        {
            icon: <FileText className="w-6 h-6" />,
            title: "Page Status Visibility",
            description:
                "Instantly see whether a page is live or in draft, so teams always know what's published and what's still in progress.",
        },
        {
            icon: <ThumbsUp className="w-6 h-6" />,
            title: "User Feedback Insights",
            description:
                "Track positive and negative feedback to understand how helpful your content is from a reader's perspective.",
        },
        {
            icon: <Search className="w-6 h-6" />,
            title: "SEO Score Monitoring",
            description:
                "Get a clear SEO score for each page to identify optimization gaps and improve search performance.",
        },
        {
            icon: <Link2 className="w-6 h-6" />,
            title: "UTM Tracking",
            description:
                "See how many users arrive via tracked campaigns, links, or sources with built-in UTM count visibility.",
        },
    ];

    const benefits = [
        "Clear ownership and visibility across all pages",
        "Better content decisions backed by real data",
        "Improved SEO and discoverability",
        "Faster iteration based on user feedback",
        "Stronger alignment between content, marketing, and product teams",
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
                            Page Analytics
                        </span>
                    </motion.div>

                    <motion.h1
                        className="h1 mb-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        Understand How Every <span className="text-gradient">Page Performs</span>
                    </motion.h1>

                    <motion.p
                        className="text-sm md:text-base mb-6 max-w-3xl mx-auto leading-snug opacity-70"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        Track page status, user feedback, SEO health, and traffic insights—all from a single view.
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
                {/* Why Page Analytics Matters Section */}
                <section className="py-8 sm:py-10 md:py-12 lg:py-16 px-4 sm:px-5 md:px-6">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-medium mb-4 leading-tight">
                        Why Page Analytics Matters
                    </h2>
                    <p className="text-sm md:text-base mb-8 leading-snug opacity-70">
                        Great documentation isn't just written, it's measured. Page Analytics helps you:
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
                                <h3 className="text-lg font-medium leading-tight">
                                    {feature.title}
                                </h3>
                            </article>
                        ))}
                    </div>
                </section>

                {/* Key Features Section */}
                <section className="py-8 sm:py-10 md:py-12 lg:py-16 px-4 sm:px-5 md:px-6">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-medium mb-8 leading-tight">
                        Key Features of Page Analytics
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
                        Turn Data Into Better Documentation
                    </h2>

                    <p className="text-sm md:text-base mb-6 opacity-70 leading-snug">
                        With DocStar's Page Analytics, every page tells a story. Track performance, listen to users, and continuously improve your documentation with insights that actually matter.
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