"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, type PointerEvent } from "react";
import { ArrowDownIcon, ArrowUpRight, GitHubIcon } from "@/components/icons";
import { siteConfig } from "@/data/site";

interface HeroSectionProps {
  reduceMotion: boolean;
  introActive: boolean;
}

export function HeroSection({ reduceMotion, introActive }: HeroSectionProps) {
  const heroRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, reduceMotion ? 0 : 110]
  );
  const heroScale = useTransform(
    scrollYProgress,
    [0, 1],
    [1, reduceMotion ? 1 : 0.94]
  );
  const smoothHeroY = useSpring(heroY, {
    stiffness: 90,
    damping: 24,
    mass: 0.5,
  });

  const revealVariants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 34 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reduceMotion ? 0 : 0.75,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty(
      "--pointer-x",
      `${event.clientX - rect.left}px`
    );
    event.currentTarget.style.setProperty(
      "--pointer-y",
      `${event.clientY - rect.top}px`
    );
  };

  return (
    <section
      ref={heroRef}
      id="home"
      className="hero-section"
      onPointerMove={handlePointerMove}
    >
      <div className="hero-grid" aria-hidden="true" />

      <motion.div
        style={{ y: smoothHeroY, scale: heroScale }}
        className="shell hero-inner"
      >
        <motion.div
          initial="hidden"
          animate={introActive ? "hidden" : "show"}
          variants={revealVariants}
          className="hero-copy"
        >
          <div className="hero-kicker mono">
            <span className="availability-dot" />
            <span className="hero-kicker-primary">Available for collaborations</span>
            <span className="hero-kicker-location">Indonesia / UTC+7</span>
          </div>

          <h1 className="hero-title" aria-label="Software that does things">
            <span className="hero-line">
              <span>Software</span>
            </span>
            <span className="hero-line hero-line-accent">
              <span>that does</span>
            </span>
            <span className="hero-line">
              <span>things.</span>
            </span>
          </h1>

          <div className="hero-bottom">
            <p>{siteConfig.bio}</p>
          </div>
        </motion.div>

        <div className="hero-aside">
          <motion.div
            initial="hidden"
            animate={introActive ? "hidden" : "show"}
            variants={revealVariants}
            className="hero-actions"
          >
            <a className="button button-primary" href="#projects">
              Explore work <ArrowUpRight />
            </a>
            <a
              className="button button-ghost"
              href={siteConfig.socialLinks.github}
              target="_blank"
              rel="me noreferrer"
            >
              <GitHubIcon /> GitHub
            </a>
          </motion.div>

          <motion.aside
            initial={{
              opacity: 0,
              scale: reduceMotion ? 1 : 0.88,
              rotate: reduceMotion ? 0 : 4,
            }}
            animate={introActive ? {} : { opacity: 1, scale: 1, rotate: 0 }}
            transition={{
              delay: reduceMotion ? 0 : 0.22,
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="profile-orbit"
            aria-label="Vonssy profile summary"
          >
          <div className="orbit-copy mono" aria-hidden="true">
            BUILD · AUTOMATE · ITERATE · SHIP ·{" "}
          </div>
          <div className="profile-photo-wrap">
            <Image
              src={siteConfig.avatarUrl}
              alt={`${siteConfig.handle} GitHub avatar`}
              width={320}
              height={320}
              className="profile-photo"
              priority
            />
            <span className="profile-status mono">@{siteConfig.handle}</span>
          </div>
        </motion.aside>
        </div>
      </motion.div>

      <a
        href="#contact"
        onClick={(event) => {
          event.preventDefault();
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: "smooth",
          });
        }}
        className="hero-scroll mono"
      >
        <span>Scroll to inspect</span>
        <ArrowDownIcon />
      </a>
    </section>
  );
}
