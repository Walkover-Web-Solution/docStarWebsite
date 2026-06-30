import type { Metadata } from "next";
import "../scss/_import.scss";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import ThemeScript from "@/components/ThemeScript";

export const runtime = "edge";

export const metadata: Metadata = {
  title: "Docstar: AI-Powered Documentation Platform",
  description: "The platform that turns documentation into team culture",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <ThemeScript />
      </head>
      <body className="antialiased overflow-x-hidden flex flex-col min-h-screen">
        <Navbar />
        <ScrollToTop />
        <main className="flex-1 overflow-x-hidden">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
