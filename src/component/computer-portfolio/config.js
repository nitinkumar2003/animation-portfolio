import {
  FiActivity,
  FiBriefcase,
  FiCompass,
  FiCode,
  FiCreditCard,
  FiDatabase,
  FiEdit3,
  FiFileText,
  FiFolder,
  FiGitBranch,
  FiLayers,
  FiMail,
  FiMonitor,
  FiServer,
  FiSettings,
  FiTerminal,
  FiTrash2,
  FiUser,
} from "react-icons/fi";
import { personalDataObj } from "../../data/data";
import circuitWallpaper from "../../assets/nkos-wallpaper.jpg";

export const bootSteps = [
  { label: "CPU", detail: "Developer core online" },
  { label: "MEM", detail: "4+ years indexed" },
  { label: "DRIVE", detail: "15 projects mounted" },
  { label: "NETWORK", detail: "Professional links connected" },
  { label: "SHELL", detail: "Nitin OS workspace ready" },
];

export const stackGroups = [
  {
    title: "Frontend Engineering",
    icon: FiMonitor,
    color: "#45e6b0",
    summary: "Responsive web and mobile product interfaces",
    level: "PRIMARY",
    items: ["React.js", "Next.js", "TypeScript", "JavaScript (ES6+)", "React Native", "HTML5", "CSS3", "Tailwind CSS", "Bootstrap", "Ant Design", "Framer Motion", "jQuery"],
  },
  {
    title: "State, Forms & Quality",
    icon: FiCode,
    color: "#5bbcff",
    summary: "Predictable state, validation and reusable systems",
    level: "STRONG",
    items: ["Redux Toolkit", "Redux Persist", "React Query", "React Hook Form", "Zustand", "Zod", "Yup", "Custom Hooks", "HOCs", "ESLint"],
  },
  {
    title: "Backend & Realtime",
    icon: FiServer,
    color: "#ffc857",
    summary: "Secure APIs, authentication and live systems",
    level: "STRONG",
    items: ["Node.js", "Express.js", "NestJS", "RESTful APIs", "Socket.IO", "JWT", "Authentication", "Multi-role RBAC"],
  },
  {
    title: "Data & Infrastructure",
    icon: FiDatabase,
    color: "#ff8f70",
    summary: "Product data, caching and managed backends",
    level: "PRODUCTION",
    items: ["MongoDB", "SQL", "PostgreSQL", "Supabase", "Firebase", "Redis"],
  },
  {
    title: "AI & Payments",
    icon: FiCreditCard,
    color: "#b9a7ff",
    summary: "Commercial AI products, checkout and subscriptions",
    level: "INTEGRATIONS",
    items: ["OpenAI", "Gemini", "Groq", "DeepSeek", "Venice AI", "AI SaaS", "Stripe", "Razorpay", "PayPal", "Cybersource"],
  },
  {
    title: "Delivery & Practices",
    icon: FiGitBranch,
    color: "#62d7ff",
    summary: "Maintainable delivery from repository to production",
    level: "END TO END",
    items: ["Git", "GitHub", "Vite", "Agile", "Code Reviews", "Performance Optimization", "Lazy Loading", "Code Splitting", "Deployment"],
  },
];

export const skillInventory = stackGroups.flatMap((group) => (
  group.items.map((name) => ({ name, group: group.title, color: group.color, icon: group.icon, level: group.level }))
));

export const productDomains = [
  "AI ChatGPT-like SaaS", "E-commerce", "Invoice Management", "Food Delivery", "Real Estate", "Live Streaming",
  "CRM & Admin Dashboards", "Multi-role Authentication", "Property Management", "AI Data Platforms",
  "Business Analytics", "Booking & Enquiry Management",
];

export const deliveryCapabilities = [
  "Product UI", "Backend APIs", "Authentication", "Payment Integration", "AI Integration", "Database Design",
  "Realtime Features", "Deployment", "Performance Optimization", "Team Mentoring",
];

export const resumeHighlights = [
  "Delivered reusable React, Next.js and TypeScript interfaces across 8+ client projects.",
  "Integrated 40+ REST APIs and built secure authentication and realtime Socket.IO workflows.",
  "Shipped AI SaaS experiences using OpenAI, Gemini and Venice AI with production payment flows.",
  "Improved bundle size by 30% and load times by 40% through code splitting, lazy loading and memoization.",
  "Led code reviews and mentored 6 junior developers across product teams.",
];

export const projectFilters = ["All", "Full Stack", "AI / SaaS", "Dashboard", "Frontend"];

export const appCatalog = [
  { id: "about", label: "About Nitin", file: "README.md", icon: FiUser, color: "#45e6b0", keywords: "profile bio full stack developer" },
  { id: "projects", label: "Project Explorer", file: "Projects", icon: FiFolder, color: "#ffc857", keywords: "work case studies apps code client" },
  { id: "stack", label: "System Architecture", file: "Tech Stack.app", icon: FiLayers, color: "#5bbcff", keywords: "skills html css javascript typescript bootstrap tailwind jquery react next react native ant design framer motion redux react query zustand zod yup node express nest rest socket jwt mongodb sql postgres firebase supabase redis openai gemini groq deepseek venice stripe razorpay paypal cybersource git github vite eslint deployment" },
  { id: "journey", label: "Career Timeline", file: "Experience.log", icon: FiBriefcase, color: "#ff8f70", keywords: "experience education career ibyte ideahelix" },
  { id: "terminal", label: "Developer Terminal", file: "Terminal", icon: FiTerminal, color: "#b9a7ff", keywords: "command line console cli" },
  { id: "editor", label: "Code & Notes Editor", file: "Workspace.nk", icon: FiEdit3, color: "#7fe0c2", keywords: "edit notes text file code workspace save" },
  { id: "browser", label: "Nitin Browser", file: "Browser.app", icon: FiCompass, color: "#65c7ff", keywords: "browser web internet search google navigation" },
  { id: "resume", label: "Resume", file: "Nitin_Kumar.pdf", icon: FiFileText, color: "#ff6b6b", keywords: "cv resume download pdf" },
  { id: "contact", label: "Contact", file: "Connect.link", icon: FiMail, color: "#62d7ff", keywords: "email linkedin github hire collaboration" },
  { id: "settings", label: "Settings", file: "Settings.app", icon: FiSettings, color: "#8fa5ad", keywords: "wallpaper timezone region date time language preferences" },
  { id: "bin", label: "Recycle Bin", file: "Recycle Bin", icon: FiTrash2, color: "#d7e3e7", keywords: "deleted files restore trash bin" },
];

