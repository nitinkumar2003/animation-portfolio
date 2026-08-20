import { personalDataObj } from "./data";
import { capabilityPillars, careerTimeline, enrichedProjects, faqs, positioning } from "./content";

export const nitinProfile = {
  identity: {
    name: personalDataObj.name,
    role: positioning.role,
    experience: `${positioning.years} years`,
    location: positioning.location,
    email: personalDataObj.email,
    phone: personalDataObj.phone,
    availability: ["Freelance projects", "Contract work", "Remote work", "Full-time roles", "Long-term collaboration"],
    summary: positioning.subline,
  },
  skills: {
    frontend: ["HTML", "CSS", "JavaScript", "TypeScript", "Bootstrap", "Tailwind CSS", "jQuery", "React.js", "Next.js", "React Native", "Expo", "Ant Design", "Framer Motion"],
    stateAndForms: ["Redux Toolkit", "Redux Persist", "Redux Thunk", "Redux Saga", "React Query", "Zustand", "React Hook Form", "Zod", "Yup", "Custom Hooks", "Higher-Order Components", "ESLint"],
    backend: ["Node.js", "Express.js", "NestJS", "REST APIs", "Socket.IO", "JWT", "Authentication", "Multi-role RBAC"],
    database: ["MongoDB", "SQL", "PostgreSQL", "Firebase", "Supabase", "Redis"],
    payments: ["Stripe", "Razorpay", "Cybersource", "PayPal"],
    ai: ["OpenAI", "Gemini", "Groq", "Venice AI", "DeepSeek"],
    delivery: ["Git", "GitHub", "Vite", "CI/CD", "Lazy Loading", "Code Splitting", "Memoization", "Performance Optimization", "Deployment", "Code Reviews", "Agile Collaboration", "Mentoring"],
  },
  ownership: [
    "Frontend architecture", "Component library design", "Backend features and APIs", "Authentication and RBAC",
    "Payment integration", "AI integration", "Database design", "Realtime features", "Responsive UI",
    "Mobile app release to Play Store and App Store", "Deployment", "Performance optimization", "Code review and mentoring",
  ],
  professionalFocus: [
    "AI SaaS platforms", "Web applications", "Admin panels", "Business dashboards", "Realtime applications",
    "Mobile applications", "E-commerce", "Invoice management", "Food delivery", "Real estate",
    "Live streaming", "CRM", "Shipment and quotation management", "Booking and enquiry management", "Education platforms",
  ],
  experience: careerTimeline,
  education: personalDataObj.education,
  certification: personalDataObj.certificate,
  projects: enrichedProjects,
  links: {
    github: personalDataObj.github,
    linkedin: personalDataObj.linkedin,
    leetcode: personalDataObj.leetcode,
  },
};

const list = (items) => items.join(", ");

/**
 * The single source of truth handed to the AI assistant.
 * Everything here is drawn from the résumé and the written case studies, so the
 * assistant can be specific about roles, metrics and architecture without inventing.
 */
export const createNitinKnowledgeText = () => [
  `IDENTITY: ${nitinProfile.identity.name}, ${nitinProfile.identity.role}, ${nitinProfile.identity.experience} of professional experience, based in ${nitinProfile.identity.location}.`,
  `POSITIONING: ${positioning.headline}`,
  `SUMMARY: ${nitinProfile.identity.summary}`,
  `AVAILABILITY: ${list(nitinProfile.identity.availability)}. Works with teams across IST, GMT and EST. Typically replies within 24 hours.`,
  `CONTACT: email ${nitinProfile.identity.email}; phone ${nitinProfile.identity.phone}; GitHub ${nitinProfile.links.github}; LinkedIn ${nitinProfile.links.linkedin}; LeetCode ${nitinProfile.links.leetcode}.`,

  `HEADLINE NUMBERS:\n${positioning.proof.map((item) => `- ${item.value} ${item.label}`).join("\n")}`,

  `CAPABILITIES BY LAYER:\n${capabilityPillars.map((pillar) => (
    `- ${pillar.title} (${pillar.lede}) ${pillar.text} Tools: ${list(pillar.items)}.`
  )).join("\n")}`,

  `SKILL INVENTORY:\nFrontend: ${list(nitinProfile.skills.frontend)}.\nState, forms and quality: ${list(nitinProfile.skills.stateAndForms)}.\nBackend and realtime: ${list(nitinProfile.skills.backend)}.\nDatabases: ${list(nitinProfile.skills.database)}.\nPayments: ${list(nitinProfile.skills.payments)}.\nAI: ${list(nitinProfile.skills.ai)}.\nDelivery: ${list(nitinProfile.skills.delivery)}.`,

  `END-TO-END OWNERSHIP: ${list(nitinProfile.ownership)}.`,
  `PRODUCT DOMAINS: ${list(nitinProfile.professionalFocus)}.`,

  `PROFESSIONAL EXPERIENCE (most recent first):\n${careerTimeline.map((role) => [
    `## ${role.role} at ${role.company} (${role.period}), ${role.location}, ${role.employment}.`,
    `Headline: ${role.headline}`,
    `Context: ${role.summary}`,
    `Key contributions:`,
    role.achievements.map((win) => `  - ${win.metric ? `[${win.metric} ${win.label}] ` : ""}${win.title}: ${win.text}`).join("\n"),
    `Stack used: ${list(role.stack)}. Domains: ${list(role.domains)}.`,
  ].join("\n")).join("\n\n")}`,

  `EDUCATION:\n${nitinProfile.education.map((item) => `- ${item.course}, ${item.college}, ${item.time}.`).join("\n")}`,
  `CERTIFICATION:\n${nitinProfile.certification.map((item) => `- ${item.cerName}, ${item.institute}, ${item.time}. ${item.description}`).join("\n")}`,

  `PROJECTS (${enrichedProjects.length} total). Each entry lists the problem solved, what Nitin built, and his ownership share:\n${enrichedProjects.map((project) => [
    `## ${project.title} — ${project.category}, ${project.type}${project.company ? ` for ${project.company}` : ""} (${project.duration}).`,
    `Summary: ${project.desc}`,
    `Problem: ${project.problem}`,
    project.build.length ? `What Nitin built:\n${project.build.map((step) => `  - ${step}`).join("\n")}` : "",
    project.impact ? `Outcome: ${project.impact}` : "",
    `Role: ${project.role}. Ownership: ${project.contribution}%. Team size: ${project.teamSize}.`,
    `Stack: ${list(project.tech)}. Shipped features: ${list(project.features)}.`,
    project.hasLiveLink ? `Live: ${project.link}` : "",
    project.playStore ? `Google Play: ${project.playStore}` : "",
    project.appStore ? `Apple App Store: ${project.appStore}` : "",
    project.hasSource ? `Source: ${project.git}` : "",
    `Case study page: /projects/${project.slug}`,
  ].filter(Boolean).join("\n")).join("\n\n")}`,

  `COMMON QUESTIONS AND VERIFIED ANSWERS:\n${faqs.map((item) => `Q: ${item.q}\nA: ${item.a}`).join("\n\n")}`,

  `SITE MAP (link visitors here when useful): / (overview), /projects (all case studies), /experience (career detail), /resume (full résumé and PDF download), /os (interactive desktop portfolio).`,
].join("\n\n");
