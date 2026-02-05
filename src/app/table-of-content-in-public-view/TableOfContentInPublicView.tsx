"use client";

import { motion } from "framer-motion";
import {
    List,
    MousePointerClick,
    Eye,
    FileText,
    CheckCircle,
    Sparkles,
    Zap,
    BookOpen,
} from "lucide-react";

export default function TableOfContentInPublicView() {
    const whyItMatters = [
        {
            icon: <List className="w-6 h-6" />,
            title: "Clear Overview",
            description:
                "Giving users a clear overview of the page structure",
        },
        {
            icon: <MousePointerClick className="w-6 h-6" />,
            title: "Instant Navigation",
            description:
                "Allowing instant navigation to specific sections",
        },
        {
            icon: <Zap className="w-6 h-6" />,
            title: "Reduced Scrolling",
            description:
                "Reducing time spent scrolling and searching",
        },
        {
            icon: <BookOpen className="w-6 h-6" />,
            title: "Easier Consumption",
            description:
                "Making complex documentation easier to consume",
        },
    ];

    const keyFeatures = [
        {
            icon: <List className="w-6 h-6" />,
            title: "Auto-Generated Structure",
            description:
                "The Table of Contents is created automatically from your headings, keeping it accurate and always up to date.",
        },
        {
            icon: <MousePointerClick className="w-6 h-6" />,
            title: "Instant Section Navigation",
            description:
                "Users can jump to any section with a single click, improving speed and readability.",
        },
        {
            icon: <Eye className="w-6 h-6" />,
            title: "Always Visible in Public View",
            description:
                "The Table of Contents stays accessible while users read, helping them move around the page without losing context.",
        },
        {
            icon: <FileText className="w-6 h-6" />,
            title: "Perfect for Long-Form Docs",
            description:
                "Ideal for API references, setup guides, tutorials, and knowledge-base articles with multiple sections.",
        },
    ];

    const benefits = [
        "Faster access to specific information",
        "Better reading experience for long documents",
        "Higher engagement with detailed content",
        "Fewer support questions caused by missed sections",
        "Professional, easy-to-navigate public documentation",
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
                            Table of Contents
                        </span>
                    </motion.div>

                    <motion.h1
                        className="h1 mb-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        Navigate with <span className="text-gradient">Confidence</span>
                    </motion.h1>

                    <motion.p
                        className="text-sm md:text-base mb-6 max-w-3xl mx-auto leading-snug opacity-70"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        Finding your way through long documentation shouldn't be a struggle. With DocStar's Table of Contents, users can instantly understand the structure of a page and jump directly to the section they need. No endless scrolling. No guessing where information lives.
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
                {/* Why Table of Contents Matters Section */}
                <section className="py-8 sm:py-10 md:py-12 lg:py-16 px-4 sm:px-5 md:px-6">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-medium mb-4 leading-tight">
                        Why Table of Contents Matters
                    </h2>
                    <p className="text-sm md:text-base mb-8 leading-snug opacity-70">
                        Long pages often overwhelm users and hide important information. DocStar's public Table of Contents solves this by:
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
                        Key Features of Table of Contents
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

                    <div className="mt-8 p-6 md:p-8 rounded-md theme-bg-secondary border theme-border">
                        <h3 className="text-xl md:text-2xl font-medium mb-3 leading-tight">
                            Make Every Page Easy to Navigate
                        </h3>
                        <p className="text-sm md:text-base opacity-70 leading-snug mb-4">
                            With DocStar's Table of Contents, your documentation becomes clearer, faster, and more user-friendly. Users stay oriented, find answers quicker, and actually read more of what you publish.
                        </p>
                        <p className="text-sm md:text-base opacity-70 leading-snug">
                            👉 Take a tour and see how DocStar makes documentation effortless
                        </p>
                    </div>
                </section>
            </div>
        </>
    );
}