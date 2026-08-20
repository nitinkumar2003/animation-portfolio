import { personalDataObj } from "../data/data";
import { careerTimeline, enrichedProjects, faqs, positioning } from "../data/content";

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");

export const absolute = (path = "/") => `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;

export const PERSON_ID = `${SITE_URL}/#person`;
export const SITE_ID = `${SITE_URL}/#website`;

const sameAs = [personalDataObj.github, personalDataObj.linkedin, personalDataObj.leetcode, personalDataObj.instagram];

export const personSchema = {
  "@type": "Person",
  "@id": PERSON_ID,
  name: personalDataObj.name,
  alternateName: "Nitin",
  jobTitle: positioning.role,
  description: positioning.subline,
  url: SITE_URL,
  image: absolute("/nitin-kumar.jpg"),
  email: `mailto:${personalDataObj.email}`,
  telephone: personalDataObj.phone,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Noida",
    addressRegion: "Uttar Pradesh",
    addressCountry: "IN",
  },
  sameAs,
  knowsAbout: [
    "React.js", "Next.js", "TypeScript", "JavaScript", "Node.js", "Express.js", "NestJS", "React Native",
    "Redux Toolkit", "Tailwind CSS", "MongoDB", "PostgreSQL", "Supabase", "Firebase", "Redis",
    "OpenAI", "Gemini", "Groq", "Venice AI", "Stripe", "Razorpay", "Cybersource", "Socket.io",
    "REST API design", "Web performance optimisation", "Full stack development", "AI SaaS development",
  ],
  knowsLanguage: ["English", "Hindi"],
  worksFor: careerTimeline
    .filter((role) => role.current)
    .map((role) => ({ "@type": "Organization", name: role.company, address: { "@type": "PostalAddress", addressLocality: role.location } })),
  alumniOf: personalDataObj.education.map((item) => ({
    "@type": "EducationalOrganization",
    name: item.college,
  })),
  hasOccupation: careerTimeline.map((role) => ({
    "@type": "Occupation",
    name: role.role,
    occupationLocation: { "@type": "City", name: role.location },
    skills: role.stack.join(", "),
  })),
  seeks: {
    "@type": "Demand",
    name: "Freelance, contract and remote full stack development engagements",
  },
};

export const websiteSchema = {
  "@type": "WebSite",
  "@id": SITE_ID,
  url: SITE_URL,
  name: `${personalDataObj.name} — ${positioning.role}`,
  description: positioning.subline,
  inLanguage: "en",
  publisher: { "@id": PERSON_ID },
};

export const faqSchema = {
  "@type": "FAQPage",
  mainEntity: faqs.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

export const projectListSchema = {
  "@type": "ItemList",
  name: `Projects by ${personalDataObj.name}`,
  numberOfItems: enrichedProjects.length,
  itemListElement: enrichedProjects.map((project, index) => ({
    "@type": "ListItem",
    position: index + 1,
    url: absolute(`/projects/${project.slug}`),
    name: project.title,
  })),
};

export const projectSchema = (project) => ({
  "@type": "CreativeWork",
  "@id": absolute(`/projects/${project.slug}#work`),
  name: project.title,
  headline: project.title,
  description: project.shortDesc,
  abstract: project.desc,
  url: absolute(`/projects/${project.slug}`),
  ...(project.hasLiveLink ? { sameAs: [project.link, project.playStore, project.appStore].filter(Boolean) } : {}),
  genre: project.category,
  keywords: project.tech.join(", "),
  creator: { "@id": PERSON_ID },
  author: { "@id": PERSON_ID },
  inLanguage: "en",
});

export const breadcrumbSchema = (trail) => ({
  "@type": "BreadcrumbList",
  itemListElement: trail.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: absolute(item.href),
  })),
});

/** Wraps schema nodes into a single @graph so crawlers resolve @id references. */
export const graph = (...nodes) => ({ "@context": "https://schema.org", "@graph": nodes.flat().filter(Boolean) });

const DEFAULT_OG_IMAGE = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: `${personalDataObj.name} — ${positioning.role}`,
};

/**
 * Consistent per-route metadata: canonical URL plus matching OG/Twitter cards.
 *
 * The social image is declared explicitly rather than relying on the file
 * convention: `app/opengraph-image` does not propagate into the `(site)` route
 * group, which silently left five pages with no card at all.
 *
 * Pass `image: null` from a route that has its own co-located opengraph-image
 * (the project case studies do), so the generated one is not overridden.
 */
export const pageMeta = ({ title, description, path = "/", type = "website", image = DEFAULT_OG_IMAGE, extra = {} }) => ({
  title,
  description,
  alternates: { canonical: path },
  openGraph: {
    type,
    url: path,
    title,
    description,
    siteName: `${personalDataObj.name} — ${positioning.role}`,
    locale: "en_IN",
    ...(image ? { images: [image] } : {}),
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    ...(image ? { images: [image.url] } : {}),
  },
  ...extra,
});
