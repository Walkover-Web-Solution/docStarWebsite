"use client";

import { useState, useEffect, useCallback } from "react";
import { Sun, Moon, Monitor } from "lucide-react";

type Theme = "light" | "dark" | "system";

const THEMES: Theme[] = ["light", "dark", "system"];

const THEME_CONFIG = {
  light: { icon: Sun, label: "Light Mode" },
  dark: { icon: Moon, label: "Dark Mode" },
  system: { icon: Monitor, label: "System Default" },
} as const;

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("system");
  const [mounted, setMounted] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const applyTheme = (selectedTheme: Theme) => {
      if (selectedTheme === "system") {
        const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
          .matches
          ? "dark"
          : "light";
        document.documentElement.setAttribute("data-theme", systemTheme);
      } else {
        document.documentElement.setAttribute("data-theme", selectedTheme);
      }
    };

    applyTheme(theme);
    localStorage.setItem("theme", theme);
  }, [theme, mounted]);

  const cycleTheme = useCallback(() => {
    const currentIndex = THEMES.indexOf(theme);
    const nextTheme = THEMES[(currentIndex + 1) % THEMES.length];
    setTheme(nextTheme);
  }, [theme]);

  const handleShowTooltip = useCallback(() => setShowTooltip(true), []);
  const handleHideTooltip = useCallback(() => setShowTooltip(false), []);

  if (!mounted) return null;

  const ThemeIcon = THEME_CONFIG[theme].icon;
  const themeLabel = THEME_CONFIG[theme].label;

  return (
    <div className="relative inline-block">
      <button
        onClick={cycleTheme}
        onMouseEnter={handleShowTooltip}
        onMouseLeave={handleHideTooltip}
        onFocus={handleShowTooltip}
        onBlur={handleHideTooltip}
        className="p-2 rounded-lg cursor-pointer transition-all duration-200 hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current border theme-border"
        aria-label={`Switch theme. Current: ${themeLabel}`}
        aria-live="polite"
        type="button"
      >
        <ThemeIcon className="h-5 w-5" aria-hidden="true" />
      </button>
      
      <div
        role="tooltip"
        aria-hidden={!showTooltip}
        className={`absolute z-10 inline-block px-3 py-1.5 text-xs font-medium transition-opacity duration-200 rounded-md shadow-lg top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap theme-badge border theme-border ${
          showTooltip ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        }`}
      >
        {themeLabel}
        <div className="absolute w-2 h-2 rotate-45 -top-1 left-1/2 -translate-x-1/2 theme-badge border-l border-t theme-border"></div>
      </div>
    </div>
  );
}
