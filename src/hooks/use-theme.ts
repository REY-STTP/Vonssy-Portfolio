"use client";

import { useEffect, useState, useCallback } from "react";
import type { ThemePreference } from "@/types/portfolio";

const THEME_STORAGE_KEY = "vonssy-theme";
const THEME_COLORS = {
  dark: "#111411",
  light: "#e4e8e1",
} as const;

function applyResolvedTheme(theme: "dark" | "light") {
  const root = document.documentElement;
  root.dataset.theme = theme;
  root.style.colorScheme = theme;

  const metaThemeColors = document.querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]');
  metaThemeColors.forEach((meta) => {
    meta.content = THEME_COLORS[theme];
  });
}

function resolveTheme(preference: ThemePreference): "dark" | "light" {
  if (preference === "system") {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  return preference;
}

export function useTheme() {
  const [theme, setTheme] = useState<ThemePreference>("system");

  // Initial load & system color scheme listener
  useEffect(() => {
    const root = document.documentElement;
    let storedPreference: ThemePreference = "system";

    try {
      const saved = localStorage.getItem(THEME_STORAGE_KEY);
      if (saved === "system" || saved === "dark" || saved === "light") {
        storedPreference = saved;
      }
    } catch {
      // Gracefully fall back to system theme when localStorage is unavailable
    }

    root.dataset.themePreference = storedPreference;
    setTheme(storedPreference);
    applyResolvedTheme(resolveTheme(storedPreference));

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemThemeChange = () => {
      const currentPreference = root.dataset.themePreference ?? "system";
      if (currentPreference === "system") {
        applyResolvedTheme(mediaQuery.matches ? "dark" : "light");
      }
    };

    mediaQuery.addEventListener("change", handleSystemThemeChange);
    return () => mediaQuery.removeEventListener("change", handleSystemThemeChange);
  }, []);

  const selectTheme = useCallback((preference: ThemePreference) => {
    const root = document.documentElement;
    const resolved = resolveTheme(preference);

    root.dataset.themePreference = preference;
    applyResolvedTheme(resolved);

    try {
      localStorage.setItem(THEME_STORAGE_KEY, preference);
    } catch {
      // Selected theme still takes effect even if storage fails
    }

    setTheme(preference);
  }, []);

  return { theme, selectTheme };
}
