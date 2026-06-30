"use client";

import { motion } from "framer-motion";
import {
    Link2,
    UserPlus,
    Zap,
    Shield,
    CheckCircle,
    Sparkles,
    Clock,
    History,
    ArrowRight,
    Terminal,
} from "lucide-react";
import Link from "next/link";
import CTASection from "@/components/CTASection";

const TerminalWindow = ({ title, children, className = "" }: { title: string, children: React.ReactNode, className?: string }) => (
  <div className={`rounded-xl overflow-hidden border theme-border shadow-2xl bg-[#0d1117] ${className}`}>
    <div className="flex items-center px-4 py-3 bg-[#161b22] border-b border-gray-800">
      <div className="flex space-x-2">
        <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
        <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
        <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
      </div>
      <div className="mx-auto text-xs font-mono text-gray-500 flex items-center gap-2">
        <Terminal className="w-3 h-3" />
        {title}
      </div>
    </div>
    <div className="p-5 font-mono text-sm text-gray-300 overflow-x-auto leading-relaxed">
      {children}
    </div>
  </div>
);

export default function EditViaLink() {
    const whyItMatters = [
        {
            icon: <UserPlus className="w-6 h-6" />,
            title: "Easy External Contributions",
            description:
                "Collect updates from external contributors easily",
        },
        {
            icon: <Zap className="w-6 h-6" />,
            title: "Speed Up Reviews",
            description:
                "Speed up reviews and approvals",
        },
        {
            icon: <Shield className="w-6 h-6" />,
            title: "Remove Friction",
            description:
                "Remove friction caused by user invites and access setup",
        },
        {
            icon: <Clock className="w-6 h-6" />,
            title: "Simple & Fast",
            description:
                "Keep collaboration simple and fast",
        },
    ];

    const keyFeatures = [
        {
            icon: <Link2 className="w-6 h-6" />,
            title: "Secure Shareable Links",
            description:
                "Generate a unique link that allows content editing without exposing your workspace.",
        },
        {
            icon: <UserPlus className="w-6 h-6" />,
            title: "No Account Required",
            description:
                "Contributors can make edits directly without signing up or logging in.",
        },
        {
            icon: <Shield className="w-6 h-6" />,
            title: "Controlled Access",
            description:
                "Enable or disable edit links anytime to stay in full control.",
        },
        {
            icon: <History className="w-6 h-6" />,
            title: "Works With Revision History",
            description:
                "Every change made through an edit link is tracked, so nothing gets lost.",
        },
    ];

    const benefits = [
        "Faster collaboration with internal and external teams",
        "Less time spent managing permissions",
        "Quick feedback and content updates",
        "Full control and traceability of changes",
        "Ideal for reviews, approvals, and guest contributions",
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
                <div className="absolute bottom-20 left-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

                <div className="container mx-auto px-4 sm:px-6 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-12 items-center pt-20 pb-16">
                        <motion.div 
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            className="max-w-2xl"
                        >
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border theme-border mb-6 bg-[var(--theme-bg)] shadow-sm backdrop-blur-md">
                                <Sparkles className="w-4 h-4 text-[var(--theme-color)]" />
                                <span className="text-xs font-semibold tracking-wide uppercase">
                                    Edit via Link
                                </span>
                            </div>

                            <h1 className="h1 mb-6 leading-tight">
                                Edit Without <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-bl from-[var(--theme-color)] to-purple-500">
                                    Logging In.
                                </span>
                            </h1>

                            <p className="text-base sm:text-lg opacity-70 mb-8 leading-relaxed max-w-xl">
                                Share a secure link and let collaborators update content instantly—no accounts, no friction, just seamless collaboration.
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
                            <div className="absolute inset-0 bg-gradient-to-r from-[var(--theme-color)]/20 to-purple-500/20 rounded-2xl transform rotate-3 scale-105 blur-xl"></div>
                            <TerminalWindow title="share-link.md" className="relative z-10 transform -rotate-2 hover:rotate-0 transition-all duration-500">
                                <span className="text-gray-500"># Secure edit link</span>{"\n"}
                                <span className="text-pink-400">https://</span><span className="text-blue-300">docstar.io</span><span className="text-gray-400">/edit/</span><span className="text-amber-400">abc123</span>{"\n\n"}
                                <span className="text-gray-500"># Permissions</span>{"\n"}
                                <span className="text-green-300">✓</span> <span className="text-gray-300">No login required</span>{"\n"}
                                <span className="text-green-300">✓</span> <span className="text-gray-300">Full edit access</span>{"\n"}
                                <span className="text-green-300">✓</span> <span className="text-gray-300">Revision tracking</span>{"\n\n"}
                                <span className="text-gray-500"># Status</span>{"\n"}
                                <span className="text-amber-400">Active</span> <span className="text-gray-500">|</span> <span className="text-gray-300">Expires in 24h</span>
                            </TerminalWindow>
                            
                            {/* Floating Badge */}
                            <div className="absolute -bottom-6 -left-6 p-4 rounded-xl theme-bg-secondary border theme-border shadow-xl flex items-center gap-4 z-20 animate-bounce" style={{ animationDuration: '3s'}}>
                                <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                                    <CheckCircle className="w-5 h-5 text-green-500" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-wider">Status</p>
                                    <p className="text-sm font-medium opacity-80">Link Active</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto">
                {/* Why Edit via Link Matters Section */}
                <div className="py-16 md:py-24 px-4 sm:px-6 relative">
                    <div className="text-center mb-16 max-w-3xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-semibold mb-4 tracking-tight">
                            Why Edit via Link Matters
                        </h2>
                        <p className="text-base md:text-lg opacity-60 leading-relaxed">
                            Getting quick edits and reviews often slows teams down. Edit via Link helps you:
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                        {whyItMatters.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="group relative"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-[var(--theme-color)]/20 to-purple-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                <div className="h-full p-6 md:p-8 rounded-2xl border theme-border theme-bg-secondary relative z-10 hover:-translate-y-1 transition-transform duration-300 shadow-sm">
                                    <div className="w-14 h-14 rounded-xl bg-[var(--theme-color)]/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                                        {feature.icon}
                                    </div>
                                    <h3 className="text-xl font-bold mb-3 leading-tight">
                                        {feature.title}
                                    </h3>
                                    <p className="text-sm opacity-70 leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Key Features Section */}
                <div className="py-16 md:py-24 relative">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--theme-border-color)]/20 to-transparent"></div>
                    
                    <div className="relative z-10 px-4 sm:px-6">
                        <div className="text-center mb-16">
                            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-500 mb-4">
                                <Link2 className="w-6 h-6" />
                            </div>
                            <h2 className="text-3xl md:text-4xl font-semibold mb-4 tracking-tight">
                                Key Features of Edit via Link
                            </h2>
                            <p className="text-base md:text-lg opacity-60 max-w-2xl mx-auto">
                                Secure, flexible, and powerful collaboration tools for your documentation.
                            </p>
                        </div>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                            {keyFeatures.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    className="group relative"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-[var(--theme-color)]/20 to-purple-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                    <div className="h-full p-6 md:p-8 rounded-2xl border theme-border theme-bg-secondary relative z-10 hover:-translate-y-1 transition-transform duration-300 shadow-sm">
                                        <div className="w-14 h-14 rounded-xl bg-[var(--theme-color)]/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                                            {feature.icon}
                                        </div>
                                        <h3 className="text-xl font-bold mb-3 leading-tight">
                                            {feature.title}
                                        </h3>
                                        <p className="text-sm opacity-70 leading-relaxed">
                                            {feature.description}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Benefits Section - Premium Glowing Card */}
                <div className="py-16 md:py-24 px-4 sm:px-6">
                    <div className="max-w-4xl mx-auto relative group">
                        <div className="absolute inset-0 bg-gradient-to-r from-[var(--theme-color)] to-purple-500 rounded-3xl blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-700"></div>
                        
                        <div className="relative p-8 md:p-12 rounded-3xl bg-[var(--theme-bg)] border theme-border overflow-hidden">
                            <div className="absolute top-0 right-0 p-8 opacity-10">
                                <Link2 className="w-48 h-48" />
                            </div>
                            
                            <div className="flex items-center gap-4 mb-8 relative z-10">
                                <div className="w-12 h-12 rounded-xl bg-[var(--theme-color)]/10 flex items-center justify-center">
                                    <Link2 className="w-6 h-6 text-[var(--theme-color)]" />
                                </div>
                                <h3 className="text-2xl md:text-3xl font-bold">Benefits for Your Users and Teams</h3>
                            </div>
                            
                            <div className="grid sm:grid-cols-2 gap-4 relative z-10">
                                {benefits.map((benefit, index) => (
                                    <div key={index} className="flex items-start gap-4 p-4 rounded-xl theme-bg-secondary border theme-border hover:-translate-y-1 transition-transform duration-300 shadow-sm">
                                        <CheckCircle className="w-6 h-6 flex-shrink-0 text-emerald-500 mt-0.5" />
                                        <p className="text-sm font-medium opacity-90 leading-relaxed">{benefit}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <CTASection
                    title="Collaborate Faster, Without Friction"
                    description="With DocStar's Edit via Link, updating documentation becomes effortless. Share, edit, review, and move forward—without barriers."
                />
            </div>
        </>
    );
}