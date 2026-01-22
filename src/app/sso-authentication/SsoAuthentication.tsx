"use client"

import MotionWrapper from "@/components/motion/MotionDivWrapper"
import { motion } from "framer-motion"
import { Shield, Users, Lock, Zap, CheckCircle, Building, Globe, Key } from "lucide-react"

export const SsoAuthentication = () => {
  const benefits = [
    {
      icon: <Users className="w-6 h-6" />,
      title: "Effortless Onboarding",
      description:
        "Users can log in instantly using their existing MSG91 identity—no need to create new accounts or remember additional passwords.",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Enhanced Security You Can Trust",
      description: "Built on DocStar's advanced authentication backend, ensuring robust, enterprise-grade security.",
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Unified Access Across Systems",
      description:
        "Eliminate the hassle of juggling multiple credentials across platforms. One identity, unlimited access.",
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: "Trusted by MSG91",
      description:
        "Actively implemented within MSG91, DocStar's SSO helps streamline internal workflows while ensuring secure user experience.",
    },
  ]

  const whyChoose = [
    {
      title: "Strengthen cybersecurity posture",
      description: "Against phishing and credential-based attacks.",
    },
    {
      title: "Simplify IT administration",
      description: "Reducing manual account provisioning and password resets.",
    },
    {
      title: "Boost workforce efficiency",
      description: "With faster access to tools and resources.",
    },
    {
      title: "Ensure compliance",
      description: "With data privacy regulations through centralized authentication.",
    },
  ]

  const features = [
    {
      icon: <Key className="w-6 h-6" />,
      title: "Token-Based Security",
      description: "Encrypted authentication systems.",
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: "Central Access Control",
      description: "Manage permissions from one place.",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Instant Login",
      description: "Zero friction, maximum security.",
    },
    {
      icon: <Building className="w-6 h-6" />,
      title: "Enterprise Scale",
      description: "Proven reliability at scale.",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <MotionWrapper
        className="py-20 relative overflow-hidden theme-bg-secondary"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0" style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }}></div>
        <div className="relative max-w-6xl mx-auto px-6 py-20 text-center">
          <MotionWrapper
            className="text-5xl md:text-7xl font-bold mb-6 text-balance"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Instant Login,{" "}
            <span className="opacity-70">
              Zero Hassle
            </span>
            : SSO by DocStar
          </MotionWrapper>

          <MotionWrapper
            className="text-xl md:text-2xl mb-12 max-w-4xl mx-auto text-pretty opacity-80"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            DocStar's Single Sign-On authentication solution makes digital access both secure and effortless. One set of
            credentials, instant secure access across all connected services.
          </MotionWrapper>

          <MotionWrapper
          as="button"
            className="btn btn-primary mx-auto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={()=>{window.open('https://app.docstar.io/login')}}
          >
            Enable SSO for Your Organization
          </MotionWrapper>
        </div>
      </MotionWrapper>

      {/* Why You Need This Section */}
      <MotionWrapper
        className="py-20"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <MotionWrapper className="text-4xl md:text-5xl font-bold text-center mb-16" variants={itemVariants}>
            Why SSO is Essential
          </MotionWrapper>

          <div className="grid md:grid-cols-3 gap-8">
            <MotionWrapper className="text-center p-6 rounded-2xl theme-bg-secondary border" variants={itemVariants}>
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 theme-bg-secondary">
                <Lock className="w-8 h-8 opacity-80" />
              </div>
              <p className="text-lg opacity-80">
                Multiple passwords create security vulnerabilities and user frustration.
              </p>
            </MotionWrapper>

            <MotionWrapper
              className="text-center p-6 rounded-2xl theme-bg-secondary border"
              variants={itemVariants}
            >
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 theme-bg-secondary">
                <Users className="w-8 h-8 opacity-80" />
              </div>
              <p className="text-lg opacity-80">
                IT teams spend countless hours on password resets and account management.
              </p>
            </MotionWrapper>

            <MotionWrapper
              className="text-center p-6 rounded-2xl theme-bg-secondary border"
              variants={itemVariants}
            >
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 theme-bg-secondary">
                <Zap className="w-8 h-8 opacity-80" />
              </div>
              <p className="text-lg opacity-80">
                Employees lose productivity switching between multiple login systems.
              </p>
            </MotionWrapper>
          </div>

          <MotionWrapper
            className="mt-16 text-center p-8 rounded-2xl theme-bg-secondary border"
            variants={itemVariants}
          >
            <p className="text-xl font-medium opacity-90">
              <strong>DocStar's solution:</strong> Single Sign-On that eliminates password fatigue while strengthening
              security through centralized, encrypted authentication.
            </p>
          </MotionWrapper>
        </div>
      </MotionWrapper>

      {/* Key Benefits Section */}
      <MotionWrapper
        className="py-20 theme-bg-secondary"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <MotionWrapper className="text-4xl md:text-5xl font-bold text-center mb-16" variants={itemVariants}>
            Key Benefits of DocStar's SSO
          </MotionWrapper>

          <div className="grid md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <MotionWrapper
                key={index}
                className="p-6 rounded-2xl shadow-sm theme-bg border hover:shadow-md transition-shadow duration-300"
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

      {/* Why Choose DocStar SSO Section */}
      <MotionWrapper
        className="py-20"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <MotionWrapper className="text-4xl md:text-5xl font-bold text-center mb-16" variants={itemVariants}>
            Why Choose DocStar SSO for Your Organization?
          </MotionWrapper>

          <MotionWrapper className="text-xl text-center mb-12 max-w-4xl mx-auto opacity-80" variants={itemVariants}>
            DocStar SSO isn't just a login tool—it's a strategic security solution. By combining user convenience with
            strong identity management, it helps organizations:
          </MotionWrapper>

          <div className="grid md:grid-cols-2 gap-8">
            {whyChoose.map((item, index) => (
              <MotionWrapper
                key={index}
                className="flex items-start space-x-4 p-6 rounded-2xl theme-bg-secondary border"
                variants={itemVariants}
              >
                <div className="w-2 h-2 rounded-full mt-3 flex-shrink-0 opacity-80" style={{ backgroundColor: 'var(--app-text)' }}></div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="opacity-80">{item.description}</p>
                </div>
              </MotionWrapper>
            ))}
          </div>
        </div>
      </MotionWrapper>

      {/* Feature Highlights Section */}
      {/* <MotionWrapper
        className="py-20 theme-bg-secondary"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <MotionWrapper className="text-4xl md:text-5xl font-bold text-center mb-16" variants={itemVariants}>
            Enterprise-Grade Features
          </MotionWrapper>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <MotionWrapper
                key={index}
                className="text-center p-6 rounded-2xl shadow-sm theme-bg border"
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
        </div>
      </MotionWrapper> */}

      {/* Final CTA Section */}
      <MotionWrapper
        className="py-20 theme-bg-secondary text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-4xl mx-auto px-6 opacity-80">
          <MotionWrapper
            className="text-4xl md:text-5xl font-bold mb-6 text-balance"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            How to Enable SSO for Your Business
          </MotionWrapper>

          <MotionWrapper
            className="text-xl mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            To unlock the benefits of DocStar's Single Sign-On authentication, an Enterprise plan is required. Once
            activated, your team can enjoy secure, frictionless access across platforms.
          </MotionWrapper>

          <MotionWrapper
          as="button"
            className="btn btn-outline mx-auto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={()=>{window.open('https://app.docstar.io/login')}}
          >
            Start with SSO Now
          </MotionWrapper>
        </div>
      </MotionWrapper>
    </div>
  )
}
