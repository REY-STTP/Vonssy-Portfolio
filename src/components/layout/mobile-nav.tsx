"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import type { NavItem } from "@/types/portfolio";
import { siteConfig } from "@/data/site";
import { ArrowUpRight, GitHubIcon } from "@/components/icons";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface MobileNavProps {
  items: NavItem[];
  isOpen: boolean;
  activeId?: string | null;
  onClose: () => void;
}

const getMenuVariants = (instant: boolean): Variants => ({
  hidden: {
    opacity: 0,
    y: -12,
    scale: 0.98,
    transition: {
      duration: instant ? 0 : 0.2,
      ease: [0.32, 0, 0.67, 0] as const,
    },
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: instant ? 0 : 0.3,
      ease: [0.16, 1, 0.3, 1] as const,
      staggerChildren: instant ? 0 : 0.05,
      delayChildren: instant ? 0 : 0.05,
    },
  },
});

const getItemVariants = (instant: boolean): Variants => ({
  hidden: { opacity: 0, x: instant ? 0 : -14 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: instant ? 0 : 0.35,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
});

export function MobileNav({ items, isOpen, activeId, onClose }: MobileNavProps) {
  const reduceMotion = useReducedMotion();
  const menuVariants = getMenuVariants(reduceMotion);
  const itemVariants = getItemVariants(reduceMotion);

  // Escape route: close the drawer with the keyboard.
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop Scrim — themed token, click-outside-to-close */}
      <motion.div
        initial={{ opacity: reduceMotion ? 1 : 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: reduceMotion ? 1 : 0 }}
        transition={{ duration: reduceMotion ? 0 : 0.25 }}
        onClick={onClose}
        className="mobile-scrim fixed left-0 right-0 top-[84px] bottom-0 z-40 md:hidden"
        aria-hidden="true"
      />

      {/* Elevated Drawer Panel — opaque surface, accent-tinted border */}
      <motion.nav
        id="mobile-navigation"
        variants={menuVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        className="mobile-drawer fixed left-0 right-0 top-[94px] z-50 mx-auto w-[calc(100%-28px)] max-w-lg overflow-hidden rounded-2xl p-5 md:hidden"
      >
        <div className="flex flex-col divide-y divide-line">
          {items.map((item, index) => {
            const isActive = activeId === item.id;
            return (
              <motion.a
                key={item.id}
                variants={itemVariants}
                onClick={onClose}
                href={`#${item.id}`}
                aria-current={isActive ? "true" : undefined}
                className={`group -mx-3 flex min-h-[52px] items-center justify-between gap-3 rounded-lg px-3 text-lg font-bold transition-colors ${
                  isActive
                    ? "bg-row-hover text-accent-strong"
                    : "text-ink hover:bg-row-hover hover:text-accent-strong active:text-accent"
                }`}
              >
                <span className="flex items-center gap-3.5">
                  <span
                    className={`mono text-xs font-semibold ${
                      isActive ? "text-accent-strong" : "text-accent"
                    }`}
                  >
                    0{index + 1}
                  </span>
                  <span>{item.label}</span>
                </span>
                <ArrowUpRight
                  size={17}
                  className={isActive ? "text-accent-strong" : "text-muted transition-transform group-hover:translate-x-1 group-hover:text-accent"}
                />
              </motion.a>
            );
          })}
        </div>

        {/* Quick Contacts Footer */}
        <motion.div
          variants={itemVariants}
          className="mt-4 border-t border-line pt-4"
        >
          <div className="mono flex items-center gap-2 text-[11px] uppercase text-muted">
            <span className="availability-dot" />
            <span>Available for collaborations · UTC+7</span>
          </div>

          <div className="mt-3 flex gap-2.5">
            <a
              href={siteConfig.socialLinks.telegram}
              target="_blank"
              rel="noreferrer"
              className="button button-primary flex-1"
            >
              Telegram <ArrowUpRight size={14} />
            </a>
            <a
              href={siteConfig.socialLinks.github}
              target="_blank"
              rel="noreferrer"
              className="button button-ghost flex-1"
            >
              <GitHubIcon size={15} /> GitHub
            </a>
          </div>
        </motion.div>
      </motion.nav>
    </>
  );
}
