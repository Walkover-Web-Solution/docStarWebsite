"use client";

import { motion } from "framer-motion";
import {
    Webhook as WebhookIcon,
    Zap,
    Bell,
    RefreshCw,
    CheckCircle,
    Sparkles,
    GitBranch,
    Settings,
} from "lucide-react";

export default function Webhook() {
    const whyItMatters = [
        {
            icon: <Bell className="w-6 h-6" />,
            title: "Real-Time Updates",
            description:
                "Sending real-time updates when content changes",
        },
        {
            icon: <RefreshCw className="w-6 h-6" />,
            title: "No Manual Tracking",
            description:
                "Eliminating manual tracking and polling",
        },
        {
            icon: <Zap className="w-6 h-6" />,
            title: "Automated Workflows",
            description:
                "Automating workflows triggered by documentation events",
        },
        {
            icon: <GitBranch className="w-6 h-6" />,
            title: "System Alignment",
            description:
                "Keeping teams and systems aligned automatically",
        },
    ];

    const keyFeatures = [
        {
            icon: <Zap className="w-6 h-6" />,
            title: "Real-Time Event Triggers",
            description:
                "Receive webhook hits instantly for events like page creation, page updates, title changes, and more.",
        },
        {
            icon: <Settings className="w-6 h-6" />,
            title: "Multiple Event Support",
            description:
                "Choose exactly which actions should trigger a webhook—only the events that matter to you.",
        },
        {
            icon: <WebhookIcon className="w-6 h-6" />,
            title: "Easy Integration",
            description:
                "Connect DocStar with your internal tools, CI/CD pipelines, notification systems, or analytics platforms.",
        },
        {
            icon: <CheckCircle className="w-6 h-6" />,
            title: "Reliable & Consistent Delivery",
            description:
                "Every event is delivered in a structured format, making it easy to process and act on.",
        },
    ];

    const benefits = [
        "Instant visibility into documentation changes",
        "Faster workflows with automated triggers",
        "Better collaboration between content and engineering teams",
        "Reduced manual monitoring and errors",
        "Scales smoothly for growing teams and integrations",
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
                            Webhooks
                        </span>
                    </motion.div>

                    <motion.h1
                        className="h1 mb-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        Real-Time <span className="text-gradient">Documentation Sync</span>
                    </motion.h1>

                    <motion.p
                        className="text-sm md:text-base mb-6 max-w-3xl mx-auto leading-snug opacity-70"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        Keeping your Docs in sync shouldn't require manual checks. With DocStar's Webhooks, every important change in your documentation is instantly communicated to your tools and workflows. From page creation to content updates, you get real-time notifications the moment something changes.
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
                {/* Why Webhooks Matter Section */}
                <section className="py-8 sm:py-10 md:py-12 lg:py-16 px-4 sm:px-5 md:px-6">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-medium mb-4 leading-tight">
                        Why Webhooks Matter
                    </h2>
                    <p className="text-sm md:text-base mb-8 leading-snug opacity-70">
                        Documentation is never static. DocStar Webhooks help you stay connected by:
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
                        Key Features of DocStar Webhooks
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
                            Turn Documentation Events Into Automation
                        </h3>
                        <p className="text-sm md:text-base opacity-70 leading-snug mb-4">
                            With DocStar Webhooks, your documentation becomes part of your automation ecosystem. React to changes in real time, build smarter workflows, and keep everything in sync—without lifting a finger.
                        </p>
                        <p className="text-sm md:text-base opacity-70 leading-snug">
                            👉 Take a tour and see how DocStar Webhooks work in action.
                        </p>
                    </div>
                </section>
            </div>
        </>
    );
}