export const protectedDesktopIds = new Set(["editor", "browser", "settings", "bin"]);
export const nonEditableDesktopIds = new Set(["browser", "settings", "bin"]);

export const windowOffsets = {
  about: { x: 90, y: 52 }, projects: { x: 52, y: 28 }, stack: { x: 120, y: 42 }, journey: { x: 145, y: 34 },
  terminal: { x: 180, y: 80 }, editor: { x: 118, y: 48 }, browser: { x: 58, y: 22 }, resume: { x: 135, y: 24 },
  contact: { x: 200, y: 74 }, settings: { x: 110, y: 38 }, bin: { x: 170, y: 58 },
};

export const regions = {
  IN: { code: "IN", name: "India", locale: "en-IN", zones: ["Asia/Kolkata"] },
  AU: { code: "AU", name: "Australia", locale: "en-AU", zones: ["Australia/Sydney", "Australia/Brisbane", "Australia/Perth"] },
  GB: { code: "UK", name: "United Kingdom", locale: "en-GB", zones: ["Europe/London"] },
  US: { code: "US", name: "United States", locale: "en-US", zones: ["America/New_York", "America/Chicago", "America/Denver", "America/Los_Angeles"] },
  AE: { code: "UAE", name: "United Arab Emirates", locale: "en-AE", zones: ["Asia/Dubai"] },
  CA: { code: "CA", name: "Canada", locale: "en-CA", zones: ["America/Toronto", "America/Vancouver"] },
  SG: { code: "SG", name: "Singapore", locale: "en-SG", zones: ["Asia/Singapore"] },
  JP: { code: "JP", name: "Japan", locale: "ja-JP", zones: ["Asia/Tokyo"] },
  DE: { code: "DE", name: "Germany", locale: "de-DE", zones: ["Europe/Berlin"] },
  NZ: { code: "NZ", name: "New Zealand", locale: "en-NZ", zones: ["Pacific/Auckland"] },
};

export const timezoneOptions = Object.entries(regions).flatMap(([region, profile]) => (
  profile.zones.map((timezone) => ({ region, timezone, label: `${profile.name} · ${timezone.replace("_", " ")}` }))
));

export const languages = [
  { id: "en", code: "EN", name: "English", locale: "en-GB" },
  { id: "hi", code: "HI", name: "हिन्दी", locale: "hi-IN" },
  { id: "ar", code: "AR", name: "العربية", locale: "ar-AE" },
  { id: "es", code: "ES", name: "Español", locale: "es-ES" },
  { id: "fr", code: "FR", name: "Français", locale: "fr-FR" },
  { id: "de", code: "DE", name: "Deutsch", locale: "de-DE" },
  { id: "pt", code: "PT", name: "Português", locale: "pt-BR" },
  { id: "ja", code: "JA", name: "日本語", locale: "ja-JP" },
  { id: "ko", code: "KO", name: "한국어", locale: "ko-KR" },
  { id: "zh", code: "ZH", name: "中文", locale: "zh-CN" },
];

export const wallpapers = [
  { id: "circuit", name: "Circuit Architecture", image: circuitWallpaper },
  { id: "project", name: "Alysei Lab", image: personalDataObj.projects[13].img },
  { id: "grid", name: "Midnight Grid", image: null },
];

export const defaultPreferences = {
  theme: "dark",
  wallpaper: "circuit",
  region: "IN",
  timezone: "Asia/Kolkata",
  hourCycle: "12",
  dateStyle: "long",
  language: "en",
  customWallpaper: "",
};

export const initialFileContents = {
  about: `# Nitin Kumar\n\nFull Stack Developer with 4+ years of experience building scalable web applications, SaaS platforms, admin dashboards, AI systems and realtime products.\n\nAvailable for freelance projects, remote work, contract roles and long-term collaboration.`,
  projects: personalDataObj.projects.map((project, index) => `${String(index + 1).padStart(2, "0")}. ${project.title} | ${project.category} | ${project.tech.join(", ")}`).join("\n"),
  stack: stackGroups.map((group) => `${group.title}\n${group.items.join(" · ")}`).join("\n\n"),
  journey: personalDataObj.experience.map((item) => `${item.time} | ${item.profile} at ${item.company}\n${item.description}`).join("\n\n"),
  terminal: "# Terminal profile\nUse `help` inside Terminal to inspect available commands.",
  editor: "# Workspace Notes\n\nSelect any portfolio file, open its context menu and choose Edit file.\n\nChanges are saved inside this browser and remain available after reload.",
  resume: "Nitin Kumar — Full Stack Developer\nOpen this file normally to view the complete live resume or download the verified two-page PDF.",
  contact: `Nitin Kumar\nNoida, Uttar Pradesh, India\n${personalDataObj.email}\n${personalDataObj.github}\n${personalDataObj.linkedin}`,
};
