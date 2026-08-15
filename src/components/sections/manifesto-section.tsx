"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { MotionValue } from "framer-motion";

const MANIFESTO_TEXT =
  "I combine code, networks, accounts, and data into software that keeps moving when the happy path ends.";

interface ManifestoSectionProps {
  reduceMotion: boolean;
}

interface ManifestoWordProps {
  word: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
  reduceMotion: boolean;
}

function ManifestoWord({
  word,
  index,
  total,
  progress,
  reduceMotion,
}: ManifestoWordProps) {
  // Distribute word animation evenly across progress [0.05, 0.85] with smooth overlap
  const start = 0.05 + (index / total) * 0.72;
  const end = Math.min(1, start + 0.09);
  const opacity = useTransform(progress, [start, end], [0.18, 1]);

  return (
    <motion.span style={{ opacity: reduceMotion ? 1 : opacity }}>
      {word}{" "}
    </motion.span>
  );
}

export function ManifestoSection({ reduceMotion }: ManifestoSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const words = MANIFESTO_TEXT.split(" ");

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  return (
    <section id="manifesto" ref={sectionRef} className="manifesto-section">
      <div className="shell manifesto-inner">
        <p className="mono manifesto-label">01 / OPERATING PRINCIPLE</p>
        <p className="manifesto-copy">
          {words.map((word, index) => (
            <ManifestoWord
              key={`${word}-${index}`}
              word={word}
              index={index}
              total={words.length}
              progress={scrollYProgress}
              reduceMotion={reduceMotion}
            />
          ))}
        </p>
      </div>
    </section>
  );
}
