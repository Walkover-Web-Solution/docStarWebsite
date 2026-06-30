"use client";
import { motion } from "framer-motion";
import {
  Shield,
  Globe,
  Zap,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Search,
  Settings,
  Link as LinkIcon,
  XCircle,
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

export const CustomDomainClient = () => {
  const benefits = [
    {
      icon: <Globe className="w-7 h-7" />,
      title: "White-Label Experience",
      description:
        "Provide a seamless experience. Your documentation looks and feels like an integral part of your website.",
    },
    {
      icon: <Search className="w-7 h-7" />,
      title: "Enhanced SEO Value",
      description:
        "Keep all the SEO juice for your own domain. Driving traffic to your docs means driving traffic to your brand.",
    },
    {
      icon: <Shield className="w-7 h-7" />,
      title: "Automatic SSL Certificates",
      description:
        "We automatically provision and renew SSL certificates for your custom domain, keeping your docs secure.",
    },
    {
      icon: <Zap className="w-7 h-7" />,
      title: "Lightning Fast Delivery",
      description:
        "Served via our global edge network, your documentation loads instantly for users anywhere in the world.",
    },
  ];

  const problems = [
    {
      text: "Users are redirected to an unfamiliar third-party URL",
      icon: <XCircle className="w-5 h-5" />,
    },
    {
      text: "Weakens brand identity, consistency, and customer trust",
      icon: <XCircle className="w-5 h-5" />,
    },
    {
      text: "Loss of valuable SEO traffic to the documentation provider's domain",
      icon: <XCircle className="w-5 h-5" />,
    },
  ];

  const solutions = [
    {
      text: "Users stay on your domain (e.g., help.yourbrand.com)",
      icon: <CheckCircle className="w-5 h-5" />,
    },
    {
      text: "Reinforces brand consistency and builds customer trust",
      icon: <CheckCircle className="w-5 h-5" />,
    },
    {
      text: "Improves your main domain's SEO with rich documentation content",
      icon: <CheckCircle className="w-5 h-5" />,
    },
  ];

  const whyChoose = [
    {
      icon: <LinkIcon className="w-6 h-6" />,
      title: "Flexible Configuration",
      description: "Host on a subdomain (docs.yoursite.com) or a subfolder (yoursite.com/docs).",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Built-in Security",
      description: "Enterprise-grade DDoS protection and automated SSL certificate management.",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Zero Maintenance",
      description: "Once configured, we handle the hosting, routing, and uptime completely.",
    },
    {
      icon: <Settings className="w-6 h-6" />,
      title: "Easy Setup",
      description:
        "Simple DNS configuration using CNAME records or Cloudflare Workers.",
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
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center pt-20 pb-16">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border theme-border mb-6 bg-[var(--theme-bg)] shadow-sm backdrop-blur-md">
                <Globe className="w-4 h-4 text-[var(--theme-color)]" />
                <span className="text-xs font-semibold tracking-wide uppercase">
                  White Labelling
                </span>
              </div>

              <h1 className="h1 mb-6 leading-tight">
                Your Brand, Your Docs : <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-bl from-[var(--theme-color)] to-cyan-500">
                  Custom Domain.
                </span>
              </h1>

              <p className="text-base sm:text-lg opacity-70 mb-8 leading-relaxed max-w-xl">
                Host your documentation on your own domain (e.g., docs.yourcompany.com). Deliver a seamless, white-labeled experience that builds trust and boosts your SEO.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="https://app.docstar.io"
                  target="_blank"
                  className="btn btn-primary shadow-lg shadow-[var(--theme-color)]/20"
                >
                  Set Up Custom Domain
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
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--theme-color)]/20 to-cyan-500/20 rounded-2xl transform rotate-3 scale-105 blur-xl"></div>
              <TerminalWindow title="dns-config.txt" className="relative z-10 transform -rotate-2 hover:rotate-0 transition-all duration-500">
                <span className="text-gray-500"># DNS Configuration</span>{"\n"}
                <span className="text-pink-400">Type</span>: <span className="text-green-300">CNAME</span>{"\n"}
                <span className="text-pink-400">Name</span>: <span className="text-blue-300">docs</span>{"\n"}
                <span className="text-pink-400">Value</span>: <span className="text-amber-300">yourbrand.docstar.io</span>{"\n\n"}
                <span className="text-gray-500"># SSL Status</span>{"\n"}
                <span className="text-green-300">✓</span> <span className="text-gray-300">Certificate Active</span>{"\n"}
                <span className="text-green-300">✓</span> <span className="text-gray-300">Auto-Renewal Enabled</span>{"\n\n"}
                <span className="text-gray-500"># Domain Status</span>{"\n"}
                <span className="text-cyan-400">Active</span> <span className="text-gray-500">|</span> <span className="text-gray-300">Verified</span>
              </TerminalWindow>
              
              {/* Floating Badge */}
              <div className="absolute -bottom-6 -left-6 p-4 rounded-xl theme-bg-secondary border theme-border shadow-xl flex items-center gap-4 z-20 animate-bounce" style={{ animationDuration: '3s'}}>
                <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider">Status</p>
                  <p className="text-sm font-medium opacity-80">Domain Live</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="container mx-auto">
        {/* Problem vs Solution - Side by Side */}
        <div className="py-16 md:py-24 px-4 sm:px-6 relative">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-semibold mb-4 tracking-tight">
              Why Custom Domain Matters
            </h2>
            <p className="text-base md:text-lg opacity-60 leading-relaxed">
              Don't let third-party URLs dilute your brand identity
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-rose-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="h-full p-8 rounded-2xl border theme-border theme-bg-secondary relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-rose-500/10 flex items-center justify-center">
                    <Globe className="w-6 h-6 text-rose-500" />
                  </div>
                  <h3 className="text-xl font-bold opacity-60">Default Hosting</h3>
                </div>

                <div className="space-y-4">
                  {problems.map((problem, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 rounded-xl bg-[var(--theme-bg)] border theme-border">
                      <div className="opacity-60 flex-shrink-0 mt-0.5">{problem.icon}</div>
                      <p className="opacity-70 text-sm leading-relaxed">{problem.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-cyan-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="h-full p-8 rounded-2xl border theme-border bg-[var(--theme-bg)] relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center">
                    <Shield className="w-6 h-6 text-cyan-500" />
                  </div>
                  <h3 className="text-xl font-bold">DocStar Custom Domain</h3>
                </div>

                <div className="space-y-4">
                  {solutions.map((solution, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 rounded-xl theme-bg-secondary border theme-border">
                      <div className="flex-shrink-0 mt-0.5">{solution.icon}</div>
                      <p className="opacity-70 text-sm leading-relaxed">{solution.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Why Choose Section */}
        <div className="py-16 md:py-24 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--theme-border-color)]/20 to-transparent"></div>
          
          <div className="relative z-10 px-4 sm:px-6">
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-cyan-500/10 text-cyan-500 mb-4">
                <LinkIcon className="w-6 h-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-semibold mb-4 tracking-tight">
                A Complete White-Label Solution
              </h2>
              <p className="text-base md:text-lg opacity-60 max-w-2xl mx-auto">
                DocStar handles all the underlying complexity so you can focus on writing great documentation.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {whyChoose.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[var(--theme-color)]/20 to-cyan-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="h-full p-6 md:p-8 rounded-2xl border theme-border theme-bg-secondary relative z-10 hover:-translate-y-1 transition-transform duration-300 shadow-sm">
                    <div className="w-14 h-14 rounded-xl bg-[var(--theme-color)]/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-3 leading-tight">{item.title}</h3>
                    <p className="text-sm opacity-70 leading-relaxed">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Key Benefits Section */}
        <div className="py-16 md:py-24 px-4 sm:px-6">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-semibold mb-4 tracking-tight">
              Features Built for Scale
            </h2>
            <p className="text-base md:text-lg opacity-60 leading-relaxed">
              Everything you need to host docs on your own infrastructure
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--theme-color)]/20 to-cyan-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="h-full p-6 md:p-8 rounded-2xl border theme-border theme-bg-secondary relative z-10 hover:-translate-y-1 transition-transform duration-300 shadow-sm">
                  <div className="w-14 h-14 rounded-xl bg-[var(--theme-color)]/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 leading-tight">{benefit.title}</h3>
                  <p className="text-sm opacity-70 leading-relaxed">{benefit.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* How It Works - Horizontal Flow */}
        <div className="py-16 md:py-24 theme-bg-secondary px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold mb-4 tracking-tight">
              How to Go Live
            </h2>
            <p className="text-base md:text-lg opacity-60 max-w-2xl mx-auto">
              A simple, 3-step process to get your custom domain up and running
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                num: "01",
                title: "Add Domain",
                desc: "Enter your custom domain in the DocStar configuration panel.",
                icon: <Globe className="w-6 h-6" />,
              },
              {
                num: "02",
                title: "Update DNS",
                desc: "Add a simple CNAME record to your DNS provider.",
                icon: <Settings className="w-6 h-6" />,
              },
              {
                num: "03",
                title: "Auto-Provisioning",
                desc: "We verify the connection and provision SSL automatically.",
                icon: <Shield className="w-6 h-6" />,
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--theme-color)]/20 to-cyan-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="h-full p-8 rounded-2xl border theme-border bg-[var(--theme-bg)] relative z-10 hover:-translate-y-1 transition-transform duration-300 shadow-sm text-center">
                  <div className="w-14 h-14 rounded-xl bg-[var(--theme-color)]/10 flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300">
                    {step.icon}
                  </div>
                  <div className="text-xs font-mono opacity-40 mb-3">{step.num}</div>
                  <h3 className="text-xl font-bold mb-3 leading-tight">{step.title}</h3>
                  <p className="opacity-70 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <CTASection
          title="Ready to Make Your Docs Feel Native?"
          description="Remove third-party branding and give your users a seamless, professional experience with DocStar Custom Domains."
          buttonText="Configure Custom Domain"
        />
      </div>
    </>
  );
};
