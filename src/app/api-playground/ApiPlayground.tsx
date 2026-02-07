"use client";

import { motion } from "framer-motion";
import {
    Play,
    Code,
    Zap,
    Eye,
    CheckCircle,
    Sparkles,
    FileCode,
    Target,
} from "lucide-react";

export default function ApiPlayground() {
    const whyItMatters = [
        {
            icon: <Zap className="w-6 h-6" />,
            title: "Reduce Guesswork",
            description:
                "Reduce guesswork by testing APIs instantly",
        },
        {
            icon: <Target className="w-6 h-6" />,
            title: "Speed Up Onboarding",
            description:
                "Speed up onboarding for developers",
        },
        {
            icon: <Eye className="w-6 h-6" />,
            title: "Catch Errors Early",
            description:
                "Catch errors early before implementation",
        },
        {
            icon: <CheckCircle className="w-6 h-6" />,
            title: "Build Confidence",
            description:
                "Build confidence in API usage",
        },
    ];

    const keyFeatures = [
        {
            icon: <Play className="w-6 h-6" />,
            title: "Live API Requests",
            description:
                "Send real-time API calls directly from the docs and view actual responses.",
        },
        {
            icon: <Eye className="w-6 h-6" />,
            title: "Request & Response Visibility",
            description:
                "See headers, parameters, payloads, and responses clearly in one place.",
        },
        {
            icon: <FileCode className="w-6 h-6" />,
            title: "Supports Multiple Endpoints",
            description:
                "Test different endpoints, methods, and parameters without leaving the documentation.",
        },
        {
            icon: <Code className="w-6 h-6" />,
            title: "Developer-Friendly Experience",
            description:
                "Designed to help developers understand API behavior quickly without external tools.",
        },
    ];

    const benefits = [
        "Faster developer onboarding",
        "Higher API adoption and engagement",
        "Reduced support and integration issues",
        "Clear understanding of API behavior",
        "Better developer experience overall",
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
                            Interactive API Playground
                        </span>
                    </motion.div>

                    <motion.h1
                        className="h1 mb-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        Try APIs <span className="text-gradient">Before You Build</span>
                    </motion.h1>

                    <motion.p
                        className="text-sm md:text-base mb-6 max-w-3xl mx-auto leading-snug opacity-70"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        Test endpoints, explore responses, and understand APIs—all in real time.
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
                {/* Why Interactive API Playground Matters Section */}
                <section className="py-8 sm:py-10 md:py-12 lg:py-16 px-4 sm:px-5 md:px-6">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-medium mb-4 leading-tight">
                        Why Interactive API Playground Matters
                    </h2>
                    <p className="text-sm md:text-base mb-8 leading-snug opacity-70">
                        APIs are easier to adopt when developers can experiment. The Interactive API Playground helps you:
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
                        Key Features of Interactive API Playground
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
                        Turn API Docs Into Hands-On Experience
                    </h2>

                    <p className="text-sm md:text-base mb-6 opacity-70 leading-snug">
                        With DocStar's Interactive API Playground, your API documentation becomes practical and actionable. Developers don't just read—they test, learn, and build with confidence.
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