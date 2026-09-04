import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "@/components/icons";
import { BrandLogo } from "@/components/ui/brand-logo";

export const metadata: Metadata = {
  title: "Terms — Vonssy Portfolio",
  description: "Terms for Vonssy Portfolio — personal portfolio, open-source BOTs for learning, no warranty, and honest use.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <main className="min-h-dvh bg-[var(--bg)] text-[var(--text)]">
      <header className="site-header !static border-b border-[var(--line-soft)] bg-[color-mix(in_srgb,var(--bg)_92%,transparent)]">
        <div className="shell site-header-inner !h-[74px]">
          <Link href="/" className="brand-mark mono hover:text-[var(--text)]">
            <BrandLogo size={22} className="shrink-0" />
            <span className="brand-mark-text">
              VONSSY<span className="text-[var(--accent)]">.</span>
              <span className="brand-index">/26</span>
            </span>
          </Link>
          <Link href="/" className="button button-ghost text-xs">
            ← Back to home
          </Link>
        </div>
      </header>

      <section className="section-pad">
        <div className="shell">
          <div className="mx-auto max-w-[72ch]">
            <p className="mono mb-6 text-xs tracking-[0.18em] text-[var(--muted)]">TERMS — LAST UPDATED 2026-05-11</p>
            <h1 className="text-4xl font-bold leading-none tracking-tight md:text-5xl">
              Terms,
              <br />
              <span className="text-[var(--accent)]">plain and fair.</span>
            </h1>
            <p className="mono mt-3 text-xs text-[var(--muted-deep)]">Short, readable — built for a personal portfolio, not a corporation.</p>

            <div className="mt-10 rounded-xl border border-[var(--line)] bg-[var(--surface)] p-5 text-sm leading-6 text-[var(--text-soft)] md:p-6">
              <span className="mono text-xs font-bold tracking-wide text-[var(--text)]">TL;DR</span>
              <p className="mt-2">
                This is a personal portfolio and open-source showcase. Use anything here for learning, fork it, adapt it — but you&apos;re responsible for how you run it (especially BOTs that touch wallets/networks). No warranty, no guaranteed outcomes. Be kind, be honest, and don&apos;t misuse.
              </p>
            </div>

            <div className="mt-12 space-y-10 text-[15px] leading-7 text-[var(--text-soft)]">
              <section>
                <h2 className="text-lg font-bold text-[var(--text)]">Using this site</h2>
                <p className="mt-3">
                  Content is provided for information and learning. You may browse, link to, and share pages. You may not scrape at abusive rate, attempt to break the RAG chat (`/api/chat` is rate-limited), or use automation to hammer the site. The RAG chat answers only from the indexed portfolio context and has guardrails against hallucination.
                </p>
              </section>

              <section className="border-t border-[var(--line)] pt-8">
                <h2 className="text-lg font-bold text-[var(--text)]">Content & code</h2>
                <p className="mt-3">
                  Project code linked from this site lives on GitHub under its own licenses (most BOTs are MIT — check each repo&apos;s LICENSE). Portfolio site code, unless stated otherwise, is personal — you can learn from the patterns, but don&apos;t copy the brand identity verbatim. If you fork a BOT, keep it practical: review the code, use fresh wallets for farming/testnet, and don&apos;t run main wallets with real funds.
                </p>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-[var(--muted)]">
                  <li>
                    <span className="text-[var(--text-soft)]">No guarantee of profit</span> — BOTs automate workflows; they don&apos;t promise airdrops or returns. See <span className="mono text-xs">product-marketing.md</span> words-to-avoid: never “guaranteed airdrop.”
                  </li>
                  <li>Live demos (Terminal, Cloud Storage, E-Voting) are provided as-is for trying, not as financial or legal advice.</li>
                </ul>
              </section>

              <section className="border-t border-[var(--line)] pt-8">
                <h2 className="text-lg font-bold text-[var(--text)]">Disclaimer — no warranty</h2>
                <p className="mt-3">
                  Everything is provided “as is” without warranty of any kind. The author (Reyvaldi Zakaria / Vonssy) is not liable for losses, missed testnet rewards, gas fees, or issues caused by running scripts, changing upstream APIs, or network conditions. You&apos;re responsible for reviewing code, managing private keys/mnemonics, and operating within each project&apos;s terms.
                </p>
                <div className="mt-4 rounded-lg border border-[var(--line)] bg-[var(--surface-hi)] p-4">
                  <p className="mono text-xs font-bold text-[var(--text)]">BOT safety reminder</p>
                  <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                    All BOTs are open-source — audit before you run. Use fresh wallets, never your main holdings. Vonssy Terminal is read-only (Viem, no wallet connect). Same rule everywhere: new wallet per farming run.
                  </p>
                </div>
              </section>

              <section className="border-t border-[var(--line)] pt-8">
                <h2 className="text-lg font-bold text-[var(--text)]">Links to external sites</h2>
                <p className="mt-3">
                  Links to GitHub, Telegram, X, live demos (Vercel), Jina, and LLM providers are for convenience. Their content and policies are their own. Inclusion isn&apos;t endorsement of everything they do.
                </p>
              </section>

              <section className="border-t border-[var(--line)] pt-8">
                <h2 className="text-lg font-bold text-[var(--text)]">Changes</h2>
                <p className="mt-3">If this site adds features that change these terms (e.g., a contact form that stores data, or paid services), this page will be updated and the date bumped. The canonical URLs remain:</p>
                <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-[var(--muted)]">
                  <li>
                    <span className="mono text-xs">/privacy</span> — privacy
                  </li>
                  <li>
                    <span className="mono text-xs">/terms</span> — terms
                  </li>
                  <li>
                    <span className="mono text-xs">/hire.md</span> — collaboration scope
                  </li>
                </ul>
              </section>

              <section className="border-t border-[var(--line)] pt-8">
                <h2 className="text-lg font-bold text-[var(--text)]">Contact</h2>
                <p className="mt-3">
                  Questions about these terms? Reach out via{" "}
                  <a href="https://t.me/vonssy_part_2" target="_blank" rel="noreferrer" className="text-[var(--accent)] underline decoration-[var(--line)] underline-offset-4 hover:text-[var(--accent-strong)]">
                    Telegram
                  </a>{" "}
                  or <a href="mailto:rey.zakaria123@gmail.com" className="text-[var(--accent)] underline decoration-[var(--line)] underline-offset-4 hover:text-[var(--accent-strong)]">email</a>. For privacy specifics, see{" "}
                  <Link href="/privacy" className="text-[var(--accent)] underline decoration-[var(--line)] underline-offset-4 hover:text-[var(--accent-strong)]">
                    Privacy
                  </Link>
                  .
                </p>
              </section>
            </div>

            <div className="mt-12 flex flex-wrap gap-3 border-t border-[var(--line)] pt-8">
              <Link href="/" className="button button-primary">
                Back to home <ArrowUpRight />
              </Link>
              <Link href="/privacy" className="button button-ghost">
                Privacy
              </Link>
              <a href="/hire.md" className="button button-ghost">
                Hire
              </a>
            </div>

            <p className="mono mt-4 text-xs text-[var(--muted)]">Last updated: 2026-05-11</p>
            <p className="mono mt-2 text-xs text-[var(--muted-deep)]">Canonical: www.vonssy-portfolio.web.id/terms — also linked in footer &amp; sitemap.xml</p>
          </div>
        </div>
      </section>

      <footer className="site-footer shell border-t border-[var(--line-soft)] py-7 text-xs text-[var(--muted-deep)]">
        <span>© 2026 Vonssy Portfolio — Systems in motion.</span>
        <span className="mono">terms / 2026-05-11</span>
      </footer>
    </main>
  );
}
