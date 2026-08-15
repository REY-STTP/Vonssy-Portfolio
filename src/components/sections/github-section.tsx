import type { StatItem } from "@/types/portfolio";
import { siteConfig } from "@/data/site";
import { ArrowUpRight, GitHubIcon } from "@/components/icons";
import { StatCard } from "@/components/ui/stat-card";

interface GitHubSectionProps {
  stats: StatItem[];
}

export function GitHubSection({ stats }: GitHubSectionProps) {
  return (
    <section id="github" className="section-pad">
      <div className="shell grid gap-14 lg:grid-cols-[1.12fr_.88fr] lg:items-end">
        <div>
          <h2 className="max-w-xl text-4xl font-bold tracking-normal md:text-6xl">
            GitHub history
          </h2>
          <p className="mt-6 max-w-xl leading-7 text-soft">
            The current automation work lives mostly at{" "}
            <span className="mono text-ink">@{siteConfig.handle}</span>. Earlier
            experiments and web applications live at{" "}
            <span className="mono text-ink">@REY-STTP</span>.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              className="button button-primary"
              href={siteConfig.socialLinks.github}
              target="_blank"
              rel="noreferrer"
            >
              <GitHubIcon /> @{siteConfig.handle} <ArrowUpRight />
            </a>
            <a
              className="button button-ghost"
              href={siteConfig.socialLinks.githubSecondary}
              target="_blank"
              rel="noreferrer"
            >
              @REY-STTP <ArrowUpRight />
            </a>
          </div>
          <p className="mono mt-4 text-xs text-subtle">
            Public profile snapshot · August 2026
          </p>
        </div>

        <dl className="grid grid-cols-2 border-b border-line">
          {stats.map((stat) => (
            <StatCard
              key={stat.label}
              value={stat.value}
              label={stat.label}
            />
          ))}
        </dl>
      </div>
    </section>
  );
}
