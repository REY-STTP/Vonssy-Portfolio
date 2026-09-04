"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll } from "framer-motion";

const MANIFESTO_TEXT =
  "I combine code, networks, accounts, and data into software that keeps moving when the happy path ends.";

interface ManifestoSectionProps {
  reduceMotion: boolean;
}

export function ManifestoSection({ reduceMotion }: ManifestoSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const words = MANIFESTO_TEXT.split(" ");
  const [progress, setProgress] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    if (reduceMotion) return;
    // Single subscription to scroll progress for all words (1 MotionValue listener, not 15)
    const unsubscribe = scrollYProgress.on("change", (v: number) => {
      setProgress(v);
    });
    // Init
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setProgress(scrollYProgress.get());
    return () => unsubscribe();
  }, [scrollYProgress, reduceMotion]);

  return (
    <section id="manifesto" ref={sectionRef} className="manifesto-section">
      <div className="shell manifesto-inner">
        <p className="mono manifesto-label">OPERATING PRINCIPLE</p>
        <p className="manifesto-copy">
          {words.map((word, index) => {
            if (reduceMotion) {
              return <span key={`${word}-${index}`}>{word} </span>;
            }
            const total = words.length;
            const start = 0.08 + (index / total) * 0.74;
            const end = Math.min(0.98, start + 0.14);
            const opacity =
              progress <= start
                ? 0.18
                : progress >= end
                  ? 1
                  : 0.18 + ((progress - start) / (end - start)) * 0.82;

            return (
              <span key={`${word}-${index}`} style={{ opacity }}>
                {word}{" "}
              </span>
            );
          })}
        </p>
      </div>
    </section>
  );
}
