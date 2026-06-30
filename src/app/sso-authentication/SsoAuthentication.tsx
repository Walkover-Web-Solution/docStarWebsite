"use client";
import { motion } from "framer-motion";
import {
  Shield,
  Users,
  Lock,
  Zap,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Globe,
  Server,
  Clock,
  Layers,
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

export const SsoAuthentication = () => {
  const benefits = [
    {
      icon: <Users className="w-7 h-7" />,
      title: "Effortless Onboarding",
      description:
        "Users can log in instantly using their existing MSG91 identity—no need to create new accounts or remember additional passwords.",
    },
    {
      icon: <Shield className="w-7 h-7" />,
      title: "Enhanced Security You Can Trust",
      description:
        "Built on DocStar's advanced authentication backend, ensuring robust, enterprise-grade security.",
    },
    {
      icon: <Globe className="w-7 h-7" />,
      title: "Unified Access Across Systems",
      description:
        "Eliminate the hassle of juggling multiple credentials across platforms. One identity, unlimited access.",
    },
    {
      icon: <CheckCircle className="w-7 h-7" />,
      title: "Trusted by MSG91",
      description:
        "Actively implemented within MSG91, DocStar's SSO helps streamline internal workflows while ensuring secure user experience.",
    },
  ];

  const problems = [
    {
      text: "Multiple passwords create security vulnerabilities and user frustration",
      icon: <Lock className="w-5 h-5" />,
    },
    {
      text: "IT teams spend countless hours on password resets and account management",
      icon: <Clock className="w-5 h-5" />,
    },
    {
      text: "Employees lose productivity switching between multiple login systems",
      icon: <Zap className="w-5 h-5" />,
    },
  ];

  const solutions = [
    {
      text: "Users can log in instantly using their existing MSG91 identity",
      icon: <Users className="w-5 h-5" />,
    },
    {
      text: "Built on DocStar's advanced authentication backend, ensuring robust security",
      icon: <Shield className="w-5 h-5" />,
    },
    {
      text: "Eliminate the hassle of juggling multiple credentials across platforms",
      icon: <Globe className="w-5 h-5" />,
    },
  ];

  const whyChoose = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Strengthen cybersecurity posture",
      description: "Against phishing and credential-based attacks.",
    },
    {
      icon: <Server className="w-6 h-6" />,
      title: "Simplify IT administration",
      description: "Reducing manual account provisioning and password resets.",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Boost workforce efficiency",
      description: "With faster access to tools and resources.",
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: "Ensure compliance",
      description:
        "With data privacy regulations through centralized authentication.",
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
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center pt-20 pb-16">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border theme-border mb-6 bg-[var(--theme-bg)] shadow-sm backdrop-blur-md">
                <Shield className="w-4 h-4 text-[var(--theme-color)]" />
                <span className="text-xs font-semibold tracking-wide uppercase">
                  Enterprise SSO
                </span>
              </div>

              <h1 className="h1 mb-6 leading-tight">
                Instant Login, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-bl from-[var(--theme-color)] to-teal-500">
                  Zero Hassle.
                </span>
              </h1>

              <p className="text-base sm:text-lg opacity-70 mb-8 leading-relaxed max-w-xl">
                DocStar's Single Sign-On authentication solution makes digital access both secure and effortless. One set of credentials, instant secure access across all connected services.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="https://app.docstar.io"
                  target="_blank"
                  className="btn btn-primary shadow-lg shadow-[var(--theme-color)]/20"
                >
                  Enable SSO for Your Organization
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
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--theme-color)]/20 to-teal-500/20 rounded-2xl transform rotate-3 scale-105 blur-xl"></div>
              <TerminalWindow title="sso-config.yml" className="relative z-10 transform -rotate-2 hover:rotate-0 transition-all duration-500">
                <span className="text-gray-500"># DocStar Enterprise SSO Configuration</span>{"\n"}
                <span className="text-pink-400">auth_provider</span>: <span className="text-green-300">"MSG91"</span>{"\n"}
                <span className="text-pink-400">sso_enabled</span>: <span className="text-amber-300">true</span>{"\n"}
                <span className="text-pink-400">enforce_2fa</span>: <span className="text-amber-300">true</span>{"\n\n"}
                <span className="text-gray-500"># Allowed Domains</span>{"\n"}
                <span className="text-pink-400">domains</span>:{"\n"}
                <span className="text-gray-300">  - </span><span className="text-green-300">"msg91.com"</span>{"\n"}
                <span className="text-gray-300">  - </span><span className="text-green-300">"walkover.in"</span>{"\n\n"}
                <span className="text-gray-500"># Status Logging</span>{"\n"}
                <span className="text-blue-400">[SYSTEM]</span> <span className="text-gray-300">Establishing secure connection...</span>{"\n"}
                <span className="text-blue-400">[SYSTEM]</span> <span className="text-green-400">Identity verified successfully.</span>
              </TerminalWindow>
              
              {/* Floating Badge */}
              <div className="absolute -bottom-6 -left-6 p-4 rounded-xl theme-bg-secondary border theme-border shadow-xl flex items-center gap-4 z-20 animate-bounce" style={{ animationDuration: '3s'}}>
                <div className="w-10 h-10 rounded-full bg-teal-500/20 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-teal-500" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider">Status</p>
                  <p className="text-sm font-medium opacity-80">Secured</p>
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
            Why SSO is Essential
          </h2>
          <p className="text-base md:text-lg opacity-60 leading-relaxed">
            Multiple authentication systems drain resources and create security risks
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="h-full p-8 rounded-2xl border theme-border theme-bg-secondary"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center">
                <Lock className="w-6 h-6 text-red-500" />
              </div>
              <h3 className="text-2xl font-bold opacity-60">Traditional Login</h3>
            </div>

            <div className="space-y-4">
              {problems.map((problem, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-4 rounded-xl"
                >
                  <div className="opacity-60 flex-shrink-0 mt-0.5">
                    {problem.icon}
                  </div>
                  <p className="opacity-70 text-sm leading-relaxed">
                    {problem.text}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-full p-8 rounded-2xl border theme-border bg-[var(--theme-bg)]"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-teal-500/10 flex items-center justify-center">
                <Shield className="w-6 h-6 text-teal-500" />
              </div>
              <h3 className="text-2xl font-bold">DocStar SSO</h3>
            </div>

            <div className="space-y-4">
              {solutions.map((solution, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-4 rounded-xl theme-bg-secondary"
                >
                  <div className="flex-shrink-0 mt-0.5 text-teal-500">{solution.icon}</div>
                  <p className="opacity-70 text-sm leading-relaxed">
                    {solution.text}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Why Choose DocStar SSO Section */}
      <div className="py-16 md:py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--theme-border-color)]/20 to-transparent"></div>
        
        <div className="relative z-10 px-4 sm:px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-teal-500/10 text-teal-500 mb-4">
              <Shield className="w-6 h-6" />
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold mb-4 tracking-tight">
              Why Choose DocStar SSO for Your Organization?
            </h2>
            <p className="text-base md:text-lg opacity-60 max-w-2xl mx-auto">
              DocStar SSO isn't just a login tool—it's a strategic security solution. By combining user convenience with strong identity management, it helps organizations:
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {whyChoose.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--theme-color)]/20 to-teal-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="h-full p-6 md:p-8 rounded-2xl border theme-border theme-bg-secondary relative z-10 hover:-translate-y-1 transition-transform duration-300 shadow-sm">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[var(--theme-color)]/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      {item.icon}
                    </div>

                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2 leading-tight">{item.title}</h3>
                      <p className="opacity-70 text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Key Benefits Section */}
      <div className="py-16 md:py-24 px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4 tracking-tight">
            Key Benefits of DocStar's SSO
          </h2>
          <p className="text-base md:text-lg opacity-60 max-w-2xl mx-auto">
            Powerful features that transform how your organization handles authentication
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--theme-color)]/20 to-teal-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="h-full p-6 md:p-8 rounded-2xl border theme-border theme-bg-secondary relative z-10 hover:-translate-y-1 transition-transform duration-300 shadow-sm">
                <div className="w-14 h-14 rounded-xl bg-[var(--theme-color)]/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                  {benefit.icon}
                </div>

                <h3 className="text-xl font-bold mb-3 leading-tight">{benefit.title}</h3>
                <p className="opacity-70 text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* How It Works - Horizontal Flow */}
      <div className="py-16 md:py-24 relative">
        <div className="absolute inset-0 theme-bg-secondary"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>
        
        <div className="relative z-10 px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold mb-4 tracking-tight">
              How to Enable SSO for Your Business
            </h2>
            <p className="text-base md:text-lg opacity-60 max-w-2xl mx-auto">
              To unlock the benefits of DocStar's Single Sign-On authentication, an Enterprise plan is required
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                num: "01",
                title: "Configure",
                desc: "Set up SSO in your DocStar dashboard",
                icon: <Server className="w-6 h-6" />,
              },
              {
                num: "02",
                title: "Integrate",
                desc: "Connect your identity provider",
                icon: <Layers className="w-6 h-6" />,
              },
              {
                num: "03",
                title: "Deploy",
                desc: "Roll out to your team instantly",
                icon: <Zap className="w-6 h-6" />,
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
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--theme-color)]/20 to-teal-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="h-full p-6 md:p-8 rounded-2xl border theme-border theme-bg-secondary relative z-10 hover:-translate-y-1 transition-transform duration-300 shadow-sm text-center">
                  <div className="w-14 h-14 rounded-xl bg-[var(--theme-color)]/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    {step.icon}
                  </div>
                  <div className="text-xs font-mono opacity-40 mb-2">
                    {step.num}
                  </div>
                  <h3 className="text-lg font-bold mb-2 leading-tight">
                    {step.title}
                  </h3>
                  <p className="opacity-70 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      </div>

      {/* CTA - Full Width */}
      <CTASection
        title="Ready to Transform Your Authentication Experience?"
        description="Unlock the full power of DocStar's Single Sign-On with an Enterprise plan. Give your team secure, frictionless access across all platforms."
        buttonText="Get Started with SSO"
      />
    </>
  );
};
