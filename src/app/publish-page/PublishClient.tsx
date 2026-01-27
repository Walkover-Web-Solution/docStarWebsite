"use client";

import MotionWrapper from "@/components/motion/MotionDivWrapper";
import { motion } from "framer-motion";
import {
  PenTool,
  TrendingUp,
  Search,
  Users,
  Zap,
  BarChart3,
  Palette,
  Clock,
} from "lucide-react";

const PublishPage = () => {
  const benefits = [
    {
      icon: <PenTool className="w-6 h-6" />,
      title: "Easy Blog Publishing",
      description: "Write and format blogs with a clean, intuitive editor.",
    },
    {
      icon: <Search className="w-6 h-6" />,
      title: "SEO Optimization",
      description: "Boost your blog's reach with built-in SEO tools.",
    },
    {
      icon: <Palette className="w-6 h-6" />,
      title: "Custom Branding",
      description:
        "Personalize your blog's header and footer to match your brand.",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Hassle-Free Setup",
      description: "Set up your blogging platform in just a few clicks.",
    },
  ];

  const growthReasons = [
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Boost Search Rankings",
      description: "Keyword-rich content improves your SEO performance.",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Build Trust & Authority",
      description: "Establish thought leadership in your niche.",
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Drive Organic Traffic",
      description: "Attract the right audience through SEO optimization.",
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Generate Quality Leads",
      description: "Engage readers with useful, shareable insights.",
    },
  ];

  const features = [
    {
      icon: <PenTool className="w-6 h-6" />,
      title: "Rich Content Editor",
      description: "Add images, code snippets, and rich media effortlessly.",
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Analytics & Insights",
      description: "Track performance with detailed traffic reports.",
    },
    {
      icon: <Search className="w-6 h-6" />,
      title: "SEO Tools",
      description: "Identify top-performing keywords automatically.",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Fast & Scalable",
      description:
        "Built for developers and businesses that care about performance.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <MotionWrapper
        className="py-20 relative overflow-hidden theme-bg-secondary"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-6xl mx-auto px-6 py-20 text-center">
          <MotionWrapper
            className="text-5xl md:text-7xl font-bold mb-6 text-balance"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Publish <span className="opacity-70">Engaging Blogs</span> to Grow
            Your Presence
          </MotionWrapper>

          <MotionWrapper
            className="text-xl md:text-2xl mb-12 max-w-4xl mx-auto text-pretty opacity-80"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Publishing high-quality, SEO-friendly blogs is one of the most
            effective ways to grow your online presence, attract organic
            traffic, and establish thought leadership.
          </MotionWrapper>

          <MotionWrapper
            as="button"
            className="btn btn-primary mx-auto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            data-cursor-hover
            onClick={() => {
              window.open("https://docstar.io/blogs");
            }}
          >
            Start Publishing with DocStar
          </MotionWrapper>
        </div>
      </MotionWrapper>

      {/* Why Blogging is Essential Section */}
      <MotionWrapper
        className="py-20"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <MotionWrapper
            className="text-4xl md:text-5xl font-bold text-center mb-8"
            variants={itemVariants}
          >
            Why Blogging is Essential for Growth
          </MotionWrapper>

          <MotionWrapper
            className="text-xl text-center mb-12 max-w-3xl mx-auto opacity-80"
            variants={itemVariants}
          >
            A consistent blogging strategy helps you build authority and drive
            growth:
          </MotionWrapper>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {growthReasons.map((reason, index) => (
              <MotionWrapper
                key={index}
                className="text-center p-6 rounded-2xl theme-bg-secondary border hover:shadow-md transition-shadow duration-300"
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm ">
                  {reason.icon}
                </div>
                <h3 className="text-lg font-semibold mb-3">{reason.title}</h3>
                <p className="text-sm opacity-80">{reason.description}</p>
              </MotionWrapper>
            ))}
          </div>

          <MotionWrapper
            className="mt-16 text-center p-8 rounded-2xl theme-bg-secondary border"
            variants={itemVariants}
          >
            <p className="text-lg font-bold opacity-90">
              Whether you're a <strong>startup</strong>,{" "}
              <strong>SaaS company</strong>, or <strong>enterprise</strong>,
              blogs are a proven growth engine.
            </p>
          </MotionWrapper>
        </div>
      </MotionWrapper>

      {/* Publish Blogs with DocStar Section */}
      <MotionWrapper
        className="py-20 theme-bg-secondary"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <MotionWrapper
            className="text-4xl md:text-5xl font-bold text-center mb-16"
            variants={itemVariants}
          >
            Publish Blogs with DocStar
          </MotionWrapper>

          <MotionWrapper
            className="text-xl text-center mb-12 max-w-3xl mx-auto opacity-80"
            variants={itemVariants}
          >
            Get a powerful blogging and documentation platform that makes
            content creation seamless:
          </MotionWrapper>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <MotionWrapper
                key={index}
                className="p-6 rounded-2xl shadow-sm border hover:shadow-md transition-shadow duration-300"
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 theme-bg-secondary opacity-80">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                <p className="opacity-80">{benefit.description}</p>
              </MotionWrapper>
            ))}
          </div>
        </div>
      </MotionWrapper>

      {/* Benefits Section */}
      <MotionWrapper
        className="py-20"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <MotionWrapper
            className="text-3xl md:text-5xl font-extrabold text-center mb-16 tracking-wide uppercase"
            variants={itemVariants}
          >
            How DocStar Elevates Your Blogging Experience
          </MotionWrapper>

          <div className="grid md:grid-cols-2 gap-8">
            <MotionWrapper
              className="flex items-start space-x-4 p-6 rounded-xl border"
              variants={itemVariants}
            >
              <div className="w-2 h-2 rounded-full theme-bg mt-3 flex-shrink-0 opacity-80"></div>
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  Grow Online Visibility
                </h3>
                <p className="opacity-80">
                  SEO-powered blogging increases your search rankings and
                  organic reach.
                </p>
              </div>
            </MotionWrapper>

            <MotionWrapper
              className="flex items-start space-x-4 p-6 rounded-xl border border-black"
              variants={itemVariants}
            >
              <div className="w-2 h-2 rounded-full theme-bg mt-3 flex-shrink-0 opacity-80"></div>
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  Simplify Content Management
                </h3>
                <p className="opacity-80">
                  All-in-one platform combines blogging with documentation and
                  knowledge base.
                </p>
              </div>
            </MotionWrapper>

            <MotionWrapper
              className="flex items-start space-x-4 p-6 rounded-xl border border-black"
              variants={itemVariants}
            >
              <div className="w-2 h-2 rounded-full theme-bg mt-3 flex-shrink-0 opacity-80"></div>
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  Reach Target Audience
                </h3>
                <p className="opacity-80">
                  Engage and attract the right audience with optimized, valuable
                  content.
                </p>
              </div>
            </MotionWrapper>

            <MotionWrapper
              className="flex items-start space-x-4 p-6 rounded-xl border border-black"
              variants={itemVariants}
            >
              <div className="w-2 h-2 rounded-full theme-bg mt-3 flex-shrink-0 opacity-80"></div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Support Growth</h3>
                <p className="opacity-80">
                  High-quality content drives marketing and product growth
                  initiatives.
                </p>
              </div>
            </MotionWrapper>
          </div>
        </div>
      </MotionWrapper>

      {/* Why Choose DocStar Section */}
      <MotionWrapper
        className="py-20 theme-bg-secondary"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <MotionWrapper
            className="text-4xl md:text-5xl font-bold text-center mb-16"
            variants={itemVariants}
          >
            Why Choose DocStar for Blogging?
          </MotionWrapper>

          <MotionWrapper
            className="text-xl text-center mb-12 max-w-3xl mx-auto opacity-80"
            variants={itemVariants}
          >
            Unlike generic CMS platforms, DocStar is built for developers,
            startups, and businesses that care about both content and
            functionality.
          </MotionWrapper>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <MotionWrapper
                key={index}
                className="text-center p-6 rounded-2xl shadow-sm border"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 theme-bg-secondary">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="opacity-80">{feature.description}</p>
              </MotionWrapper>
            ))}
          </div>

          <MotionWrapper
            className="mt-16 grid md:grid-cols-3 gap-8 text-left"
            variants={itemVariants}
          >
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full theme-bg mt-3 flex-shrink-0 opacity-80"></div>
              <p className="font-semibold">
                Fast, scalable, and secure blogging solution
              </p>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full theme-bg mt-3 flex-shrink-0 opacity-80"></div>
              <p className="font-semibold">
                Seamless integration with your API docs and knowledge base
              </p>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full theme-bg mt-3 flex-shrink-0 opacity-80"></div>
              <p className="font-semibold">
                Tools to combine documentation + blogs in one place
              </p>
            </div>
          </MotionWrapper>
        </div>
      </MotionWrapper>

      {/* Final CTA Section */}
      <MotionWrapper
        className="py-20 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-4xl mx-auto px-6">
          <MotionWrapper
            className="text-4xl md:text-5xl font-bold mb-6 text-balance opacity-80"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Start Growing Your Presence with Blogs
          </MotionWrapper>

          <MotionWrapper
            className="text-xl mb-8 opacity-60"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Publishing blogs shouldn't be complicated. Focus on creating
            valuable, engaging content while we handle the SEO optimization,
            formatting, and publishing workflow.
          </MotionWrapper>

          <MotionWrapper
            as="button"
            className="btn btn-outline mx-auto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              window.open("https://app.docstar.io/login");
            }}
          >
            Start Publishing with DocStar
          </MotionWrapper>
        </div>
      </MotionWrapper>
    </div>
  );
};

export default PublishPage;
