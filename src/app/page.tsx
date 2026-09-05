import PortfolioClient from "@/components/portfolio-client";
import { projects } from "@/data/projects";
import { philosophyList } from "@/data/philosophy";
import { stackList } from "@/data/stack";
import {
  getBreadcrumbJsonLd,
  getPersonJsonLd,
  getProfilePageJsonLd,
  getServiceJsonLd,
  getWebSiteJsonLd,
  siteConfig,
} from "@/data/site";
import { faqItems } from "@/data/faq";
import type { Project } from "@/types/portfolio";

export const revalidate = 86400;

function jsonLdScript(data: unknown) {
  const structuredDataString = JSON.stringify(data).replace(/</g, "\\u003c");
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: structuredDataString }}
    />
  );
}

const siteUrl = siteConfig.siteUrl;

// --- Schema helpers for SoftwareSourceCode ---

const PURE_LANGUAGES = ["Python", "TypeScript", "JavaScript", "PHP", "C", "C++", "SQL", "Dart"] as const;

function isPureLanguage(tag: string): boolean {
  return PURE_LANGUAGES.some((lang) => tag === lang);
}

function getProgrammingLanguages(tags: string[]): string[] {
  const langs = tags.filter(isPureLanguage);
  return langs.length > 0 ? langs : ["TypeScript"];
}

function getRuntimePlatform(tags: string[]): string {
  return tags.join(", ");
}

function getApplicationCategory(project: Project): string {
  if (project.name === "Vonssy Terminal") return "FinanceApplication";
  if (project.name === "E-Voting") return "BusinessApplication";
  if (project.category.includes("AI / ML")) return "MultimediaApplication";
  if (project.category.includes("Bots")) return "UtilitiesApplication";
  if (project.category.includes("Web") && project.category.length === 1) return "BusinessApplication";
  if (project.category.includes("Web")) return "BusinessApplication";
  return "UtilitiesApplication";
}

function isBotProject(project: Project): boolean {
  return project.category.includes("Bots") || project.name.endsWith("-BOT");
}

function isLiveDemo(project: Project): boolean {
  return !!project.demo && project.demo.includes("vercel.app");
}

function getKeywords(project: Project): string {
  const base = [...project.category, ...project.tags].join(", ");
  if (isBotProject(project)) {
    return `${base}, EVM multi-wallet bot developer, testnet farming automation, proxy rotation`;
  }
  return base;
}

function getLicense(repo: string): string {
  return `${repo}#license`;
}

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${siteUrl}/#faq`,
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

const itemListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "@id": `${siteUrl}/#itemlist`,
  name: "Selected Work by Vonssy",
  description: "A curated selection of Web3, automation, blockchain and web projects by Vonssy.",
  numberOfItems: projects.length,
  itemListElement: projects.map((project, index) => {
    const live = isLiveDemo(project);

    return {
      "@type": "ListItem",
      position: index + 1,
      url: project.repo,
      item: {
        "@type": "SoftwareSourceCode",
        name: project.name,
        description: project.description,
        codeRepository: project.repo,
        url: project.repo,
        programmingLanguage: getProgrammingLanguages(project.tags),
        runtimePlatform: getRuntimePlatform(project.tags),
        applicationCategory: getApplicationCategory(project),
        keywords: getKeywords(project),
        author: { "@id": `${siteUrl}/#person` },
        isAccessibleForFree: true,
        license: getLicense(project.repo),
        ...(live
          ? {
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
                availability: "https://schema.org/InStock",
                url: project.demo,
              },
            }
          : {}),
        ...(project.demo && !project.demo.includes("t.me")
          ? { sameAs: project.demo }
          : project.demo
            ? { potentialAction: { "@type": "ViewAction", target: project.demo } }
            : {}),
      },
    };
  }),
};

const speakableJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${siteUrl}/#webpage`,
  url: siteUrl,
  name: "Vonssy | Web3 Builder & Automation Engineer",
  isPartOf: { "@id": `${siteUrl}/#website` },
  about: { "@id": `${siteUrl}/#person` },
  primaryImageOfPage: {
    "@type": "ImageObject",
    contentUrl: `${siteUrl}/og-image.jpg`,
    // public/og-image.jpg terukur 1200x630 (2026-09-06), konsisten dengan deklarasi openGraph.
    width: 1200,
    height: 630,
  },
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: ["#about", "#faq", "#contact", ".hero-title"],
  },
  inLanguage: "en",
};

const collectionPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": `${siteUrl}/#collection`,
  url: `${siteUrl}/#projects`,
  name: "Selected Work by Vonssy",
  description: "A curated selection of Web3, automation, blockchain and web projects by Vonssy.",
  isPartOf: { "@id": `${siteUrl}/#website` },
  mainEntity: { "@id": `${siteUrl}/#itemlist` },
  about: { "@id": `${siteUrl}/#person` },
  inLanguage: "en",
};

const serviceJsonLd = getServiceJsonLd();

const graphJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    getPersonJsonLd(),
    getWebSiteJsonLd(),
    getProfilePageJsonLd(),
    getBreadcrumbJsonLd(),
    faqJsonLd,
    itemListJsonLd,
    collectionPageJsonLd,
    speakableJsonLd,
    serviceJsonLd,
  ],
};

export default function Home() {
  return (
    <>
      {jsonLdScript(graphJsonLd)}
      <PortfolioClient
        projects={projects}
        philosophy={philosophyList}
        stack={stackList}
      />
    </>
  );
}
