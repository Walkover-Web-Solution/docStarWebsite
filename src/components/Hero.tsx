import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowRight, Sparkles, Zap, Code, PenTool, Globe } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden py-20"
    >
      {/* Simple Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-gray-100">
        {/* Subtle pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width=%2260%22%20height=%2260%22%20viewBox=%220%200%2060%2060%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill=%22none%22%20fill-rule=%22evenodd%22%3E%3Cg%20fill=%22%23000000%22%20fill-opacity=%220.02%22%3E%3Ccircle%20cx=%2230%22%20cy=%2230%22%20r=%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <motion.div
          className="mb-8 inline-flex items-center bg-black rounded-2xl px-4 py-2 shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <Sparkles className="h-5 w-5 text-white mr-2" />
          <span className="text-base font-medium text-white">
            AI-Powered Documentation Platform
          </span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          className="text-5xl md:text-7xl font-bold text-black mb-8 leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Beautiful, fast, and reliable{" "}
          <span className="text-gray-600">API Docs & FAQs</span>
          {" "}built for teams
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-xl md:text-2xl text-gray-700 mb-12 max-w-4xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-black mb-3 font-medium">
            Not just another document platform — it's a new culture for your
            team
          </p>
          <p className="text-gray-800">
            You shape internal{" "}
            <span className="font-semibold text-black">culture</span>. Support
            writes <span className="font-semibold text-black">FAQs</span>.
            Marketing crafts{" "}
            <span className="font-semibold text-black">blogs</span>. Your tech
            team delivers powerful{" "}
            <span className="font-semibold text-black">API docs</span>.
          </p>
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <motion.a
            href="https://app.docstar.io/login"
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-black text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg flex items-center"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            data-cursor-hover
          >
            Get Started for Free
            <ArrowRight className="h-5 w-5 ml-2" />
          </motion.a>

          <motion.a
            href="https://cal.com/docstar-team"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black hover:text-gray-600 font-semibold text-lg px-8 py-4 rounded-xl border-2 border-black hover:border-gray-600 transition-colors duration-300 bg-white"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            data-cursor-hover
          >
            Schedule Demo
          </motion.a>
        </motion.div>

        {/* Feature Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {[
            {
              icon: PenTool,
              title: "Turn Your Ideas into Documents Easily with AI",
              description:
                "Transform your raw thoughts into polished, well-structured documents—fast and accurately—with AI. Be your own writer, whether you're creating content for your product or for yourself.",
              path: "/documentation-with-ai",
            },
            {
              icon: Code,
              title: "Create API Documentation and Test APIs with DocStar",
              description:
                "Use DocStar's API documentation tool to generate beautiful, machine-readable documentation for your API, keep it up to date, and easily test your API—all in one place.",
              path: "/api-documentation",
            },
            {
              icon: Zap,
              title: "Publish Engaging Blogs to Grow Your Presence",
              description:
                "With DocStar's Blog View you can seamlessly format, organize, and share your content—making it engaging and accessible for your audience every time.",
              path: "/blogging",
            },
            {
              icon: Globe,
              title: "Build Your Simple and Personal Website",
              description:
                "Build your own personal website without needing a developer team or any coding skills—just your ideas and your unique way to showcase your vision to your audience.",
              path: "/simple-website",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-3xl p-8 shadow-lg border border-gray-200 text-left cursor-pointer"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center mr-4">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-black mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-700 mb-6 leading-relaxed">
                {feature.description}
              </p>
              <button
                onClick={() => navigate(feature.path)}
                className="inline-flex items-center text-black hover:text-gray-600 font-semibold transition-colors duration-200"
              >
                Learn more
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
