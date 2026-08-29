import Link from "next/link";
import { ArrowUpRight, GitHubIcon } from "@/components/icons";
import { siteConfig } from "@/data/site";

export default function NotFound() {
  return (
    <section className="hero-section not-found">
      <div className="hero-grid" aria-hidden="true" />

      <div className="shell not-found-inner">
        <p className="mono not-found-kicker">
          <span className="availability-dot" />
          Error 404
        </p>

        <h1 className="not-found-code" aria-label="404">
          4<span className="not-found-dim">0</span>4
        </h1>

        <p className="not-found-copy">
          This page wandered off-grid. The link may be broken, moved, or never
          existed — but there&rsquo;s plenty more to explore.
        </p>

        <div className="hero-actions not-found-actions">
          <Link className="button button-primary" href="/">
            Back to home <ArrowUpRight />
          </Link>
          <a
            className="button button-ghost"
            href={siteConfig.socialLinks.github}
            target="_blank"
            rel="noreferrer"
          >
            <GitHubIcon /> GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
