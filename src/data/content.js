// Narrative content layer for the server-rendered portfolio.
// Every claim here is grounded in Nitin_Resume.tex — do not add metrics that the resume does not support.

import { personalDataObj } from "./data";

export const slugify = (value) => value
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/^-+|-+$/g, "");

/**
 * Two-letter mark for generated cover art. Drops any subtitle after a dash, then
 * splits on spaces and camelCase so "BlackPearl" reads BP rather than B.
 */
export const initialsOf = (title) => {
  const main = title.split(/\s+[-–—]\s+/)[0];
  const words = main
    .replace(/[^A-Za-z0-9 ]/g, " ")
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .split(/\s+/)
    .filter(Boolean);

  if (words.length >= 2) return (words[0][0] + words[1][0]).toUpperCase();
  return (words[0] || title).slice(0, 2).toUpperCase();
};

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
  "Thunder": {
    problem:
      "Build an Instagram-scale social product — reels, feed, explore, chat, calling — where the operator can change how the product behaves without an engineer. Roles, permissions, the signup form itself, plans, gateways, currencies, integrations, even whether the site is up: all of it had to be configuration, not code.",
    build: [
      "Made the role system the spine of the product: roles and their permissions are created in the admin, and every screen, action and API response is resolved against them, so a new role type ships as configuration rather than a release.",
      "Built the auth forms as data — signup and login fields are added, edited, reordered and marked required from the admin, and both the user panel and the API validate against the same stored schema so a form change cannot desync the backend.",
      "Delivered the full social surface in Next.js and TypeScript — reels, posts, feed, explore, search, likes, comments, share, save and collections, profiles, follows and friend requests, blocking and reporting — with media and pagination tuned for a scroll-first audience.",
      "Put every one of those features under the admin as well: each can be enabled, limited, moderated or scoped to a role, so the operator decides what their version of the product even includes.",
      "Built realtime chat over WebSockets with Redis backing presence, fan-out and caching so live state survives multiple API instances instead of living in one process.",
      "Integrated Agora for audio and video calling, metered against a credit and wallet system that debits per call and tops up through the same billing flow as subscriptions.",
      "Built the payment layer as a driver interface rather than an integration — seven to eight gateways including Stripe, Cybersource and PayPal sit behind one contract, and the admin chooses which is live, in which currency, for which plan, without a release.",
      "Kept the rest of commerce equally soft: subscription plans, pricing, third-party integrations and the site up / down control are all admin state, not constants.",
      "Worked across all three surfaces rather than one: the React + Vite admin panel, the Next.js + TypeScript user panel, and the Node.js / Express API on MongoDB.",
    ],
    impact: "In active development — a social platform an operator can reshape into their own product entirely from the admin.",
    accent: ["#62d7ff", "#7c5cff"],
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
      "A US retirement LifePlanning company ran its whole practice — client intake, legal document production, provider referrals and paid seminars — across disconnected tools. The brief was one platform where a client, a paralegal, an attorney, an assigned agent and an administrator each see the same plan through a different, tightly scoped lens.",
    build: [
      "Modelled the product as seven role-scoped modules on one shared data layer — intake, legal staff, LifePlan Owner portal, agent, AORG provider directory, seminars, and admin / super admin — so a role change is a permission decision rather than a separate application.",
      "Built the Intake Form as the spine of the system: a long, resumable, section-by-section capture of health, family, financial and legal details plus agent authority, with per-section validation and autosave so an older user can leave and come back without losing the plan.",
      "Delivered the legal staff workspace for paralegals and attorneys — every client record searchable and editable, estate and care documents generated server-side from the intake data, and the action that promotes a client to LifePlan Owner (LPO).",
      "Unlocked the LPO tier behind that promotion: a secure document file cabinet, and access to the assigned agents who act on the plan.",
      "Encoded agent authority as explicit rules — which agent is notified, when their authority activates and what they can act on — instead of leaving it to whoever happened to be looking at the record.",
      "Built AORG, the provider directory of physicians and health, financial and legal professionals, populated by scraping and curation, with an add-to-my-plan flow that copies a vetted provider into an LPO's own account.",
      "Shipped the seminar module end to end: event listings, seat booking, attendance and paid registration through Authorize.Net, with server-side confirmation so a seat is only held once the payment clears.",
      "Gave admin and super admin full A-to-X control — users, roles, legal staff, agents, directory entries, seminars, documents and payments — with the destructive operations reserved for super admin.",
    ],
    impact: "One platform carrying a US aging-care practice end to end: intake, legal document production, agent authority, provider referrals, seminars and payments across seven roles.",
    accent: ["#45e6b0", "#62d7ff"],
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

export const featuredProjects = ["thunder", "xhat-ai-assistant", "agingoptions", "blackpearl", "livewired", "buyoff"]
  .map((slug) => getProjectBySlug(slug))
  .filter(Boolean);
