import Link from "next/link";
import { personalDataObj } from "../../../data/data";
import { enrichedProjects } from "../../../data/content";
import ProjectGrid from "../../../component/site/ProjectGrid";
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

    <section className="nk-section nk-section--tight">
      <div className="nk-shell">
        <div className="nk-crumbs">
          <Link href="/">Home</Link><span>/</span><span>Projects</span>
        </div>

        <div className="nk-section-head" style={{ marginTop: "1.4rem" }}>
          <span className="nk-eyebrow">The work</span>
          <h1 style={{ margin: "1rem 0 0", fontSize: "clamp(1.9rem, 4vw, 3rem)" }}>
            {personalDataObj.projects.length} products, and what I built in each.
          </h1>
          <p>
            Client platforms and personal builds across AI, commerce, real estate, streaming and internal tooling.
            Every entry has a case study covering the problem, the architecture and my actual ownership.
          </p>
        </div>

        <ProjectGrid projects={enrichedProjects} />
      </div>
    </section>
  </>
);

export default ProjectsPage;
