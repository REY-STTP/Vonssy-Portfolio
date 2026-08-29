import PortfolioClient from "@/components/portfolio-client";
import { projects } from "@/data/projects";
import { philosophyList } from "@/data/philosophy";
import { stackList } from "@/data/stack";
import { getPersonJsonLd, getWebSiteJsonLd } from "@/data/site";
import { faqItems } from "@/data/faq";

function jsonLdScript(data: unknown) {
  const structuredDataString = JSON.stringify(data).replace(/</g, "\\u003c");
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: structuredDataString }}
    />
  );
}

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export default function Home() {
  return (
    <>
      {jsonLdScript(getWebSiteJsonLd())}
      {jsonLdScript(getPersonJsonLd())}
      {jsonLdScript(faqJsonLd)}
      <PortfolioClient
        projects={projects}
        philosophy={philosophyList}
        stack={stackList}
      />
    </>
  );
}
