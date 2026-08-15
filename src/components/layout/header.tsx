"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { NavItem, ThemePreference } from "@/types/portfolio";
import { MenuIcon } from "@/components/icons";
import { ThemeSelector } from "@/components/ui/theme-selector";
import { MobileNav } from "./mobile-nav";

interface HeaderProps {
  navItems: NavItem[];
  theme: ThemePreference;
  onThemeChange: (theme: ThemePreference) => void;
}

export function Header({ navItems, theme, onThemeChange }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Always show at the top of the page
      if (currentScrollY <= 50) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY - lastScrollY > 6) {
        // Scrolling down -> hide header to maximize content focus
        if (!isMenuOpen) {
          setIsVisible(false);
        }
      } else if (lastScrollY - currentScrollY > 6) {
        // Scrolling up -> reveal header immediately
        setIsVisible(true);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMenuOpen]);

  return (
    <motion.header
      id="top"
      initial={{ y: 0 }}
      animate={{ y: isVisible || isMenuOpen ? 0 : "-100%" }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="site-header"
      aria-label="Primary navigation"
    >
      <div className="shell site-header-inner">
        <a href="#home" className="brand-mark mono">
          VONSSY<span className="text-accent">.</span>
          <span className="brand-index">/26</span>
        </a>

        <div className="flex items-center gap-3">
          <nav className="desktop-nav hidden items-center gap-7 md:flex">
            {navItems.map((item, index) => (
              <a key={item.id} href={`#${item.id}`} className="nav-link mono">
                <span>0{index + 1}</span>
                {item.label}
              </a>
            ))}
          </nav>

          <ThemeSelector theme={theme} onChange={onThemeChange} />

          <button
            type="button"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            aria-label="Toggle navigation"
            className="soft flex h-11 w-11 items-center justify-center rounded-lg md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <MenuIcon open={isMenuOpen} />
          </button>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <MobileNav
              items={navItems}
              isOpen={isMenuOpen}
              onClose={() => setIsMenuOpen(false)}
            />
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
