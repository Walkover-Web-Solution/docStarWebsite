"use client";
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
} from "lucide-react";
import Link from "next/link";

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
      <div className="relative min-h-[60vh] sm:min-h-[65vh] md:min-h-[70vh] flex items-center">
        <div className="absolute inset-0 theme-bg-secondary overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full theme-bg-overlay transform skew-x-12"></div>
        </div>

        <div className="container mx-auto">
          <div className="relative px-4 py-8 sm:px-5 sm:py-10 md:px-6 md:py-12 w-full">
            <div className="inline-flex items-center gap-2 mt-12 px-2.5 py-1 rounded-md border theme-border mb-3 sm:mb-3.5 md:mb-4">
              <div className="w-1.5 h-1.5 rounded-md theme-bg"></div>
              <span className="text-xs font-medium uppercase tracking-wider opacity-70">
                White Labelling
              </span>
            </div>

            <h1 className="h1 mb-2">
              Your Brand, Your Docs : <span className="opacity-60">Custom Domain</span>
            </h1>

            <p className="text-sm sm:text-[15px] md:text-base opacity-70 mb-5 sm:mb-5.5 md:mb-6 leading-relaxed max-w-3xl">
              Host your documentation on your own domain (e.g., docs.yourcompany.com). Deliver a seamless, white-labeled experience that builds trust and boosts your SEO.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                href="https://app.docstar.io"
                target="_blank"
                className="btn btn-primary"
              >
                Set Up Custom Domain
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
              Why Custom Domain Matters
            </h2>
            <p className="text-sm md:text-base opacity-60 leading-snug">
              Don't let third-party URLs dilute your brand identity
            </p>
          </div>

          <div className="px-4 sm:px-5 md:px-6 grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
            <div className="h-full p-4 sm:p-4.5 md:p-5 lg:p-6 rounded-lg border theme-border theme-bg-secondary">
              <div className="flex items-center gap-2.5 mb-3 sm:mb-3.5 md:mb-4">
                <div className="w-7 h-7 sm:w-7.5 md:w-8 md:h-8 rounded-md theme-bg-overlay flex items-center justify-center">
                  <Globe className="w-3.5 h-3.5 sm:w-3.75 md:w-4 md:h-4 opacity-70" />
                </div>
                <h3 className="text-base sm:text-[17px] md:text-lg opacity-60">Default Hosting</h3>
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
                <h3 className="text-base sm:text-[17px] md:text-lg font-medium">DocStar Custom Domain</h3>
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

        {/* Why Choose Section */}
        <div className="py-12 md:py-16 theme-bg-secondary px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl mb-2 leading-tight font-medium">
              A Complete White-Label Solution
            </h2>
            <p className="text-sm sm:text-[15px] md:text-base opacity-60 leading-snug">
              DocStar handles all the underlying complexity so you can focus on writing great documentation.
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
              Features Built for Scale
            </h2>
            <p className="text-sm md:text-base opacity-60 leading-snug">
              Everything you need to host docs on your own infrastructure
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
              How to Go Live
            </h2>
            <p className="text-sm md:text-base opacity-60 leading-snug">
              A simple, 3-step process to get your custom domain up and running
            </p>
          </div>

          <div className="px-4 sm:px-5 md:px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6 relative">
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
                Brand Your Docs
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-3 sm:mb-3.5 md:mb-4 leading-tight font-medium">
              Ready to Make Your Docs Feel Native?
            </h2>

            <p className="text-sm sm:text-[15px] md:text-base opacity-70 mb-5 sm:mb-5.5 md:mb-6 max-w-2xl mx-auto leading-relaxed">
              Remove third-party branding and give your users a seamless, professional experience with DocStar Custom Domains.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                className="btn btn-primary px-5 py-2.5 sm:px-5.5 sm:py-2.75 md:px-6 md:py-3 text-sm sm:text-[15px] md:text-base"
                onClick={() => {
                  window.open("https://app.docstar.io/login");
                }}
              >
                Configure Custom Domain
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
