"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { flush, track } from "@/lib/analytics";

// Page views, sections seen, CTA clicks and sign-up clicks: only what the admin's Analytics tab uses.
// Clicks are picked up from data-cta / data-placement attributes, so content stays the source.
export default function SiteAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    track("page.viewed");

    // sections seen: at least half visible for 800ms, once per page view
    const seen = new Set<string>();
    const timers = new Map<Element, ReturnType<typeof setTimeout>>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const key = (entry.target as HTMLElement).dataset.section;
          if (!key || seen.has(key)) continue;
          if (entry.isIntersecting) {
            timers.set(
              entry.target,
              setTimeout(() => {
                seen.add(key);
                track("section.viewed", { section_key: key });
              }, 800)
            );
          } else {
            clearTimeout(timers.get(entry.target));
          }
        }
      },
      { threshold: 0.5 }
    );
    document.querySelectorAll("[data-section]").forEach((el) => io.observe(el));

    return () => {
      io.disconnect();
      timers.forEach(clearTimeout);
    };
  }, [pathname]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest<HTMLElement>("a, button");
      if (!el) return;
      const href = el instanceof HTMLAnchorElement ? el.href : undefined;
      const cta = el.dataset.cta;
      if (cta) track("cta.clicked", { cta_id: cta, placement: el.dataset.placement || null });
      if (href?.includes("app.docstar.io/login")) track("signup.clicked", { cta_id: cta || null, placement: el.dataset.placement || null });
    };
    const onHide = () => document.visibilityState === "hidden" && flush();
    document.addEventListener("click", onClick, true);
    document.addEventListener("visibilitychange", onHide);
    addEventListener("pagehide", flush);
    return () => {
      document.removeEventListener("click", onClick, true);
      document.removeEventListener("visibilitychange", onHide);
      removeEventListener("pagehide", flush);
    };
  }, []);

  return null;
}
