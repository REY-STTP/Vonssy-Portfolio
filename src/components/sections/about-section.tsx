"use client";

import { motion, Variants } from "framer-motion";

interface AboutSectionProps {
  reduceMotion: boolean;
}

export function AboutSection({ reduceMotion }: AboutSectionProps) {
  const containerVariants: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.15,
        delayChildren: reduceMotion ? 0 : 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 90,
        damping: 20,
      },
    },
  };

  return (
    <motion.section
      id="about"
      className="section-pad relative"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      variants={containerVariants}
    >
      <div className="shell grid gap-12 lg:grid-cols-[.68fr_1.32fr]">
        <motion.h2 
          variants={itemVariants}
          className="max-w-md text-4xl font-bold leading-tight tracking-tight md:text-5xl"
        >
          From fundamentals to automation.
        </motion.h2>
        
        <div className="max-w-2xl text-[17px] leading-8 text-soft lg:border-l lg:border-line lg:pl-12">
          <motion.p variants={itemVariants}>
            Vonssy is the builder identity of Reyvaldi Zakaria. The work started
            broad: programming fundamentals, C and C++, JavaScript, PHP, SQL,
            Python, AI and machine learning, and mobile development.
          </motion.p>
          <motion.p variants={itemVariants} className="mt-5">
            That path moved through web applications and backend systems into
            software that runs against the real world: wallets, blockchains,
            external APIs, accounts, proxies, and data. The point is not
            collecting technologies. It is combining enough of them to make a
            working system.
          </motion.p>
          <motion.div variants={itemVariants} className="mt-8 border-t border-line pt-5 relative">
            <div className="absolute top-0 left-0 w-[5px] h-[5px] bg-accent -translate-y-[3px]" />
            <p className="mono text-xs text-quiet">
              learning → experimenting → building →{" "}
              <span className="text-accent">automating</span>
            </p>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
