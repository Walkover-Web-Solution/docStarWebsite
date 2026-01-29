"use client";
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
} from "lucide-react";
import Link from "next/link";

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
    <div className="container mx-auto">
      {/* Hero Section */}
      <div className="relative min-h-[70vh] flex items-center">
        <div className="absolute inset-0 theme-bg-secondary">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-black/5 dark:bg-white/5 transform skew-x-12"></div>
        </div>

        <div className="relative px-6 py-12 w-full">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded border theme-border mb-4">
            <div className="w-1.5 h-1.5 rounded bg-black dark:bg-white"></div>
            <span className="text-xs font-medium uppercase tracking-wider opacity-70">
              Enterprise SSO
            </span>
          </div>

          <h1 className="h1 mb-2">
            Instant Login, <span className="opacity-60">Zero Hassle : </span>{" "}
            SSO by DocStar
          </h1>

          <p className="text-sm md:text-base opacity-70 mb-6 leading-snug">
            DocStar's Single Sign-On authentication solution makes digital
            access both secure and effortless. One set of credentials, instant
            secure access across all connected services.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              href="https://app.docstar.io"
              target="_blank"
              className="btn btn-primary"
            >
              Enable SSO for Your Organization
            </Link>
          </div>
        </div>
      </div>

      {/* Problem vs Solution - Side by Side */}
      <div className="py-12 md:py-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl mb-2 leading-tight font-medium">
            Why SSO is Essential
          </h2>
          <p className="text-sm md:text-base opacity-60 leading-snug">
            Multiple authentication systems drain resources and create security
            risks
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="h-full p-5 md:p-6 rounded border theme-border theme-bg-secondary">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded bg-black/10 dark:bg-white/10 flex items-center justify-center">
                <Lock className="w-4 h-4 opacity-70" />
              </div>
              <h3 className="text-lg opacity-60">Traditional Login</h3>
            </div>

            <div className="space-y-3">
              {problems.map((problem, index) => (
                <div
                  key={index}
                  className="flex items-start gap-2.5 p-3 rounded"
                >
                  <div className="opacity-60 flex-shrink-0 mt-0.5">
                    {problem.icon}
                  </div>
                  <p className="opacity-70 text-xs md:text-sm leading-snug">
                    {problem.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="h-full p-5 md:p-6 rounded border theme-border">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded bg-black/10 dark:bg-white/10 flex items-center justify-center">
                <Shield className="w-4 h-4" />
              </div>
              <h3 className="text-lg font-medium">DocStar SSO</h3>
            </div>

            <div className="space-y-3">
              {solutions.map((solution, index) => (
                <div
                  key={index}
                  className="flex items-start gap-2.5 p-3 rounded theme-bg-secondary"
                >
                  <div className="flex-shrink-0 mt-0.5">{solution.icon}</div>
                  <p className="opacity-70 text-xs md:text-sm leading-snug">
                    {solution.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose DocStar SSO Section */}
      <div className="py-12 md:py-16 theme-bg-secondary px-6">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl mb-2 leading-tight font-medium">
            Why Choose DocStar SSO for Your Organization?
          </h2>
          <p className="text-sm md:text-base opacity-60 max-w-4xl mx-auto leading-snug">
            DocStar SSO isn't just a login tool—it's a strategic security
            solution. By combining user convenience with strong identity
            management, it helps organizations:
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {whyChoose.map((item, index) => (
            <div
              key={index}
              className="h-full p-5 md:p-6 rounded border theme-border"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded theme-bg-secondary flex items-center justify-center flex-shrink-0 opacity-80">
                  {item.icon}
                </div>

                <div className="flex-1">
                  <h3 className="text-lg mb-2 leading-tight">{item.title}</h3>
                  <p className="opacity-70 text-sm leading-snug">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Key Benefits Section */}
      <div className="py-12 md:py-16 px-6">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl mb-2 leading-tight font-medium">
            Key Benefits of DocStar's SSO
          </h2>
          <p className="text-sm md:text-base opacity-60 leading-snug">
            Powerful features that transform how your organization handles
            authentication
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="h-full p-5 md:p-6 rounded border theme-border backdrop-blur-sm"
            >
              <div className="w-12 h-12 rounded theme-bg-secondary flex items-center justify-center mb-4">
                {benefit.icon}
              </div>

              <h3 className="text-lg mb-2 leading-tight">{benefit.title}</h3>
              <p className="opacity-70 leading-snug text-sm">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* How It Works - Horizontal Flow */}
      <div className="py-12 md:py-16 theme-bg-secondary px-6">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl mb-2 leading-tight font-medium">
            How to Enable SSO for Your Business
          </h2>
          <p className="text-sm md:text-base opacity-60 leading-snug">
            To unlock the benefits of DocStar's Single Sign-On authentication,
            an Enterprise plan is required
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 relative">
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
            <div
              key={index}
              className="p-5 md:p-6 rounded border theme-border text-center relative z-10"
            >
              <div className="w-10 h-10 rounded bg-black/5 dark:bg-white/5 flex items-center justify-center mx-auto mb-3">
                {step.icon}
              </div>
              <div className="text-xs font-mono opacity-40 mb-1.5">
                {step.num}
              </div>
              <h3 className="text-base mb-2 leading-tight font-medium">
                {step.title}
              </h3>
              <p className="opacity-70 text-xs leading-snug">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA - Full Width */}
      <div className="py-12 md:py-16 relative overflow-hidden">
        <div className="absolute inset-0 theme-bg-secondary"></div>
        <div className="absolute inset-0 bg-black/5 dark:bg-white/5 transform -skew-y-2"></div>

        <div className="relative px-6 text-center">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded border theme-border mb-4">
            <Sparkles className="w-3.5 h-3.5 opacity-70" />
            <span className="text-xs font-medium uppercase tracking-wider opacity-70">
              Enterprise Ready
            </span>
          </div>

          <h2 className="text-2xl md:text-3xl lg:text-4xl mb-4 leading-tight font-medium">
            Ready to Transform Your Authentication Experience?
          </h2>

          <p className="text-sm md:text-base opacity-70 mb-6 max-w-2xl mx-auto leading-snug">
            Unlock the full power of DocStar's Single Sign-On with an Enterprise
            plan. Give your team secure, frictionless access across all
            platforms.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              className="btn btn-primary px-6 py-3 text-sm md:text-base"
              onClick={() => {
                window.open("https://app.docstar.io/login");
              }}
            >
              Get Started with SSO
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>

            <button
              className="btn btn-outline px-6 py-3 text-sm md:text-base"
              onClick={() => {
                window.open("https://app.docstar.io/login");
              }}
            >
              Contact Sales
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
