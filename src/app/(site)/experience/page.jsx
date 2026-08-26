import ExperienceContent from "../../../component/site/ExperienceContent";
import JsonLd from "../../../component/site/JsonLd";
import { breadcrumbSchema, graph, pageMeta, personSchema } from "../../../lib/seo";

export const metadata = pageMeta({
  title: "Experience — 4+ Years as a Full Stack Developer",
  description:
    "Nitin Kumar's professional experience: Full Stack Developer at iByte Infomatics since Nov 2024 and React.js Developer at Ideahelix Pvt. Ltd. from 2022–2024. 40+ REST APIs, 8+ client products, ~30% smaller bundles and ~40% faster load times.",
  path: "/experience",
  type: "profile",
});

const ExperiencePage = () => (
  <>
    <JsonLd data={graph(
      breadcrumbSchema([{ name: "Home", href: "/" }, { name: "Experience", href: "/experience" }]),
      personSchema,
    )} />
    <ExperienceContent />
  </>
);

export default ExperiencePage;
