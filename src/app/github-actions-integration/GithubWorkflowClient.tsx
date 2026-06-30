"use client";

import { motion } from "framer-motion";
import {
  Github,
  Terminal,
  Lock,
  GitCommit,
  FolderTree,
  FileText,
  Workflow,
  CheckCircle,
  Zap,
  ArrowRight,
  Code2,
  Cpu,
} from "lucide-react";
import Link from "next/link";
import CTASection from "@/components/CTASection";

const TerminalWindow = ({ title, children, className = "" }: { title: string, children: React.ReactNode, className?: string }) => (
  <div className={`rounded-xl overflow-hidden border theme-border shadow-2xl bg-[#0d1117] ${className}`}>
    <div className="flex items-center px-4 py-3 bg-[#161b22] border-b border-gray-800">
      <div className="flex space-x-2">
        <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
        <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
        <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
      </div>
      <div className="mx-auto text-xs font-mono text-gray-500 flex items-center gap-2">
        <Terminal className="w-3 h-3" />
        {title}
      </div>
    </div>
    <div className="p-5 font-mono text-sm text-gray-300 overflow-x-auto leading-relaxed">
      {children}
    </div>
  </div>
);

export const GithubWorkflowClient = () => {
  const rules = [
    "Do use page.md for folder-level content.",
    "Do include YAML frontmatter in every file.",
    "Do use type: endpoint for API documentation.",
    "Do maintain a clean folder hierarchy.",
    "Don't use characters other than a-z, 0-9, -, and _ in file/folder names.",
  ];

  return (
    <>
      {/* Hero Section */}
      <div className="relative min-h-[75vh] flex items-center border-b theme-border overflow-hidden">
        <div className="absolute inset-0 theme-bg-secondary">
          {/* Subtle Grid Background */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--theme-bg)] to-transparent"></div>
        </div>

        {/* Floating elements */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-[var(--theme-color)]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center pt-20 pb-16">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border theme-border mb-6 bg-[var(--theme-bg)] shadow-sm backdrop-blur-md">
                <Github className="w-4 h-4 text-[var(--theme-color)]" />
                <span className="text-xs font-semibold tracking-wide uppercase">
                  Native GitHub Actions
                </span>
              </div>

              <h1 className="h1 mb-6 leading-tight">
                Your Code & Docs. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-bl from-blue-200 to-blue-500">
                  In Perfect Sync.
                </span>
              </h1>

              <p className="text-base sm:text-lg opacity-70 mb-8 leading-relaxed max-w-xl">
                The DocStar GitHub workflow automatically syncs markdown documentation from your repository's <code className="px-1.5 py-0.5 rounded bg-[var(--theme-bg)] border theme-border text-xs">docs/</code> directory directly to your DocStar collection on every single push.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="https://app.docstar.io/login"
                  target="_blank"
                  className="btn btn-primary shadow-lg shadow-[var(--theme-color)]/20"
                >
                  Get API Key to Start
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
                <a href="#setup" className="btn btn-outline">
                  View Setup Guide
                </a>
              </div>
            </motion.div>

            {/* Hero Visual */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--theme-color)]/20 to-blue-500/20 rounded-2xl transform rotate-3 scale-105 blur-xl"></div>
              <TerminalWindow title="github-action.yml" className="relative z-10 transform -rotate-2 hover:rotate-0 transition-all duration-500">
                <span className="text-pink-400">name:</span> <span className="text-green-300">DocStar Sync</span>{"\n"}
                <span className="text-pink-400">on:</span>{"\n"}
                {"  "}<span className="text-pink-400">push:</span>{"\n"}
                {"    "}<span className="text-pink-400">branches:</span> <span className="text-blue-300">[main]</span>{"\n\n"}
                <span className="text-pink-400">jobs:</span>{"\n"}
                {"  "}<span className="text-pink-400">sync:</span>{"\n"}
                {"    "}<span className="text-pink-400">runs-on:</span> <span className="text-blue-300">ubuntu-latest</span>{"\n"}
                {"    "}<span className="text-pink-400">steps:</span>{"\n"}
                {"      "}<span className="text-gray-500"># Triggers the push to DocStar API</span>{"\n"}
                {"      "}<span className="text-pink-400">- name:</span> <span className="text-green-300">Sync to DocStar</span>{"\n"}
                {"        "}<span className="text-pink-400">uses:</span> <span className="text-blue-300">docstar-io/sync-action@v1</span>{"\n"}
                {"        "}<span className="text-pink-400">with:</span>{"\n"}
                {"          "}<span className="text-pink-400">api-key:</span> <span className="text-purple-300">{"${{"} secrets.DOCSTAR_API_KEY {"}}"}</span>
              </TerminalWindow>
              
              {/* Floating Badge */}
              <div className="absolute -bottom-6 -left-6 p-4 rounded-xl theme-bg-secondary border theme-border shadow-xl flex items-center gap-4 z-20 animate-bounce" style={{ animationDuration: '3s'}}>
                <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider">Status</p>
                  <p className="text-sm font-medium opacity-80">Synced Successfully</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="container mx-auto" id="setup">
        {/* Setup Steps Pipeline */}
        <div className="py-16 md:py-24 px-4 sm:px-6 relative">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-semibold mb-4 tracking-tight">
              Three Steps to Automate
            </h2>
            <p className="text-base md:text-lg opacity-60 leading-relaxed">
              Integrate the DocStar sync into your repository in minutes.
            </p>
          </div>

          <div className="space-y-12 md:space-y-24 relative">
            {/* Vertical connector line for desktop */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[var(--theme-border-color)] to-transparent -translate-x-1/2"></div>

            {/* Step 1 */}
            <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center relative z-10">
              <div className="md:text-right order-2 md:order-1">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[var(--theme-color)]/10 text-[var(--theme-color)] mb-6 shadow-[0_0_30px_rgba(var(--theme-color-rgb),0.2)]">
                  <Terminal className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold mb-4">1. Generate Workflow</h3>
                <p className="opacity-70 text-base leading-relaxed max-w-md ml-auto">
                  Run the provided command in your project root to download the GitHub Action workflow file directly into your <code className="px-1.5 py-0.5 rounded theme-bg-secondary text-xs">.github/workflows</code> directory.
                </p>
              </div>
              <div className="order-1 md:order-2">
                <TerminalWindow title="bash">
                  <span className="text-gray-500"># Create workflow directory</span>{"\n"}
                  <span className="text-green-300">mkdir</span> -p .github/workflows{"\n\n"}
                  
                  <span className="text-gray-500"># Download workflow yaml</span>{"\n"}
                  <span className="text-green-300">curl</span> "https://api.docstar.io/p/generate-docstar-workflow/&lt;collectionId&gt;?branch=main" -o .github/workflows/docstar.yml{"\n\n"}
                  
                  <span className="text-gray-500"># Download format specification</span>{"\n"}
                  <span className="text-green-300">curl</span> "https://api.docstar.io/docstar.md" -o docstar.md
                </TerminalWindow>
              </div>
            </div>

            {/* Step 2 */}
            <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center relative z-10">
              <div className="order-2">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 mb-6 shadow-[0_0_30px_rgba(245,158,11,0.2)]">
                  <Lock className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold mb-4">2. Configure Secrets</h3>
                <p className="opacity-70 text-base leading-relaxed max-w-md">
                  The workflow requires an API key to securely communicate with the DocStar backend. Go to <strong className="text-[var(--theme-color)]">Settings &gt; Secrets and variables &gt; Actions</strong> in your repo and add it.
                </p>
              </div>
              <div className="order-1 relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-[var(--theme-color)]/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="p-8 rounded-2xl border theme-border theme-bg-secondary relative z-10 shadow-xl">
                  <div className="flex justify-between items-center mb-6 pb-4 border-b theme-border">
                    <span className="font-medium">Repository secrets</span>
                    <button className="px-3 py-1.5 rounded-md bg-green-600 text-white text-xs font-semibold">New repository secret</button>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 rounded-lg border theme-border bg-[var(--theme-bg)]">
                      <span className="font-mono text-sm font-bold">DOCSTAR_API_KEY</span>
                      <span className="text-xs opacity-50 px-2 py-1 rounded bg-gray-800">Added just now</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center relative z-10">
              <div className="md:text-right order-2 md:order-1">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-500 mb-6 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                  <GitCommit className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold mb-4">3. Commit & Push</h3>
                <p className="opacity-70 text-base leading-relaxed max-w-md ml-auto">
                  Commit the new workflow file. Once pushed, any subsequent changes to markdown files inside your <code className="px-1.5 py-0.5 rounded theme-bg-secondary text-xs">docs/</code> directory will automatically trigger the GitHub Action.
                </p>
              </div>
              <div className="order-1 md:order-2">
                <TerminalWindow title="bash">
                  <span className="text-green-300">git</span> add .github/workflows/docstar.yml{"\n"}
                  <span className="text-green-300">git</span> commit -m <span className="text-amber-300">"Add DocStar sync workflow"</span>{"\n"}
                  <span className="text-green-300">git</span> push origin main{"\n\n"}
                  <span className="text-gray-500"># 🚀 Automation takes over from here!</span>
                </TerminalWindow>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Specification Section */}
        <div className="py-16 md:py-24 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--theme-border-color)]/20 to-transparent"></div>
          
          <div className="relative z-10 px-4 sm:px-6">
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-500 mb-4">
                <Cpu className="w-6 h-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-semibold mb-4 tracking-tight">
                Synchronization Format
              </h2>
              <p className="text-base md:text-lg opacity-60 max-w-2xl mx-auto">
                Docstar synchronizes via a GitHub Action that sends a JSON payload to our import endpoints. Here is how your repository must be structured.
              </p>
            </div>

            <div className="grid lg:grid-cols-12 gap-8 max-w-6xl mx-auto">
              {/* Directory Structure - Bento Box left */}
              <div className="lg:col-span-5 p-1 rounded-2xl bg-gradient-to-b from-[var(--theme-border-color)] to-transparent">
                <div className="h-full p-6 md:p-8 rounded-xl bg-[var(--theme-bg)] flex flex-col">
                  <div className="flex items-center gap-3 mb-6">
                    <FolderTree className="w-6 h-6 text-[var(--theme-color)]" />
                    <h3 className="text-xl font-bold">1. Directory Structure</h3>
                  </div>
                  <p className="opacity-70 text-sm mb-6 flex-1">
                    Folders represent categories. Files represent individual pages. If a folder contains a <code className="text-[var(--theme-color)] font-mono">page.md</code>, it acts as the parent content.
                  </p>
                  
                  <div className="p-5 rounded-lg bg-[#0d1117] border border-gray-800 font-mono text-sm overflow-x-auto shadow-inner">
                    <div className="text-blue-300 font-bold flex items-center gap-2 mb-2"><FolderTree className="w-4 h-4"/> docs/</div>
                    <div className="pl-4 border-l border-gray-800 ml-2 space-y-2">
                      <div className="flex items-center gap-2 text-gray-300"><FileText className="w-3.5 h-3.5 text-gray-500"/> getting-started.md</div>
                      <div className="text-blue-300 font-bold flex items-center gap-2 mt-3"><FolderTree className="w-4 h-4"/> api/</div>
                      <div className="pl-4 border-l border-gray-800 ml-2 space-y-2 mt-2">
                        <div className="flex items-center gap-2 text-[var(--theme-color)]"><FileText className="w-3.5 h-3.5"/> page.md</div>
                        <div className="flex items-center gap-2 text-gray-300"><FileText className="w-3.5 h-3.5 text-gray-500"/> auth.md</div>
                        <div className="text-blue-300 font-bold flex items-center gap-2 mt-3"><FolderTree className="w-4 h-4"/> users/</div>
                        <div className="pl-4 border-l border-gray-800 ml-2 mt-2">
                          <div className="flex items-center gap-2 text-gray-300"><FileText className="w-3.5 h-3.5 text-gray-500"/> create.md</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* File Format - Bento Box right */}
              <div className="lg:col-span-7 flex flex-col gap-8">
                <div className="p-1 rounded-2xl bg-gradient-to-b from-[var(--theme-border-color)] to-transparent flex-1">
                  <div className="h-full p-6 md:p-8 rounded-xl bg-[var(--theme-bg)]">
                    <div className="flex items-center gap-3 mb-6">
                      <Code2 className="w-6 h-6 text-[var(--theme-color)]" />
                      <h3 className="text-xl font-bold">2. File Format & Frontmatter</h3>
                    </div>
                    <p className="opacity-70 text-sm mb-6">
                      Files must use the <code className="text-[var(--theme-color)] font-mono">.md</code> extension and include a YAML frontmatter section to dictate how the content is parsed.
                    </p>
                    
                    <div className="grid sm:grid-cols-2 gap-6">
                      <TerminalWindow title="getting-started.md">
                        <span className="text-gray-500">---</span>{"\n"}
                        <span className="text-pink-400">type:</span> <span className="text-blue-300">page</span>{"\n"}
                        <span className="text-pink-400">title:</span> <span className="text-green-300">Getting Started</span>{"\n"}
                        <span className="text-pink-400">published:</span> <span className="text-amber-300">true</span>{"\n"}
                        <span className="text-gray-500">---</span>{"\n\n"}
                        <span className="text-blue-400 font-bold"># Welcome</span>{"\n"}
                        <span className="text-gray-300">This is the content...</span>
                      </TerminalWindow>

                      <TerminalWindow title="users/create.md">
                        <span className="text-gray-500">---</span>{"\n"}
                        <span className="text-pink-400">type:</span> <span className="text-amber-400">endpoint</span>{"\n"}
                        <span className="text-pink-400">title:</span> <span className="text-green-300">Create User</span>{"\n"}
                        <span className="text-gray-500">---</span>{"\n"}
                        <span className="text-pink-400">post:</span> <span className="text-blue-300">/users</span>{"\n"}
                        <span className="text-pink-400">summary:</span> <span className="text-gray-300">New user</span>
                      </TerminalWindow>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* AI Rules Section - Premium Glowing Card */}
        <div className="py-16 md:py-24 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--theme-color)] to-blue-500 rounded-3xl blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-700"></div>
            
            <div className="relative p-8 md:p-12 rounded-3xl bg-[var(--theme-bg)] border theme-border overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <Zap className="w-48 h-48" />
              </div>
              
              <div className="flex items-center gap-4 mb-8 relative z-10">
                <div className="w-12 h-12 rounded-xl bg-[var(--theme-color)]/10 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-[var(--theme-color)]" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold">Summary of Rules for AI</h3>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-4 relative z-10">
                {rules.map((rule, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-4 rounded-xl theme-bg-secondary border theme-border hover:-translate-y-1 transition-transform duration-300 shadow-sm">
                    <CheckCircle className="w-6 h-6 flex-shrink-0 text-emerald-500 mt-0.5" />
                    <p className="text-sm font-medium opacity-90 leading-relaxed">{rule}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <CTASection
          title="Ready to Sync Your Repository?"
          description="Keep your codebase and documentation in perfect harmony. Set up the GitHub Action today and let automation do the heavy lifting."
          buttonText="Start Automating"
        />
      </div>
    </>
  );
};
