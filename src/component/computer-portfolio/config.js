import {
  FiActivity,
  FiBriefcase,
  FiCalendar,
  FiCloud,
  FiCompass,
  FiCode,
  FiCreditCard,
  FiDatabase,
  FiEye,
  FiFileText,
  FiFolder,
  FiGitBranch,
  FiHash,
  FiLayers,
  FiMapPin,
  FiMail,
  FiMessageCircle,
  FiMonitor,
  FiServer,
  FiSettings,
  FiTerminal,
  FiTrash2,
  FiUser,
} from "react-icons/fi";
import { personalDataObj } from "../../data/data";
import { nitinProfile } from "../../data/nitinProfile";
import { capabilityPillars, careerTimeline, enrichedProjects, positioning, systemInfo } from "../../data/content";
import circuitWallpaper from "../../assets/nkos-wallpaper.jpg";

export const featuredProject = personalDataObj.projects.find((project) => project.featured) || personalDataObj.projects[0];

export const bootSteps = [
  { label: "CPU", detail: "Developer core online" },
  { label: "MEM", detail: `${positioning.years} years indexed` },
  { label: "DRIVE", detail: `${personalDataObj.projects.length} projects mounted` },
  { label: "NETWORK", detail: `${careerTimeline.length} companies · professional links connected` },
  { label: "SHELL", detail: `${systemInfo.osName} workspace ready` },
];

export const stackGroups = [
  {
    title: "Frontend Engineering",
    icon: FiMonitor,
    color: "#45e6b0",
    summary: "Responsive web and mobile product interfaces",
    level: "PRIMARY",
    items: nitinProfile.skills.frontend,
  },
  {
    title: "State, Forms & Quality",
    icon: FiCode,
    color: "#5bbcff",
    summary: "Predictable state, validation and reusable systems",
    level: "STRONG",
    items: nitinProfile.skills.stateAndForms,
  },
  {
    title: "Backend & Realtime",
    icon: FiServer,
    color: "#ffc857",
    summary: "Secure APIs, authentication and live systems",
    level: "STRONG",
    items: nitinProfile.skills.backend,
  },
  {
    title: "Data & Infrastructure",
    icon: FiDatabase,
    color: "#ff8f70",
    summary: "Product data, caching and managed backends",
    level: "PRODUCTION",
    items: nitinProfile.skills.database,
  },
  {
    title: "AI & Payments",
    icon: FiCreditCard,
    color: "#b9a7ff",
    summary: "Commercial AI products, checkout and subscriptions",
    level: "INTEGRATIONS",
    items: [...nitinProfile.skills.ai, ...nitinProfile.skills.payments],
  },
  {
    title: "Delivery & Practices",
    icon: FiGitBranch,
    color: "#62d7ff",
    summary: "Maintainable delivery from repository to production",
    level: "END TO END",
    items: nitinProfile.skills.delivery,
  },
];

export const skillInventory = stackGroups.flatMap((group) => (
  group.items.map((name) => ({ name, group: group.title, color: group.color, icon: group.icon, level: group.level }))
));

