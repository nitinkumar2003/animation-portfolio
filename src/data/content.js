// Narrative content layer for the server-rendered portfolio.
// Every claim here is grounded in Nitin_Resume.tex — do not add metrics that the resume does not support.

import { personalDataObj } from "./data";

export const slugify = (value) => value
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/^-+|-+$/g, "");

export const positioning = {
  name: personalDataObj.name,
  role: "Full Stack Developer",
  altRole: "React.js & Next.js Engineer",
  years: "4+",
  location: "Noida, Uttar Pradesh, India",
  headline: "I build products that ship — from the first pixel to the production deploy.",
  subline:
    "Full Stack Developer with 4+ years across AI SaaS, real-estate portals, live streaming, shipment and quotation systems, and multi-role admin platforms. I own the interface, the API, the data model, the payment flow and the performance budget.",
  proof: [
    { value: "4+", label: "Years shipping production software" },
    { value: "14+", label: "Client products delivered" },
    { value: "40+", label: "REST APIs architected & integrated" },
    { value: "3", label: "App stores published to" },
  ],
  // Short, high-signal descriptors used across meta tags and the AI assistant.
  descriptors: [
    "React.js", "Next.js", "TypeScript", "Node.js", "NestJS",
    "React Native", "OpenAI", "Stripe", "MongoDB", "Socket.io",
  ],
};

/** OS + build identity, derived rather than pasted into components. */
export const systemInfo = {
  osName: "Nitin OS",
  osVersion: "2.3",
  terminalVersion: "4.3.0",
  // Frozen at build time so static pages don't advertise a stale live clock.
  buildStamp: new Date().toISOString().slice(0, 7).replace("-", "."),
  buildYear: new Date().getFullYear(),
};

