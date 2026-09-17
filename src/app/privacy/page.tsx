import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "@/components/icons";
import { BrandLogo } from "@/components/ui/brand-logo";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Privacy — Vonssy Portfolio",
  description:
    "Privacy policy for Vonssy Portfolio — what this static site collects via RAG chat and anonymous Vercel Analytics, and what it doesn't.",
  alternates: { canonical: "/privacy" },
  openGraph: {
    title: "Privacy — Vonssy Portfolio",
    description:
      "Privacy policy for Vonssy Portfolio — what this static site collects via RAG chat and anonymous Vercel Analytics, and what it doesn't.",
    url: "/privacy",
    siteName: "Vonssy Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Privacy — Vonssy Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy — Vonssy Portfolio",
    description:
      "Privacy policy for Vonssy Portfolio — what this static site collects via RAG chat and anonymous Vercel Analytics.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const siteUrl = siteConfig.siteUrl;

const webpageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${siteUrl}/privacy#webpage`,
  url: `${siteUrl}/privacy`,
  name: "Privacy — Vonssy Portfolio",
  description: "Privacy policy for Vonssy Portfolio.",
  isPartOf: { "@id": `${siteUrl}/#website` },
  inLanguage: "en",
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
    { "@type": "ListItem", position: 2, name: "Privacy", item: `${siteUrl}/privacy` },
  ],
};

