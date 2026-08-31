"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
    Terminal,
    Zap,
    Compass,
    Folder,
    FolderTree,
    ShieldCheck,
    RefreshCw,
    ArrowRight,
    Check,
    Copy,
    X,
    Github,
    Package,
    Bot,
    Globe,
    Code2,
} from "lucide-react";
import Link from "next/link";
import CTASection from "@/components/CTASection";

const NPM_INSTALL = "npm install -g docstar-cli";
const GITHUB_URL = "https://github.com/swayammaheshwari/docstar-cli";
const NPM_URL = "https://www.npmjs.com/package/docstar-cli";

const TerminalWindow = ({
    title,
    children,
    className = "",
}: {
    title: string;
    children: React.ReactNode;
    className?: string;
}) => (
    <div
        className={`rounded-xl overflow-hidden border theme-border shadow-2xl bg-[#0d1117] ${className}`}
    >
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
        <div className="p-5 font-mono text-sm text-gray-300 overflow-x-auto leading-relaxed whitespace-pre">
            {children}
        </div>
    </div>
);

const CopyInstallButton = () => {
    const [copied, setCopied] = useState(false);

    const copy = async () => {
        try {
            await navigator.clipboard.writeText(NPM_INSTALL);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            setCopied(false);
        }
    };

    return (
        <button
            type="button"
            onClick={copy}
            className="inline-flex items-center gap-3 px-4 py-3 rounded-xl bg-[#0d1117] border theme-border font-mono text-sm text-gray-200 hover:border-[var(--theme-color)]/50 transition-colors shadow-lg"
            aria-label="Copy npm install command"
        >
            <span className="text-emerald-400">$</span>
            <span>{NPM_INSTALL}</span>
            {copied ? (
                <Check className="w-4 h-4 text-emerald-400" />
            ) : (
                <Copy className="w-4 h-4 text-gray-500" />
            )}
        </button>
    );
};

const steps = [
    {
        n: "1",
        title: "Point it at your docs",
        description: "Run init against any DocStar site.",
        titleBar: "zsh — init",
        icon: <Terminal className="w-6 h-6" />,
        iconClass: "bg-[var(--theme-color)]/10 text-[var(--theme-color)] shadow-[0_0_30px_rgba(var(--theme-color-rgb),0.2)]",
        code: (
            <>
                <span className="text-emerald-400">$</span>{" "}
                <span className="text-blue-300">docstar-cli</span>{" "}
                <span className="text-pink-400">init</span>{" "}
                <span className="text-amber-300">docs.msg91.com</span>
            </>
        ),
    },
    {
        n: "2",
        title: "Pick your modules",
        description:
            "An interactive checklist shows every published module — pick what you need.",
        titleBar: "zsh — modules",
        icon: <Package className="w-6 h-6" />,
        iconClass: "bg-teal-500/10 text-teal-500 shadow-[0_0_30px_rgba(20,184,166,0.2)]",
        code: (
            <>
                <span className="text-emerald-400">◉</span> Payments{" "}
                <span className="text-gray-500">(payments)</span>
                {"\n"}
                <span className="text-emerald-400">◉</span> Auth{" "}
                <span className="text-gray-500">(auth)</span>
            </>
        ),
    },
    {
        n: "3",
        title: "List what's installed",
        description: "Every module gets its own list command.",
        titleBar: "zsh — list",
        icon: <FolderTree className="w-6 h-6" />,
        iconClass: "bg-[var(--theme-color)]/10 text-[var(--theme-color)] shadow-[0_0_30px_rgba(var(--theme-color-rgb),0.2)]",
        code: (
            <>
                <span className="text-emerald-400">$</span>{" "}
                <span className="text-blue-300">docstar-cli</span> payments{" "}
                <span className="text-pink-400">list</span>
            </>
        ),
    },
    {
        n: "4",
        title: "Call it directly",
        description:
            "Pass flags, or leave them out and get prompted for what's required.",
        titleBar: "zsh — charge",
        icon: <Zap className="w-6 h-6" />,
        iconClass: "bg-teal-500/10 text-teal-500 shadow-[0_0_30px_rgba(20,184,166,0.2)]",
        code: (
            <>
                <span className="text-emerald-400">$</span>{" "}
                <span className="text-blue-300">docstar-cli</span> payments charge \
                {"\n"}
                {"  "}
                <span className="text-pink-400">--MY_SECRET_KEY</span>{" "}
                <span className="text-amber-300">&quot;sk_live_...&quot;</span>
            </>
        ),
    },
];

