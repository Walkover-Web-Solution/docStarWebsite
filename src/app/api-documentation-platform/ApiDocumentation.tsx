"use client"

import MotionWrapper from "@/components/motion/MotionDivWrapper"
import { motion } from "framer-motion"
import { Code, BookOpen, Zap, Users, Globe, TestTube, FileText, Shield } from "lucide-react"

const ApiDocumentationPage = () => {
  const benefits = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Faster API adoption",
      description: "Interactive docs help developers get started quickly.",
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Centralized API resources",
      description: "Everything developers need in one platform.",
    },
    {
      icon: <TestTube className="w-6 h-6" />,
      title: "Docs + testing combined",
      description: "Test endpoints directly within documentation.",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Developer-first design",
      description: "Intuitive UI that developers actually want to use.",
    },
  ]

  const features = [
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Full API reference documentation",
      description: "Complete endpoint documentation with examples.",
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: "Step-by-step guides and tutorials",
      description: "Help developers learn your API quickly.",
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Ready-to-use sample code snippets",
      description: "Copy-paste code examples in multiple languages.",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Best practices and onboarding resources",
      description: "Guide developers to success with your API.",
    },
  ]

  const testingFeatures = [
    {
      title: "Instantly send HTTPS requests",
      description: "Test your API endpoints without leaving the docs.",
    },
    {
      title: "Explore and validate GraphQL queries",
      description: "Interactive GraphQL playground built-in.",
    },
    {
      title: "Test endpoints directly in your docs",
      description: "Real-time testing with immediate feedback.",
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
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-6xl mx-auto px-6 py-20 text-center">
          <MotionWrapper
            className="text-5xl md:text-7xl font-bold mb-6 text-balance"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Create{" "}
            <span className="opacity-70">
              interactive API docs
            </span>{" "}
            in minutes
          </MotionWrapper>

          <MotionWrapper
            className="text-xl md:text-2xl mb-12 max-w-4xl mx-auto text-pretty opacity-80"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            With DocStar, write, publish, and test REST and GraphQL APIs all in one place—making it easier for
            developers, testers, and teams to build, learn, and adopt your API faster.
          </MotionWrapper>

          <MotionWrapper
            as="button"
            className="btn btn-primary mx-auto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            data-cursor-hover
            onClick={()=>{window.open('https://apidoc.docstar.io')}}
          >
             Get Started with API Documentation
          </MotionWrapper>
        </div>
      </MotionWrapper>

      {/* Why DocStar Section */}
      <MotionWrapper
        className="py-20"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <MotionWrapper className="text-4xl md:text-5xl font-bold text-center mb-16" variants={itemVariants}>
            Why DocStar is the Best API Documentation Platform
          </MotionWrapper>

          <div className="space-y-20">
            <MotionWrapper variants={itemVariants}>
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mr-4 theme-bg-secondary">
                      <BookOpen className="w-6 h-6 opacity-90" />
                    </div>
                    <h3 className="text-3xl font-bold">One-Stop API Learning Docs Hub</h3>
                  </div>
                  <p className="text-lg mb-8 opacity-80">
                    DocStar is more than just an API reference. Provide developers with
                    everything they need in one place:
                  </p>

                  <div className="space-y-4">
                    {features.map((feature, index) => (
                      <MotionWrapper
                        key={index}
                        className="flex items-start space-x-4 p-4 rounded-xl transition-colors duration-300"
                        variants={itemVariants}
                        whileHover={{ x: 10 }}
                      >
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 theme-bg-secondary opacity-80">
                          {feature.icon}
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">{feature.title}</h4>
                          <p className="text-sm opacity-80">{feature.description}</p>
                        </div>
                      </MotionWrapper>
                    ))}
                  </div>
                </div>

                <div className="relative">
                  <div className="rounded-2xl p-8 theme-bg-secondary border">
                    <div className="rounded-xl p-6 shadow-sm ">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex space-x-2">
                          <div className="w-3 h-3 rounded-full theme-bg opacity-40"></div>
                          <div className="w-3 h-3 rounded-full theme-bg opacity-40"></div>
                          <div className="w-3 h-3 rounded-full theme-bg opacity-40"></div>
                        </div>
                        <Code className="w-5 h-5 opacity-60" />
                      </div>
                      <div className="space-y-3">
                        <div className="h-4 rounded w-3/4 theme-bg-secondary"></div>
                        <div className="h-4 rounded w-1/2 theme-bg-secondary"></div>
                        <div className="h-4 rounded w-2/3 theme-bg-secondary"></div>
                        <div className="h-4 rounded w-1/3 theme-bg-secondary"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </MotionWrapper>

            <MotionWrapper variants={itemVariants}>
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="lg:order-2">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mr-4 theme-bg-secondary">
                      <TestTube className="w-6 h-6 opacity-90" />
                    </div>
                    <h3 className="text-3xl font-bold">Quick API Testing for Users</h3>
                  </div>
                  <p className="text-lg mb-8 opacity-80">
                    Modern developers expect interactive API documentation. With DocStar's built-in API testing tools,
                    users can:
                  </p>

                  <div className="space-y-4">
                    {testingFeatures.map((feature, index) => (
                      <MotionWrapper
                        key={index}
                        className="flex items-start space-x-4 p-4 rounded-xl transition-colors duration-300"
                        variants={itemVariants}
                        whileHover={{ x: 10 }}
                      >
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 theme-bg-secondary opacity-80">
                          <div className="w-2 h-2 rounded-full theme-bg opacity-80"></div>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">{feature.title}</h4>
                          <p className="text-sm opacity-80">{feature.description}</p>
                        </div>
                      </MotionWrapper>
                    ))}
                  </div>
                </div>

                <div className="lg:order-1 relative">
                  <div className="rounded-2xl p-8 theme-bg-secondary border">
                    <div className="rounded-xl p-6 shadow-sm ">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-bold px-3 py-1 rounded-full theme-bg-secondary opacity-80">
                          API Testing
                        </span>
                        {/* <TestTube className="w-5 h-5 text-gray-400" /> */}
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 rounded-full theme-bg opacity-60"></div>
                          <div className="h-3 rounded flex-1 theme-bg-secondary"></div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 rounded-full theme-bg opacity-60"></div>
                          <div className="h-3 rounded flex-1 theme-bg-secondary"></div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 rounded-full theme-bg opacity-60"></div>
                          <div className="h-3 rounded flex-1 theme-bg-secondary"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </MotionWrapper>
          </div>
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
          <MotionWrapper className="text-4xl md:text-5xl font-bold text-center mb-16 opacity-80" variants={itemVariants}>
          What Makes DocStar API Docs Different
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

      {/* Why Interactive API Documentation Matters */}
      <MotionWrapper
        className="py-20"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <MotionWrapper className="text-4xl md:text-5xl font-bold text-center mb-16" variants={itemVariants}>
            Why Interactive API Documentation Matters
          </MotionWrapper>

          <MotionWrapper
            className="text-center p-8 rounded-xl theme-bg-secondary border mb-12"
            variants={itemVariants}
          >
            <p className="text-xl mb-6 font-semibold italic opacity-90">
              Search engines and developers alike love structured, detailed API docs. By choosing DocStar, you
            </p>
          </MotionWrapper>

          <div className="grid md:grid-cols-2 gap-8">
            <MotionWrapper
              className="flex items-start space-x-4 p-6 rounded-xl theme-bg-secondary border"
              variants={itemVariants}
            >
              <div className="w-2 h-2 rounded-full theme-bg mt-3 flex-shrink-0 opacity-80"></div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Improve developer onboarding speed</h3>
                <p className="opacity-80">Get developers productive faster with clear, interactive documentation.</p>
              </div>
            </MotionWrapper>

            <MotionWrapper
              className="flex items-start space-x-4 p-6 rounded-xl theme-bg-secondary border"
              variants={itemVariants}
            >
              <div className="w-2 h-2 rounded-full theme-bg mt-3 flex-shrink-0 opacity-80"></div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Reduce support tickets and friction</h3>
                <p className="opacity-80">Self-service documentation reduces the burden on your support team.</p>
              </div>
            </MotionWrapper>

            <MotionWrapper
              className="flex items-start space-x-4 p-6 rounded-xl theme-bg-secondary border"
              variants={itemVariants}
            >
              <div className="w-2 h-2 rounded-full theme-bg mt-3 flex-shrink-0 opacity-80"></div>
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  Boost your API visibility and SEO ranking
                </h3>
                <p className="opacity-80">Well-structured docs improve discoverability and search rankings.</p>
              </div>
            </MotionWrapper>

            <MotionWrapper
              className="flex items-start space-x-4 p-6 rounded-xl theme-bg-secondary border"
              variants={itemVariants}
            >
              <div className="w-2 h-2 rounded-full theme-bg mt-3 flex-shrink-0 opacity-80"></div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Offer a modern developer experience</h3>
                <p className="opacity-80">
                  Stand out with interactive, testable documentation that developers love.
                </p>
              </div>
            </MotionWrapper>
          </div>
        </div>
      </MotionWrapper>

      {/* Final CTA Section */}
      <MotionWrapper
        className="py-20 text-center theme-bg-secondary"
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
            Get Started with DocStar
          </MotionWrapper>

          <MotionWrapper
            className="text-xl mb-8 mx-auto opacity-60"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Creating and sharing interactive API documentation has never been easier. Whether you're publishing a simple
            REST API or a complex GraphQL service, DocStar makes it effortless to deliver beautiful, testable, and
            SEO-friendly API docs.
          </MotionWrapper>

          <MotionWrapper
            as="button"
            className="btn btn-outline mx-auto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={()=>(window.open("https://app.docstar.io/login"))}
          >
           Sign up with docstar today
          </MotionWrapper>
        </div>
      </MotionWrapper>
    </div>
  )
}

export default ApiDocumentationPage
