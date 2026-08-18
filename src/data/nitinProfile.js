import { personalDataObj } from "./data";

export const nitinProfile = {
  identity: {
    name: personalDataObj.name,
    role: personalDataObj.role,
    experience: "4+ years",
    location: "Noida, Uttar Pradesh, India",
    email: personalDataObj.email,
    phone: personalDataObj.phone,
    availability: ["Freelance projects", "Remote work", "Contract work", "Long-term collaboration"],
    summary: personalDataObj.about,
  },
  skills: {
    frontend: ["HTML", "CSS", "JavaScript", "TypeScript", "Bootstrap", "Tailwind CSS", "jQuery", "React.js", "Next.js", "React Native", "Ant Design", "Framer Motion"],
    stateAndForms: ["Redux", "Redux Toolkit", "Redux Thunk", "Redux Saga", "Redux Persist", "React Hook Form", "Zod", "Yup", "Routing", "Custom Hooks", "Higher-Order Components", "ESLint"],
    backend: ["Node.js", "Express.js", "NestJS", "REST APIs", "Socket.IO", "Authentication", "Multi-role RBAC"],
    database: ["MongoDB", "SQL", "PostgreSQL", "Firebase", "Supabase", "Redis"],
    payments: ["Stripe", "Razorpay", "PayPal"],
    ai: ["OpenAI", "Gemini", "Groq", "DeepSeek"],
    delivery: ["Git", "GitHub", "Vite", "Lazy Loading", "Code Splitting", "Memoization", "Performance Optimization", "Deployment", "Code Reviews", "Agile Collaboration"],
  },
  ownership: [
    "Frontend architecture", "Backend features and APIs", "Authentication", "Payment integration", "AI integration",
    "Database design", "Realtime features", "Responsive UI", "Deployment", "Performance optimization",
  ],
  professionalFocus: [
    "Web applications", "SaaS platforms", "Admin panels", "Business dashboards", "AI-powered systems",
    "Realtime applications", "Mobile applications", "E-commerce", "Invoice management", "Food delivery",
    "Real estate", "Live streaming", "CRM", "Property management", "Booking and enquiry management",
  ],
  experience: personalDataObj.experience,
  education: personalDataObj.education,
  certification: personalDataObj.certificate,
  projects: personalDataObj.projects,
  links: {
    github: personalDataObj.github,
    linkedin: personalDataObj.linkedin,
    leetcode: personalDataObj.leetcode,
  },
};

const list = (items) => items.join(", ");

export const createNitinKnowledgeText = () => [
  `IDENTITY: ${nitinProfile.identity.name}, ${nitinProfile.identity.role}, ${nitinProfile.identity.experience}, based in ${nitinProfile.identity.location}.`,
  `SUMMARY: ${nitinProfile.identity.summary}`,
  `AVAILABILITY: ${list(nitinProfile.identity.availability)}.`,
  `CONTACT: email ${nitinProfile.identity.email}; phone ${nitinProfile.identity.phone}; GitHub ${nitinProfile.links.github}; LinkedIn ${nitinProfile.links.linkedin}; LeetCode ${nitinProfile.links.leetcode}.`,
  `FRONTEND: ${list(nitinProfile.skills.frontend)}.`,
  `STATE, FORMS, QUALITY: ${list(nitinProfile.skills.stateAndForms)}.`,
  `BACKEND: ${list(nitinProfile.skills.backend)}.`,
  `DATABASES: ${list(nitinProfile.skills.database)}.`,
  `PAYMENTS: ${list(nitinProfile.skills.payments)}.`,
  `AI: ${list(nitinProfile.skills.ai)}.`,
  `DELIVERY: ${list(nitinProfile.skills.delivery)}.`,
  `END-TO-END OWNERSHIP: ${list(nitinProfile.ownership)}.`,
  `PRODUCT EXPERIENCE: ${list(nitinProfile.professionalFocus)}.`,
  `EXPERIENCE:\n${nitinProfile.experience.map((item) => `- ${item.profile}, ${item.company}, ${item.time}: ${item.description}`).join("\n")}`,
  `EDUCATION:\n${nitinProfile.education.map((item) => `- ${item.course}, ${item.college}, ${item.time}: ${item.description}`).join("\n")}`,
  `CERTIFICATION:\n${nitinProfile.certification.map((item) => `- ${item.cerName}, ${item.institute}, ${item.time}: ${item.description}`).join("\n")}`,
  `PROJECTS:\n${nitinProfile.projects.map((project) => `- ${project.title} (${project.category}; ${list(project.tech)}): ${project.desc} Features: ${list(project.features)}. Role: ${project.role}. Type: ${project.type}.`).join("\n")}`,
].join("\n\n");
