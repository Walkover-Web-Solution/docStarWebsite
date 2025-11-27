import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

export const runtime = "edge";

export const metadata: Metadata = {
  title: "Docstar: AI-Powered Documentation Platform",
  description: "The platform that turns documentation into team culture",
  icons: {
    icon: "/faviconNew.ico",
    shortcut: "/faviconNew.ico",
    apple: "/faviconNew.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Navbar />
        <ScrollToTop />
        {children}
        <Footer />
      </body>
    </html>
  );
}