const features = [
    {
        icon: <Zap className="w-6 h-6" />,
        title: "Zero-boilerplate calls",
        description:
            "Method, URL, headers, and body are all derived from the published endpoint — you just supply the values.",
    },
    {
        icon: <Compass className="w-6 h-6" />,
        title: "Interactive by default",
        description:
            "Skip a required flag and the CLI will ask for it, so a command works even before you've read the docs.",
    },
    {
        icon: <Folder className="w-6 h-6" />,
        title: "Local-first",
        description:
            "Modules are saved to ~/.docstar after install — no round-trip to the docs site to run a command.",
    },
    {
        icon: <FolderTree className="w-6 h-6" />,
        title: "Organized by module",
        description:
            "Every module gets its own command namespace, plus a list command to browse it.",
    },
    {
        icon: <ShieldCheck className="w-6 h-6" />,
        title: "Safe by design",
        description:
            "Only published, non-deleted endpoints are exposed — never drafts, internal notes, or raw credentials.",
    },
    {
        icon: <RefreshCw className="w-6 h-6" />,
        title: "Always in sync",
        description: "Re-run init any time to pick up newly published endpoints.",
    },
];

const underTheHood = [
    {
        icon: <Globe className="w-6 h-6" />,
        title: "Reads your docs site once",
        description:
            "init calls your DocStar site's module.json endpoints to fetch the collection's modules and each one's endpoint contract — method, URL, headers, body, and parameter names.",
    },
    {
        icon: <Folder className="w-6 h-6" />,
        title: "Caches contracts locally",
        description:
            "Every contract is saved to disk. Running a command builds the real HTTP request from that local copy — no network round-trip to the docs site.",
    },
    {
        icon: <Code2 className="w-6 h-6" />,
        title: "Generates real commands",
        description:
            "Each endpoint becomes an actual file on disk, so a command like docstar-cli payments charge is a real, inspectable CLI command — not a dynamic dispatcher.",
    },
];

