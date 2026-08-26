import { personalDataObj } from "../../data/data";
import { positioning } from "../../data/content";
import HomeContent from "../../component/site/HomeContent";
import JsonLd from "../../component/site/JsonLd";
import { faqSchema, graph, pageMeta, personSchema, projectListSchema, SITE_URL, websiteSchema } from "../../lib/seo";

export const metadata = pageMeta({
  title: { absolute: "Nitin Kumar — Full Stack Developer | React, Next.js, Node.js & AI" },
  description:
    "Full Stack Developer with 4+ years building AI SaaS, real-estate, live-streaming and multi-role dashboard products. React, Next.js, TypeScript, Node.js, NestJS and React Native. Available for freelance, contract and remote work from Noida, India.",
  path: "/",
  type: "profile",
});

// Server component: owns metadata and structured data. The body is a client
// component so theme and language can switch without a reload — it still
// server-renders in English, which is what gets indexed.
const HomePage = () => (
  <>
    <JsonLd data={graph(personSchema, websiteSchema, {
      "@type": "ProfilePage",
      "@id": `${SITE_URL}/#profilepage`,
      url: SITE_URL,
      name: `${personalDataObj.name} — ${positioning.role}`,
      mainEntity: { "@id": personSchema["@id"] },
    }, projectListSchema, faqSchema)} />
    <HomeContent />
  </>
);

export default HomePage;
