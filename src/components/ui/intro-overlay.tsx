"use client";

import { motion } from "framer-motion";

interface IntroOverlayProps {
  reduceMotion: boolean;
}

export function IntroOverlay({ reduceMotion }: IntroOverlayProps) {
  if (reduceMotion) {
    return null;
  }

  return (
    <motion.div
      className="intro-overlay"
      initial={{ y: 0 }}
      exit={{ y: "-100%" }}
      transition={{
        duration: 0.9,
        ease: [0.76, 0, 0.24, 1],
      }}
      style={{ pointerEvents: "none" }}
      aria-hidden="true"
    >
      <div className="flex flex-col items-center text-center select-none pointer-events-none">
        {/* Step 1: Badge PORTFOLIO / 2026 appears first */}
        <motion.span
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 0.85, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{
            duration: 0.6,
            delay: 0.2,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="mono tracking-[0.25em] text-xs font-bold uppercase"
        >
          PORTFOLIO / 2026
        </motion.span>

        {/* Step 2: VONSSY. appears second with scale-up and clear staggered pause */}
        <motion.strong
          initial={{ opacity: 0, scale: 0.85, y: 25 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -25 }}
          transition={{
            duration: 0.8,
            delay: 0.55,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="font-extrabold"
        >
          VONSSY<span>.</span>
        </motion.strong>
      </div>
    </motion.div>
  );
}