export default function DocstarCli() {
    return (
        <>
            <div className="relative min-h-[75vh] flex items-center border-b theme-border overflow-hidden">
                <div className="absolute inset-0 theme-bg-secondary">
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--theme-bg)] to-transparent"></div>
                </div>

                <div className="absolute top-20 right-10 w-72 h-72 bg-[var(--theme-color)]/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 left-10 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

                <div className="container mx-auto px-4 sm:px-6 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-12 items-center pt-20 pb-16">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            className="max-w-2xl"
                        >
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border theme-border mb-6 bg-[var(--theme-bg)] shadow-sm backdrop-blur-md">
                                <Terminal className="w-4 h-4 text-[var(--theme-color)]" />
                                <span className="text-xs font-semibold tracking-wide uppercase">
                                    Turn published docs into runnable commands
                                </span>
                            </div>

                            <h1 className="h1 mb-6 leading-tight">
                                Your API docs,{" "}
                                <span className="text-transparent bg-clip-text bg-gradient-to-bl from-[var(--theme-color)] to-teal-500">
                                    now a terminal command.
                                </span>
                            </h1>

                            <p className="text-base sm:text-lg opacity-70 mb-8 leading-relaxed max-w-xl">
                                docstar-cli reads a DocStar docs site, discovers its published
                                modules and endpoints, and installs each one as a real CLI
                                command — required parameters and all.
                            </p>

                            <div className="flex flex-wrap items-center gap-4 mb-6">
                                <a href="#how-it-works" className="btn btn-primary shadow-lg shadow-[var(--theme-color)]/20">
                                    See how it works
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </a>
                                <a href="#features" className="btn btn-outline">
                                    Explore features
                                </a>
                            </div>

                            <CopyInstallButton />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="relative hidden lg:block"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-[var(--theme-color)]/20 to-teal-500/20 rounded-2xl transform rotate-3 scale-105 blur-xl"></div>
                            <TerminalWindow
                                title="zsh — docstar-cli"
                                className="relative z-10 transform -rotate-2 hover:rotate-0 transition-all duration-500"
                            >
                                <span className="text-gray-500"># Install from any DocStar site</span>
                                {"\n"}
                                <span className="text-emerald-400">$</span>{" "}
                                <span className="text-blue-300">docstar-cli</span>{" "}
                                <span className="text-pink-400">init</span>{" "}
                                <span className="text-amber-300">docs.msg91.com</span>
                                {"\n\n"}
                                <span className="text-gray-500"># Call a published endpoint</span>
                                {"\n"}
                                <span className="text-emerald-400">$</span>{" "}
                                <span className="text-blue-300">docstar-cli</span> payments charge
                                {"\n"}
                                <span className="text-teal-300">? Enter value for MY_SECRET_KEY</span>{" "}
                                <span className="text-white">▊</span>
                            </TerminalWindow>

                            <div
                                className="absolute -bottom-6 -left-6 p-4 rounded-xl theme-bg-secondary border theme-border shadow-xl flex items-center gap-4 z-20 animate-bounce"
                                style={{ animationDuration: "3s" }}
                            >
                                <div className="w-10 h-10 rounded-full bg-teal-500/20 flex items-center justify-center">
                                    <Terminal className="w-5 h-5 text-teal-500" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-wider">
                                        Live API call
                                    </p>
                                    <p className="text-sm font-medium opacity-80">No SDK required</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto">
                <div className="py-16 md:py-24 px-4 sm:px-6 relative" id="how-it-works">
                    <div className="text-center mb-16 max-w-3xl mx-auto">
                        <p className="text-xs font-semibold tracking-wide uppercase opacity-50 mb-3">
                            How it works
                        </p>
                        <h2 className="text-3xl md:text-4xl font-semibold mb-4 tracking-tight">
                            From docs site to terminal command in four steps
                        </h2>
                        <p className="text-base md:text-lg opacity-60 leading-relaxed">
                            No SDKs to install, no request-building boilerplate — the CLI does
                            that for you.
                        </p>
                    </div>

                    <div className="space-y-12 md:space-y-20 relative max-w-5xl mx-auto">
                        {/* Vertical connector line for desktop */}
                        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[var(--theme-border-color)] to-transparent -translate-x-1/2"></div>

                        {steps.map((step, index) => {
                            const textLeft = index % 2 === 0;
                            return (
                                <motion.div
                                    key={step.n}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.08 }}
                                    className="grid md:grid-cols-2 gap-8 md:gap-16 items-center relative z-10"
                                >
                                    <div
                                        className={
                                            textLeft
                                                ? "md:text-right order-2 md:order-1"
                                                : "order-2"
                                        }
                                    >
                                        <div
                                            className={`inline-flex items-center justify-center w-12 h-12 rounded-2xl mb-6 ${step.iconClass}`}
                                        >
                                            {step.icon}
                                        </div>
                                        <h3 className="text-2xl font-bold mb-4">
                                            {step.n}. {step.title}
                                        </h3>
                                        <p
                                            className={`opacity-70 text-base leading-relaxed max-w-md ${
                                                textLeft ? "ml-auto" : ""
                                            }`}
                                        >
                                            {step.description}
                                        </p>
                                    </div>
                                    <div className={textLeft ? "order-1 md:order-2" : "order-1"}>
                                        <TerminalWindow title={step.titleBar}>{step.code}</TerminalWindow>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                    <p className="text-center text-xs sm:text-sm font-mono opacity-50 mt-16 px-4">
                        docs.msg91.com → module.json → ~/.docstar/ → real CLI command → live
                        API call
                    </p>
                </div>

                <div className="py-16 md:py-24 relative" id="features">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--theme-border-color)]/20 to-transparent"></div>

                    <div className="relative z-10 px-4 sm:px-6">
                        <div className="text-center mb-16">
                            <p className="text-xs font-semibold tracking-wide uppercase opacity-50 mb-3">
                                Under the hood
                            </p>
                            <h2 className="text-3xl md:text-4xl font-semibold mb-4 tracking-tight">
                                Built for how APIs are actually documented
                            </h2>
                        </div>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                            {features.map((feature, index) => (
                                <motion.div
                                    key={feature.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.06 }}
                                    className="group relative"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-[var(--theme-color)]/20 to-teal-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                    <div className="h-full p-6 md:p-8 rounded-2xl border theme-border theme-bg-secondary relative z-10 hover:-translate-y-1 transition-transform duration-300 shadow-sm">
                                        <div className="w-14 h-14 rounded-xl bg-[var(--theme-color)]/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 text-[var(--theme-color)]">
                                            {feature.icon}
                                        </div>
                                        <h3 className="text-xl font-bold mb-3 leading-tight">
                                            {feature.title}
                                        </h3>
                                        <p className="text-sm opacity-70 leading-relaxed">
                                            {feature.description}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="py-16 md:py-24 px-4 sm:px-6 relative">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--theme-border-color)]/20 to-transparent"></div>

                    <div className="relative z-10">
                        <div className="text-center mb-16 max-w-3xl mx-auto">
                            <p className="text-xs font-semibold tracking-wide uppercase opacity-50 mb-3">
                                Under the hood
                            </p>
                            <h2 className="text-3xl md:text-4xl font-semibold mb-4 tracking-tight">
                                Local-first, after one lookup
                            </h2>
                            <p className="text-base md:text-lg opacity-60 leading-relaxed">
                                init fetches each endpoint&apos;s contract once. Every call after that
                                runs entirely from your machine.
                            </p>
                        </div>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                            {underTheHood.map((item, index) => (
                                <motion.div
                                    key={item.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.08 }}
                                    className="group relative"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-[var(--theme-color)]/20 to-teal-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                    <div className="h-full p-6 md:p-8 rounded-2xl border theme-border theme-bg-secondary relative z-10 hover:-translate-y-1 transition-transform duration-300 shadow-sm">
                                        <div className="w-14 h-14 rounded-xl bg-[var(--theme-color)]/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 text-[var(--theme-color)]">
                                            {item.icon}
                                        </div>
                                        <h3 className="text-xl font-bold mb-3 leading-tight">
                                            {item.title}
                                        </h3>
                                        <p className="text-sm opacity-70 leading-relaxed">
                                            {item.description}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="py-8 md:py-16 px-4 sm:px-6">
                    <div className="max-w-4xl mx-auto relative group">
                        <div className="absolute inset-0 bg-gradient-to-r from-[var(--theme-color)] to-teal-500 rounded-3xl blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-700"></div>

                        <div className="relative p-8 md:p-12 rounded-3xl bg-[var(--theme-bg)] border theme-border overflow-hidden">
                            <div className="absolute top-0 right-0 p-8 opacity-10">
                                <Bot className="w-48 h-48" />
                            </div>

                            <div className="flex items-center gap-4 mb-6 relative z-10">
                                <div className="w-12 h-12 rounded-xl bg-[var(--theme-color)]/10 flex items-center justify-center">
                                    <Bot className="w-6 h-6 text-[var(--theme-color)]" />
                                </div>
                                <h3 className="text-2xl md:text-3xl font-bold">
                                    Use it from an AI client
                                </h3>
                            </div>
                            <p className="text-sm md:text-base opacity-70 mb-6 max-w-2xl relative z-10 leading-relaxed">
                                Run <code className="px-1.5 py-0.5 rounded theme-bg-secondary text-xs font-mono">docstar-cli mcp</code>{" "}
                                to expose every installed endpoint as an MCP tool. Agents can call
                                your published APIs directly — no shell copy-paste required.
                            </p>
                            <p className="text-sm opacity-60 mb-6 max-w-2xl relative z-10 leading-relaxed">
                                Each endpoint becomes one tool named{" "}
                                <code className="px-1.5 py-0.5 rounded theme-bg-secondary text-xs font-mono">
                                    &lt;cli-name&gt;__&lt;module&gt;__&lt;command&gt;
                                </code>
                                , with its parameters exposed in the tool schema. Run{" "}
                                <code className="px-1.5 py-0.5 rounded theme-bg-secondary text-xs font-mono">docstar-cli init</code>{" "}
                                first so there&apos;s at least one installed module for it to expose.
                            </p>
                            <TerminalWindow title="claude_desktop_config.json" className="relative z-10">
                                <span className="text-gray-500">{"{"}</span>
                                {"\n"}
                                {"  "}
                                <span className="text-pink-400">&quot;mcpServers&quot;</span>
                                <span className="text-gray-500">: {"{"}</span>
                                {"\n"}
                                {"    "}
                                <span className="text-pink-400">&quot;docstar&quot;</span>
                                <span className="text-gray-500">: {"{"}</span>
                                {"\n"}
                                {"      "}
                                <span className="text-pink-400">&quot;command&quot;</span>
                                <span className="text-gray-500">:</span>{" "}
                                <span className="text-green-300">&quot;docstar-cli&quot;</span>
                                <span className="text-gray-500">,</span>
                                {"\n"}
                                {"      "}
                                <span className="text-pink-400">&quot;args&quot;</span>
                                <span className="text-gray-500">:</span>{" "}
                                <span className="text-green-300">[&quot;mcp&quot;]</span>
                                {"\n"}
                                {"    "}
                                <span className="text-gray-500">{"}"}</span>
                                {"\n"}
                                {"  "}
                                <span className="text-gray-500">{"}"}</span>
                                {"\n"}
                                <span className="text-gray-500">{"}"}</span>
                            </TerminalWindow>
                        </div>
                    </div>
                </div>

                <div className="py-16 md:py-24 px-4 sm:px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-semibold mb-4 tracking-tight">
                        Install it and try it on your own docs
                    </h2>
                    <p className="text-base md:text-lg opacity-60 mb-8">
                        Works with any DocStar-published documentation site.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-4 mb-6">
                        <CopyInstallButton />
                        <Link
                            href={GITHUB_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-outline inline-flex items-center gap-2"
                        >
                            <Github className="w-4 h-4" />
                            View source on GitHub
                        </Link>
                        <Link
                            href={NPM_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-outline inline-flex items-center gap-2"
                        >
                            <Package className="w-4 h-4" />
                            npm
                        </Link>
                    </div>
                    <p className="text-xs opacity-50">docstar-cli — built on oclif</p>
                </div>

                <CTASection
                    title="Publish docs, then call them from the terminal"
                    description="Ship your API docs on DocStar, then install docstar-cli and turn every published endpoint into a command."
                    buttonText="Get started with DocStar"
                />
            </div>
        </>
    );
}
