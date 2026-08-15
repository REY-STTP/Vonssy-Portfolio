"use client";

import { useEffect, useState } from "react";

export type ScrollDirection = "up" | "down";

export interface ScrollState {
  progress: number;
  direction: ScrollDirection;
}

/**
 * Hook to calculate vertical scroll progress (0 to 1) and active scroll direction ("up" | "down").
 * Uses requestAnimationFrame to throttle scroll updates for peak performance.
 */
export function useScrollProgress(): ScrollState {
  const [scrollState, setScrollState] = useState<ScrollState>({
    progress: 0,
    direction: "down",
  });

  useEffect(() => {
    let animationFrameId = 0;
    let lastScrollY = window.scrollY;

    const updateScroll = () => {
      animationFrameId = 0;
      const currentScrollY = window.scrollY;
      const totalScrollableDistance =
        document.documentElement.scrollHeight - window.innerHeight;

      const progress =
        totalScrollableDistance > 0
          ? Math.min(1, Math.max(0, currentScrollY / totalScrollableDistance))
          : 0;

      let direction: ScrollDirection = "down";

      if (currentScrollY <= 40) {
        // At the top of the page, default to scroll down
        direction = "down";
      } else if (
        totalScrollableDistance > 0 &&
        currentScrollY >= totalScrollableDistance - 40
      ) {
        // At the bottom of the page, default to scroll up
        direction = "up";
      } else if (Math.abs(currentScrollY - lastScrollY) > 4) {
        // Actively scrolling with threshold to prevent jitter
        direction = currentScrollY > lastScrollY ? "down" : "up";
      } else {
        // If delta is minor, update progress while preserving active direction
        setScrollState((prev) => ({ progress, direction: prev.direction }));
        lastScrollY = currentScrollY;
        return;
      }

      lastScrollY = currentScrollY;
      setScrollState({ progress, direction });
    };

    const handleScroll = () => {
      if (!animationFrameId) {
        animationFrameId = window.requestAnimationFrame(updateScroll);
      }
    };

    updateScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return scrollState;
}
