"use client";

import { motion } from "framer-motion";
import type { NavItem } from "@/types/portfolio";

interface MobileNavProps {
  items: NavItem[];
  onSelect: () => void;
}

export function MobileNav({ items, onSelect }: MobileNavProps) {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      id="mobile-navigation"
      className="mobile-nav md:hidden"
    >
      {items.map((item, index) => (
        <a key={item.id} onClick={onSelect} href={`#${item.id}`}>
          <span className="mono">0{index + 1}</span>
          {item.label}
        </a>
      ))}
    </motion.nav>
  );
}