export const careerTimeline = [
  {
    slug: "ibyte-infomatics",
    role: "Full Stack Developer",
    resumeTitle: "React.js Developer",
    company: "iByte Infomatics",
    period: "Nov 2024 — Present",
    startDate: "2024-11-01",
    endDate: null,
    current: true,
    location: "Noida, Uttar Pradesh",
    employment: "Full-time",
    headline: "Leading front-end architecture across 8+ client products, and shipping AI SaaS end to end.",
    summary:
      "I set the front-end architecture that other engineers build on: the component library, the state layer, the API client and the performance budget. Alongside that I take AI SaaS products the whole way — Next.js web app, React Native mobile app, Supabase data layer, Stripe billing — and ship them to real users on the web, the Play Store and the App Store.",
    achievements: [
      {
        metric: "8+",
        label: "client products",
        title: "Front-end architecture as a shared foundation",
        text: "Lead development of dynamic, reusable UI component systems in React.js, Next.js, TypeScript and Tailwind CSS across 8+ client projects. Every team that builds on the library ships features faster because the primitives, tokens and layout rules are already decided.",
      },
      {
        metric: "40+",
        label: "REST APIs",
        title: "A state layer that survives a refresh",
        text: "Architect global state with Redux Toolkit and Redux Persist and integrate 40+ RESTful APIs. Session persistence and normalised caching mean data stays reliable across reloads, tab switches and flaky mobile connections.",
      },
      {
        metric: "3",
        label: "AI providers",
        title: "AI SaaS, not AI demos",
        text: "Deliver AI-powered SaaS applications in Next.js integrating OpenAI, Gemini and Venice AI to power intelligent search, chat and analytics — with streaming responses, conversation history, usage metering and the guardrails that keep a public assistant on-topic.",
      },
      {
        metric: "3",
        label: "payment gateways",
        title: "Money and realtime",
        text: "Integrate Stripe, Razorpay and Cybersource for subscriptions and checkout, including webhook reconciliation and plan gating, and implement realtime features with Socket.io for live chat, notifications and order tracking.",
      },
      {
        metric: null,
        label: null,
        title: "Backend ownership where it counts",
        text: "Contribute to backend development in Node.js, Express and NestJS — building REST APIs, authentication and role-based access for select projects rather than handing the contract over a wall.",
      },
      {
        metric: "~30% / ~40%",
        label: "bundle / load time",
        title: "Performance treated as a feature",
        text: "Optimise through lazy loading, route-level code splitting and memoisation, cutting bundle size by roughly 30% and improving load times by roughly 40%.",
      },
      {
        metric: "~25%",
        label: "faster delivery",
        title: "Reusable systems over one-off screens",
        text: "Establish reusable component libraries and custom hooks that cut development time by around 25%, and hold the line on quality through peer review and Agile workflows.",
      },
    ],
    stack: ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "Redux Toolkit", "Node.js", "NestJS", "React Native", "Supabase", "OpenAI", "Stripe", "Socket.io"],
    domains: ["AI SaaS", "Real Estate", "Shipment & Quotation", "Admin Dashboards", "Mobile Apps"],
  },
  {
    slug: "ideahelix",
    role: "React.js Developer",
    resumeTitle: "React.js Developer",
    company: "Ideahelix Pvt. Ltd.",
    period: "June 2022 — Nov 2024",
    startDate: "2022-06-01",
    endDate: "2024-11-01",
    current: false,
    location: "Gurugram, Haryana",
    employment: "Full-time",
    headline: "Built the scalable front-end foundations for 6+ client platforms, and grew the people around them.",
    summary:
      "Two and a half years of turning client briefs into maintainable React codebases across healthcare, real estate and live streaming. This is where I learned that the durable win is not the feature you ship, it is the pattern the next developer copies — so I invested in component libraries, review culture and mentoring alongside the delivery work.",
    achievements: [
      {
        metric: "6+",
        label: "client platforms",
        title: "Modular architecture from day one",
        text: "Engineered scalable front-end architecture with React.js, Redux Toolkit and Tailwind CSS for 6+ client platforms, keeping codebases modular and maintainable as scope grew.",
      },
      {
        metric: "~35%",
        label: "performance gain",
        title: "Found the re-renders, then removed them",
        text: "Boosted application performance by roughly 35% through memoisation, debouncing and systematic re-render elimination — profiling first, optimising second.",
      },
      {
        metric: "~20%",
        label: "less UI effort",
        title: "Design patterns other teams adopted",
        text: "Standardised design patterns into reusable component libraries, reducing UI development effort by around 20% across teams.",
      },
      {
        metric: "3",
        label: "developers mentored",
        title: "Raised the floor, not just my own ceiling",
        text: "Led code reviews and mentored 3 junior developers, improving team code quality and delivery consistency.",
      },
      {
        metric: null,
        label: null,
        title: "Secure integration across regulated domains",
        text: "Integrated token-based (JWT) authentication and REST APIs across healthcare, real estate and streaming platforms where session integrity and access control were non-negotiable.",
      },
    ],
    stack: ["React.js", "Redux Toolkit", "Tailwind CSS", "JavaScript", "REST APIs", "JWT", "Socket.io", "MongoDB"],
    domains: ["Healthcare", "Real Estate", "Live Streaming", "E-commerce"],
  },
];

export const capabilityPillars = [
  {
    id: "interface",
    title: "Interface Systems",
    lede: "Component libraries, not screens.",
    text: "I build the design system layer first — tokens, primitives, layout rules, motion — so features become composition instead of CSS archaeology. Across two companies this cut UI effort by 20–25%.",
    items: ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "Ant Design", "Framer Motion", "React Native"],
  },
  {
    id: "state",
    title: "State & Data Flow",
    lede: "Predictable data, validated at the edge.",
    text: "Redux Toolkit for global state, React Query for server state, Zod and React Hook Form at every boundary. Redux Persist keeps sessions alive through reloads and unreliable mobile networks.",
    items: ["Redux Toolkit", "Redux Persist", "React Query", "Zustand", "React Hook Form", "Zod", "Yup", "Custom Hooks"],
  },
  {
    id: "backend",
    title: "APIs & Realtime",
    lede: "I write the endpoints I consume.",
    text: "Node.js, Express and NestJS services with JWT auth, multi-role RBAC and Socket.io for live chat, notifications and order tracking. 40+ REST APIs architected and integrated.",
    items: ["Node.js", "Express.js", "NestJS", "REST APIs", "Socket.io", "JWT", "RBAC"],
  },
  {
    id: "data",
    title: "Data & Infrastructure",
    lede: "Schemas that match the access pattern.",
    text: "MongoDB and PostgreSQL for product data, Redis for caching and sessions, Supabase and Firebase where a managed backend gets a product to market faster.",
    items: ["MongoDB", "PostgreSQL", "SQL", "Redis", "Supabase", "Firebase"],
  },
  {
    id: "ai",
    title: "AI Integration",
    lede: "Production assistants, with guardrails.",
    text: "OpenAI, Gemini, Groq and Venice AI wired into real products — streaming responses, scoped context, prompt-injection defence, rate limiting and usage metering. The assistant on this site is one of them.",
    items: ["OpenAI", "Gemini", "Groq", "Venice AI", "Streaming", "Prompt Safety", "Usage Metering"],
  },
  {
    id: "commerce",
    title: "Payments & Delivery",
    lede: "Checkout that reconciles.",
    text: "Stripe, Razorpay, Cybersource and PayPal for subscriptions and one-off checkout, with webhook reconciliation and plan gating. Then CI/CD, code review and an Agile cadence to keep it shipping.",
    items: ["Stripe", "Razorpay", "Cybersource", "PayPal", "Git", "CI/CD", "ESLint", "Agile"],
  },
];

