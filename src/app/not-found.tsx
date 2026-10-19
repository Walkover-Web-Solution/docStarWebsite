import type { Metadata } from "next";
import { SiteFooter, SiteNav } from "@/components/site/SiteChrome";
import NotFoundBody from "@/components/site/NotFoundBody";
import { fontVars } from "@/components/site/fonts";
import "@/components/site/site.css";

export const metadata: Metadata = {
  title: "Page not found | DocStar",
  description: "The page you're looking for doesn't exist or has moved.",
  robots: { index: false, follow: true },
};

// 404 outside the (site) layout, so it brings its own nav and footer.
export default function NotFound() {
  return (
    <div className={`ds-site ${fontVars}`}>
      <SiteNav />
      <main>
        <NotFoundBody />
      </main>
      <SiteFooter />
    </div>
  );
}
