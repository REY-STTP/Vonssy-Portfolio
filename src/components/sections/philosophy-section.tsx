"use client";

import { motion } from "framer-motion";
import type { Principle } from "@/types/portfolio";

interface PhilosophySectionProps {
  principles: Principle[];
  reduceMotion: boolean;
}

export function PhilosophySection({
  principles,
  reduceMotion,
}: PhilosophySectionProps) {
  return (
    <section className="border-y border-line-soft bg-section section-pad build-section">
      <div className="shell">
        <div className="grid gap-8 lg:grid-cols-[.68fr_1.32fr]">
          <div>
            <h2 className="text-4xl font-bold tracking-normal md:text-5xl">
              How I build
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-6 text-muted">
              The recurring decisions behind the repositories, not a manifesto.
            </p>
          </div>
          <div className="grid md:grid-cols-2">
            {principles.map((principle, index) => (
              <motion.div
                key={principle.title}
                initial={{ opacity: 0, y: reduceMotion ? 0 : 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{
                  delay: reduceMotion ? 0 : index * 0.08,
                  duration: 0.55,
                }}
                className="principle border-t border-line py-6 md:odd:pr-7 md:even:pl-7"
              >
                <span className="mono principle-index">
                  0{index + 1}
                </span>
                <h3 className="font-bold">{principle.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted">
                  {principle.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