export const services = [
  {
    title: "AI SaaS Products",
    text: "ChatGPT-style assistants, intelligent search and AI analytics — with auth, subscription billing, conversation history and safety guardrails. Web and mobile.",
    tags: ["OpenAI", "Next.js", "Stripe", "Supabase"],
  },
  {
    title: "Full Stack Web Applications",
    text: "End-to-end product builds: Next.js front end, Node/NestJS API, database design, authentication, deployment and a performance budget that is actually enforced.",
    tags: ["Next.js", "NestJS", "MongoDB", "PostgreSQL"],
  },
  {
    title: "Admin Dashboards & Internal Tools",
    text: "Multi-role dashboards with RBAC, data tables, analytics, reporting and realtime notifications — the systems businesses actually run on.",
    tags: ["React.js", "Redux Toolkit", "Ant Design", "RBAC"],
  },
  {
    title: "Cross-Platform Mobile Apps",
    text: "React Native and Expo apps built from a shared codebase and published to the Google Play Store and Apple App Store — I have taken apps through both review processes.",
    tags: ["React Native", "Expo", "Play Store", "App Store"],
  },
];

// Per-project narrative: the problem, the build decisions, and the accent used for generated cover art.
export const projectNarratives = {
  "Xhat - AI without Boundaries": {
    slug: "xhat-ai-assistant",
    problem:
      "Mainstream AI assistants log everything. Xhat needed to be a genuinely private ChatGPT alternative — anonymous conversations, minimal data collection — and it had to exist on the web and in both app stores at once.",
    build: [
      "Built the ChatGPT-style conversational interface in Next.js on Venice AI, tuned for streaming responses so the assistant feels immediate rather than batched.",
      "Kept data collection minimal by design: anonymous sessions, no conversation mining, with Supabase handling authentication and only the data the product genuinely needs.",
      "Wired Stripe subscription billing with plan gating and webhook reconciliation so entitlement state stays correct even when a payment event arrives late.",
      "Shipped the cross-platform mobile app in React Native and took it through both the Google Play Store and Apple App Store review processes to publication.",
    ],
    impact: "Live on the web plus published on Google Play and the Apple App Store — a real product with real users, not a prototype.",
    accent: ["#7c5cff", "#3ba9ff"],
  },
  "Alysei": {
    problem:
      "Analysts were manually hunting through unstructured sources for information that should have surfaced in seconds. The brief was an AI layer that finds, extracts and explains data instead of just returning links.",
    build: [
      "Routed queries across multiple AI providers — OpenAI and Gemini — so each task hits the model that handles it best, with graceful fallback when one provider degrades.",
      "Built automated extraction that turns unstructured source material into structured records, then an analytics dashboard that makes the result explorable rather than a wall of text.",
      "Designed the MongoDB schema around the actual query patterns so the dashboard reads stay fast as the dataset grows.",
    ],
    impact: "Replaced manual research passes with an AI search and reporting layer analysts could query directly.",
    accent: ["#45e6b0", "#3ba9ff"],
  },
  "BlackPearl": {
    problem:
      "An enterprise shipment and quotation platform where different roles — operators, managers, clients — need genuinely different views of the same data, and where a permissions mistake is a business incident.",
    build: [
      "Built the admin front end in React with TypeScript against a NestJS backend, using NestJS guards and decorators to make role checks declarative instead of scattered through controllers.",
      "Modelled the permission system as roles composed of granular capabilities, so a new role is configuration rather than a code change.",
      "Designed the PostgreSQL schema for the quotation lifecycle and built reporting on top of it, keeping historical quotes immutable for audit.",
    ],
    impact: "A permission model the client could extend without engineering involvement.",
    accent: ["#b9a7ff", "#5bbcff"],
  },
  "EzyTradie": {
    problem:
      "A trades marketplace running enquiries and quotes out of inboxes and spreadsheets — leads went cold because nobody could see which enquiry belonged to whom, what had been quoted, or what stage it had reached.",
    build: [
      "Built the enquiry-to-quote pipeline as an explicit state machine so every lead has an owner, a stage and an audit trail rather than an implied status.",
      "Delivered the dashboard in Next.js with Ant Design and Redux Toolkit, with virtualised data tables that stay responsive as enquiry volume grows.",
      "Added realtime notifications so an incoming enquiry surfaces to the right desk immediately instead of on the next refresh.",
    ],
    impact: "Turned an inbox-driven quoting process into a tracked pipeline with reporting attached.",
    accent: ["#ffc857", "#ff8f70"],
  },
  "BuyOff": {
    problem:
      "Property search is a filtering problem disguised as a listings page. Agents needed to manage inventory and leads; buyers needed to narrow thousands of properties down to a handful without giving up.",
    build: [
      "Built advanced search over a MongoDB schema indexed for the filters that actually get used — location, price band, property type — so results return fast under combined filters.",
      "Separated the agent, admin and buyer experiences behind role-based access, with an admin dashboard for inventory and agent management.",
      "Integrated map-based browsing so buyers can search the way they actually think about property: by area first, criteria second.",
    ],
    impact: "A single platform covering listing management, buyer search and agent operations.",
    accent: ["#5bbcff", "#45e6b0"],
  },
  "LiveWired": {
    problem:
      "Live streaming is unforgiving: chat has to stay in sync with the stream, moderation has to be instant, and the admin side has to manage it all while it is happening.",
    build: [
      "Built the realtime layer on Socket.io with room-scoped channels for per-stream chat, plus reconnection handling so a dropped connection recovers without losing the session.",
      "Delivered a full admin panel for stream management and moderation that operates on live sessions, not after the fact.",
      "Added a subscription system gating premium streams, with Redux Toolkit holding entitlement state consistently across the app.",
    ],
    impact: "Streaming, realtime chat, moderation and subscriptions in one platform.",
    accent: ["#ff6b6b", "#b9a7ff"],
  },
  "AI ChatGPT-like SaaS": {
    problem:
      "Build the full commercial shape of an AI product — not just the chat box, but the auth, the billing, the usage limits and the history that make it a business.",
    build: [
      "Streamed GPT-4 responses token by token so the interface stays alive while the model is still thinking.",
      "Built subscription tiers on Stripe with usage metering, so plan limits are enforced against actual consumption rather than trust.",
      "Used Supabase for auth and conversation persistence, with row-level security keeping every user's history isolated.",
    ],
    impact: "A complete AI SaaS: chat, accounts, plans, limits and history.",
    accent: ["#45e6b0", "#7c5cff"],
  },
  "Food Delivery Web App": {
    problem:
      "Three parties — customer, restaurant, courier — need a shared, live view of the same order, and the payment has to settle correctly regardless of what happens to the delivery.",
    build: [
      "Modelled the order as a state machine and broadcast transitions over Socket.io, so every party sees the same status at the same moment.",
      "Integrated Stripe for checkout with webhook-driven reconciliation, keeping payment state authoritative and independent of the client.",
      "Built the restaurant and admin dashboards for menu, order and fulfilment management on the same realtime backbone.",
    ],
    impact: "Realtime order tracking across customer, restaurant and admin surfaces.",
    accent: ["#ff8f70", "#ffc857"],
  },
  "Thunder Script": {
    problem:
      "A platform needing two very different front ends — an operational admin panel and a customer-facing site — sharing one API without either compromising for the other.",
    build: [
      "Split the surfaces deliberately: a React admin panel optimised for dense operational work, a Next.js customer front end optimised for load speed and SEO.",
      "Built one Node/Express API with MongoDB serving both, with authentication and authorisation handled centrally rather than duplicated.",
      "Added the analytics layer on top of the shared data model so admin reporting reflects exactly what customers experience.",
    ],
    impact: "Two purpose-built front ends on a single, consistent API.",
    accent: ["#62d7ff", "#45e6b0"],
  },
  "Braining": {
    problem:
      "An education platform where the hard part is not video delivery but progress: knowing what each learner has completed, what they got wrong, and what to show them next.",
    build: [
      "Built course management and interactive quizzes in Next.js with a MongoDB progress model that records attempts, not just completion.",
      "Added a CMS layer so educators publish and restructure content themselves without an engineering ticket.",
      "Handled authentication with NextAuth, keeping learner and educator roles cleanly separated.",
    ],
    impact: "Educators publish independently; learners get tracked, resumable progress.",
    accent: ["#ffc857", "#45e6b0"],
  },
  "AgingOptions": {
    problem:
      "A platform for seniors and caregivers — an audience where accessibility is not a checklist item. Small targets, low contrast and dense layouts are hard blockers.",
    build: [
      "Built the interface to accessible defaults from the start: generous hit targets, high contrast, clear focus states and layouts that survive browser zoom.",
      "Delivered care planning tools, a resource directory and appointment booking against a Node/MongoDB backend.",
      "Kept the responsive strategy simple and predictable so the experience does not reflow unexpectedly between devices.",
    ],
    impact: "Care planning, resources and booking in one accessible platform.",
    accent: ["#45e6b0", "#62d7ff"],
  },
  "Health Type": {
    problem:
      "Clinicians do not want a dashboard, they want the next three things they need to do. Healthcare data also carries strict access-control requirements.",
    build: [
      "Designed the dashboard around clinical workflow — upcoming appointments and patients needing attention first, analytics second.",
      "Built appointment scheduling with conflict detection so double-booking is prevented at the data layer, not the UI.",
      "Enforced token-based authentication and role separation so record access is scoped to the practitioner relationship.",
    ],
    impact: "A patient dashboard organised around what clinicians do next.",
    accent: ["#3ba9ff", "#45e6b0"],
  },
  "Multiple Admin Dashboards": {
    problem:
      "Every client wanted 'an admin panel'. Rebuilding tables, filters, roles and notifications from scratch each time was the actual cost centre.",
    build: [
      "Extracted the recurring pieces — data tables, filter and pagination logic, RBAC, notification handling — into a reusable dashboard foundation.",
      "Kept the foundation theme-agnostic so each client's branding is configuration rather than a fork.",
      "Standardised the analytics and charting layer so reporting behaves identically across every deployment.",
    ],
    impact: "Reduced per-client dashboard build effort by roughly 20% across teams.",
    accent: ["#8fa5ad", "#5bbcff"],
  },
  "Scalable Project Foundations": {
    problem:
      "New projects lost their first weeks re-deciding the same things: folder structure, state, validation, auth, API client, lint rules.",
    build: [
      "Built opinionated starting points for web, mobile, SaaS and dashboard products with routing, state, validation, auth and API layers already wired.",
      "Baked in the quality tooling — ESLint, code review conventions, performance baselines — so standards are the default rather than a later cleanup.",
      "Documented the extension points so teams could grow the foundation instead of working around it.",
    ],
    impact: "Cut project setup time by around 25% and made new codebases consistent from commit one.",
    accent: ["#b9a7ff", "#45e6b0"],
  },
  "Digital Signature Maker": {
    problem:
      "Signing a PDF usually means printing it, signing it, and scanning it back. It should take fifteen seconds in a browser.",
    build: [
      "Implemented smooth freehand drawing on the Canvas API with pointer-event handling that works identically with a mouse, a trackpad and a finger.",
      "Exported transparent-background PNGs by trimming the canvas to the signature bounds, so the result drops cleanly onto any document.",
      "Kept it entirely client-side — the signature never leaves the browser.",
    ],
    impact: "Live and free to use, with the source public on GitHub.",
    accent: ["#45e6b0", "#ffc857"],
  },
  "PG Website": {
    problem:
      "Students and new arrivals searching for paying-guest accommodation were working from WhatsApp forwards and out-of-date listings.",
    build: [
      "Built search and filtering over a listings API, structured around how people actually search: area first, then budget and amenities.",
      "Added map integration so location — the deciding factor — is visible rather than inferred from an address string.",
      "Kept the card and detail layouts fully responsive for an audience that is almost entirely on mobile.",
    ],
    impact: "Live listing and search platform, source public on GitHub.",
    accent: ["#62d7ff", "#45e6b0"],
  },
  "Gaming Site": {
    problem:
      "A gaming front end where the interface itself has to feel like the product — static and flat reads as broken to that audience.",
    build: [
      "Built the listing and detail experience in React with motion treated as part of the design, not decoration layered on afterwards.",
      "Tuned the animation work to stay on the compositor so the interface holds a smooth frame rate on mid-range hardware.",
      "Kept the interactive card system fully responsive without losing the motion on smaller screens.",
    ],
    impact: "Live, with the source public on GitHub.",
    accent: ["#ff6b6b", "#ffc857"],
  },
};

