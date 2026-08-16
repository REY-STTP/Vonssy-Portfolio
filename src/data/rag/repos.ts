export type RepoOwner = "vonssy" | "REY-STTP";

export interface RepoConfig {
  owner: RepoOwner;
  name: string;
  description: string;
  tags: string[];
}

export const ragRepos: RepoConfig[] = [
  {
    owner: "vonssy",
    name: "Dawn-BOT",
    description:
      "A Dawn Validator manager built around token setup, account handling, proxy rotation, keep-alive pings, and concurrent execution.",
    tags: ["Python", "Multithreading", "Proxies"],
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
    name: "KiteAi-BOT",
    description:
      "A configurable on-chain operations bot spanning staking, rewards, quizzes, AI-agent interactions, multisig wallets, swaps, and bridges.",
    tags: ["Python", "web3.py", "Multisig"],
  },
  {
    owner: "vonssy",
    name: "HahaWallet-BOT",
    description:
      "Multi-account automation for daily karma claims and quest completion with optional proxy support and rotation.",
    tags: ["Python", "Accounts", "Proxies"],
  },
  {
    owner: "REY-STTP",
    name: "Vonssy-AI",
    description:
      "A multi-provider AI chatbot with streamed responses, persistent sessions, OAuth, quotas, and provider fallback.",
    tags: ["Next.js 16", "TypeScript", "PostgreSQL"],
  },
  {
    owner: "REY-STTP",
    name: "Kusoparse",
    description:
      "A responsive parser that extracts Kusonime metadata, resolves shortlinks, and returns direct download links from validated URLs.",
    tags: ["Next.js", "TypeScript", "Framer Motion"],
  },
  {
    owner: "REY-STTP",
    name: "Facial-Expression-Detection-App",
    description:
      "An earlier AI and backend project using Face++ to classify uploaded images into seven expression categories.",
    tags: ["Node.js", "Express", "MongoDB"],
  },
  {
    owner: "vonssy",
    name: "Bitverse-BOT",
    description:
      "Pharos Atlantic network automation for multi-account crypto farming with proxy rotation and automated deposit, withdraw, and trade flows.",
    tags: ["Python", "web3.py", "EVM"],
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
    name: "IntuitionTestnet-BOT",
    description:
      "Intuition testnet bridge automation with proxy-aware multi-account execution.",
    tags: ["Python", "web3.py", "Bridge"],
  },
  {
    owner: "vonssy",
    name: "Faroswap-BOT",
    description:
      "Pharos Atlantic swap and liquidity automation with proxy rotation and multi-account farming.",
    tags: ["Python", "web3.py", "DEX"],
  },
  {
    owner: "vonssy",
    name: "AutoStaking-BOT",
    description:
      "Pharos staking automation covering MockUSD faucet claims and staking operations across multiple accounts.",
    tags: ["Python", "web3.py", "Staking"],
  },
  {
    owner: "vonssy",
    name: "Brokex-BOT",
    description:
      "Brokex protocol trading automation covering faucet claims, position open/close, and liquidity deposits.",
    tags: ["Python", "web3.py", "Trading"],
  },
  {
    owner: "vonssy",
    name: "AquaFlux-BOT",
    description:
      "AquaFlux NFT minting automation with standard and premium token support, proxy rotation, and multi-account execution.",
    tags: ["Python", "web3.py", "NFT"],
  },
  {
    owner: "vonssy",
    name: "3Dos-BOT",
    description:
      "3Dos node management with multi-threading, proxy layers, extension integration, and daily check-ins.",
    tags: ["Python", "Multithreading", "Proxies"],
  },
];
