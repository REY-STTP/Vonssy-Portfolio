<div align="center">

# ⚡ Vonssy Portfolio

**A modern, minimalist, and high-performance personal portfolio for Web3 builders and automation engineers.**

[![Next.js](https://img.shields.io/badge/Next.js_16-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript_5.8-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)

<br />

[Explore Live](#) · [Report Bug](https://github.com/REY-STTP/Vonssy-Portfolio/issues) · [Request Feature](https://github.com/REY-STTP/Vonssy-Portfolio/issues)

</div>

---

## 📖 Overview

**Vonssy Portfolio** is an ultra-fast, aesthetically refined developer portfolio crafted with **Next.js 16 (Turbopack, App Router)**, **React 19**, **TypeScript**, and **Framer Motion**. It showcases automation systems, Web3 bots, full-stack applications, and blockchain tooling with a clean, high-contrast, editorial typography aesthetic — and includes an **AI chat assistant** powered by local RAG embeddings and a streamed LLM that answers questions about the work.

Built adhering to **Clean Code** principles, the repository features strict modularization, isolated data layers, custom hooks for DOM side-effects, privacy-conscious analytics, and zero visual regressions.

---

## ✨ Key Features

- **🎨 Dynamic Theme Engine**: Seamless switching between `Dark`, `Light`, and `System` color schemes with persistent `localStorage` synchronization and smooth rotation micro-interactions.
- **🤖 RAG Chat Assistant**: Floating chat widget (dynamic `ssr:false`, no initial JS cost) powered by a Retrieval-Augmented Generation pipeline. Multi-turn conversations with query rewriting, Jina AI task-tuned embeddings for retrieval, an answer cache for instant repeat questions, clickable source citations (`chat_source_click` tracked, no content logged), an OpenAI-compatible LLM router streaming answers token-by-token, and honest out-of-scope guardrails.
- **📊 Privacy-Conscious Analytics**: Vercel Web Analytics (`@vercel/analytics` `<Analytics />`) with 9 custom `track()` events — `cta_telegram_click`/`cta_email_click` (contact), `github_profile_click`, `demo_click`, `chat_open`/`chat_message_sent`/`chat_source_click`, `section_view` via `IntersectionObserver` (once per section per session), and `page_view_classified` (AI referral `chat.openai.com`/`perplexity.ai`/`claude.ai` vs organic/direct via `utm_source` + referrer).
- **🧭 Smart Sticky Header**: Features ultra-clean glassmorphism (*16px backdrop blur*) that automatically slides up on scroll-down to maximize viewport reading room and reveals instantly on scroll-up.
- **📜 Scroll-Linked Manifesto Reveal**: Single `scrollYProgress` listener (1 MotionValue, not 15) with per-word opacity derived in parent — RAF-throttled, `prefers-reduced-motion` safe.
- **🔄 Smart Floating Scroll Progress**: Circular SVG progress gauge that tracks scroll depth, dynamically flips between *Scroll to Bottom* and *Scroll to Top* based on scroll direction, and auto-hides after 2.2s of inactivity.
- **📁 Modular Project Showcase**: Interactive categorized project grid with fluid layout animations and an accessible modal dialog complete with keyboard trapping (`Esc` key support). Displays the first 10 projects with a smooth animated *"Show all"* expand toggle — modal demo links fire `demo_click` (`project.name`).
- **❓ FAQ Accordion (10 Q&A)**: Animated expandable FAQ section (8 → 10: safety/fresh-wallet, multi-wallet steps, proxy rotation vs crash, APP_VERSION maintenance, custom quote scope, live demos) — each answer self-contained for AI citation, synced to `faq.ts` → `FAQPage` JSON-LD + `llms.txt`/`llms-full.txt`.
- **🔒 Privacy & Terms Pages**: Minimal, honest `/privacy` and `/terms` routes (same design tokens, `shell` + `section-pad`, `max-w-[72ch]` readable, dark/light via `var(--bg)`/`var(--text)`, `Back to home` breadcrumb, linked in footer + contact + `sitemap.xml`).
- **🎬 Staggered Cinematic Intro**: First-visit brand reveal with decorative overlay (`pointer-events:none`, `aria-hidden`) — `useState(false)` SSR so H1 `opacity:1` in first frame for LCP, crawler skip via `navigator.webdriver`, `sessionStorage` dedupe.
- **🏷️ Animated Brand Logo**: Custom SVG brand logo component with smooth entrance animations.
- **🚫 Custom 404 Page**: Styled not-found page consistent with the portfolio design system.
- **♿ First-Class Accessibility**: Native `prefers-reduced-motion` (global `animation-duration:.01ms`), ARIA dialog roles, focus management, `sr-only` fallback list for crawlers (`aria-hidden="false"` + `tabIndex={-1}` to pass `aria-hidden-focus`), keyboard accessibility.
- **🚀 SEO & AI Discoverability**: `Vonssy Portfolio` site name (`WebSite` JSON-LD 32-word description, `og:site_name`), full Schema.org `@graph` 9 nodes (`Person`/`WebSite`/`ProfilePage`/`BreadcrumbList`/`FAQPage` 10×`Question`/`ItemList` 15×`SoftwareSourceCode` with `programmingLanguage:["Python"]`+`runtimePlatform`+`applicationCategory`+`Service` 3 Offer `hire.md#service`), static OG `og-image.jpg` (60KB JPEG q85 + `og-image.webp` 29KB, `icon-1024.png` 1024×1024), `sitemap.xml` 6 routes (`/` + `llms.txt`/`llms-full.txt`/`hire.md`/`privacy`/`terms`) & `robots.txt` (allow 16 AI crawlers), plus `llms.txt` (3 definition blocks `Web3 automation engineer` 50w) / `llms-full.txt` (comparison `Vonssy vs Generic` 7 rows) + `hire.md` enriched for AI buying agents.

---

## 🏗️ Clean Code Architecture

The codebase is organized with a strict **Separation of Concerns (SoC)** to ensure maintainability and testability:

```text
public/
├── hire.md                      # Custom quote scopes — parseable for AI buying agents (Service hasOfferCatalog 3 Offer)
├── icon-1024.png                # 1024×1024 PNG export from icon.svg for stores/directories
├── llms.txt                     # Concise markdown for LLMs (spec llmstxt.org) — 15 projects + 3 definition blocks + FAQ 10
├── llms-full.txt                # Full context dump — 15 projects + comparison table + FAQ 10 + Privacy/Terms links
├── og-image.jpg                 # 60KB JPEG q85 (was 462KB PNG) — 1200×630 OG/Twitter, type image/jpeg
├── og-image.webp                # 29KB WebP alternative
└── og-image.png                 # Legacy 462KB PNG kept for fallback

src/
├── app/
│   ├── api/
│   │   └── chat/route.ts        # RAG chat endpoint (Node runtime, SSE streaming, rate limit, answer cache)
│   ├── privacy/page.tsx         # Minimal honest privacy — static, RAG zero-retention + Vercel Analytics anon
│   ├── terms/page.tsx           # Minimal honest terms — personal portfolio, MIT, no warranty
│   ├── globals.css              # Design tokens (var(--bg)/--text/--accent), section-pad 124px→88px mobile
│   ├── icon.svg                 # Favicon / app icon (source for icon-1024.png)
│   ├── layout.tsx               # Root layout, Google Fonts Manrope [400,700,800] + JetBrains Mono [400,700] display:swap, <Analytics />
│   ├── not-found.tsx            # Custom 404 page
│   ├── page.tsx                 # Lean Server Component — single @graph 9 nodes (Person/WebSite/FAQPage 10/ItemList 15/Service)
│   ├── robots.ts                # Crawler config — wildcard allow "/" disallow "/api/" + 16 AI bots
│   └── sitemap.ts               # Dynamic sitemap — 6 routes (/ + llms.txt/llms-full.txt/hire.md/privacy/terms)
├── components/
│   ├── analytics-tracker.tsx    # Section_view (IntersectionObserver 6 ids, once/session) + page_view_classified (AI vs organic via referrer+utm)
│   ├── icons.tsx                # Typed, accessible SVG icons
│   ├── portfolio-client.tsx     # Client orchestrator — dynamic ChatWidget ssr:false, useState(false) LCP, isBot webdriver skip
│   ├── layout/
│   │   ├── header.tsx           # Smart sticky header & theme controller
│   │   ├── mobile-nav.tsx       # Animated mobile navigation drawer
│   │   └── footer.tsx           # Footer — © + GitHub/Telegram/X + Privacy/Terms (flex-wrap, no overflow)
│   ├── sections/
│   │   ├── hero-section.tsx     # Hero banner — revealVariants opacity:1 y:34 (LCP fix), RAF-throttled pointer glow
│   │   ├── ticker-section.tsx   # Continuous marquee ticker banner
│   │   ├── manifesto-section.tsx# Single scrollYProgress listener → plain <span style opacity> per word
│   │   ├── about-section.tsx    # Builder background narrative
│   │   ├── philosophy-section.tsx # "How I Build" principles cards
│   │   ├── projects-section.tsx # Filterable showcase (show-10 + expand) + sr-only fallback (aria-hidden false + tabIndex -1 for a11y)
│   │   ├── stack-section.tsx    # Technical skills categorization
│   │   ├── github-section.tsx   # GitHub profiles snapshot — track github_profile_click {profile}
│   │   ├── faq-section.tsx      # Expandable FAQ accordion 10 items — tracking via section_view
│   │   └── contact-section.tsx  # Direct CTA — track cta_telegram_click/email_click + Privacy/Terms row
│   └── ui/
│       ├── brand-logo.tsx       # Animated SVG brand logo component
│       ├── chat-markdown.tsx    # Lightweight Markdown renderer (safe React nodes)
│       ├── chat-widget.tsx      # Floating RAG chat bubble & panel — track chat_open/message_sent/source_click (no content)
│       ├── intro-overlay.tsx    # Timed cinematic intro overlay — pointerEvents:none decorative
│       ├── project-modal.tsx    # Accessible modal — track demo_click {project}, focus trap, side-by-side mobile
│       ├── scroll-progress.tsx  # Directional circular scroll indicator (auto-hide)
│       ├── stat-card.tsx        # Reusable GitHub stat card component
│       └── theme-selector.tsx   # Minimalist animated theme toggle button
├── data/
│   ├── faq.ts                   # FAQ items data — 10 Q&A (Q5-Q10: safety/steps/proxy/maintenance/quote/demos)
│   ├── navigation.ts            # Navigation items, project filters, stat items
│   ├── philosophy.ts            # Software engineering principles data
│   ├── projects.ts              # Strongly typed project portfolio data
│   ├── rag/
│   │   ├── embeddings.json      # Pre-computed vector embeddings — 1303 chunks from 226 sources (curated + discovered)
│   │   ├── manual.ts            # Curated bio/contact sources for ingestion
│   │   └── repos.ts             # Curated showcase repos (auto-discovery covers the rest)
│   ├── site.ts                  # Site config & JSON-LD (WebSite 32-word desc, Service termsOfService → /terms, 11 knowsAbout)
│   └── stack.ts                 # Categorized technical stack data — Web3: EVM · Substrate/Konnex · Canton
├── hooks/
│   ├── use-chat.ts              # Chat state, SSE streaming, sessionStorage persistence
│   ├── use-reduced-motion.ts    # React hook for prefers-reduced-motion
│   ├── use-scroll-progress.ts   # RAF-throttled scroll depth and direction hook
│   └── use-theme.ts             # Theme state management & system color scheme sync
├── lib/
│   ├── analytics.ts             # classifyTrafficSource() — AI domains vs organic vs referrer vs direct via utm_source+referrer
│   └── rag/
│       ├── llm.ts              # Generic LLM API client (streaming + completions, model fallback, timeout)
│       ├── embed.ts             # Provider-agnostic embedding client (Jina default, task-tuned)
│       ├── prompt.ts            # System persona/voice, history builder, injection sanitizer, guardrail
│       └── retrieve.ts          # Cosine similarity search + threshold guardrail
├── proxy.ts                     # Production-only canonical-host redirect (308) — excludes og-image.jpg/webp, hire.md, llms
└── types/
    ├── portfolio.ts             # TypeScript domain interfaces and type definitions
    └── rag.ts                   # RAG/chat runtime types (messages, chunks, records)
scripts/
└── ingest.ts                    # Offline RAG ingestion pipeline (npm run ingest) — 1303 chunks 2026-05-11
.github/
└── workflows/
    └── rag-ingest.yml           # Scheduled weekly GitHub Action for RAG re-ingestion
```

---

## 🛠️ Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **Next.js 16.3** | React Framework (App Router, Turbopack, Static Generation, `revalidate 86400`) |
| **React 19.2** | UI Library with modern hooks & concurrent features |
| **TypeScript 5.8** | Type safety, domain modeling, and static validation |
| **Tailwind CSS 3.4** | Utility-first styling and responsive design (`var(--bg)` tokens, `section-pad`, `shell`) |
| **Framer Motion 13** | Physics-based animations — RAF-throttled, reduced-motion safe |
| **Vercel Analytics 2.0** | Privacy-conscious custom events (`track()`) + Web Vitals (`<Analytics />` zero-config on Vercel) |
| **Google Fonts** | `Manrope` [400,700,800] (Display / Sans) & `JetBrains Mono` [400,700] (Code / Numbers) `display:swap` |
| **Embeddings** | Jina AI `jina-embeddings-v3` via OpenAI-compatible API (task-tuned query/passage, 1024d `retrieval.passage`) — configurable via `EMBEDDINGS_*` env vars |
| **LLM Router** | OpenAI-compatible LLM router for streamed chat responses (swap provider via `LLM_*` env vars) |

---

## 🤖 RAG Chat Assistant — How It Works

The floating chat widget answers questions about Vonssy's projects, skills, and contact info through a **Retrieval-Augmented Generation** pipeline:

1. **Ingestion (offline / weekly cron)** — the ingestion script auto-discovers **all public repos** from both GitHub accounts (forks & archived excluded), merges them with a curated showcase list, fetches each README via the GitHub API, chunks the content per section, and embeds it with **Jina AI `jina-embeddings-v3`** (1024 dimensions, `retrieval.passage` task tuning). Results are committed to `src/data/rag/embeddings.json` (**1303 chunks from 226 sources** as of 2026-05-11). A scheduled GitHub Action (`rag-ingest.yml`) re-runs this weekly so stars, forks, and READMEs never go stale.
2. **Multi-turn retrieval (runtime)** — `/api/chat` accepts the recent conversation history. Follow-up questions ("*what tech does it use?*") are first rewritten into standalone queries by the LLM, then embedded with `retrieval.query` task tuning and searched against the index by cosine similarity.
3. **Guardrails** — visitor input is sanitized against prompt-injection markup on the server; if the best similarity score falls below a threshold, the route skips the LLM and honestly says the information isn't available instead of hallucinating.
4. **Generation** — retrieved context plus conversation history are wrapped into a persona-driven system prompt and streamed token-by-token from the configured **LLM router** model over SSE. The client renders them progressively with an XSS-safe Markdown renderer (links, tables, headings, code) and shows clickable source chips under each answer (`chat_source_click` tracked, no content).

Supporting layers: a per-IP rate limiter protects the endpoint from abuse, an in-memory LRU cache serves repeated questions instantly without spending API calls, and `max_tokens`/timeout caps keep provider costs bounded.

The bot never answers beyond its indexed context — it says so honestly when information is missing.

---

## 📊 Analytics — Privacy-Conscious Custom Events

Vercel Web Analytics is enabled via `<Analytics />` in `app/layout.tsx` — zero env, works on Vercel deploy. Custom events via `track()` from `@vercel/analytics` (no PII, no chat content):

- **Contact** `contact-section.tsx`: `cta_telegram_click` + `cta_email_click` `{location:"contact"}` — primary conversions.
- **GitHub** `github-section.tsx`: `github_profile_click` `{profile:"vonssy"|"rey-sttp"}`.
- **Demos** `project-modal.tsx`: `demo_click` `{project: name}`.
- **Chat** `chat-widget.tsx`: `chat_open` on open, `chat_message_sent` on submit/suggestion (count only), `chat_source_click` `{source}` on citation.
- **Sections** `analytics-tracker.tsx`: `section_view` `{section: about|projects|stack|github|faq|contact}` via `IntersectionObserver` threshold 0.3, once per section per session (`sessionStorage` dedupe).
- **AI referral** `lib/analytics.ts`: `page_view_classified` `{source: ai_referral|organic|direct|referral, utm_source, referrer}` — checks `utm_source` then `document.referrer` vs `chat.openai.com`/`perplexity.ai`/`claude.ai` etc. Enable in Vercel Dashboard → Analytics → Web Analytics.

See `.agents/analytics.md` for the full tracking plan and `.agents/content-strategy.md` for how `section_view`/`demo_click` map to content pillars.

---

## 🚀 Getting Started

### Prerequisites

Ensure you have **Node.js 18.18+** or **Node.js 20+** installed:

```bash
node -v
npm -v
```

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/REY-STTP/Vonssy-Portfolio.git
   cd Vonssy-Portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_SITE_URL=https://your-domain.com

   # Required for the RAG chat assistant
   LLM_API_KEY=your_llm_provider_api_key
   LLM_BASE_URL=https://router.bynara.id/v1

   # Embeddings — defaults target Jina AI (free trial: 10M tokens)
   EMBEDDINGS_BASE_URL=https://api.jina.ai/v1
   EMBEDDINGS_MODEL=jina-embeddings-v3
   EMBEDDINGS_API_KEY=your_jina_api_key
   EMBEDDINGS_DIMENSIONS=1024

   # Optional but recommended — raises GitHub API rate limit during ingestion
   GITHUB_TOKEN=your_github_token
   ```

4. **(Optional) Rebuild the RAG index:** the chat assistant ships with pre-computed embeddings committed to the repo. Only re-run this when you add or update projects:
   ```bash
   npm run ingest
   ```

5. **Run development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📦 Available Scripts

- `npm run dev`: Starts the Next.js development server with Turbopack.
- `npm run build`: Compiles and bundles the production static build.
- `npm run start`: Runs the built production server locally.
- `npm run ingest`: Runs the RAG ingestion pipeline — fetches repo READMEs, chunks content, and regenerates `src/data/rag/embeddings.json`.
- `npm run lint`: Lints the codebase with ESLint (`eslint-config-next` flat config).
- `npm run typecheck`: Executes TypeScript type check (`tsc --noEmit`) to ensure zero type errors.
- `npm run test`: Runs unit tests with the Node.js built-in test runner.
- `npm run format`: Formats source files with Prettier.

---

## ⚙️ Customization Guide

Updating your portfolio information is fast and simple thanks to the dedicated `src/data/` layer:

1. **Projects**: Edit [`src/data/projects.ts`](src/data/projects.ts) to add or modify repositories, star counts, descriptions, and technical approaches.
2. **Personal Info & SEO**: Edit [`src/data/site.ts`](src/data/site.ts) to update your name, avatar, bio, email, and social links. `getServiceJsonLd()` `termsOfService` now points to `/terms`.
3. **Principles & Stack**: Edit [`src/data/philosophy.ts`](src/data/philosophy.ts) and [`src/data/stack.ts`](src/data/stack.ts).
4. **Navigation & Stats**: Edit [`src/data/navigation.ts`](src/data/navigation.ts).
5. **FAQ**: Edit [`src/data/faq.ts`](src/data/faq.ts) to add or modify frequently asked questions — 10 Q&A synced to `FAQPage` JSON-LD + `llms.txt`/`llms-full.txt` (run `npm run ingest` after).
6. **Privacy / Terms**: Edit [`src/app/privacy/page.tsx`](src/app/privacy/page.tsx) and [`src/app/terms/page.tsx`](src/app/terms/page.tsx) — same tokens `var(--bg)`/`var(--text)`, `shell` + `section-pad`, `max-w-[72ch]`.
7. **Chat assistant sources**: Edit [`src/data/rag/repos.ts`](src/data/rag/repos.ts) (curated repos that get full-depth knowledge) — other public repos are picked up automatically via discovery. Bio/contact context lives in [`src/data/rag/manual.ts`](src/data/rag/manual.ts). Then run `npm run ingest` to rebuild `src/data/rag/embeddings.json`, or let the weekly GitHub Action do it.
8. **Chat system prompt & tone**: Edit [`src/lib/rag/prompt.ts`](src/lib/rag/prompt.ts).
9. **Analytics events**: See `.agents/analytics.md` — add `track()` in client components, no `NEXT_PUBLIC` env needed.

---

## 👤 Author

**Reyvaldi Zakaria (Vonssy)**
- GitHub: [@vonssy](https://github.com/vonssy) · [@REY-STTP](https://github.com/REY-STTP)
- X: [@_Vonssy](https://x.com/_Vonssy)
- Telegram: [@vonssy_part_2](https://t.me/vonssy_part_2)
- Email: `rey.zakaria123@gmail.com`

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