export const productDomains = [
  "AI ChatGPT-like SaaS", "E-commerce", "Invoice Management", "Food Delivery", "Real Estate", "Live Streaming",
  "CRM & Admin Dashboards", "Multi-role Authentication", "Property Management", "AI Data Platforms",
  "Business Analytics", "Booking & Enquiry Management",
  "Mobile Applications", "Scalable Project Foundations",
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
  { id: "assistant", label: "Ask Nitin", file: "Ask Nitin.app", icon: FiMessageCircle, color: "#73e0bc", keywords: "ai assistant profile recruiter hiring questions grok xai" },
  { id: "stack", label: "System Architecture", file: "Tech Stack.app", icon: FiLayers, color: "#5bbcff", keywords: "skills html css javascript typescript bootstrap tailwind jquery react next react native ant design framer motion redux react query zustand zod yup node express nest rest socket jwt mongodb sql postgres firebase supabase redis openai gemini groq deepseek venice stripe razorpay paypal cybersource git github vite eslint deployment" },
  { id: "journey", label: "Career Timeline", file: "Experience.log", icon: FiBriefcase, color: "#ff8f70", keywords: "experience education career ibyte ideahelix" },
  { id: "calendar", label: "Calendar", file: "Calendar.app", icon: FiCalendar, color: "#ff6961", keywords: "calendar events schedule meetings manage planner" },
  { id: "weather", label: "Weather", file: "Weather.app", icon: FiCloud, color: "#62d7ff", keywords: "live weather forecast city location temperature" },
  { id: "calculator", label: "Calculator", file: "Calculator.app", icon: FiHash, color: "#f2a65a", keywords: "calculator maths arithmetic memory" },
  { id: "maps", label: "Maps", file: "Maps.app", icon: FiMapPin, color: "#69d174", keywords: "google maps noida location directions global search" },
  { id: "terminal", label: "Developer Terminal", file: "Terminal", icon: FiTerminal, color: "#b9a7ff", keywords: "command line console cli" },
  { id: "editor", label: "Quick Look", file: "Quick Look.app", icon: FiEye, color: "#7fe0c2", keywords: "preview inspect read only file code workspace" },
  { id: "browser", label: "Nitin Browser", file: "Browser.app", icon: FiCompass, color: "#65c7ff", keywords: "browser web internet search google navigation" },
  { id: "resume", label: "Resume", file: "NitinKumar.pdf", icon: FiFileText, color: "#ff6b6b", keywords: "cv resume download pdf" },
  { id: "contact", label: "Contact", file: "Connect.link", icon: FiMail, color: "#62d7ff", keywords: "email linkedin github hire collaboration" },
  { id: "settings", label: "Settings", file: "Settings.app", icon: FiSettings, color: "#8fa5ad", keywords: "wallpaper timezone region date time language preferences" },
  { id: "bin", label: "Recycle Bin", file: "Recycle Bin", icon: FiTrash2, color: "#d7e3e7", keywords: "deleted files restore trash bin" },
];

export const protectedDesktopIds = new Set(["assistant", "calendar", "weather", "calculator", "maps", "editor", "browser", "settings", "bin"]);
export const nonPreviewableDesktopIds = new Set(["assistant", "calendar", "weather", "calculator", "maps", "browser", "settings", "bin", "editor"]);

export const windowOffsets = {
  about: { x: 90, y: 52 }, projects: { x: 52, y: 28 }, assistant: { x: 88, y: 32 }, stack: { x: 120, y: 42 }, journey: { x: 145, y: 34 },
  calendar: { x: 105, y: 36 }, weather: { x: 150, y: 48 }, calculator: { x: 230, y: 70 }, maps: { x: 82, y: 34 },
  terminal: { x: 180, y: 80 }, editor: { x: 118, y: 48 }, browser: { x: 58, y: 22 }, resume: { x: 135, y: 24 },
  contact: { x: 200, y: 74 }, settings: { x: 110, y: 38 }, bin: { x: 170, y: 58 },
};

