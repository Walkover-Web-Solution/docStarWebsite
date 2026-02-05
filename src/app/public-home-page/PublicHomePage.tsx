"use client";

import { motion } from "framer-motion";
import {
    Search,
    Layout,
    Globe,
    FolderTree,
    Star,
    TrendingUp,
    CheckCircle,
    Sparkles,
} from "lucide-react";

export default function PublicHomePage() {
    const searchFeatures = [
        {
            icon: <Search className="w-6 h-6" />,
            title: "Search-First Experience",
            description:
                "Give users a powerful search bar right at the center. They can ask anything and reach the right documentation in seconds.",
        },
        {
            icon: <Layout className="w-6 h-6" />,
            title: "Clean, Focused Layout",
            description:
                "A distraction-free design keeps the focus on content discovery, not clutter.",
        },
        {
            icon: <Globe className="w-6 h-6" />,
            title: "Always Accessible",
            description:
                "Make your documentation publicly available so users don't need logins just to find help.",
        },
    ];

    const discoveryFeatures = [
        {
            icon: <FolderTree className="w-6 h-6" />,
            title: "Category-Based Navigation",
            description:
                "Organize docs into clear sections like Integration Guides, Flows, or Server Docs, making browsing intuitive and fast.",
        },
        {
            icon: <Star className="w-6 h-6" />,
            title: "Highlight Key Guides",
            description:
                "Surface important or frequently used articles directly on the home page for quick access.",
        },
        {
            icon: <TrendingUp className="w-6 h-6" />,
            title: "Scales With Your Docs",
            description:
                "As your documentation grows, the home page adapts automatically without breaking structure.",
        },
    ];

    const benefits = [
        {
            title: "Faster issue resolution",
            description: "Through instant search",
        },
        {
            title: "Reduced support tickets",
            description: "With easy self-help",
        },
        {
            title: "Better user experience",
            description: "With clear navigation",
        },
        {
            title: "Professional, product-grade documentation front",
            description: "That builds trust",
        },
        {
            title: "Works equally well for small and large doc libraries",
            description: "Scales with you",
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
                            Public Home Page
                        </span>
                    </motion.div>

                    <motion.h1
                        className="h1 mb-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        Your Docs, <span className="text-gradient">Instantly Usable</span>
                    </motion.h1>

                    <motion.p
                        className="text-sm md:text-base mb-6 max-w-3xl mx-auto leading-snug opacity-70"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        With DocStar, your public documentation isn't just visible — it's
                        instantly usable. The Public Home Page acts as a clean, searchable
                        hub where users can quickly find answers, explore guides, and
                        navigate content without friction.
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
                {/* Search-First Experience Section */}
                <section className="py-8 sm:py-10 md:py-12 lg:py-16 px-4 sm:px-5 md:px-6">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-medium mb-8 leading-tight">
                        Public Home Page
                    </h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
                        {searchFeatures.map((feature, index) => (
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

                {/* Smart Content Discovery Section */}
                <section className="py-8 sm:py-10 md:py-12 lg:py-16 px-4 sm:px-5 md:px-6">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-medium mb-8 leading-tight">
                        Smart Content Discovery
                    </h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
                        {discoveryFeatures.map((feature, index) => (
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
                        Benefits for Your Organization
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
                            A Better First Impression for Your Docs
                        </h3>
                        <p className="text-sm md:text-base opacity-70 leading-snug">
                            With DocStar's Public Home Page, users land on a clean,
                            searchable, and organized help center that feels reliable from the
                            first glance — and actually helps them find answers fast.
                        </p>
                    </div>
                </section>

                {/* Final CTA Section
        <section className="py-8 sm:py-10 md:py-12 lg:py-16 px-4 sm:px-5 md:px-6">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-medium mb-4 leading-tight">
            Make Your Documentation Work Harder
          </h2>

          <p className="text-sm md:text-base mb-6 opacity-70 leading-snug">
            Stop hiding valuable content behind complex navigation. With
            DocStar's Public Home Page, give your users the instant access they
            need to find answers, explore guides, and get the most out of your
            product.
          </p>

          <button
            className="btn btn-primary"
            onClick={() => {
              window.open("https://app.docstar.io/login");
            }}
          >
            Get Started with DocStar
          </button>
        </section> */}
            </div>
        </>
    );
};