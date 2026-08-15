"use client";

import { motion } from "framer-motion";

interface AboutSectionProps {
  reduceMotion: boolean;
}

export function AboutSection({ reduceMotion }: AboutSectionProps) {
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

  return (
    <motion.section
      id="about"
      className="section-pad"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      variants={revealVariants}
    >
      <div className="shell grid gap-12 lg:grid-cols-[.68fr_1.32fr]">
        <h2 className="max-w-md text-4xl font-bold leading-tight tracking-normal md:text-5xl">
          From fundamentals to automation.
        </h2>
        <div className="max-w-2xl text-[17px] leading-8 text-soft">
          <p>
            Vonssy is the builder identity of Reyvaldi Zakaria. The work started
            broad: programming fundamentals, C and C++, JavaScript, PHP, SQL,
            Python, AI and machine learning, and mobile development.
          </p>
          <p className="mt-5">
            That path moved through web applications and backend systems into
            software that runs against the real world: wallets, blockchains,
            external APIs, accounts, proxies, and data. The point is not
            collecting technologies. It is combining enough of them to make a
            working system.
          </p>
          <div className="mt-8 border-t border-line pt-5">
            <p className="mono text-xs text-quiet">
              learning → experimenting → building →{" "}
              <span className="text-accent">automating</span>
            </p>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
