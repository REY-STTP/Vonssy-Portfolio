"use client";

import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import { faqItems } from "@/data/faq";
import { PlusMinusIcon } from "@/components/icons";

interface FaqSectionProps {
  reduceMotion: boolean;
}

export function FaqSection({ reduceMotion }: FaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const containerVariants: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.08,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 16 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 90, damping: 20 },
    },
  };

  return (
    <section id="faq" className="section-pad border-t border-line-soft bg-section">
      <div className="shell grid gap-12 lg:grid-cols-[.68fr_1.32fr]">
        <div>
          <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
            Frequently asked
          </h2>
          <p className="mt-5 max-w-sm text-[15px] leading-7 text-muted">
            Direct answers about the work, the stack, and how to reach out.
          </p>
        </div>

        <motion.div
          className="border-t border-line"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
        >
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;
            const panelId = `faq-panel-${index}`;
            const headerId = `faq-header-${index}`;

            return (
              <motion.div
                key={item.question}
                variants={itemVariants}
                className="border-b border-line"
              >
                <h3 className="m-0">
                  <button
                    type="button"
                    id={headerId}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="group flex w-full items-center gap-4 py-6 text-left"
                  >
                    <span className="mono mt-1 shrink-0 text-[13px] tabular-nums text-muted-deep">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1 text-lg font-bold text-ink transition-colors duration-200 group-hover:text-accent-strong">
                      {item.question}
                    </span>
                    <PlusMinusIcon
                      open={isOpen}
                      className={`shrink-0 text-muted transition-colors duration-200 group-hover:text-accent ${
                        isOpen ? "text-accent" : ""
                      }`}
                    />
                  </button>
                </h3>

                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={headerId}
                  initial={false}
                  animate={{
                    height: isOpen ? "auto" : 0,
                    opacity: isOpen ? 1 : 0,
                  }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.32,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="overflow-hidden"
                >
                  <p className="pb-7 pl-9 text-[15px] leading-relaxed text-soft">
                    {item.answer}
                  </p>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
