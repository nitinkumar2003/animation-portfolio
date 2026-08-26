import ProjectsContent from "../../../component/site/ProjectsContent";
import JsonLd from "../../../component/site/JsonLd";
import { breadcrumbSchema, graph, pageMeta, projectListSchema } from "../../../lib/seo";

export const metadata = pageMeta({
  title: "Projects — AI SaaS, Dashboards, Real Estate & Full Stack Builds",
  description:
    "Every project Nitin Kumar has shipped: AI SaaS platforms, multi-role admin dashboards, real-estate portals, live streaming, food delivery and published mobile apps. Built with React, Next.js, TypeScript, Node.js and NestJS.",
  path: "/projects",
});

const ProjectsPage = () => (
  <>
    <JsonLd data={graph(
      breadcrumbSchema([{ name: "Home", href: "/" }, { name: "Projects", href: "/projects" }]),
      projectListSchema,
    )} />
    <ProjectsContent />
  </>
);

export default ProjectsPage;
