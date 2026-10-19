"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { flush, track } from "@/lib/analytics";

// Page views, section views, scroll depth, CTA/nav clicks and FAQ opens for the website.
// Clicks are picked up from data-cta / data-placement attributes, so content stays the source.
export default function SiteAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const utm = Object.fromEntries([...params].filter(([k]) => k.startsWith("utm_")));
    track("page.viewed", { title: document.title, ...(Object.keys(utm).length ? { utm } : {}) });

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

    // scroll depth milestones
    const marks = [25, 50, 75, 100];
    const hit = new Set<number>();
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      const pct = max <= 0 ? 100 : Math.round((scrollY / max) * 100);
      for (const m of marks) if (pct >= m && !hit.has(m)) (hit.add(m), track("scroll.depth", { percent: m }));
    };
    addEventListener("scroll", onScroll, { passive: true });

    return () => {
      io.disconnect();
      timers.forEach(clearTimeout);
      removeEventListener("scroll", onScroll);
    };
  }, [pathname]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest<HTMLElement>("a, button");
      if (!el) return;
      const href = el instanceof HTMLAnchorElement ? el.href : undefined;
      const label = el.textContent?.trim().slice(0, 80);
      const cta = el.dataset.cta;
      if (cta) track("cta.clicked", { cta_id: cta, placement: el.dataset.placement || null, label, href });
      else if (el.closest("header nav, footer")) track("nav.clicked", { label, href });
      if (href?.includes("app.docstar.io/login")) track("signup.clicked", { cta_id: cta || null, placement: el.dataset.placement || null });
      if (href?.includes("cal.com")) track("demo.clicked", { cta_id: cta || null });
    };
    // details toggle doesn't bubble; listen in the capture phase
    const onToggle = (e: Event) => {
      const d = e.target as HTMLDetailsElement;
      if (d.tagName === "DETAILS" && d.open && d.closest('[data-section="faq"]')) track("faq.opened", { q: d.querySelector("summary")?.textContent?.slice(0, 200) });
    };
    const onHide = () => document.visibilityState === "hidden" && flush();
    document.addEventListener("click", onClick, true);
    document.addEventListener("toggle", onToggle, true);
    document.addEventListener("visibilitychange", onHide);
    addEventListener("pagehide", flush);
    return () => {
      document.removeEventListener("click", onClick, true);
      document.removeEventListener("toggle", onToggle, true);
      document.removeEventListener("visibilitychange", onHide);
      removeEventListener("pagehide", flush);
    };
  }, []);

  return null;
}