export const faqs = [
  {
    q: "Is Nitin available for freelance or contract work?",
    a: "Yes. Nitin Kumar is open to freelance projects, contract engagements, remote roles and long-term collaboration. He is based in Noida, Uttar Pradesh, India and works with teams across time zones. The fastest way to start is email at " + personalDataObj.email + ".",
  },
  {
    q: "What is Nitin's core technology stack?",
    a: "React.js, Next.js and TypeScript on the front end; Node.js, Express and NestJS on the back end; MongoDB, PostgreSQL, Supabase, Firebase and Redis for data; React Native for mobile; OpenAI, Gemini, Groq and Venice AI for AI features; and Stripe, Razorpay, Cybersource and PayPal for payments.",
  },
  {
    q: "How many years of experience does Nitin have?",
    a: "4+ years of professional experience. He is currently a Full Stack Developer at iByte Infomatics (since November 2024) and previously spent two and a half years as a React.js Developer at Ideahelix Pvt. Ltd. (June 2022 to November 2024).",
  },
  {
    q: "Has Nitin shipped production AI products?",
    a: "Yes. Xhat — AI without Boundaries is a privacy-focused ChatGPT-style assistant built on Venice AI with Stripe subscriptions and Supabase, live on the web and published to both the Google Play Store and the Apple App Store. He has also delivered AI search and analytics platforms using OpenAI and Gemini.",
  },
  {
    q: "Does Nitin work on backend and mobile, or only front end?",
    a: "All three. He architects and integrates REST APIs in Node.js, Express and NestJS, designs the database schemas behind them, and builds cross-platform mobile applications in React Native and Expo — including apps published to both major app stores.",
  },
  {
    q: "What measurable results has Nitin delivered?",
    a: "Roughly 30% smaller bundles and 40% faster load times through code splitting, lazy loading and memoisation; around 35% application performance improvement via memoisation, debouncing and re-render optimisation; approximately 25% faster delivery from reusable component libraries and custom hooks; and 40+ REST APIs integrated across 8+ client projects.",
  },
];

// Projects enriched with narrative + a stable slug. Falls back safely when a narrative is missing.
export const enrichedProjects = personalDataObj.projects.map((project) => {
  const narrative = projectNarratives[project.title] || {};
  return {
    ...project,
    slug: narrative.slug || slugify(project.title),
    problem: narrative.problem || project.desc,
    build: narrative.build || [],
    impact: narrative.impact || "",
    accent: narrative.accent || ["#45e6b0", "#5bbcff"],
    hasLiveLink: project.link && project.link !== "#",
    hasSource: project.git && project.git !== "#",
  };
});

export const getProjectBySlug = (slug) => enrichedProjects.find((project) => project.slug === slug);

export const featuredProjects = ["xhat-ai-assistant", "alysei", "blackpearl", "livewired", "buyoff", "digital-signature-maker"]
  .map((slug) => getProjectBySlug(slug))
  .filter(Boolean);
