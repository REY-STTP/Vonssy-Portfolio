export const siteConfig = {
  name: "Reyvaldi Zakaria",
  handle: "vonssy",
  jobTitle: "Web3 Builder and Automation Engineer",
  tagline: "Software that does things.",
  bio: "I build automation systems, bots, and software that interact with real APIs, wallets, blockchains, and data.",
  email: "rey.zakaria123@gmail.com",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://github.com/vonssy",
  avatarUrl: "https://avatars.githubusercontent.com/u/86215416?v=4",
  socialLinks: {
    github: "https://github.com/vonssy",
    githubSecondary: "https://github.com/REY-STTP",
    telegram: "https://t.me/vonssy_part_2",
  },
  skills: [
    "Web3",
    "Python automation",
    "Blockchain automation",
    "Web scraping",
    "Backend engineering",
  ],
};

export function getPersonJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    alternateName: "Vonssy",
    url: siteConfig.siteUrl,
    image: siteConfig.avatarUrl,
    jobTitle: siteConfig.jobTitle,
    sameAs: [
      siteConfig.socialLinks.github,
      siteConfig.socialLinks.githubSecondary,
      siteConfig.socialLinks.telegram,
    ],
    knowsAbout: siteConfig.skills,
  };
}
