"use client";

import { motion } from "framer-motion";
import {
    Key,
    Shield,
    Lock,
    Eye,
    CheckCircle,
    Sparkles,
    Settings,
    Users,
} from "lucide-react";

export default function ApiToken() {
    const whyItMatters = [
        {
            icon: <Shield className="w-6 h-6" />,
            title: "Secure API Access",
            description:
                "Secure API access with token-based authentication",
        },
        {
            icon: <Users className="w-6 h-6" />,
            title: "Control Access",
            description:
                "Control who and what can interact with your docs",
        },
        {
            icon: <Key className="w-6 h-6" />,
            title: "Manage Integrations",
            description:
                "Manage integrations without sharing credentials",
        },
        {
            icon: <Eye className="w-6 h-6" />,
            title: "Visibility & Control",
            description:
                "Maintain visibility and control as your system scales",
        },
    ];

    const keyFeatures = [
        {
            icon: <Key className="w-6 h-6" />,
            title: "Create API Tokens",
            description:
                "Generate tokens in seconds to enable secure access for integrations, tools, or services.",
        },
        {
            icon: <Settings className="w-6 h-6" />,
            title: "Manage Active Tokens",
            description:
                "View all issued tokens in one place and monitor how they're being used.",
        },
        {
            icon: <Lock className="w-6 h-6" />,
            title: "Access Control",
            description:
                "Enable, disable, or revoke tokens anytime to prevent unauthorized access.",
        },
    ];

    const benefits = [
        "Secure and controlled API access",
        "Easy management of multiple integrations",
        "Reduced security risks from shared credentials",
        "Faster setup for developers and teams",
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
                            API Token Management
                        </span>
                    </motion.div>

                    <motion.h1
                        className="h1 mb-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        Secure Access, <span className="text-gradient">Fully in Your Control</span>
                    </motion.h1>

                    <motion.p
                        className="text-sm md:text-base mb-6 max-w-3xl mx-auto leading-snug opacity-70"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        Create, manage, and control API tokens to connect DocStar safely with your systems.
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
                {/* Why API Token Management Matters Section */}
                <section className="py-8 sm:py-10 md:py-12 lg:py-16 px-4 sm:px-5 md:px-6">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-medium mb-4 leading-tight">
                        Why API Token Management Matters
                    </h2>
                    <p className="text-sm md:text-base mb-8 leading-snug opacity-70">
                        Uncontrolled access is a risk. API Token Management helps you:
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
                        Key Features of API Token Management
                    </h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
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
                        Build Integrations Without Compromising Security
                    </h2>

                    <p className="text-sm md:text-base mb-6 opacity-70 leading-snug">
                        With DocStar's API Token Management, you stay in control of access at every level. Create secure connections, manage permissions confidently, and scale integrations without risk.
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