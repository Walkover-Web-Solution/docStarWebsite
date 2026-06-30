"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Globe, CheckCircle, Sparkles, ArrowRight, Languages, MessageSquare, Zap, Layout, Shield } from "lucide-react";
import Marquee from "react-fast-marquee";

const MultiLanguageClient = () => {
  const languages = [
    { flag: "🇮🇳", name: "Hindi", description: "Engage with the fastest-growing user base in India.", greeting: "नमस्ते" },
    { flag: "🇪🇸", name: "Spanish", description: "Connect across Spain and Latin America.", greeting: "Hola" },
    { flag: "🇫🇷", name: "French", description: "Deliver content for users in France, Canada, and Africa.", greeting: "Bonjour" },
    { flag: "🇩🇪", name: "German", description: "Provide localized experiences for Europe.", greeting: "Hallo" },
    { flag: "🇨🇳", name: "Chinese", description: "Reach the world's largest online population.", greeting: "你好" },
    { flag: "🇯🇵", name: "Japanese", description: "Cater to Japanese businesses with precision.", greeting: "こんにちは" },
    { flag: "🇸🇦", name: "Arabic", description: "Share content in right-to-left (RTL) format.", greeting: "مرحباً" },
    { flag: "🇵🇹", name: "Portuguese", description: "Support audiences in Portugal and Brazil.", greeting: "Olá" },
    { flag: "🇷🇺", name: "Russian", description: "Accessible to Russian-speaking communities.", greeting: "Привет" },
  ];

  const features = [
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Centralized Hub",
      description: "Manage all your language versions in one unified platform—no more scattered files.",
      color: "from-blue-500/20 to-cyan-500/20",
      iconColor: "text-blue-500"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Instant Switching",
      description: "Zero-latency language switching ensures a buttery smooth experience for your readers.",
      color: "from-purple-500/20 to-pink-500/20",
      iconColor: "text-purple-500"
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "AI Translations",
      description: "Leverage cutting-edge AI to instantly translate and localize your docs.",
      color: "from-orange-500/20 to-red-500/20",
      iconColor: "text-orange-500"
    },
    {
      icon: <Layout className="w-6 h-6" />,
      title: "Structural Sync",
      description: "Maintain perfect layout and formatting consistency across all localizations.",
      color: "from-green-500/20 to-emerald-500/20",
      iconColor: "text-green-500"
    },
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <div className="relative min-h-[90vh] flex items-center border-b theme-border overflow-hidden pt-20 pb-16">
        <div className="absolute inset-0 theme-bg-secondary">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--theme-bg)]/50 to-[var(--theme-bg)]"></div>
        </div>

        {/* Dynamic Background Orbs */}
        <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-[var(--theme-color)]/20 rounded-full blur-[100px]"
        />
        <motion.div 
          animate={{ scale: [1, 1.5, 1], rotate: [0, -90, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[100px]"
        />

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="max-w-2xl">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-6 inline-block"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border theme-border bg-background/50 backdrop-blur-xl shadow-sm hover:border-[var(--theme-color)] transition-colors">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--theme-color)] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-[var(--theme-color)]"></span>
                  </span>
                  <span className="text-sm font-semibold tracking-wide uppercase bg-clip-text text-transparent bg-gradient-to-r from-[var(--theme-color)] to-blue-500">
                    Global Reach Unleashed
                  </span>
                </div>
              </motion.div>

              <motion.h1
                className="text-5xl lg:text-7xl font-extrabold mb-6 leading-[1.1] tracking-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                Speak your <br />
                <span className="relative inline-block mt-2">
                  <span className="absolute -inset-2 bg-gradient-to-r from-[var(--theme-color)]/20 to-blue-500/20 blur-xl rounded-full"></span>
                  <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-[var(--theme-color)] via-blue-500 to-purple-500">
                    Users' Language
                  </span>
                </span>
              </motion.h1>

              <motion.p
                className="text-lg sm:text-xl opacity-70 mb-8 leading-relaxed max-w-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Break down borders with DocStar's ultra-fast, AI-powered multi-language support. Deliver native experiences to audiences worldwide without the operational headache.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-wrap gap-4"
              >
                <Link
                  href="https://app.docstar.io/login"
                  target="_blank"
                  className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-[var(--theme-color)] rounded-xl hover:scale-105 hover:shadow-[0_0_40px_rgba(var(--theme-color-rgb),0.4)] overflow-hidden"
                >
                  <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-black"></span>
                  <span className="relative flex items-center gap-2">
                    Go Global Today
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
                <Link
                  href="#features"
                  className="inline-flex items-center justify-center px-8 py-4 font-bold transition-all duration-200 border-2 theme-border rounded-xl hover:bg-[var(--theme-color)]/5 hover:border-[var(--theme-color)]/50"
                >
                  See Features
                </Link>
              </motion.div>
            </div>

            {/* Right Side Visuals */}
            <div className="relative hidden lg:block h-[500px]">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="absolute inset-0 grid grid-cols-2 gap-4 p-4"
              >
                {/* Floating Cards */}
                <motion.div 
                  animate={{ y: [0, -15, 0] }} 
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="col-span-2 bg-background/60 backdrop-blur-xl border theme-border rounded-2xl p-6 shadow-2xl relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-4xl">🇫🇷</span>
                      <div>
                        <div className="text-sm opacity-60">Translating to French</div>
                        <div className="font-bold">Introduction.md</div>
                      </div>
                    </div>
                    <div className="px-3 py-1 bg-green-500/20 text-green-500 rounded-full text-xs font-bold">100%</div>
                  </div>
                  <div className="h-2 w-full bg-background rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-green-400 to-emerald-500 w-full"></div>
                  </div>
                </motion.div>

                <motion.div 
                  animate={{ y: [0, 20, 0] }} 
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="bg-background/60 backdrop-blur-xl border theme-border rounded-2xl p-6 shadow-xl relative overflow-hidden group"
                >
                   <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                   <span className="text-5xl block mb-2">🇯🇵</span>
                   <div className="font-bold text-lg mb-1">Japanese</div>
                   <div className="text-sm opacity-60">こんにちは</div>
                </motion.div>

                <motion.div 
                  animate={{ y: [0, -20, 0] }} 
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  className="bg-[var(--theme-color)] text-white rounded-2xl p-6 shadow-xl relative overflow-hidden group flex flex-col justify-center items-center text-center"
                >
                  <Sparkles className="w-10 h-10 mb-3 opacity-80" />
                  <div className="font-bold text-xl">AI Powered</div>
                  <div className="text-sm opacity-80 mt-1">Zero effort translation</div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Marquee Section */}
      <div className="border-b theme-border bg-background/50 backdrop-blur-sm py-6 overflow-hidden">
        <Marquee gradient={true} gradientColor="var(--app-bg)" speed={40} className="overflow-hidden">
          {languages.map((lang, idx) => (
            <div key={idx} className="flex items-center gap-3 mx-8 opacity-60 hover:opacity-100 transition-opacity cursor-default">
              <span className="text-2xl">{lang.flag}</span>
              <span className="text-xl font-bold">{lang.greeting}</span>
              <span className="text-sm ml-2">({lang.name})</span>
            </div>
          ))}
        </Marquee>
      </div>

      {/* Bento Grid Features */}
      <div id="features" className="py-24 px-4 sm:px-6 relative">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-20">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold mb-6 tracking-tight"
            >
              Everything you need to <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--theme-color)] to-purple-500">go global</span>
            </motion.h2>
            <p className="text-lg md:text-xl opacity-60 max-w-2xl mx-auto">
              Our multi-language architecture is built for scale, speed, and simplicity.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`group relative p-8 rounded-3xl border theme-border theme-bg-secondary overflow-hidden ${index === 0 || index === 3 ? 'lg:col-span-2' : ''}`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                <div className="relative z-10">
                  <div className={`w-14 h-14 rounded-2xl bg-background border theme-border flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300 ${feature.iconColor}`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-base opacity-70 leading-relaxed max-w-md">{feature.description}</p>
                </div>
                {/* Decorative background element */}
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-background/50 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Languages Section */}
      <div className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--theme-color)]/5 to-transparent"></div>
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--theme-color)]/10 text-[var(--theme-color)] font-semibold text-sm mb-4">
                <Globe className="w-4 h-4" />
                <span>9+ Languages Out of the Box</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                Connect with every culture.
              </h2>
            </div>
            <p className="text-lg opacity-60 max-w-md">
              DocStar provides full support for the world's most widely spoken languages, handling RTL formatting, special characters, and SEO localization natively.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {languages.map((language, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group relative"
              >
                <div className="h-full p-6 rounded-3xl border theme-border theme-bg-secondary hover:border-[var(--theme-color)]/50 hover:bg-background transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-4xl group-hover:scale-125 transition-transform duration-300 origin-bottom-left">{language.flag}</span>
                    <span className="text-xs font-bold px-2 py-1 bg-background rounded-md opacity-50 group-hover:opacity-100">{language.greeting}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{language.name}</h3>
                  <p className="text-sm opacity-60">{language.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[var(--theme-color)]"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
        
        {/* Animated Background Rays */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/10 rounded-full blur-3xl animate-pulse"></div>

        <div className="container mx-auto relative px-4 sm:px-6 text-center z-10 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            <Shield className="w-16 h-16 text-white mb-8 opacity-90" />
            
            <h2 className="text-4xl md:text-6xl font-extrabold mb-6 text-white tracking-tight">
              Ready to break language barriers?
            </h2>

            <p className="text-xl text-white/80 mb-10 max-w-2xl leading-relaxed">
              Join thousands of global teams using DocStar to deliver world-class documentation in every language.
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 bg-white text-[var(--theme-color)] text-lg font-bold rounded-2xl shadow-2xl flex items-center gap-3 hover:bg-gray-50 transition-colors"
              onClick={() => window.open("https://app.docstar.io/login", "_blank")}
            >
              Start Localizing for Free
              <ArrowRight className="w-6 h-6" />
            </motion.button>
            <p className="text-white/60 text-sm mt-6">No credit card required. Setup in minutes.</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default MultiLanguageClient;
