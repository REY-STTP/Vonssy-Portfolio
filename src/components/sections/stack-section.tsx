import type { StackCategory } from "@/types/portfolio";

interface StackSectionProps {
  stack: StackCategory[];
}

export function StackSection({ stack }: StackSectionProps) {
  return (
    <section
      id="stack"
      className="border-y border-line-soft bg-section section-pad"
    >
      <div className="shell grid gap-12 lg:grid-cols-[.68fr_1.32fr]">
        <div>
          <h2 className="text-4xl font-bold tracking-normal md:text-5xl">
            Working stack
          </h2>
          <p className="mt-4 max-w-sm text-sm leading-6 text-muted">
            Grouped by what each tool does in the work.
          </p>
        </div>
        <dl className="border-b border-line">
          {stack.map((item) => (
            <div
              key={item.category}
              className="grid gap-2 border-t border-line py-5 sm:grid-cols-[9rem_1fr] sm:gap-5"
            >
              <dt className="font-bold">{item.category}</dt>
              <dd className="text-sm leading-6 text-soft">{item.items}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
