export const CANONICAL_URL = "https://www.vonssy-portfolio.web.id";

export const siteConfig = {
  name: "Reyvaldi Zakaria",
  handle: "vonssy",
  jobTitle: "Web3 Builder and Automation Engineer",
  tagline: "Software that does things.",
  bio: "I build automation systems, bots, and software that interact with real APIs, wallets, blockchains, and data.",
  email: "rey.zakaria123@gmail.com",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? CANONICAL_URL,
  avatarUrl: "https://avatars.githubusercontent.com/u/86215416?v=4",
  socialLinks: {
    github: "https://github.com/vonssy",
    githubSecondary: "https://github.com/REY-STTP",
    telegram: "https://t.me/vonssy_part_2",
    x: "https://x.com/_Vonssy",
  },
  skills: [
    "Web3 automation engineer",
    "EVM multi-wallet bot developer",
    "testnet farming automation",
    "Canton Network",
    "Substrate wallet automation",
    "proxy rotation",
    "Web3",
    "Python automation",
    "Blockchain automation",
    "Web scraping",
    "Backend engineering",
  ],
  location: "Indonesia",
  timezone: "UTC+7",
};

export function getPersonJsonLd() {
  const personId = `${siteConfig.siteUrl}/#person`;

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": personId,
    name: siteConfig.name,
    alternateName: "Vonssy",
    url: siteConfig.siteUrl,
    description: siteConfig.bio,
    email: siteConfig.email,
    image: {
      "@type": "ImageObject",
      url: siteConfig.avatarUrl,
      caption: "Vonssy — Reyvaldi Zakaria",
    },
    jobTitle: siteConfig.jobTitle,
    sameAs: [
      siteConfig.siteUrl,
      siteConfig.socialLinks.github,
      siteConfig.socialLinks.githubSecondary,
      siteConfig.socialLinks.telegram,
      siteConfig.socialLinks.x,
    ],
    knowsAbout: siteConfig.skills,
    knowsLanguage: ["en", "id"],
    homeLocation: {
      "@type": "Place",
      name: siteConfig.location,
      address: {
        "@type": "PostalAddress",
        addressCountry: "ID",
        addressLocality: siteConfig.location,
      },
    },
    contactPoint: {
      "@type": "ContactPoint",
      email: siteConfig.email,
      contactType: "collaboration inquiry",
      availableLanguage: ["en", "id"],
      url: siteConfig.socialLinks.telegram,
    },
  };
}

export function getWebSiteJsonLd() {
  const personId = `${siteConfig.siteUrl}/#person`;

  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.siteUrl}/#website`,
    name: "Vonssy Portfolio",
    alternateName: ["Vonssy", "Reyvaldi Zakaria Portfolio"],
    url: siteConfig.siteUrl,
    description:
      "Portfolio of Vonssy (Reyvaldi Zakaria) — Web3 automation engineer in Indonesia (UTC+7) shipping EVM multi-wallet bots, testnet farming automation, Canton/Substrate tooling, and production web apps with proxy-aware reliability.",
    inLanguage: "en",
    author: { "@id": personId },
    publisher: { "@id": personId },
    potentialAction: {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        urlTemplate: `${siteConfig.siteUrl}/#projects?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
      queryInput: "required name=search_term_string",
    },
  };
}

const PROFILE_DATE_MODIFIED = "2026-05-11T00:00:00+07:00";

export function getProfilePageJsonLd() {
  const personId = `${siteConfig.siteUrl}/#person`;
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${siteConfig.siteUrl}/#profilepage`,
    url: siteConfig.siteUrl,
    name: "Vonssy | Web3 Builder & Automation Engineer",
    description: siteConfig.bio,
    inLanguage: "en",
    isPartOf: { "@id": `${siteConfig.siteUrl}/#website` },
    mainEntity: { "@id": personId },
    dateCreated: "2024-01-01T00:00:00+07:00",
    dateModified: PROFILE_DATE_MODIFIED,
  };
}

export function getBreadcrumbJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.siteUrl },
      { "@type": "ListItem", position: 2, name: "About", item: `${siteConfig.siteUrl}/#about` },
      { "@type": "ListItem", position: 3, name: "Projects", item: `${siteConfig.siteUrl}/#projects` },
      { "@type": "ListItem", position: 4, name: "Stack", item: `${siteConfig.siteUrl}/#stack` },
      { "@type": "ListItem", position: 5, name: "FAQ", item: `${siteConfig.siteUrl}/#faq` },
      { "@type": "ListItem", position: 6, name: "Contact", item: `${siteConfig.siteUrl}/#contact` },
    ],
  };
}

export function getServiceJsonLd() {
  const siteUrl = siteConfig.siteUrl;

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${siteUrl}/hire.md#service`,
    name: "Web3 Automation Engineering",
    serviceType: "Web3 automation engineer — EVM multi-wallet bot developer, testnet farming automation, Canton Network",
    description:
      "Custom multi-wallet bots (EVM/Substrate/Konnex/Canton), proxy rotation, concurrency, RPC handling. Landing pages & advisory. Custom quote per project.",
    provider: { "@id": `${siteUrl}/#person` },
    areaServed: { "@type": "AdministrativeArea", name: "Worldwide" },
    availableChannel: [
      { "@type": "ServiceChannel", serviceUrl: "https://t.me/vonssy_part_2", name: "Telegram (fastest)" },
      { "@type": "ServiceChannel", serviceUrl: "mailto:rey.zakaria123@gmail.com", name: "Email" },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Collaboration Options",
      itemListElement: [
        {
          "@type": "Offer",
          name: "Custom Multi-Wallet Automation",
          description:
            "EVM/Substrate/Konnex/Canton bots, proxy rotation, concurrency, RPC handling. Includes private-key/mnemonic/cookie input, .env config, README, 1-week support.",
          priceSpecification: {
            "@type": "PriceSpecification",
            priceCurrency: "USD",
            price: "0",
            description: "Custom — contact for quote via t.me/vonssy_part_2",
          },
          availability: "https://schema.org/InStock",
          url: `${siteUrl}/hire.md#custom-multi-wallet-automation`,
        },
        {
          "@type": "Offer",
          name: "Landing Page / UMKM Catalog",
          description: "High-performance Next.js landing + catalog with WhatsApp order flow, Prisma/PostgreSQL.",
          priceSpecification: {
            "@type": "PriceSpecification",
            priceCurrency: "USD",
            price: "0",
            description: "Custom — contact for quote",
          },
          availability: "https://schema.org/InStock",
          url: `${siteUrl}/hire.md#landing-page-umkm-catalog`,
        },
        {
          "@type": "Offer",
          name: "Advisory / Code Review",
          description: "Web3 automation review, trading bot logic, multi-wallet architecture, reliability audit (retries, rate limits, proxy systems).",
          priceSpecification: {
            "@type": "PriceSpecification",
            priceCurrency: "USD",
            price: "0",
            description: "Custom — contact for quote",
          },
          availability: "https://schema.org/InStock",
          url: `${siteUrl}/hire.md#advisory-code-review`,
        },
      ],
    },
    termsOfService: `${siteUrl}/hire.md`,
    isRelatedTo: { "@id": `${siteUrl}/#itemlist` },
  };
}