// Default window geometry. WindowFrame clamps these to the workspace and the
// visitor can resize from any edge afterwards.
export const windowSizes = {
  default:    { width: 1000, height: 680 },
  about:      { width: 980,  height: 640 },
  projects:   { width: 1120, height: 700 },
  assistant:  { width: 940,  height: 660 },
  stack:      { width: 1040, height: 690 },
  journey:    { width: 900,  height: 660 },
  calendar:   { width: 880,  height: 620 },
  weather:    { width: 820,  height: 560 },
  calculator: { width: 380,  height: 560 },
  maps:       { width: 1000, height: 640 },
  terminal:   { width: 860,  height: 520 },
  editor:     { width: 880,  height: 600 },
  browser:    { width: 1120, height: 720 },
  resume:     { width: 1020, height: 720 },
  contact:    { width: 780,  height: 560 },
  settings:   { width: 1000, height: 680 },
  bin:        { width: 820,  height: 540 },
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
  { id: "circuit", name: "Circuit Architecture", image: circuitWallpaper.src },
  { id: "project", name: "Featured Product", image: featuredProject.img },
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
  about: [
    `# ${personalDataObj.name}`,
    "",
    `> ${positioning.headline}`,
    "",
    positioning.subline,
    "",
    "## At a glance",
    ...positioning.proof.map((item) => `- **${item.value}** ${item.label}`),
    "",
    "## What I own end to end",
    ...capabilityPillars.map((pillar) => `- **${pillar.title}** — ${pillar.lede}`),
    "",
    "## Availability",
    "Open to freelance projects, contract engagements, remote roles and long-term collaboration.",
    `Reach me at ${personalDataObj.email}.`,
  ].join("\n"),

  projects: [
    `# Projects (${enrichedProjects.length})`,
    "",
    ...enrichedProjects.flatMap((project, index) => [
      `${String(index + 1).padStart(2, "0")}. ${project.title} — ${project.category}`,
      `    ${project.shortDesc}`,
      `    Stack: ${project.tech.join(", ")}`,
      `    Role: ${project.role} · ${project.contribution}% ownership · team of ${project.teamSize}`,
      "",
    ]),
  ].join("\n"),

  stack: capabilityPillars.map((pillar) => (
    `## ${pillar.title}\n${pillar.lede}\n\n${pillar.text}\n\n${pillar.items.join(" · ")}`
  )).join("\n\n"),

  journey: careerTimeline.map((role) => [
    `## ${role.role} — ${role.company}`,
    `${role.period} · ${role.location} · ${role.employment}`,
    "",
    role.headline,
    "",
    role.summary,
    "",
    ...role.achievements.map((win) => `- ${win.metric ? `[${win.metric} ${win.label}] ` : ""}${win.title}: ${win.text}`),
    "",
    `Stack: ${role.stack.join(", ")}`,
  ].join("\n")).join("\n\n---\n\n"),

  assistant: [
    "# Ask Nitin",
    "",
    "A scoped assistant that answers only from the verified resume and portfolio dataset.",
    "",
    "- Streams responses token by token",
    "- Rate limited per visitor and length capped",
    "- Rejects prompt injection and off-topic questions before any model call",
    "- Never invents clients, metrics, dates or capabilities",
  ].join("\n"),

  calendar: "# Calendar\n\nEvents are created and stored locally on this device. Nothing is sent to a server.",
  weather: "# Weather\n\nLive global weather powered by Open-Meteo, resolved through a server route so no API key is exposed to the browser.",
  calculator: "# Calculator\n\nA focused arithmetic calculator with memory controls and keyboard input.",
  maps: `# Location\n\n${positioning.location}.\nAvailable for remote collaboration worldwide, working across IST, GMT and EST.`,
  terminal: "# Terminal\n\nRun `help` inside Terminal for the full command list.\nHighlights: neofetch, ls, skills, experience, projects, cat <project>, open <app>, hire.",
  editor: "# Quick Look\n\nSelect a file and press Space, or use its shortcut menu.\n\nPortfolio content is read-only and cannot be edited.",
  resume: [
    `# ${personalDataObj.name} — ${positioning.role}`,
    "",
    "Open this file to read the live resume, switch theme and language, print it, or download the verified PDF.",
    "",
    "Ten interface languages with localized dates and right-to-left support.",
  ].join("\n"),
  contact: [
    `# Contact`,
    "",
    `${personalDataObj.name}`,
    positioning.location,
    "",
    `Email     ${personalDataObj.email}`,
    `Phone     ${personalDataObj.phone}`,
    `GitHub    ${personalDataObj.github}`,
    `LinkedIn  ${personalDataObj.linkedin}`,
    `LeetCode  ${personalDataObj.leetcode}`,
  ].join("\n"),
  settings: "# Settings\n\nAppearance, wallpaper, region, timezone, date format and interface language. Preferences persist locally.",
  bin: "# Recycle Bin\n\nDeleted desktop files land here and can be restored individually or all at once.",
};
