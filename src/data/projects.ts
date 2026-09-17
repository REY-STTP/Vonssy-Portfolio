import type { Project } from "@/types/portfolio";

export const projects: Project[] = [
  {
    name: "Vonssy Terminal",
    account: "REY-STTP",
    description:
      "Read-only EVM multichain wallet analytics: paste any address and get portfolio value, asset breakdowns, and classified activity history across 10 chains.",
    category: ["Web3", "Tools"],
    tags: ["Next.js 16", "TypeScript", "Alchemy", "Viem"],
    repo: "https://github.com/REY-STTP/Vonssy-Terminal",
    demo: "https://www.vonssy-terminal.web.id",
    signal: "Live web tool",
    details: {
      overview:
        "A wallet analytics terminal covering Ethereum, Base, Arbitrum, Polygon, OP Mainnet, BNB Smart Chain, Avalanche, zkSync Era, Linea, and Scroll — no wallet connection, signing, or auth required.",
      approach:
        "Public chain data is read server-side through Alchemy (Token API + Asset Transfers API); Viem is used for address checksumming and unit parsing. Native and ERC-20 holdings ship with live prices, the newest 100 transfers are grouped into sends, receives, swaps, and contract interactions (assets 25/page, activity 20/page), plus per-chain allocation that sums to exactly 100%.",
      decisions:
        "Chain configuration is centralized in src/lib/constants/networks.ts so new networks are one-file additions, the Alchemy key stays in server-only modules, per-section TTL cache with in-flight deduplication limits redundant calls, Suspense sections stream independently, previously searched wallets persist in localStorage, and 30+ Vitest tests guard normalization and classification.",
      challenges:
        "Graceful degradation under real conditions: per-IP sliding-window rate limiting, 10s per-request timeout with bounded jittered retries for 429/5xx, and per-chain partial failure (failedNetworks) so the dashboard keeps working with a partial view and clear error signals instead of crashing.",
    },
  },
  {
    name: "Vonssy-AI",
    account: "REY-STTP",
    description:
      "A BYOK AI chatbot — connect your own OpenAI-compatible endpoints with streamed responses, persistent sessions, OAuth, and encrypted key storage.",
    category: ["Web", "Tools", "AI / ML"],
    tags: ["Next.js 16", "TypeScript", "Drizzle", "PostgreSQL"],
    repo: "https://github.com/REY-STTP/Vonssy-AI",
    demo: "https://www.vonssy-ai.web.id",
    signal: "Live BYOK chatbot",
    details: {
      overview:
        "A unified interface for user-owned AI endpoints: each user stores N custom configs (label, baseUrl, apiKey, model) and chats against any OpenAI-compatible API — no server-side gateway keys required.",
      approach:
        "The application combines a Next.js 16 App Router frontend with Supabase PostgreSQL, Drizzle ORM, Auth.js v5 (Google + GitHub OAuth), streamed SSE responses via a per-request OpenAI-SDK client, and cursor-based pagination for sessions and messages.",
      decisions:
        "API keys are encrypted at rest with AES-256-GCM (clients only see ****last4), every model and session query is scoped by (id, userId), user-supplied baseUrl passes an SSRF guard (https-only, private-IP/DNS blocking, redirect rejection), abuse is throttled with DB-backed fixed windows, the all-chats list is virtualized with @tanstack/react-virtual, and name/DOB personalization is opt-in and server-injected.",
      challenges:
        "Coordinating token-by-token streaming with persistence, edit-and-regenerate truncation, per-message feedback and usage logs, ownership checks on every route, provider response differences, bilingual EN/ID UI, and responsive chat UX with markdown and syntax-highlighted code blocks.",
    },
  },
  {
    name: "Desa Sukobubuk",
    account: "REY-STTP",
    description:
      "The official website of Desa Sukobubuk (Margorejo, Pati): village profile, news, UMKM directory with products and reviews, gallery, and an SMTP-backed contact pipeline, plus a full admin dashboard.",
    category: ["Web"],
    tags: ["Next.js 16", "TypeScript", "Prisma", "PostgreSQL"],
    repo: "https://github.com/REY-STTP/desa-sukobubuk",
    demo: "https://www.desa-sukobubuk.web.id",
    signal: "Official village site · Live",
    details: {
      overview:
        "The official website of Desa Sukobubuk, Margorejo District, Pati Regency — village profile, news, UMKM directory, products with moderated ratings and reviews, activity gallery, and contact channel in a single platform.",
      approach:
        "Built with Next.js 16, React 19, TypeScript, Tailwind CSS v4, and Prisma 6 + Supabase PostgreSQL; admin auth uses Auth.js v5 (JWT + Credentials), image uploads go through Cloudinary with cropping, rich text via Tiptap 3, email via Nodemailer SMTP, and Zod validation on every endpoint.",
      decisions:
        "A 13-model schema plus Role enum (User, UMKM, Produk, Ulasan, Berita, Galeri, Pesan, ProfilDesa, MisiItem, PejabatDesa, AuditLog, and more) with database-driven content served through public REST endpoints (berita, umkm, produk, galeri, pesan, ulasan) and separate admin APIs, plus an idempotent seeder so the site is alive on first run.",
      challenges:
        "Modeling a relational schema across tables while keeping public pages simple, moderating product reviews and inbound messages, logging admin audit activity, optimizing images and SEO (JSON-LD, database-driven sitemap, llms.txt), and protecting PII on admin endpoints."
    },
  },
  {
    name: "AIS Frozen Food",
    account: "REY-STTP",
    description:
      "A high-performance landing page and interactive digital catalog for a frozen-food UMKM, with automated WhatsApp ordering built in.",
    category: ["Web"],
    tags: ["Next.js 16", "TypeScript", "Tailwind CSS", "Motion"],
    repo: "https://github.com/REY-STTP/AIS-Frozen-Food",
    demo: "https://www.ais-frozen-food.web.id",
    signal: "Live landing page",
    details: {
      overview:
        "Profile website and digital catalog for AIS Frozen Food, a frozen-food UMKM serving the Pati & Kudus area — 14 products in 8 poster groups across 5 categories, designed to help customers browse products and order via WhatsApp.",
      approach:
        "Order flow lands directly in WhatsApp with smart message templates prefilled per product (plus mini inquiry form, floating WA button, and tel:+6285226122121 fallback), while visitors filter the catalog through animated category tabs: dimsum, frozen food, cilok & cireng, aneka lumer, and complementaries — grouped per poster with variant chips to avoid duplicate cards.",
      decisions:
        "The design commits to an artisanal warm palette — cream #F5F1E8, espresso #2A1711, cocoa #5D4037 — with Playfair Display + Poppins, backed by per-card Product + Offer/AggregateOffer JSON-LD plus a collective ItemList, FAQPage and LocalBusiness schemas, static 1200×630 OG image, canonical www host with 308 proxy, and Vercel Analytics event tracking.",
      challenges:
        "Hitting LCP <2.5s and CLS <0.1 with heavy visuals: hero priority + fetchPriority high, AVIF/WebP with Next Image, lazy GMaps iframe via IntersectionObserver, strict CSP and caching headers, prefers-reduced-motion support, and accessible dialog, tabs, and product labels.",
    },
  },
  {
    name: "Kusoparse",
    account: "REY-STTP",
    description:
      "A trilingual parser that extracts Kusonime metadata, resolves shortlinks, and returns direct download links from validated URLs.",
    category: ["Web", "Scraping", "Tools"],
    tags: ["Next.js 16", "TypeScript", "Cheerio", "Framer Motion"],
    repo: "https://github.com/REY-STTP/Kusoparse",
    demo: "https://www.kusoparse.web.id",
    signal: "Live web tool",
    details: {
      overview:
        "A lightweight web interface for parsing Kusonime pages in Indonesian, English, and Japanese — tempel URL artikel anime, dapatkan metadata, info episode, dan seluruh link download dalam satu klik. Styled risograph / neo-brutalist with 12 direct hosts + 3 shortlink resolvers from a single source (lib/hosts.ts).",
      approach:
        "Cheerio scrapes the article into title, thumbnail, info, synopsis, and episode links; /api/parse strictly validates Kusonime URLs (host, protocol, no port/credentials/query) with manual 3-hop redirect checks, while /api/resolve only processes allowlisted intermediary and direct hosts. SSRF is guarded via pre-fetch DNS checks (private/link-local rejected), 4 MB body cap, and only http(s) output is ever rendered.",
      decisions:
        "Each locale renders through its own route group (app/(id), (en), (ja)) with static prerendering, localized slugs (/panduan, /en/guide, /ja/guide), full hreflang (id-ID, en, ja, x-default), an 11-URL sitemap, llms.txt + llms-full.txt for AI agents, and per-locale Open Graph images.",
      challenges:
        "Dealing with inconsistent external markup, shortlink/ad-locker drift, SSRF safety without hurting usability, trilingual routing without duplicate-content signals, and keeping the single-purpose flow simple with skeleton, empty, error, and custom 404 states.",
    },
  },
  {
    name: "Cloud Storage App",
    account: "REY-STTP",
    description:
      "A production-ready personal cloud storage platform with private R2 buckets, presigned downloads, and an admin panel backed by real-time analytics.",
    category: ["Web", "Tools"],
    tags: ["Next.js 16", "TypeScript", "PostgreSQL", "Cloudflare R2"],
    repo: "https://github.com/REY-STTP/Cloud-Storage-App",
    demo: "https://www.cloud-storage.web.id",
    signal: "Live storage platform",
    details: {
      overview:
        "A full-featured cloud storage platform where users upload, organize, rename, download, and delete files from a clean dashboard (default 1 GB quota via MAX_STORAGE_BYTES) while administrators manage the entire user base from SQL-aggregated stats.",
      approach:
        "Supabase PostgreSQL is accessed via pg with raw parameterized SQL (no ORM); every file lives in a private Cloudflare R2 bucket (S3-compatible via AWS SDK) and downloads are served through presigned URLs that expire in 60 minutes — no permanent public links. Auth runs on JWT sessions (1-day expiry) in httpOnly cookies with bcrypt-hashed passwords (cost 12), plus Nodemailer email flows with Ethereal fallback in development.",
      decisions:
        "The build leans on keyset pagination (limit ≤ 50) with pg_trgm indexes for ILIKE search, batch operations streamed as a single zip archive via Archiver, RLS enabled with zero policies plus app-level enforcement, a 30s server-cached /api/admin/stats aggregate (<2KB payload), Recharts lazy-loaded via next/dynamic ssr:false, and SWR for client fetching.",
      challenges:
        "The hard parts are presigned URL lifecycling, cascading user deletion across R2 + DB, single-use 1-hour reset tokens versus idempotent verification, pwd_changed_at JWT invalidation, UUID validation on every route, and keeping admin analytics responsive without bulk-fetching users.",
    },
  },
  {
    name: "Guess Your Face",
    account: "REY-STTP",
    description:
      "Real-time AI facial detection, comparison, and attribute analysis playground powered by Face++ — zero data retention, fully in-memory processing.",
    category: ["AI / ML", "Web"],
    tags: ["Next.js 16", "TypeScript", "Face++", "Tailwind CSS"],
    repo: "https://github.com/REY-STTP/Guess-Your-Face",
    demo: "https://www.guess-your-face.web.id",
    signal: "v2.0 rebuild · Live",
    details: {
      overview:
        "A modern playground for AI-powered face analysis across three tools — /detect, /compare, and /analyze: micro-expression detection across seven weighted emotions (anger, disgust, fear, happiness, neutral, sadness, surprise), demographic and aesthetic profiles, and 1:1 face similarity verification with instant ID/EN toggle.",
      approach:
        "All image processing happens in-memory through secure Next.js Route Handlers using Face++ Cognitive Services US v3 — JPEG/PNG up to 2 MB is validated server-side, forwarded as buffer/stream, and never stored on the server or in a database (privacy-first, zero retention).",
      decisions:
        "This is a complete v2.0 revamp of REY-STTP/Facial-Expression-Detection-App (Node.js + Express + Multer + MongoDB) into Next.js 16 + React 19 + Tailwind v4, adding multi-face detection with color-coded bounding boxes, confidence thresholds (1e-3, 1e-4, 1e-5), a 5-token deep inspector, an interactive canvas cropper (pan/zoom), and bilingual SEO with an 8-URL sitemap plus llms.txt.",
      challenges:
        "Replacing persistent storage with stateless in-memory pipelines while keeping credentials server-only with friendly error mapping, enforcing the canonical www host via proxy.ts without breaking RSC navigation, and rebuilding every legacy detection feature with WCAG AA contrast and Sonner feedback without regressions.",
    },
  },
  {
    name: "Confession Booth",
    account: "REY-STTP",
    description:
      "A decentralized, privacy-first anonymous confession sanctuary using Zero-Knowledge cryptography and Ethereum Sepolia on-chain anchoring — plaintext never touches the chain, authors stay unlinkable.",
    category: ["Web3", "Privacy", "Web"],
    tags: ["Next.js 16", "TypeScript", "Fastify", "Zero-Knowledge", "Ethereum Sepolia"],
    repo: "https://github.com/REY-STTP/Confession-Booth",
    demo: "https://www.confession-booth.web.id",
    signal: "Live dApp",
    details: {
      overview:
        "An encrypted anonymous confession platform where anyone can browse and read confessions without a wallet, while authors publish via ZK Stealth Mode — Merkle proofs and epoch nullifiers generated locally in the browser, dispatched to the API without auth headers, making it mathematically impossible to correlate a confession with a wallet address. Only SHA-256 content hashes, IPFS CIDs, timestamps, and policy versions are anchored on Sepolia.",
      approach:
        "Monorepo with Next.js 16 App Router (web), Fastify + Drizzle ORM (api), shared TypeScript package, and Solidity contracts (ConfessionRegistry.sol) on Sepolia. Features include empathy reactions (Resonance, Support, Shared Sorrow, Disbelief, Dark Humor Relief), anonymous whisper threads with OP badges, themed community rooms, Midnight Archive (00:00–04:00 WIB), soulbound reputation badges, cryptographic Proof Inspector, Proof-of-Work spam protection, and transparent moderation with immutable audit trails.",
      decisions:
        "Zero plaintext on-chain — only digests and CIDs anchored; in-memory ephemeral sessions (no localStorage/sessionStorage tokens) with HttpOnly refresh cookies; ZK proof generation runs client-side; PoW Hashcash challenge mitigates bot spam; dual-layer rate limiting by IP and nullifier; deterministic nullifiers prevent replay without identity linkage; HTML/Markdown disallowed — strict plaintext with character limits.",
      challenges:
        "Balancing radical privacy with abuse resistance: coordinating client-side ZK proof generation, on-chain anchoring latency, PoW difficulty tuning, session security without token storage, and honest privacy boundaries (network metadata, RPC endpoints, writing patterns can create correlation risks).",
    },
  },
  {
    name: "PharosTestnet-BOT",
    account: "vonssy",
    description:
      "Multi-account Web3 automation for Pharos Atlantic Testnet: check-ins, faucet claims, transfers, and proxy-aware execution.",
    category: ["Web3", "Blockchain", "Bots"],
    tags: ["Python", "web3.py", "EVM"],
    repo: "https://github.com/vonssy/PharosTestnet-BOT",
    demo: "https://t.me/vonssy_part_2",
    signal: "127 stars · 41 forks",
    details: {
      overview:
        "Automated Web3 interaction for Pharos Atlantic Testnet.",
      approach:
        "Accounts are supplied as private keys, while the bot runs repeatable network actions across multiple accounts through web3, eth-account, ABI, and utility packages.",
      decisions:
        "Proxy support and invalid-proxy rotation are first-class runtime choices, alongside daily check-in, faucet, and transfer actions.",
      challenges:
        "The README reflects the operational edge cases of wallet automation: account lists, network libraries, proxies, and repeated actions.",
    },
  },
  {
    name: "Dawn-BOT",
    account: "vonssy",
    description:
      "A Dawn Validator manager built around token setup, account handling, proxy rotation, keep-alive pings, and concurrent execution.",
    category: ["Automation", "Bots"],
    tags: ["Python", "Multithreading", "Proxies"],
    repo: "https://github.com/vonssy/Dawn-BOT",
    demo: "https://t.me/vonssy_part_2",
    signal: "110 stars · 18 forks",
    details: {
      overview:
        "Automated Dawn Validator management with multi-threading and proxy support.",
      approach:
        "The repository separates token setup from runtime execution, stores account and proxy inputs in simple files, and exposes proxy mode and rotation choices at startup.",
      decisions:
        "The README calls out automatic bearer-token extraction, account retrieval, invalid-proxy rotation, ping signals, and multi-account threading.",
      challenges:
        "The documented runtime is shaped around real service conditions: captcha setup, proxy reliability, and keeping several accounts alive.",
    },
  },
  {
    name: "HeliosTestnet-BOT",
    account: "vonssy",
    description:
      "Helios testnet automation spanning faucet claims, bridging, validator delegation, governance, and smart-contract deployment.",
    category: ["Web3", "Blockchain", "Bots"],
    tags: ["Python", "web3.py", "Testnet"],
    repo: "https://github.com/vonssy/HeliosTestnet-BOT",
    demo: "https://t.me/vonssy_part_2",
    signal: "50 stars · 8 forks",
    details: {
      overview:
        "Automated Helios testnet operations across multiple accounts.",
      approach:
        "The bot chains together faucet claims, fund bridging, validator delegation, reward claims, governance proposals, and contract deployment.",
      decisions:
        "Optional 2Captcha support enables faucet claims, while proxy mode and rotation are selectable at startup.",
      challenges:
        "The surface area spans many on-chain actions, captcha configuration, and multi-account state management.",
    },
  },
  {
    name: "Interlink-BOT",
    account: "vonssy",
    description:
      "Automated $ITLG token mining across multiple accounts with metric synchronization, proxy rotation, and configurable app-version targeting.",
    category: ["Automation", "Bots", "Web3"],
    tags: ["Python", "Proxies", "Mining"],
    repo: "https://github.com/vonssy/Interlink-BOT",
    demo: "https://t.me/vonssy_part_2",
    signal: "33 stars · 9 forks",
    details: {
      overview:
        "Automated Interlink mining that claims $ITLG from both private and group mining pools across many accounts at once.",
      approach:
        "Accounts are configured in a JSON file (email, passcode, Interlink ID), with an adjustable APP_VERSION constant kept in .env so requests keep matching the latest Interlink app release.",
      decisions:
        "Proxy mode and invalid-proxy rotation are startup choices, and metric synchronization runs automatically alongside mining claims.",
      challenges:
        "The moving target is the upstream app itself: version drift between the bot and the Interlink client is an explicitly documented maintenance concern.",
    },
  },
  {
    name: "X1-Ecochain-BOT",
    account: "vonssy",
    description:
      "X1 EcoChain airdrop farming automation: daily check-ins, quests, faucet claims, transfers, swaps, liquidity, and token deployment across accounts.",
    category: ["Web3", "Blockchain", "Bots"],
    tags: ["Python", "web3.py", "EVM"],
    repo: "https://github.com/vonssy/X1-Ecochain-BOT",
    demo: "https://t.me/vonssy_part_2",
    signal: "16 stars · 0 forks",
    details: {
      overview:
        "Automated on-chain farming for the X1 EcoChain network spanning nearly every testnet action a farmer needs.",
      approach:
        "The bot automates check-ins, quest completion, XIT faucet claims, random token transfers, USDT swaps, liquidity provisioning, and even token deployment — all across multiple EVM wallets.",
      decisions:
        "New wallets are recommended at registration, and proxy support with smart rotation remains a first-class startup option.",
      challenges:
        "The breadth of on-chain operations means coordinating faucet timing, swap and liquidity flows, and multi-account state without tripping network limits.",
    },
  },
  {
    name: "Deltahash-BOT",
    account: "vonssy",
    description:
      "Automated $DTH mining and social-task completion across multiple accounts using cookie-based sessions with proxy rotation.",
    category: ["Automation", "Bots"],
    tags: ["Python", "Cookie Sessions", "Proxies"],
    repo: "https://github.com/vonssy/Deltahash-BOT",
    demo: "https://t.me/vonssy_part_2",
    signal: "14 stars · 1 fork",
    details: {
      overview:
        "Automated Deltahash mining that keeps $DTH accumulation running continuously across many accounts.",
      approach:
        "Authentication reuses captured cookie data stored in a plain text file (with a documented example of how to fetch it), while social tasks are completed automatically alongside mining.",
      decisions:
        "Proxy mode selection and invalid-proxy rotation mirror the rest of the BOT family, keeping operational behavior consistent across tools.",
      challenges:
        "Session lifetime is the core constraint: cookie-based auth expires, so the workflow is designed around easy refresh-and-restart cycles.",
    },
  },
  {
    name: "Konnex-BOT",
    account: "vonssy",
    description:
      "Konnex Reward Hub points-farming automation with daily check-ins, testnet interactions, dual-wallet configuration, and proxy rotation.",
    category: ["Web3", "Bots", "Automation"],
    tags: ["Python", "EVM", "Proxies"],
    repo: "https://github.com/vonssy/Konnex-BOT",
    demo: "https://t.me/vonssy_part_2",
    signal: "12 stars · 2 forks",
    details: {
      overview:
        "Automated points farming for Konnex Reward Hub that handles daily check-ins and testnet actions across multiple accounts.",
      approach:
        "Each account pairs an EVM private key with a Konnex wallet mnemonic in accounts.json, letting the bot operate both wallet layers during check-in and testnet routines.",
      decisions:
        "Registration guidance steers users toward fresh EVM wallets linked to social accounts, and proxy rotation stays consistent with the broader BOT family.",
      challenges:
        "The dual-wallet setup adds key-management surface area, and the bot must keep both credential types synchronized across long farming runs.",
    },
  },
];
