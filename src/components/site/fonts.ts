import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";

const display = Space_Grotesk({ subsets: ["latin"], weight: ["500", "700"], variable: "--font-display" });
const sans = Inter({ subsets: ["latin"], variable: "--font-sans" });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "600"], variable: "--font-mono" });

// Font CSS variables used by .ds-site (website and admin).
export const fontVars = `${display.variable} ${sans.variable} ${mono.variable}`;
