"use client";

import { useEffect, useRef } from "react";
import { track } from "@vercel/analytics";
import { classifyTrafficSource } from "@/lib/analytics";

const SECTIONS = ["about", "projects", "stack", "github", "faq", "contact"] as const;
const SECTION_VIEW_KEY = "vonssy-section-viewed";
const PAGE_VIEW_KEY = "vonssy-page-view-classified";

export function AnalyticsTracker() {
  const seenRef = useRef<Set<string>>(new Set());

  // 4. AI referral classification — once per session
  useEffect(() => {
    try {
      if (sessionStorage.getItem(PAGE_VIEW_KEY)) return;
      const source = classifyTrafficSource();
      const utm = new URLSearchParams(window.location.search).get("utm_source") || undefined;
      const referrer = document.referrer || undefined;
      track("page_view_classified", {
        source,
        ...(utm ? { utm_source: utm } : {}),
        ...(referrer ? { referrer } : {}),
      });
      sessionStorage.setItem(PAGE_VIEW_KEY, source);
    } catch {
      // best-effort, ignore
    }
  }, []);

  // 3. Section visibility — once per section per session, IntersectionObserver
  useEffect(() => {
    // Restore already-seen from sessionStorage to dedupe across reload in same tab session
    try {
      const stored = sessionStorage.getItem(SECTION_VIEW_KEY);
      if (stored) {
        const parsed: string[] = JSON.parse(stored);
        parsed.forEach((id) => seenRef.current.add(id));
      }
    } catch {
      // ignore
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = entry.target.id;
          if (!id || seenRef.current.has(id)) return;

          seenRef.current.add(id);
          try {
            const stored = sessionStorage.getItem(SECTION_VIEW_KEY);
            const list: string[] = stored ? JSON.parse(stored) : [];
            if (!list.includes(id)) {
              list.push(id);
              sessionStorage.setItem(SECTION_VIEW_KEY, JSON.stringify(list));
            }
          } catch {
            // ignore storage errors
          }

          track("section_view", { section: id });
        });
      },
      {
        threshold: 0.3,
        rootMargin: "0px 0px -20% 0px",
      }
    );

    const elements: Element[] = [];
    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        observer.observe(el);
        elements.push(el);
      }
    });

    return () => {
      elements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, []);

  return null;
}
