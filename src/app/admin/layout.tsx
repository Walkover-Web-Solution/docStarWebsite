import type { Metadata } from "next";
import AdminShell from "@/components/admin/AdminShell";
import { fontVars } from "@/components/site/fonts";
import "@/components/site/site.css";
import "@/components/admin/admin.css";

export const runtime = "edge";

export const metadata: Metadata = {
  title: "DocStar admin",
  robots: { index: false, follow: false },
};

// DocStar's internal admin, on the website. Everything inside is rendered in the browser and
// talks to hitman-api with the signed-in admin's token.
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`ds-site ds-admin ${fontVars}`}>
      <AdminShell>{children}</AdminShell>
    </div>
  );
}
