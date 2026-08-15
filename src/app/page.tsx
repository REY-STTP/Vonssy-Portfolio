import PortfolioClient from "@/components/portfolio-client";
import { projects } from "@/data/projects";
import { philosophyList } from "@/data/philosophy";
import { stackList } from "@/data/stack";
import { getPersonJsonLd } from "@/data/site";

export default function Home() {
  const jsonLd = getPersonJsonLd();
  const structuredDataString = JSON.stringify(jsonLd).replace(/</g, "\\u003c");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: structuredDataString }}
      />
      <PortfolioClient
        projects={projects}
        philosophy={philosophyList}
        stack={stackList}
      />
    </>
  );
}
