"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { ScrollDirection } from "@/hooks/use-scroll-progress";
import { ArrowDownIcon, ArrowUpIcon } from "@/components/icons";

interface ScrollProgressProps {
  progress: number;
  direction?: ScrollDirection;
  hideDelayMs?: number;
}

const CIRCLE_RADIUS = 19;
const CIRCUMFERENCE = 2 * Math.PI * CIRCLE_RADIUS;
const DEFAULT_HIDE_DELAY = 2200;

export function ScrollProgress({
  progress,
  direction = "down",
  hideDelayMs = DEFAULT_HIDE_DELAY,
}: ScrollProgressProps) {
  const [isVisible, setIsVisible] = useState(false);
  const isHoveredRef = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const isPointingUp = direction === "up";
  const label = isPointingUp ? "Scroll to top" : "Scroll to bottom";

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(true);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        if (!isHoveredRef.current) {
          setIsVisible(false);
        }
      }, hideDelayMs);
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
    timeoutRef.current = setTimeout(() => {
      setIsVisible(false);
    }, hideDelayMs);
  };

  const handleScrollClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    if (isPointingUp) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.a
          href={isPointingUp ? "#top" : "#contact"}
          onClick={handleScrollClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          aria-label={label}
          title={isPointingUp ? "Back to top" : "Scroll to bottom"}
          initial={{ opacity: 0, scale: 0.75, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.75, y: 12 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="soft fixed bottom-4 right-4 z-40 flex h-12 w-12 items-center justify-center rounded-full text-muted transition-colors hover:text-accent focus-visible:text-accent md:bottom-6 md:right-6 md:h-14 md:w-14"
        >
          <svg
            aria-hidden="true"
            className="absolute inset-0 h-full w-full -rotate-90"
            viewBox="0 0 48 48"
          >
            <circle
              cx="24"
              cy="24"
              r={CIRCLE_RADIUS}
              fill="none"
              stroke="var(--line)"
              strokeWidth="2"
            />
            <circle
              cx="24"
              cy="24"
              r={CIRCLE_RADIUS}
              fill="none"
              stroke="var(--accent)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={CIRCUMFERENCE * (1 - progress)}
            />
          </svg>
          <span className="relative transition-transform duration-200">
            {isPointingUp ? <ArrowUpIcon /> : <ArrowDownIcon />}
          </span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
