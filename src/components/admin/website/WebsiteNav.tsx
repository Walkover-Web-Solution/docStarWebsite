"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// Pages | Experiments | Autopilot | Blog, under the Website tab.
export default function WebsiteNav() {
  const pathname = usePathname();
  const tabs = [
    { href: "/admin/website", label: "Pages", on: !/^\/admin\/website\/(experiments|autopilot|blog)/.test(pathname) },
    { href: "/admin/website/experiments", label: "Experiments", on: pathname.startsWith("/admin/website/experiments") },
    { href: "/admin/website/autopilot", label: "Autopilot", on: pathname.startsWith("/admin/website/autopilot") },
    { href: "/admin/website/blog", label: "Blog", on: pathname.startsWith("/admin/website/blog") },
  ];
  return (
    <nav className="flex gap-1 text-sm" aria-label="Website sections">
      {tabs.map((t) => (
        <Link key={t.href} href={t.href} className={`rounded-md px-2.5 py-1 no-underline ${t.on ? "bg-[var(--ink)] text-[var(--card)]" : "text-[var(--a-muted)] hover:bg-[var(--a-hover)]"}`}>
          {t.label}
        </Link>
      ))}
    </nav>
  );
}
