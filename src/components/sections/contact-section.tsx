"use client";

import { track } from "@vercel/analytics";
import { siteConfig } from "@/data/site";
import { ArrowUpRight } from "@/components/icons";

export function ContactSection() {
  return (
    <section id="contact" className="border-t border-line-soft section-pad">
      <div className="shell flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
        <h2 className="text-4xl font-bold tracking-normal md:text-6xl">
          Want to build
          <br />
          <span className="text-accent">something useful?</span>
        </h2>
        <div className="flex flex-wrap gap-3">
          <a
            href={siteConfig.socialLinks.telegram}
            target="_blank"
            rel="noreferrer"
            className="button button-primary"
            onClick={() => track("cta_telegram_click", { location: "contact" })}
          >
            Telegram <ArrowUpRight />
          </a>
          <a
            href={`mailto:${siteConfig.email}`}
            className="button button-ghost"
            onClick={() => track("cta_email_click", { location: "contact" })}
          >
            Email <ArrowUpRight />
          </a>
        </div>
      </div>
    </section>
  );
}
