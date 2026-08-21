"use client";

import { motion } from "framer-motion";
import type { StackCategory } from "@/types/portfolio";

interface StackSectionProps {
  stack: StackCategory[];
  reduceMotion?: boolean;
}

export function StackSection({ stack, reduceMotion = false }: StackSectionProps) {
  return (
    <section
      id="stack"
      className="border-y border-line-soft bg-section section-pad stack-section"
    >
      <div className="shell grid gap-12 lg:grid-cols-[.68fr_1.32fr]">
        <motion.div
          initial={{ opacity: 0, y: reduceMotion ? 0 : 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: reduceMotion ? 0 : 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="stack-title">Working stack</h2>
          <p className="mt-4 max-w-sm text-sm leading-6 text-muted">
            Grouped by what each tool does in the work.
          </p>
        </motion.div>

        <dl className="stack-list">
          {stack.map((item, index) => {
            const chips = item.items.split(" · ").map((s) => s.trim()).filter(Boolean);
            return (
              <motion.div
                key={item.category}
                initial={{ opacity: 0, y: reduceMotion ? 0 : 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{
                  delay: reduceMotion ? 0 : index * 0.09,
                  duration: reduceMotion ? 0 : 0.55,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="stack-row"
              >
                <dt className="stack-category">
                  <span className="stack-category-index mono">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {item.category}
                </dt>
                <dd className="stack-chips">
                  {chips.map((chip) => (
                    <span key={chip} className="stack-chip">
                      {chip}
                    </span>
                  ))}
                </dd>
              </motion.div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}
