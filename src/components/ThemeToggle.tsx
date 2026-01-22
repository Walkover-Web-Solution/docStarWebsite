"use client";

import { useState, useEffect } from "react";
import { Sun, Moon, Monitor } from "lucide-react";

type Theme = "light" | "dark" | "system";

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

  if (!mounted) return null;

  const cycleTheme = () => {
    const themes: Theme[] = ["light", "dark", "system"];
    const currentIndex = themes.indexOf(theme);
    const nextTheme = themes[(currentIndex + 1) % themes.length];
    setTheme(nextTheme);
  };

  const getIcon = () => {
    switch (theme) {
      case "light":
        return <Sun className="h-5 w-5" />;
      case "dark":
        return <Moon className="h-5 w-5" />;
      case "system":
        return <Monitor className="h-5 w-5" />;
    }
  };

  const getTooltip = () => {
    switch (theme) {
      case "light":
        return "Light";
      case "dark":
        return "Dark";
      case "system":
        return "System Default";
    }
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={cycleTheme}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="p-2 rounded-lg cursor-pointer transition-all duration-200 hover:opacity-70 border"
        aria-label={`Current theme: ${theme}. Click to change.`}
      >
        {getIcon()}
      </button>
      
      <div
        role="tooltip"
        className={`absolute z-10 inline-block px-2 py-1 text-xs font-medium transition-opacity duration-300 rounded shadow-sm top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap theme-badge ${
          showTooltip ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        {getTooltip()}
        <div className="absolute w-1.5 h-1.5 rotate-45 -top-0.5 left-1/2 -translate-x-1/2 theme-badge"></div>
      </div>
    </div>
  );
}
