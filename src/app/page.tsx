import PortfolioClient from "@/components/portfolio-client";
import { projects } from "@/data/projects";
import { philosophyList } from "@/data/philosophy";
import { stackList } from "@/data/stack";
import {
  getBreadcrumbJsonLd,
  getPersonJsonLd,
  getProfilePageJsonLd,
  getWebSiteJsonLd,
  siteConfig,
} from "@/data/site";
import { faqItems } from "@/data/faq";

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
  itemListElement: projects.map((project, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": "SoftwareSourceCode",
      name: project.name,
      description: project.description,
      codeRepository: project.repo,
      url: project.repo,
      programmingLanguage: project.tags.join(", "),
      keywords: [...project.category, ...project.tags].join(", "),
      author: { "@id": `${siteUrl}/#person` },
      ...(project.demo ? { sameAs: project.demo } : {}),
    },
  })),
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
    contentUrl: `${siteUrl}/og-image.png`,
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

export default function Home() {
  return (
    <>
      {jsonLdScript(getWebSiteJsonLd())}
      {jsonLdScript(getPersonJsonLd())}
      {jsonLdScript(getProfilePageJsonLd())}
      {jsonLdScript(getBreadcrumbJsonLd())}
      {jsonLdScript(faqJsonLd)}
      {jsonLdScript(itemListJsonLd)}
      {jsonLdScript(collectionPageJsonLd)}
      {jsonLdScript(speakableJsonLd)}
      <PortfolioClient
        projects={projects}
        philosophy={philosophyList}
        stack={stackList}
      />
    </>
  );
}
