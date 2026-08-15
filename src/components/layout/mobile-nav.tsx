"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import type { NavItem } from "@/types/portfolio";
import { siteConfig } from "@/data/site";
import { ArrowUpRight, GitHubIcon } from "@/components/icons";

interface MobileNavProps {
  items: NavItem[];
  isOpen: boolean;
  onClose: () => void;
}

const menuContainerVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -12,
    scale: 0.98,
    transition: {
      duration: 0.2,
      ease: [0.32, 0, 0.67, 0] as const,
    },
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: [0.16, 1, 0.3, 1] as const,
      staggerChildren: 0.05,
      delayChildren: 0.05,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -14 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.35,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

export function MobileNav({ items, isOpen, onClose }: MobileNavProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop Scrim with click-outside-to-close */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={onClose}
        className="fixed inset-0 top-[74px] z-40 bg-black/60 backdrop-blur-sm md:hidden"
        aria-hidden="true"
      />

      {/* Glassmorphic Drawer Panel */}
      <motion.nav
        id="mobile-navigation"
        variants={menuContainerVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        className="fixed left-0 right-0 top-[82px] z-50 mx-auto w-[calc(100%-28px)] max-w-lg overflow-hidden rounded-2xl border border-line bg-surface/95 p-5 shadow-2xl backdrop-blur-2xl md:hidden"
      >
        <div className="flex flex-col divide-y divide-line/60">
          {items.map((item, index) => (
            <motion.a
              key={item.id}
              variants={itemVariants}
              onClick={onClose}
              href={`#${item.id}`}
              className="group flex items-center justify-between py-3.5 text-lg font-bold text-ink transition-colors hover:text-accent active:text-accent"
            >
              <span className="flex items-center gap-3.5">
                <span className="mono text-xs font-semibold text-accent">
                  0{index + 1}
                </span>
                <span>{item.label}</span>
              </span>
              <span className="text-muted transition-transform group-hover:translate-x-1 group-hover:text-accent">
                <ArrowUpRight size={17} />
              </span>
            </motion.a>
          ))}
        </div>

        {/* Quick Contacts Footer */}
        <motion.div
          variants={itemVariants}
          className="mt-4 border-t border-line pt-4"
        >
          <div className="flex items-center gap-2 text-[10px] uppercase text-muted mono">
            <span className="availability-dot" />
            <span>Available for collaborations · UTC+7</span>
          </div>

          <div className="mt-3 flex gap-2.5">
            <a
              href={siteConfig.socialLinks.telegram}
              target="_blank"
              rel="noreferrer"
              className="button button-primary flex-1 !min-h-[38px] !py-0 !text-xs"
            >
              Telegram <ArrowUpRight size={14} />
            </a>
            <a
              href={siteConfig.socialLinks.github}
              target="_blank"
              rel="noreferrer"
              className="button button-ghost flex-1 !min-h-[38px] !py-0 !text-xs"
            >
              <GitHubIcon size={15} /> GitHub
            </a>
          </div>
        </motion.div>
      </motion.nav>
    </>
  );
}
