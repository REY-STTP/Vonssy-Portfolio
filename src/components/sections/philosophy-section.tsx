"use client";

import { motion, Variants } from "framer-motion";
import type { Principle } from "@/types/portfolio";

interface PhilosophySectionProps {
  principles: Principle[];
  reduceMotion: boolean;
}

export function PhilosophySection({
  principles,
  reduceMotion,
}: PhilosophySectionProps) {
  const containerVariants: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
      },
    },
  };

  return (
    <section id="philosophy" aria-labelledby="philosophy-heading" className="border-y border-line-soft bg-section section-pad build-section">
      <div className="shell">
        <div className="mb-16 md:mb-20">
          <h2 id="philosophy-heading" className="text-4xl font-bold tracking-tight md:text-5xl">
            How I build
          </h2>
          <p className="mt-5 max-w-sm text-[15px] leading-7 text-muted">
            The recurring decisions behind the repositories, not a manifesto.
          </p>
        </div>
        
        <motion.div 
          className="flex flex-col border-b border-line"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
        >
          {principles.map((principle, index) => (
            <motion.div
              key={principle.title}
              variants={itemVariants}
              className="group relative grid gap-4 border-t border-line py-8 transition-colors duration-300 hover:bg-[var(--row-hover)] sm:grid-cols-[auto_1fr] md:grid-cols-[80px_1fr_1.5fr] md:gap-12 md:py-10 md:px-8 -mx-6 px-6 md:-mx-8"
            >
              <div className="absolute left-0 top-0 bottom-0 w-[2px] scale-y-0 bg-accent transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] origin-center group-hover:scale-y-100" />
              
              <div className="mono text-[13px] text-muted-deep tabular-nums transition-colors duration-300 group-hover:text-accent mt-1">
                0{index + 1}
              </div>
              
              <div>
                <h3 className="font-bold text-lg text-text transition-colors duration-300">{principle.title}</h3>
              </div>
              
              <div>
                <p className="text-[15px] leading-relaxed text-muted transition-colors duration-300 group-hover:text-soft">
                  {principle.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
