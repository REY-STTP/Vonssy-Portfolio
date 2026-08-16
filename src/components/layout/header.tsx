"use client";

import { useEffect, useRef, useState, type FocusEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { NavItem, ThemePreference } from "@/types/portfolio";
import { MenuIcon } from "@/components/icons";
import { ThemeSelector } from "@/components/ui/theme-selector";
import { MobileNav } from "./mobile-nav";

interface HeaderProps {
  navItems: NavItem[];
  theme: ThemePreference;
  onThemeChange: (theme: ThemePreference) => void;
  hideDelayMs?: number;
}

const DEFAULT_HIDE_DELAY = 2200;

export function Header({
  navItems,
  theme,
  onThemeChange,
  hideDelayMs = DEFAULT_HIDE_DELAY,
}: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const isHoveredRef = useRef(false);
  const isMenuOpenRef = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const scheduleHide = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      if (!isHoveredRef.current && !isMenuOpenRef.current && window.scrollY > 50) {
        setIsVisible(false);
      }
    }, hideDelayMs);
  };

  // Sync menu open state with ref and manage visibility
  useEffect(() => {
    isMenuOpenRef.current = isMenuOpen;
    if (isMenuOpen) {
      setIsVisible(true);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    } else if (window.scrollY > 50 && !isHoveredRef.current) {
      scheduleHide();
    }
  }, [isMenuOpen, hideDelayMs]);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Always show at the top of the page
      if (currentScrollY <= 60) {
        setIsVisible(true);
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      } else if (currentScrollY > lastScrollY && currentScrollY - lastScrollY > 10) {
        // Scrolling down -> smoothly fade out header
        if (!isMenuOpenRef.current && !isHoveredRef.current) {
          setIsVisible(false);
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
          }
        }
      } else if (lastScrollY - currentScrollY > 8) {
        // Scrolling up -> reveal header immediately and start idle hide timer
        setIsVisible(true);
        scheduleHide();
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [hideDelayMs]);

  const handleMouseEnter = () => {
    isHoveredRef.current = true;
    setIsVisible(true);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const handleMouseLeave = () => {
    isHoveredRef.current = false;
    if (window.scrollY > 60 && !isMenuOpen) {
      scheduleHide();
    }
  };

  const handleFocus = () => {
    isHoveredRef.current = true;
    setIsVisible(true);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const handleBlur = (e: FocusEvent<HTMLElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
      isHoveredRef.current = false;
      if (window.scrollY > 60 && !isMenuOpen) {
        scheduleHide();
      }
    }
  };

  const shouldShow = isVisible || isMenuOpen;

  return (
    <motion.header
      id="top"
      initial={{ y: 0, opacity: 1 }}
      animate={{
        y: shouldShow ? 0 : -14,
        opacity: shouldShow ? 1 : 0,
        pointerEvents: shouldShow ? "auto" : "none",
      }}
      transition={{
        duration: shouldShow ? 0.35 : 0.45,
        ease: shouldShow ? [0.16, 1, 0.3, 1] : [0.25, 0.1, 0.25, 1],
      }}
      style={{ willChange: "transform, opacity" }}
      className="site-header"
      aria-label="Primary navigation"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocusCapture={handleFocus}
      onBlurCapture={handleBlur}
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
