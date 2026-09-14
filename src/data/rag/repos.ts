export type RepoOwner = "vonssy" | "REY-STTP";

export interface RepoConfig {
  owner: RepoOwner;
  name: string;
  description: string;
  tags: string[];
}

/**
 * Curated repos that get FULL README ingestion for the chat assistant.
 * Kept in sync with src/data/projects.ts (the public showcase).
 * Other public repos are still covered via auto-discovery in scripts/ingest.ts.
 */
export const ragRepos: RepoConfig[] = [
  {
    owner: "REY-STTP",
    name: "Cloud-Storage-App",
    description:
      "A production-ready personal cloud storage platform with private R2 buckets, presigned downloads, and an admin panel backed by real-time analytics.",
    tags: ["Next.js 16", "TypeScript", "PostgreSQL", "Cloudflare R2"],
  },
  {
    owner: "REY-STTP",
    name: "Vonssy-Terminal",
    description:
      "Read-only EVM multichain wallet analytics across 10 chains: portfolio value, asset breakdowns, and classified activity history.",
    tags: ["Next.js 16", "TypeScript", "Alchemy", "Viem"],
  },
  {
    owner: "REY-STTP",
    name: "Kusoparse",
    description:
      "A trilingual parser that extracts Kusonime metadata, resolves shortlinks, and returns direct download links from validated URLs.",
    tags: ["Next.js 16", "TypeScript", "Cheerio", "Framer Motion"],
  },
  {
    owner: "REY-STTP",
    name: "Guess-Your-Face",
    description:
      "Real-time AI facial detection, comparison, and attribute analysis playground powered by Face++ — zero data retention, fully in-memory processing.",
    tags: ["Next.js 16", "TypeScript", "Face++"],
  },
  {
    owner: "REY-STTP",
    name: "Vonssy-AI",
    description:
      "A BYOK AI chatbot — connect your own OpenAI-compatible endpoints with streamed responses, persistent sessions, OAuth, and encrypted key storage.",
    tags: ["Next.js 16", "TypeScript", "Drizzle", "PostgreSQL"],
  },
  {
    owner: "REY-STTP",
    name: "AIS-Frozen-Food",
    description:
      "A high-performance landing page and interactive digital catalog for a frozen-food UMKM, with automated WhatsApp ordering built in.",
    tags: ["Next.js 16", "TypeScript", "Tailwind CSS", "Motion"],
  },
  {
    owner: "REY-STTP",
    name: "desa-sukobubuk",
    description:
      "The official website of Desa Sukobubuk (Margorejo, Pati): village profile, news, UMKM directory with products and reviews, gallery, and an SMTP-backed contact pipeline, plus a full admin dashboard.",
    tags: ["Next.js 16", "TypeScript", "Prisma", "PostgreSQL"],
  },
  {
    owner: "REY-STTP",
    name: "E-Voting",
    description:
      "A Web3 e-voting dApp: connect an EVM wallet, cast votes on-chain through ethers.js v6, and watch results update live behind an admin-guarded session.",
    tags: ["Next.js 16", "TypeScript", "Ethers.js"],
  },
  {
    owner: "vonssy",
    name: "PharosTestnet-BOT",
    description:
      "Multi-account Web3 automation for Pharos Atlantic Testnet: check-ins, faucet claims, transfers, and proxy-aware execution.",
    tags: ["Python", "web3.py", "EVM"],
  },
  {
    owner: "vonssy",
    name: "Dawn-BOT",
    description:
      "A Dawn Validator manager built around token setup, account handling, proxy rotation, keep-alive pings, and concurrent execution.",
    tags: ["Python", "Multithreading", "Proxies"],
  },
  {
    owner: "vonssy",
    name: "HeliosTestnet-BOT",
    description:
      "Helios testnet automation spanning faucet claims, bridging, validator delegation, governance, and smart-contract deployment.",
    tags: ["Python", "web3.py", "Testnet"],
  },
  {
    owner: "vonssy",
    name: "Interlink-BOT",
    description:
      "Automated $ITLG token mining across multiple accounts with metric synchronization, proxy rotation, and configurable app-version targeting.",
    tags: ["Python", "Proxies", "Mining"],
  },
  {
    owner: "vonssy",
    name: "X1-Ecochain-BOT",
    description:
      "X1 EcoChain airdrop farming automation: daily check-ins, quests, faucet claims, transfers, swaps, liquidity, and token deployment across accounts.",
    tags: ["Python", "web3.py", "EVM"],
  },
  {
    owner: "vonssy",
    name: "Deltahash-BOT",
    description:
      "Automated $DTH mining and social-task completion across multiple accounts using cookie-based sessions with proxy rotation.",
    tags: ["Python", "Cookie Sessions", "Proxies"],
  },
  {
    owner: "vonssy",
    name: "Konnex-BOT",
    description:
      "Konnex Reward Hub points-farming automation with daily check-ins, testnet interactions, dual-wallet configuration, and proxy rotation.",
    tags: ["Python", "EVM", "Proxies"],
  },
];
