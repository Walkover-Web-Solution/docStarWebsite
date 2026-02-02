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
    <>
      {/* Hero Section */}
      <div className="relative min-h-[60vh] sm:min-h-[65vh] md:min-h-[70vh] flex items-center">
        <div className="absolute inset-0 theme-bg-secondary">
          <div className="absolute top-0 right-0 w-1/2 h-full theme-bg-overlay transform skew-x-12"></div>
        </div>

        <div className="container mx-auto">
        <div className="relative px-4 py-8 sm:px-5 sm:py-10 md:px-6 md:py-12 w-full">
          <div className="inline-flex items-center gap-2 mt-12 px-2.5 py-1 rounded-md border theme-border mb-3 sm:mb-3.5 md:mb-4">
            <div className="w-1.5 h-1.5 rounded-md theme-bg"></div>
            <span className="text-xs font-medium uppercase tracking-wider opacity-70">
              Enterprise SSO
            </span>
          </div>

          <h1 className="h1 mb-2">
            Instant Login, <span className="opacity-60">Zero Hassle : </span>{" "}
            SSO by DocStar
          </h1>

          <p className="text-sm sm:text-[15px] md:text-base opacity-70 mb-5 sm:mb-5.5 md:mb-6 leading-relaxed">
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
      </div>

      <div className="container mx-auto">
      {/* Problem vs Solution - Side by Side */}
      <div className="py-8 sm:py-10 md:py-12 lg:py-16">
        <div className="px-4 sm:px-5 md:px-6 text-center mb-8 sm:mb-9 md:mb-10">
          <h2 className="text-xl sm:text-2xl md:text-3xl mb-2 sm:mb-2.5 md:mb-3 leading-tight font-medium">
            Why SSO is Essential
          </h2>
          <p className="text-sm md:text-base opacity-60 leading-snug">
            Multiple authentication systems drain resources and create security
            risks
          </p>
        </div>

        <div className="px-4 sm:px-5 md:px-6 grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
          <div className="h-full p-4 sm:p-4.5 md:p-5 lg:p-6 rounded-lg border theme-border theme-bg-secondary">
            <div className="flex items-center gap-2.5 mb-3 sm:mb-3.5 md:mb-4">
              <div className="w-7 h-7 sm:w-7.5 md:w-8 md:h-8 rounded-md theme-bg-overlay flex items-center justify-center">
                <Lock className="w-3.5 h-3.5 sm:w-3.75 md:w-4 md:h-4 opacity-70" />
              </div>
              <h3 className="text-base sm:text-[17px] md:text-lg opacity-60">Traditional Login</h3>
            </div>

            <div className="space-y-3">
              {problems.map((problem, index) => (
                <div
                  key={index}
                  className="flex items-start gap-2.5 p-2.5 sm:p-2.75 md:p-3 rounded"
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

          <div className="h-full p-4 sm:p-4.5 md:p-5 lg:p-6 rounded-lg border theme-border">
            <div className="flex items-center gap-2.5 mb-3 sm:mb-3.5 md:mb-4">
              <div className="w-7 h-7 sm:w-7.5 md:w-8 md:h-8 rounded-md theme-bg-overlay flex items-center justify-center">
                <Shield className="w-3.5 h-3.5 sm:w-3.75 md:w-4 md:h-4" />
              </div>
              <h3 className="text-base sm:text-[17px] md:text-lg font-medium">DocStar SSO</h3>
            </div>

            <div className="space-y-3">
              {solutions.map((solution, index) => (
                <div
                  key={index}
                  className="flex items-start gap-2.5 p-2.5 sm:p-2.75 md:p-3 rounded-md theme-bg-secondary"
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
          <p className="text-sm sm:text-[15px] md:text-base opacity-60 leading-snug">
            DocStar SSO isn't just a login tool—it's a strategic security
            solution. By combining user convenience with strong identity
            management, it helps organizations:
          </p>
        </div>

        <div className="px-6 grid md:grid-cols-2 gap-6">
          {whyChoose.map((item, index) => (
            <div
              key={index}
              className="h-full p-4 sm:p-4.5 md:p-5 lg:p-6 rounded-lg border theme-border"
            >
              <div className="flex items-start gap-3 sm:gap-3.5 md:gap-4">
                <div className="w-9 h-9 sm:w-9.5 md:w-10 md:h-10 rounded-md theme-bg-secondary flex items-center justify-center flex-shrink-0 opacity-80">
                  {item.icon}
                </div>

                <div className="flex-1">
                  <h3 className="text-base sm:text-[17px] md:text-lg mb-2 leading-tight">{item.title}</h3>
                  <p className="opacity-70 text-sm sm:text-[14.5px] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Key Benefits Section */}
      <div className="py-8 sm:py-10 md:py-12 lg:py-16">
        <div className="px-4 sm:px-5 md:px-6 text-center mb-8 sm:mb-9 md:mb-10">
          <h2 className="text-xl sm:text-2xl md:text-3xl mb-2 sm:mb-2.5 md:mb-3 leading-tight font-medium">
            Key Benefits of DocStar's SSO
          </h2>
          <p className="text-sm md:text-base opacity-60 leading-snug">
            Powerful features that transform how your organization handles
            authentication
          </p>
        </div>

        <div className="px-4 sm:px-5 md:px-6 grid md:grid-cols-2 gap-6">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="h-full p-4 sm:p-4.5 md:p-5 lg:p-6 rounded-lg border theme-border backdrop-blur-sm"
            >
              <div className="w-10 h-10 sm:w-11 md:w-12 md:h-12 rounded-md theme-bg-secondary flex items-center justify-center mb-3 sm:mb-3.5 md:mb-4">
                {benefit.icon}
              </div>

              <h3 className="text-base sm:text-[17px] md:text-lg mb-2 leading-tight">{benefit.title}</h3>
              <p className="opacity-70 leading-relaxed text-sm sm:text-[14.5px]">
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

        <div className="px-4 sm:px-5 md:px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6 relative">
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
              className="p-4 sm:p-4.5 md:p-5 lg:p-6 rounded-lg border theme-border text-center relative z-10"
            >
              <div className="w-9 h-9 sm:w-9.5 md:w-10 md:h-10 rounded-md theme-bg-overlay flex items-center justify-center mx-auto mb-2.5 sm:mb-2.75 md:mb-3">
                {step.icon}
              </div>
              <div className="text-[10px] sm:text-[11px] md:text-xs font-mono opacity-40 mb-1.5">
                {step.num}
              </div>
              <h3 className="text-sm sm:text-[15px] md:text-base mb-2 leading-tight font-medium">
                {step.title}
              </h3>
              <p className="opacity-70 text-xs sm:text-[13px] leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA - Full Width */}
      <div className="py-8 sm:py-10 md:py-12 lg:py-16 relative overflow-hidden">
        <div className="absolute inset-0 theme-bg-secondary"></div>
        <div className="absolute inset-0 theme-bg-overlay transform -skew-y-2"></div>

        <div className="relative px-4 sm:px-5 md:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md border theme-border mb-4">
            <Sparkles className="w-3.5 h-3.5 opacity-70" />
            <span className="text-xs font-medium uppercase tracking-wider opacity-70">
              Enterprise Ready
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-3 sm:mb-3.5 md:mb-4 leading-tight font-medium">
            Ready to Transform Your Authentication Experience?
          </h2>

          <p className="text-sm sm:text-[15px] md:text-base opacity-70 mb-5 sm:mb-5.5 md:mb-6 max-w-2xl mx-auto leading-relaxed">
            Unlock the full power of DocStar's Single Sign-On with an Enterprise
            plan. Give your team secure, frictionless access across all
            platforms.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              className="btn btn-primary px-5 py-2.5 sm:px-5.5 sm:py-2.75 md:px-6 md:py-3 text-sm sm:text-[15px] md:text-base"
              onClick={() => {
                window.open("https://app.docstar.io/login");
              }}
            >
              Get Started with SSO
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>

            <button
              className="btn btn-outline px-5 py-2.5 sm:px-5.5 sm:py-2.75 md:px-6 md:py-3 text-sm sm:text-[15px] md:text-base"
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
    </>
  );
};
