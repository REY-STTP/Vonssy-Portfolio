import type { StatItem } from "@/types/portfolio";

export function StatCard({ value, label }: StatItem) {
  return (
    <div className="border-t border-line py-5 odd:pr-5 even:border-l even:pl-5">
      <dt className="text-3xl font-bold text-ink">{value}</dt>
      <dd className="mono mt-2 text-xs text-subtle">{label}</dd>
    </div>
  );
}
