import Link from "next/link";
import { notFound } from "next/navigation";
import { FiArrowLeft, FiArrowRight, FiCheck, FiExternalLink, FiGithub, FiPlay, FiSmartphone } from "react-icons/fi";
import { enrichedProjects, getProjectBySlug } from "../../../../data/content";
import JsonLd from "../../../../component/site/JsonLd";
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
  const previous = enrichedProjects[index - 1];
  const next = enrichedProjects[index + 1];

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

      <article>
        <section className="nk-detail__hero">
          <div className="nk-shell">
            <div className="nk-crumbs">
              <Link href="/">Home</Link><span>/</span>
              <Link href="/projects">Projects</Link><span>/</span>
              <span>{project.title}</span>
            </div>

            <div style={{ marginTop: "1.6rem" }}>
              <span className="nk-eyebrow">{project.category} · {project.type}</span>
              <h1>{project.title}</h1>
              <p>{project.desc}</p>
            </div>

            {(project.hasLiveLink || project.hasSource || project.playStore || project.appStore) && (
              <div className="nk-detail__actions">
                {project.hasLiveLink && (
                  <a href={project.link} target="_blank" rel="noreferrer noopener" className="nk-btn nk-btn--primary">
                    <FiExternalLink /> Visit live product
                  </a>
                )}
                {project.playStore && (
                  <a href={project.playStore} target="_blank" rel="noreferrer noopener" className="nk-btn nk-btn--ghost">
                    <FiPlay /> Google Play
                  </a>
                )}
                {project.appStore && (
                  <a href={project.appStore} target="_blank" rel="noreferrer noopener" className="nk-btn nk-btn--ghost">
                    <FiSmartphone /> App Store
                  </a>
                )}
                {project.hasSource && (
                  <a href={project.git} target="_blank" rel="noreferrer noopener" className="nk-btn nk-btn--ghost">
                    <FiGithub /> Source code
                  </a>
                )}
              </div>
            )}

            <div className="nk-facts">
              <div><span>My role</span><b>{project.role}</b></div>
              <div><span>Ownership</span><b>{project.contribution}%</b></div>
              <div><span>Team size</span><b>{project.teamSize}</b></div>
              <div><span>Duration</span><b>{project.duration}</b></div>
              {project.company && <div><span>Delivered at</span><b>{project.company}</b></div>}
            </div>
          </div>
        </section>

        <section className="nk-section">
          <div className="nk-shell">
            <div className="nk-prose">
              <div>
                <h2>The problem</h2>
                <p>{project.problem}</p>
              </div>

              {project.build.length > 0 && (
                <div>
                  <h2>What I built</h2>
                  <ol className="nk-steps">
                    {project.build.map((step) => <li key={step}><span>{step}</span></li>)}
                  </ol>
                </div>
              )}

              {project.impact && (
                <div className="nk-callout">
                  <span>Outcome</span>
                  <p>{project.impact}</p>
                </div>
              )}

              <div>
                <h2>Shipped features</h2>
                <ul className="nk-shipped">
                  {project.features.map((feature) => (
                    <li key={feature}><FiCheck /> {feature}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h2>Stack</h2>
                <div className="nk-chips" style={{ marginTop: "1.1rem" }}>
                  {project.tech.map((tech) => <span key={tech}>{tech}</span>)}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="nk-section nk-section--tight">
          <div className="nk-shell">
            <div className="nk-nextprev">
              {previous ? (
                <Link href={`/projects/${previous.slug}`} className="nk-card">
                  <span><FiArrowLeft style={{ verticalAlign: "-2px" }} /> Previous</span>
                  <b>{previous.title}</b>
                </Link>
              ) : <span />}
              {next ? (
                <Link href={`/projects/${next.slug}`} className="nk-card" style={{ textAlign: "right" }}>
                  <span>Next <FiArrowRight style={{ verticalAlign: "-2px" }} /></span>
                  <b>{next.title}</b>
                </Link>
              ) : <span />}
            </div>
          </div>
        </section>
      </article>
    </>
  );
};

export default ProjectDetailPage;
