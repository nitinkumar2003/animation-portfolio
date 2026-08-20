import { enrichedProjects } from "../data/content";
import { SITE_URL } from "../lib/seo";

export default function sitemap() {
  const lastModified = new Date();

  const staticRoutes = [
    { url: `${SITE_URL}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/projects`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/experience`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/resume`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/os`, changeFrequency: "yearly", priority: 0.5 },
  ];

  const projectRoutes = enrichedProjects.map((project) => ({
    url: `${SITE_URL}/projects/${project.slug}`,
    changeFrequency: "yearly",
    priority: project.featured || project.hasLiveLink ? 0.8 : 0.6,
  }));

  return [...staticRoutes, ...projectRoutes].map((route) => ({ ...route, lastModified }));
}
