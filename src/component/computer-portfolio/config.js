import {
  FiActivity,
  FiBriefcase,
  FiCompass,
  FiDatabase,
  FiEdit3,
  FiFileText,
  FiFolder,
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
    title: "Interface Layer",
    icon: FiMonitor,
    color: "#45e6b0",
    summary: "Fast, responsive product interfaces",
    items: ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "Redux Toolkit", "Framer Motion"],
  },
  {
    title: "Service Layer",
    icon: FiServer,
    color: "#5bbcff",
    summary: "Scalable APIs and realtime systems",
    items: ["Node.js", "Express.js", "NestJS", "REST APIs", "Socket.io", "JWT / Auth"],
  },
  {
    title: "Data Layer",
    icon: FiDatabase,
    color: "#ffc857",
    summary: "Reliable product data and state",
    items: ["MongoDB", "PostgreSQL", "Supabase", "Firebase", "Redis", "SQL"],
  },
  {
    title: "Intelligence Layer",
    icon: FiActivity,
    color: "#ff6b6b",
    summary: "AI workflows, SaaS and payments",
    items: ["OpenAI", "Gemini", "Groq", "AI SaaS", "Stripe", "Razorpay"],
  },
];

export const projectFilters = ["All", "Full Stack", "AI / SaaS", "Dashboard", "Frontend"];

export const appCatalog = [
  { id: "about", label: "About Nitin", file: "README.md", icon: FiUser, color: "#45e6b0", keywords: "profile bio full stack developer" },
  { id: "projects", label: "Project Explorer", file: "Projects", icon: FiFolder, color: "#ffc857", keywords: "work case studies apps code client" },
  { id: "stack", label: "System Architecture", file: "Tech Stack.app", icon: FiLayers, color: "#5bbcff", keywords: "skills react next node typescript ai database" },
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
  wallpaper: "circuit",
  region: "IN",
  timezone: "Asia/Kolkata",
  hourCycle: "12",
  dateStyle: "long",
  language: "en",
  customWallpaper: "",
};

export const initialFileContents = {
  about: `# Nitin Kumar\n\nFull Stack Developer with 4+ years of experience building modern, scalable web products.\n\nCore stack: React.js, Next.js, Node.js, TypeScript, MongoDB, PostgreSQL and AI integrations.`,
  projects: personalDataObj.projects.map((project, index) => `${String(index + 1).padStart(2, "0")}. ${project.title} | ${project.category} | ${project.tech.join(", ")}`).join("\n"),
  stack: stackGroups.map((group) => `${group.title}\n${group.items.join(" · ")}`).join("\n\n"),
  journey: personalDataObj.experience.map((item) => `${item.time} | ${item.profile} at ${item.company}\n${item.description}`).join("\n\n"),
  terminal: "# Terminal profile\nUse `help` inside Terminal to inspect available commands.",
  editor: "# Workspace Notes\n\nSelect any portfolio file, open its context menu and choose Edit file.\n\nChanges are saved inside this browser and remain available after reload.",
  resume: "Nitin Kumar — Full Stack Developer\nOpen this file normally to view the complete live resume and save it as PDF.",
  contact: `Nitin Kumar\nNoida, Uttar Pradesh, India\n${personalDataObj.email}\n${personalDataObj.github}\n${personalDataObj.linkedin}`,
};
