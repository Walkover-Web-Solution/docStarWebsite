"use client"

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
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <motion.section
        className="py-20 relative overflow-hidden bg-gradient-to-tr from-rose-100 to-pink-500 text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-6xl mx-auto px-6 py-20 text-center">
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6 text-balance"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Create{" "}
            <span className="text-black/70">
              interactive API docs
            </span>{" "}
            in minutes
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl mb-12 text-purple-100 max-w-4xl mx-auto text-pretty"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            With DocStar, write, publish, and test REST and GraphQL APIs all in one place—making it easier for
            developers, testers, and teams to build, learn, and adopt your API faster.
          </motion.p>

          <motion.button
            className="text-lg rounded-2xl shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-sm border border border-white/40 font-semibold px-6 py-3"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            data-cursor-hover
            onClick={()=>{window.open('https://apidoc.docstar.io')}}
          >
             Get Started with API Documentation
          </motion.button>
        </div>
      </motion.section>

      {/* Why DocStar Section */}
      <motion.section
        className="py-20 bg-white"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <motion.h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900" variants={itemVariants}>
            Why DocStar is the Best API Documentation Platform
          </motion.h2>

          <div className="space-y-20">
            <motion.div variants={itemVariants}>
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-rose-100 to-pink-500 rounded-xl flex items-center justify-center mr-4">
                      <BookOpen className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900">One-Stop API Learning Docs Hub</h3>
                  </div>
                  <p className="text-lg text-gray-600 mb-8">
                    DocStar is more than just an API reference—it's a complete API learning hub. Provide developers with
                    everything they need in one place:
                  </p>

                  <div className="space-y-4">
                    {features.map((feature, index) => (
                      <motion.div
                        key={index}
                        className="flex items-start space-x-4 p-4 rounded-xl hover:bg-purple-50 transition-colors duration-300"
                        variants={itemVariants}
                        whileHover={{ x: 10 }}
                      >
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 flex-shrink-0">
                          {feature.icon}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">{feature.title}</h4>
                          <p className="text-sm text-gray-600">{feature.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="relative">
                  <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl p-8 border border-purple-200">
                    <div className="bg-white rounded-xl p-6 shadow-sm">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex space-x-2">
                          <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                          <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                          <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                        </div>
                        <Code className="w-5 h-5 text-gray-400" />
                      </div>
                      <div className="space-y-3">
                        <div className="h-4 bg-purple-200 rounded w-3/4"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                        <div className="h-4 bg-pink-200 rounded w-2/3"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="lg:order-2">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-emerald-500 rounded-xl flex items-center justify-center mr-4">
                      <TestTube className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900">Quick API Testing for Users</h3>
                  </div>
                  <p className="text-lg text-gray-600 mb-8">
                    Modern developers expect interactive API documentation. With DocStar's built-in API testing tools,
                    users can:
                  </p>

                  <div className="space-y-4">
                    {testingFeatures.map((feature, index) => (
                      <motion.div
                        key={index}
                        className="flex items-start space-x-4 p-4 rounded-xl hover:bg-purple-50 transition-colors duration-300"
                        variants={itemVariants}
                        whileHover={{ x: 10 }}
                      >
                        <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">{feature.title}</h4>
                          <p className="text-sm text-gray-600">{feature.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="lg:order-1 relative">
                  <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl p-8 border border-purple-200">
                    <div className="bg-white rounded-xl p-6 shadow-sm">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm font-medium text-saffron-600 bg-orange-100 px-3 py-1 rounded-full">
                          API Testing
                        </span>
                        {/* <TestTube className="w-5 h-5 text-gray-400" /> */}
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-green-300 rounded-full"></div>
                          <div className="h-3 bg-green-200 rounded flex-1"></div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
                          <div className="h-3 bg-orange-200 rounded flex-1"></div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                          <div className="h-3 bg-red-300 rounded flex-1"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Key Benefits Section */}
      <motion.section
        className="py-20 bg-gray-50"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <motion.h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-" variants={itemVariants}>
          What Makes DocStar API Docs Different
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300"
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4 text-black">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Why Interactive API Documentation Matters */}
      <motion.section
        className="py-20 bg-red-50"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <motion.h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900" variants={itemVariants}>
            Why Interactive API Documentation Matters
          </motion.h2>

          <motion.div
            className="text-center bg-gradient-to-r from-purple-50 to-pink-50 p-8 rounded-xl border border-black/70 mb-12"
            variants={itemVariants}
          >
            <p className="text-xl text-black/80 mb-6 font-semibold italic">
              Search engines and developers alike love structured, detailed API docs. By choosing DocStar, you
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              className="flex items-start space-x-4 p-6 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 border border-black/60"
              variants={itemVariants}
            >
              <div className="w-2 h-2 bg-black/60 rounded-full mt-3 flex-shrink-0"></div>
              <div>
                <h3 className="text-xl font-semibold text-black/80 mb-2">Improve developer onboarding speed</h3>
                <p className="text-gray-700">Get developers productive faster with clear, interactive documentation.</p>
              </div>
            </motion.div>

            <motion.div
              className="flex items-start space-x-4 p-6 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 border border-black/60"
              variants={itemVariants}
            >
              <div className="w-2 h-2 bg-black/60 rounded-full mt-3 flex-shrink-0"></div>
              <div>
                <h3 className="text-xl font-semibold text-black/80 mb-2">Reduce support tickets and friction</h3>
                <p className="text-gray-700">Self-service documentation reduces the burden on your support team.</p>
              </div>
            </motion.div>

            <motion.div
              className="flex items-start space-x-4 p-6 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 border border-black/60"
              variants={itemVariants}
            >
              <div className="w-2 h-2 bg-black/60 rounded-full mt-3 flex-shrink-0"></div>
              <div>
                <h3 className="text-xl font-semibold text-black/80 mb-2">
                  Boost your API visibility and SEO ranking
                </h3>
                <p className="text-gray-700">Well-structured docs improve discoverability and search rankings.</p>
              </div>
            </motion.div>

            <motion.div
              className="flex items-start space-x-4 p-6 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 border border-black/60"
              variants={itemVariants}
            >
              <div className="w-2 h-2 bg-black/60 rounded-full mt-3 flex-shrink-0"></div>
              <div>
                <h3 className="text-xl font-semibold text-black/80 mb-2">Offer a modern developer experience</h3>
                <p className="text-gray-700">
                  Stand out with interactive, testable documentation that developers love.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Final CTA Section */}
      <motion.section
        className="py-20 bg-rose-100 text-white text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-4xl mx-auto px-6">
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-6 text-balance text-black/70"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Get Started with DocStar
          </motion.h2>

          <motion.p
            className="text-xl mb-8 text-black.70 mx-auto text-black/50"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Creating and sharing interactive API documentation has never been easier. Whether you're publishing a simple
            REST API or a complex GraphQL service, DocStar makes it effortless to deliver beautiful, testable, and
            SEO-friendly API docs.
          </motion.p>

          <motion.button
            className="bg-white text-black/70 px-8 py-4 rounded-full font-semibold text-lg hover:bg-purple-50 transition-colors duration-300 shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={()=>(window.open("https://app.docstar.io/login"))}
          >
           Sign up with docstar today
          </motion.button>
        </div>
      </motion.section>
    </div>
  )
}

export default ApiDocumentationPage
