import { SiteFooter, SiteNav } from "@/components/site/SiteChrome";
import SiteAnalytics from "@/components/site/SiteAnalytics";
import { fontVars } from "@/components/site/fonts";
import "@/components/site/site.css";

// New website (agent-first). Pages here render from src/content and share one look.
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`ds-site ${fontVars}`}>
      <SiteNav />
      <main>{children}</main>
      <SiteFooter />
      <SiteAnalytics />
    </div>
  );
}