export default function PrivacyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webpageJsonLd).replace(/</g, "\\u003c") }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, "\\u003c") }}
      />
      <main className="min-h-dvh bg-[var(--bg)] text-[var(--text)]">
      {/* Minimal header — reuses brand + system tokens */}
      <header className="site-header !static border-b border-[var(--line-soft)] bg-[color-mix(in_srgb,var(--bg)_92%,transparent)]">
        <div className="shell site-header-inner !h-[74px]">
          <Link href="/" className="brand-mark mono hover:text-[var(--text)]">
            <BrandLogo size={22} className="shrink-0" />
            <span className="brand-mark-text">
              VONSSY<span className="text-[var(--accent)]">.</span>
              <span className="brand-index">/26</span>
            </span>
          </Link>
        </div>
      </header>

      <section className="section-pad">
        <div className="shell">
          <div className="mx-auto max-w-[72ch]">
            {/* Kicker + title — same scale as other sections */}
            <p className="mono mb-6 text-xs tracking-[0.18em] text-[var(--muted)]">PRIVACY — LAST UPDATED 2026-05-11</p>
            <h1 className="text-4xl font-bold leading-none tracking-tight md:text-5xl">
              Privacy,
              <br />
              <span className="text-[var(--accent)]">plain and honest.</span>
            </h1>
            <p className="mono mt-3 text-xs text-[var(--muted-deep)]">No legalese overkill for a personal portfolio.</p>

            <div className="mt-10 rounded-xl border border-[var(--line)] bg-[var(--surface)] p-5 text-sm leading-6 text-[var(--text-soft)] md:p-6">
              <span className="mono text-xs font-bold tracking-wide text-[var(--text)]">TL;DR</span>
              <p className="mt-2">
                This is a static portfolio. We don&apos;t sell data, don&apos;t build profiles, and don&apos;t store your chat messages. Vercel Analytics counts anonymous events (no PII, no chat content). RAG chat runs on Jina embeddings and streams answers — nothing you type is saved as identifiable data.
              </p>
            </div>

            <div className="mt-12 space-y-10 text-[15px] leading-7 text-[var(--text-soft)]">
              <section>
                <h2 className="text-lg font-bold text-[var(--text)]">What this site is</h2>
                <p className="mt-3">
                  Vonssy Portfolio (<span className="mono text-xs text-[var(--muted)]">www.vonssy-portfolio.web.id</span>) is a static Next.js site. There&apos;s no account system, no checkout, and no contact form that writes to a database. Contact is via Telegram{" "}
                  <a href="https://t.me/vonssy_part_2" target="_blank" rel="noreferrer" className="text-[var(--accent)] underline decoration-[var(--line)] underline-offset-4 hover:text-[var(--accent-strong)]">
                    t.me/vonssy_part_2
                  </a>{" "}
                  or email — those are third-party services with their own policies.
                </p>
              </section>

              <section className="border-t border-[var(--line)] pt-8">
                <h2 className="text-lg font-bold text-[var(--text)]">What we don&apos;t collect</h2>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-[var(--muted)] marker:text-[var(--muted-deep)]">
                  <li>No personal data collection beyond what you voluntarily send via Telegram/email.</li>
                  <li>No cross-site profiling, no ad targeting, no sale of data — ever.</li>
                  <li>No chat content stored with identity — see RAG note below.</li>
                </ul>
              </section>

              <section className="border-t border-[var(--line)] pt-8">
                <h2 className="text-lg font-bold text-[var(--text)]">RAG chat (Jina + LLM router)</h2>
                <p className="mt-3">
                  The floating chat widget answers from a pre-built embeddings index (<span className="mono text-xs">src/data/rag/embeddings.json</span>). Your question is embedded via Jina <span className="mono text-xs">jina-embeddings-v3</span> and sent to an LLM router for a streamed answer.
                </p>
                <div className="mt-4 rounded-lg border border-[var(--line)] bg-[var(--surface-hi)] p-4">
                  <p className="mono text-xs font-bold text-[var(--text)]">How we handle chat data</p>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6 text-[var(--muted)]">
                    <li>
                      <span className="text-[var(--text-soft)]">No data retention for chat content</span> — messages are processed per request, not saved as identifiable user data (<span className="mono text-xs">src/lib/analytics.ts</span> tracks only <span className="mono text-xs">chat_open / chat_message_sent (count) / chat_source_click</span>, never message text).
                    </li>
                    <li>Embeddings are pre-computed at build time; chat history lives only in your browser (session) and is not written to a database.</li>
                    <li>Provider calls go to Jina and your configured LLM router — same data-minimization applies on their side per their policies.</li>
                  </ul>
                </div>
              </section>

              <section className="border-t border-[var(--line)] pt-8">
                <h2 className="text-lg font-bold text-[var(--text)]">Analytics — Vercel Web Analytics (anonymous)</h2>
                <p className="mt-3">
                  We use Vercel Web Analytics with custom <span className="mono text-xs">track()</span> events (<span className="mono text-xs">src/components/analytics-tracker.tsx</span>) to understand which sections help: <span className="mono text-xs">page_view_classified, section_view, cta_telegram_click, cta_email_click, github_profile_click, demo_click, chat_open/message_sent/source_click</span>.
                </p>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-[var(--muted)]">
                  <li>
                    <span className="text-[var(--text-soft)]">Anonymous</span> — no PII, no IP stored by us, no chat content, no wallet data. Vercel aggregates counts.
                  </li>
                  <li>Referrer classification is best-effort (<span className="mono text-xs">lib/analytics.ts:11</span> checks <span className="mono text-xs">utm_source</span> + <span className="mono text-xs">document.referrer</span> for ChatGPT/Perplexity/Claude) — many AI clients strip referrer.</li>
                  <li>Enable happens on Vercel deploy with no extra cookie banner for this static case; if you self-host elsewhere, the same anonymous counts apply.</li>
                </ul>
                <p className="mt-3 text-sm text-[var(--muted)]">
                  Details of events: <span className="mono text-xs">.agents/analytics.md</span> — Tracking Plan.
                </p>
              </section>

              <section className="border-t border-[var(--line)] pt-8">
                <h2 className="text-lg font-bold text-[var(--text)]">Cookies & local storage</h2>
                <p className="mt-3">
                  No tracking cookies. The site only uses browser storage for UX: <span className="mono text-xs">localStorage vonssy-theme</span> (your dark/light preference),{" "}
                  <span className="mono text-xs">sessionStorage vonssy-intro-seen</span> (intro seen), and a couple of <span className="mono text-xs">sessionStorage</span> keys for analytics dedupe (<span className="mono text-xs">vonssy-section-viewed</span>, <span className="mono text-xs">vonssy-page-view-classified</span>). Clear storage anytime in your browser.
                </p>
              </section>

              <section className="border-t border-[var(--line)] pt-8">
                <h2 className="text-lg font-bold text-[var(--text)]">Third parties</h2>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-[var(--muted)]">
                  <li>
                    <span className="text-[var(--text-soft)]">Vercel</span> — hosting + analytics (anonymous).
                  </li>
                  <li>
                    <span className="text-[var(--text-soft)]">GitHub / Telegram / X</span> — when you click out, their policies apply.
                  </li>
                  <li>
                    <span className="text-[var(--text-soft)]">Jina AI / LLM router</span> — only for chat embedding + answer streaming.
                  </li>
                  <li>Avatars from <span className="mono text-xs">avatars.githubusercontent.com</span> via Next Image.</li>
                </ul>
              </section>

              <section className="border-t border-[var(--line)] pt-8">
                <h2 className="text-lg font-bold text-[var(--text)]">Your choices & contact</h2>
                <p className="mt-3">
                  You can block analytics with a content blocker, clear <span className="mono text-xs">localStorage/sessionStorage</span>, or just not use the chat widget — the portfolio remains fully readable without JavaScript (view-source has all text). For questions or deletion requests, reach out via{" "}
                  <a href="https://t.me/vonssy_part_2" target="_blank" rel="noreferrer" className="text-[var(--accent)] underline decoration-[var(--line)] underline-offset-4 hover:text-[var(--accent-strong)]">
                    Telegram
                  </a>{" "}
                  or <a href="mailto:rey.zakaria123@gmail.com" className="text-[var(--accent)] underline decoration-[var(--line)] underline-offset-4 hover:text-[var(--accent-strong)]">email</a>. We&apos;ll respond directly.
                </p>
                <p className="mono mt-6 text-xs text-[var(--muted-deep)]">
                  This policy is for a personal portfolio, not a regulated SaaS. If requirements change (e.g., adding a contact form that stores data), this page will be updated and the “Last updated” date bumped.
                </p>
              </section>
            </div>

            <div className="mt-12 flex flex-wrap gap-3 border-t border-[var(--line)] pt-8">
              <Link href="/" className="button button-primary">
                Back to home <ArrowUpRight />
              </Link>
              <Link href="/terms" className="button button-ghost">
                Terms
              </Link>
              <a href="/hire.md" className="button button-ghost">
                Hire
              </a>
            </div>

            <p className="mono mt-4 text-xs text-[var(--muted)]">Last updated: 2026-05-11</p>
            <p className="mono mt-2 text-xs text-[var(--muted-deep)]">
              Canonical: www.vonssy-portfolio.web.id/privacy — also linked in footer &amp; sitemap.xml
            </p>
          </div>
        </div>
      </section>

      <footer className="site-footer shell border-t border-[var(--line-soft)] py-7 text-xs text-[var(--muted-deep)]">
        <span>© 2026 Vonssy Portfolio — Systems in motion.</span>
        <span className="mono">privacy / 2026-05-11</span>
      </footer>
      </main>
    </>
  );
}
