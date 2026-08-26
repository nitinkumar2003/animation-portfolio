import { notFound } from "next/navigation";
import { enrichedProjects, getProjectBySlug } from "../../../../data/content";
import JsonLd from "../../../../component/site/JsonLd";
import ProjectDetailContent from "../../../../component/site/ProjectDetailContent";
import { breadcrumbSchema, graph, pageMeta, projectSchema } from "../../../../lib/seo";

export const dynamicParams = false;

export const generateStaticParams = () => enrichedProjects.map((project) => ({ slug: project.slug }));

export const generateMetadata = async ({ params }) => {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return pageMeta({ title: "Project not found", description: "This case study does not exist.", path: "/projects" });

  return pageMeta({
    title: `${project.title} — ${project.category} Case Study`,
    description: `${project.shortDesc} Built by Nitin Kumar with ${project.tech.slice(0, 4).join(", ")}. Role: ${project.role}.`,
    path: `/projects/${project.slug}`,
    type: "article",
    image: null, // the co-located opengraph-image.jsx supplies a per-project card
  });
};

const ProjectDetailPage = async ({ params }) => {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const index = enrichedProjects.findIndex((item) => item.slug === slug);

  return (
    <>
      <JsonLd data={graph(
        breadcrumbSchema([
          { name: "Home", href: "/" },
          { name: "Projects", href: "/projects" },
          { name: project.title, href: `/projects/${project.slug}` },
        ]),
        projectSchema(project),
      )} />
      <ProjectDetailContent
        project={project}
        previous={enrichedProjects[index - 1] || null}
        next={enrichedProjects[index + 1] || null}
      />
    </>
  );
};

export default ProjectDetailPage;
