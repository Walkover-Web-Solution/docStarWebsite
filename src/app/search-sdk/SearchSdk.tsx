"use client";

import { motion } from "framer-motion";
import {
    Search,
    Zap,
    Code,
    TrendingUp,
    CheckCircle,
    Sparkles,
    Globe,
    BarChart,
} from "lucide-react";

export default function SearchSdk() {
    const whyItMatters = [
        {
            icon: <Globe className="w-6 h-6" />,
            title: "Eliminate Context Switching",
            description:
                "Eliminate context switching between product and docs",
        },
        {
            icon: <Zap className="w-6 h-6" />,
            title: "Instant Answers",
            description:
                "Deliver instant answers inside your app",
        },
        {
            icon: <TrendingUp className="w-6 h-6" />,
            title: "Improve User Experience",
            description:
                "Improve user experience with built-in self-help",
        },
        {
            icon: <BarChart className="w-6 h-6" />,
            title: "Reduce Support Dependency",
            description:
                "Reduce support dependency with in-product search",
        },
    ];

    const keyFeatures = [
        {
            icon: <Code className="w-6 h-6" />,
            title: "Easy Integration",
            description:
                "Quickly integrate DocStar search into your product using a developer-friendly SDK.",
        },
        {
            icon: <Zap className="w-6 h-6" />,
            title: "Real-Time Search Results",
            description:
                "Fetch up-to-date results from your documentation, blogs, and knowledge base instantly.",
        },
        {
            icon: <Search className="w-6 h-6" />,
            title: "Consistent Search Experience",
            description:
                "Ensure users get the same accurate results inside your product as they do on your docs site.",
        },
        {
            icon: <TrendingUp className="w-6 h-6" />,
            title: "Scales With Your Content",
            description:
                "Works seamlessly as your documentation and knowledge base grow.",
        },
    ];

    const benefits = [
        "Faster access to answers inside the product",
        "Improved onboarding and feature discovery",
        "Reduced support tickets and interruptions",
        "Stronger product experience with built-in help",
        "Better adoption of documentation",
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
                            Search SDK
                        </span>
                    </motion.div>

                    <motion.h1
                        className="h1 mb-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        Bring DocStar Search <span className="text-gradient">Anywhere</span>
                    </motion.h1>

                    <motion.p
                        className="text-sm md:text-base mb-6 max-w-3xl mx-auto leading-snug opacity-70"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        Embed powerful documentation search directly into your product or website.
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
                {/* Why Search SDK Matters Section */}
                <section className="py-8 sm:py-10 md:py-12 lg:py-16 px-4 sm:px-5 md:px-6">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-medium mb-4 leading-tight">
                        Why Search SDK Matters
                    </h2>
                    <p className="text-sm md:text-base mb-8 leading-snug opacity-70">
                        Users expect help exactly where they are. Search SDK helps you:
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
                        Key Features of Search SDK
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
                        Turn Search Into an In-Product Experience
                    </h2>

                    <p className="text-sm md:text-base mb-6 opacity-70 leading-snug">
                        With DocStar's Search SDK, documentation comes to your users—not the other way around. Embed search where it matters most and help users find answers exactly when they need them.
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