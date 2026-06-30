"use client";

import CTASection from "@/components/CTASection";
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
    ArrowRight,
} from "lucide-react";
import Link from "next/link";

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
            <div className="relative min-h-[75vh] flex items-center border-b theme-border overflow-hidden">
                <div className="absolute inset-0 theme-bg-secondary">
                    {/* Subtle Grid Background */}
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--theme-bg)] to-transparent"></div>
                </div>

                {/* Floating elements */}
                <div className="absolute top-20 right-10 w-72 h-72 bg-[var(--theme-color)]/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 left-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

                <div className="container mx-auto px-4 sm:px-6 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-12 items-center pt-20 pb-16">
                        <motion.div 
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            className="max-w-2xl"
                        >
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border theme-border bg-[var(--theme-bg)] shadow-sm backdrop-blur-md mb-6">
                                <Globe className="w-4 h-4 text-[var(--theme-color)]" />
                                <span className="text-xs font-semibold tracking-wide uppercase">
                                    Public Home Page
                                </span>
                            </div>

                            <h1 className="h1 mb-6 leading-tight">
                                Your Documentation's <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-bl from-[var(--theme-color)] to-blue-500">
                                    Front Door.
                                </span>
                            </h1>

                            <p className="text-base sm:text-lg opacity-70 mb-8 leading-relaxed max-w-xl">
                                Give users a clean, searchable entry point to explore your docs, guides, and resources in seconds.
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
                            <div className="absolute inset-0 bg-gradient-to-r from-[var(--theme-color)]/20 to-blue-500/20 rounded-2xl transform rotate-3 scale-105 blur-xl"></div>
                            
                            {/* Abstract Homepage UI Mockup */}
                            <div className="relative z-10 bg-background border theme-border rounded-xl shadow-2xl p-6 transform -rotate-2 hover:rotate-0 transition-transform duration-500">
                                <div className="flex justify-between items-center mb-6">
                                    <div className="flex items-center gap-2">
                                        <div className="h-6 w-6 bg-[var(--theme-color)] rounded-md"></div>
                                        <div className="h-5 w-24 bg-black/10 dark:bg-white/10 rounded-sm"></div>
                                    </div>
                                    <div className="flex gap-3">
                                        <div className="h-4 w-12 bg-black/10 dark:bg-white/10 rounded-sm"></div>
                                        <div className="h-4 w-12 bg-black/10 dark:bg-white/10 rounded-sm"></div>
                                    </div>
                                </div>
                                
                                <div className="text-center mb-6 mt-8">
                                    <div className="h-8 w-48 bg-black/20 dark:bg-white/20 rounded-md mx-auto mb-4"></div>
                                    <div className="h-10 w-3/4 max-w-sm border theme-border rounded-full flex items-center px-4 mx-auto bg-[var(--theme-bg)] shadow-sm">
                                        <Search className="w-4 h-4 text-gray-400 mr-2" />
                                        <div className="h-3 w-32 bg-black/10 dark:bg-white/10 rounded-sm"></div>
                                    </div>
                                </div>
                                
                                <div className="grid grid-cols-3 gap-3">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="border theme-border rounded-lg p-3 bg-[var(--theme-bg)] hover:border-[var(--theme-color)] transition-colors">
                                            <div className="w-6 h-6 rounded-md bg-blue-500/20 mb-2 flex items-center justify-center">
                                                <FolderTree className="w-3 h-3 text-blue-500" />
                                            </div>
                                            <div className="h-2 w-full bg-black/20 dark:bg-white/20 rounded-sm mb-1"></div>
                                            <div className="h-2 w-2/3 bg-black/10 dark:bg-white/10 rounded-sm"></div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            
                            {/* Floating Badge */}
                            <div className="absolute -bottom-6 -left-6 p-4 rounded-xl theme-bg-secondary border theme-border shadow-xl flex items-center gap-4 z-20 animate-bounce" style={{ animationDuration: '3s'}}>
                                <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                                    <Globe className="w-5 h-5 text-blue-500" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-wider">Access</p>
                                    <p className="text-sm font-medium opacity-80">Public Facing</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto">
                {/* Search-First Experience Section */}
                <div className="py-16 md:py-24 px-4 sm:px-6 relative">
                    <div className="text-center mb-16 max-w-3xl mx-auto">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-500 mb-4">
                            <Search className="w-6 h-6" />
                        </div>
                        <h2 className="text-3xl md:text-4xl font-semibold mb-4 tracking-tight">
                            The Search-First Experience
                        </h2>
                        <p className="text-base md:text-lg opacity-60 leading-relaxed">
                            Helping users find their answers within seconds, not minutes.
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                        {searchFeatures.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="group relative"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-[var(--theme-color)]/20 to-blue-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
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

                {/* Smart Content Discovery Section */}
                <div className="py-16 md:py-24 relative">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--theme-border-color)]/20 to-transparent"></div>
                    
                    <div className="relative z-10 px-4 sm:px-6">
                        <div className="text-center mb-16 max-w-3xl mx-auto">
                            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[var(--theme-color)]/10 text-[var(--theme-color)] mb-4">
                                <FolderTree className="w-6 h-6" />
                            </div>
                            <h2 className="text-3xl md:text-4xl font-semibold mb-4 tracking-tight">
                                Smart Content Discovery
                            </h2>
                            <p className="text-base md:text-lg opacity-60 leading-relaxed">
                                Organize guides and highlight what's important instantly.
                            </p>
                        </div>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                            {discoveryFeatures.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    className="group relative"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-[var(--theme-color)]/20 to-blue-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                    <div className="h-full p-6 md:p-8 rounded-2xl border theme-border bg-[var(--theme-bg)] relative z-10 hover:-translate-y-1 transition-transform duration-300 shadow-sm">
                                        <div className="w-14 h-14 rounded-xl bg-blue-500/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
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
                    <div className="max-w-5xl mx-auto relative group">
                        <div className="absolute inset-0 bg-gradient-to-r from-[var(--theme-color)] to-blue-500 rounded-3xl blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-700"></div>
                        
                        <div className="relative p-8 md:p-12 rounded-3xl bg-[var(--theme-bg)] border theme-border overflow-hidden">
                            <div className="absolute top-0 right-0 p-8 opacity-10">
                                <Sparkles className="w-48 h-48" />
                            </div>
                            
                            <div className="flex items-center gap-4 mb-10 relative z-10">
                                <div className="w-12 h-12 rounded-xl bg-[var(--theme-color)]/10 flex items-center justify-center">
                                    <Star className="w-6 h-6 text-[var(--theme-color)]" />
                                </div>
                                <div>
                                    <h3 className="text-2xl md:text-3xl font-bold">A Better First Impression</h3>
                                    <p className="opacity-70 mt-2 max-w-2xl">
                                        With DocStar's Public Home Page, users land on a clean, searchable, and organized help center that feels reliable from the first glance.
                                    </p>
                                </div>
                            </div>
                            
                            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 relative z-10">
                                {benefits.map((benefit, index) => (
                                    <div key={index} className="flex items-start gap-4 p-4 rounded-xl theme-bg-secondary border theme-border hover:-translate-y-1 transition-transform duration-300 shadow-sm">
                                        <CheckCircle className="w-6 h-6 flex-shrink-0 text-blue-500 mt-0.5" />
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

                {/* Final CTA Section */}
                <CTASection
                    title="Make Your Documentation Work Harder"
                    description="Stop hiding valuable content behind complex navigation. With DocStar's Public Home Page, give your users the instant access they need to find answers, explore guides, and get the most out of your product."
                />
            </div>
        </>
    );
};