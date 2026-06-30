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
            <div className="relative min-h-[75vh] flex items-center border-b theme-border overflow-hidden">
                <div className="absolute inset-0 theme-bg-secondary">
                    {/* Subtle Grid Background */}
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--theme-bg)] to-transparent"></div>
                </div>

                {/* Floating elements */}
                <div className="absolute top-20 right-10 w-72 h-72 bg-[var(--theme-color)]/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 left-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

                <div className="container mx-auto px-4 sm:px-6 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-12 items-center pt-20 pb-16">
                        <motion.div 
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            className="max-w-2xl"
                        >
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border theme-border mb-6 bg-[var(--theme-bg)] shadow-sm backdrop-blur-md">
                                <Key className="w-4 h-4 text-[var(--theme-color)]" />
                                <span className="text-xs font-semibold tracking-wide uppercase">
                                    API Token Management
                                </span>
                            </div>

                            <h1 className="h1 mb-6 leading-tight">
                                Secure Access, <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-bl from-[var(--theme-color)] to-emerald-500">
                                    Fully in Your Control.
                                </span>
                            </h1>

                            <p className="text-base sm:text-lg opacity-70 mb-8 leading-relaxed max-w-xl">
                                Create, manage, and control API tokens to connect DocStar safely with your systems.
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
                            <div className="absolute inset-0 bg-gradient-to-r from-[var(--theme-color)]/20 to-emerald-500/20 rounded-2xl transform rotate-3 scale-105 blur-xl"></div>
                            <TerminalWindow title="api-request.txt" className="relative z-10 transform -rotate-2 hover:rotate-0 transition-all duration-500">
                                <span className="text-gray-500"># API Request with Token</span>{"\n"}
                                <span className="text-pink-400">curl</span> <span className="text-blue-300">-X GET</span> <span className="text-amber-300">\</span>{"\n"}
                                <span className="text-gray-300">  https://api.docstar.io/docs</span> <span className="text-amber-300">\</span>{"\n"}
                                <span className="text-pink-400">  -H</span> <span className="text-green-300">"Authorization: Bearer YOUR_TOKEN"</span>{"\n\n"}
                                <span className="text-gray-500"># Response</span>{"\n"}
                                <span className="text-pink-400">{"{"}</span>{"\n"}
                                <span className="text-gray-300">  "status": "success",</span>{"\n"}
                                <span className="text-gray-300">  "data": "..."</span>{"\n"}
                                <span className="text-pink-400">{"}"}</span>
                            </TerminalWindow>
                            
                            {/* Floating Badge */}
                            <div className="absolute -bottom-6 -left-6 p-4 rounded-xl theme-bg-secondary border theme-border shadow-xl flex items-center gap-4 z-20 animate-bounce" style={{ animationDuration: '3s'}}>
                                <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                                    <Shield className="w-5 h-5 text-emerald-500" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-wider">Status</p>
                                    <p className="text-sm font-medium opacity-80">Secure</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto">
                {/* Why API Token Management Matters Section */}
                <div className="py-16 md:py-24 px-4 sm:px-6 relative">
                    <div className="text-center mb-16 max-w-3xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-semibold mb-4 tracking-tight">
                            Why API Token Management Matters
                        </h2>
                        <p className="text-base md:text-lg opacity-60 leading-relaxed">
                            Uncontrolled access is a risk. API Token Management helps you:
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
                                <div className="absolute inset-0 bg-gradient-to-r from-[var(--theme-color)]/20 to-emerald-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
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
                            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-500 mb-4">
                                <Key className="w-6 h-6" />
                            </div>
                            <h2 className="text-3xl md:text-4xl font-semibold mb-4 tracking-tight">
                                Key Features of API Token Management
                            </h2>
                            <p className="text-base md:text-lg opacity-60 max-w-2xl mx-auto">
                                Secure, flexible, and powerful token management for your integrations.
                            </p>
                        </div>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                            {keyFeatures.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    className="group relative"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-[var(--theme-color)]/20 to-emerald-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
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
                        <div className="absolute inset-0 bg-gradient-to-r from-[var(--theme-color)] to-emerald-500 rounded-3xl blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-700"></div>
                        
                        <div className="relative p-8 md:p-12 rounded-3xl bg-[var(--theme-bg)] border theme-border overflow-hidden">
                            <div className="absolute top-0 right-0 p-8 opacity-10">
                                <Shield className="w-48 h-48" />
                            </div>
                            
                            <div className="flex items-center gap-4 mb-8 relative z-10">
                                <div className="w-12 h-12 rounded-xl bg-[var(--theme-color)]/10 flex items-center justify-center">
                                    <Shield className="w-6 h-6 text-[var(--theme-color)]" />
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
                    title="Build Integrations Without Compromising Security"
                    description="With DocStar's API Token Management, you stay in control of access at every level. Create secure connections, manage permissions confidently, and scale integrations without risk."
                />
            </div>
        </>
    );
}