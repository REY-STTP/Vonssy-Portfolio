"use client";

import { motion, AnimatePresence } from "framer-motion";
import type { ThemePreference } from "@/types/portfolio";
import { MonitorIcon, MoonIcon, SunIcon } from "@/components/icons";

interface ThemeSelectorProps {
  theme: ThemePreference;
  onChange: (theme: ThemePreference) => void;
}

const THEME_CYCLE: Record<
  ThemePreference,
  { next: ThemePreference; nextLabel: string; currentLabel: string }
> = {
  dark: { next: "light", nextLabel: "Light mode", currentLabel: "Dark" },
  light: { next: "system", nextLabel: "System theme", currentLabel: "Light" },
  system: { next: "dark", nextLabel: "Dark mode", currentLabel: "System" },
};

export function ThemeSelector({ theme, onChange }: ThemeSelectorProps) {
  const currentConfig = THEME_CYCLE[theme] ?? THEME_CYCLE.system;

  const handleCycleTheme = () => {
    onChange(currentConfig.next);
  };

  return (
    <button
      type="button"
      aria-label={`Current theme: ${currentConfig.currentLabel}. Click to switch to ${currentConfig.nextLabel}`}
      title={`Theme: ${currentConfig.currentLabel} · Switch to ${currentConfig.nextLabel}`}
      onClick={handleCycleTheme}
      className="soft flex h-11 w-11 items-center justify-center rounded-lg text-muted transition-colors hover:text-accent focus-visible:text-accent active:scale-95 overflow-hidden"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ y: -8, opacity: 0, rotate: -25, scale: 0.8 }}
          animate={{ y: 0, opacity: 1, rotate: 0, scale: 1 }}
          exit={{ y: 8, opacity: 0, rotate: 25, scale: 0.8 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="flex items-center justify-center"
        >
          {theme === "dark" && <MoonIcon size={18} />}
          {theme === "light" && <SunIcon size={18} />}
          {theme === "system" && <MonitorIcon size={18} />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
