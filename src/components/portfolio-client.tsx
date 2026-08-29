"use client";

import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import type { Project, Principle, StackCategory } from "@/types/portfolio";
import { navItems, githubStats } from "@/data/navigation";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useTheme } from "@/hooks/use-theme";
import { useScrollProgress } from "@/hooks/use-scroll-progress";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/sections/hero-section";
import { TickerSection } from "@/components/sections/ticker-section";
import { ManifestoSection } from "@/components/sections/manifesto-section";
import { AboutSection } from "@/components/sections/about-section";
import { PhilosophySection } from "@/components/sections/philosophy-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { StackSection } from "@/components/sections/stack-section";
import { GitHubSection } from "@/components/sections/github-section";
import { FaqSection } from "@/components/sections/faq-section";
import { ContactSection } from "@/components/sections/contact-section";

import { IntroOverlay } from "@/components/ui/intro-overlay";
import { ProjectModal } from "@/components/ui/project-modal";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { ChatWidget } from "@/components/ui/chat-widget";

interface PortfolioClientProps {
  projects: Project[];
  philosophy: Principle[];
  stack: StackCategory[];
}

const INTRO_STORAGE_KEY = "vonssy-intro-seen";
const INTRO_DURATION_MS = 2600;

export default function PortfolioClient({
  projects,
  philosophy,
  stack,
}: PortfolioClientProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isIntroActive, setIsIntroActive] = useState(true);

  const reduceMotion = useReducedMotion();
  const { theme, selectTheme } = useTheme();
  const { progress: scrollProgress, direction: scrollDirection } = useScrollProgress();

  useEffect(() => {
    let hasSeenIntro = false;

    try {
      hasSeenIntro = sessionStorage.getItem(INTRO_STORAGE_KEY) === "1";
    } catch {
      // Intro will gracefully run if sessionStorage is unavailable
    }

    if (hasSeenIntro || reduceMotion) {
      // Mount-time hydration from sessionStorage: state must start "active"
      // on the server and correct after mount, so setState here is intentional.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsIntroActive(false);
      return;
    }

    const timer = window.setTimeout(() => {
      setIsIntroActive(false);
      try {
        sessionStorage.setItem(INTRO_STORAGE_KEY, "1");
      } catch {
        // ignore
      }
    }, INTRO_DURATION_MS);

    return () => window.clearTimeout(timer);
  }, [reduceMotion]);

  return (
    <main suppressHydrationWarning>
      <AnimatePresence>
        {isIntroActive && <IntroOverlay reduceMotion={reduceMotion} />}
      </AnimatePresence>

      <Header
        navItems={navItems}
        theme={theme}
        onThemeChange={selectTheme}
      />

      <HeroSection
        reduceMotion={reduceMotion}
        introActive={isIntroActive}
      />

      <TickerSection />

      <ManifestoSection reduceMotion={reduceMotion} />

      <AboutSection reduceMotion={reduceMotion} />

      <PhilosophySection
        principles={philosophy}
        reduceMotion={reduceMotion}
      />

      <ProjectsSection
        projects={projects}
        onSelectProject={setSelectedProject}
        reduceMotion={reduceMotion}
      />

      <StackSection stack={stack} reduceMotion={reduceMotion} />

      <GitHubSection stats={githubStats} />

      <FaqSection reduceMotion={reduceMotion} />

      <ContactSection />

      <Footer />

      <ScrollProgress progress={scrollProgress} direction={scrollDirection} />

      <ChatWidget reduceMotion={reduceMotion} />

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        reduceMotion={reduceMotion}
      />
    </main>
  );
}
