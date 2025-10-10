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
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <MotionWrapper
        className="py-20 relative overflow-hidden bg-gradient-to-tr from-rose-100 to-pink-500 text-white"
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
            Instant Login,{" "}
            <span className="text-black/70">
              Zero Hassle
            </span>
            : SSO by DocStar
          </MotionWrapper>

          <MotionWrapper
            className="text-xl md:text-2xl mb-12 text-purple-100 max-w-4xl mx-auto text-pretty"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            DocStar's Single Sign-On authentication solution makes digital access both secure and effortless. One set of
            credentials, instant secure access across all connected services.
          </MotionWrapper>

          <MotionWrapper
          as="button"
            className="text-lg rounded-2xl shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-sm border border border-white/40 font-semibold px-6 py-3 cursor-pointer"
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
        className="py-20 bg-white"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <MotionWrapper className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900" variants={itemVariants}>
            Why SSO is Essential
          </MotionWrapper>

          <div className="grid md:grid-cols-3 gap-8">
            <MotionWrapper className="text-center p-6 rounded-2xl bg-red-50 border border-red-100" variants={itemVariants}>
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-red-600" />
              </div>
              <p className="text-gray-700 text-lg">
                Multiple passwords create security vulnerabilities and user frustration.
              </p>
            </MotionWrapper>

            <MotionWrapper
              className="text-center p-6 rounded-2xl bg-orange-50 border border-orange-100"
              variants={itemVariants}
            >
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-orange-600" />
              </div>
              <p className="text-gray-700 text-lg">
                IT teams spend countless hours on password resets and account management.
              </p>
            </MotionWrapper>

            <MotionWrapper
              className="text-center p-6 rounded-2xl bg-yellow-50 border border-yellow-100"
              variants={itemVariants}
            >
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-yellow-600" />
              </div>
              <p className="text-gray-700 text-lg">
                Employees lose productivity switching between multiple login systems.
              </p>
            </MotionWrapper>
          </div>

          <MotionWrapper
            className="mt-16 text-center bg-gradient-to-r from-purple-50 to-pink-50 p-8 rounded-2xl border border-purple-100"
            variants={itemVariants}
          >
            <p className="text-xl text-gray-800 font-medium">
              <strong>DocStar's solution:</strong> Single Sign-On that eliminates password fatigue while strengthening
              security through centralized, encrypted authentication.
            </p>
          </MotionWrapper>
        </div>
      </MotionWrapper>

      {/* Key Benefits Section */}
      <MotionWrapper
        className="py-20 bg-gray-50"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <MotionWrapper className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900" variants={itemVariants}>
            Key Benefits of DocStar's SSO
          </MotionWrapper>

          <div className="grid md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <MotionWrapper
                key={index}
                className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300"
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4 text-purple-600">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </MotionWrapper>
            ))}
          </div>
        </div>
      </MotionWrapper>

      {/* Why Choose DocStar SSO Section */}
      <MotionWrapper
        className="py-20 bg-white"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <MotionWrapper className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900" variants={itemVariants}>
            Why Choose DocStar SSO for Your Organization?
          </MotionWrapper>

          <MotionWrapper className="text-xl text-center mb-12 text-gray-700 max-w-4xl mx-auto" variants={itemVariants}>
            DocStar SSO isn't just a login tool—it's a strategic security solution. By combining user convenience with
            strong identity management, it helps organizations:
          </MotionWrapper>

          <div className="grid md:grid-cols-2 gap-8">
            {whyChoose.map((item, index) => (
              <MotionWrapper
                key={index}
                className="flex items-start space-x-4 p-6 rounded-2xl bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100"
                variants={itemVariants}
              >
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-3 flex-shrink-0"></div>
                <div>
                  <h3 className="text-xl font-semibold text-purple-900 mb-2">{item.title}</h3>
                  <p className="text-gray-700">{item.description}</p>
                </div>
              </MotionWrapper>
            ))}
          </div>
        </div>
      </MotionWrapper>

      {/* Feature Highlights Section */}
      {/* <MotionWrapper
        className="py-20 bg-gray-50"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <MotionWrapper className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900" variants={itemVariants}>
            Enterprise-Grade Features
          </MotionWrapper>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <MotionWrapper
                key={index}
                className="text-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-16 h-16 bg-gradient-to-tr from-rose-100 to-pink-500  rounded-2xl flex items-center justify-center mx-auto mb-4 text-white">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </MotionWrapper>
            ))}
          </div>
        </div>
      </MotionWrapper> */}

      {/* Final CTA Section */}
      <MotionWrapper
        className="py-20 bg-rose-100 text-white text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-4xl mx-auto px-6 text-black/70">
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
            className="bg-white text-black px-8 py-4 rounded-full font-semibold text-lg hover:bg-black/70 hover:text-white transition-colors duration-300 shadow-lg cursor-pointer"
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
