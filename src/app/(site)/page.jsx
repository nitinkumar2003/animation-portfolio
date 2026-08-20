import Link from "next/link";
import {
  FiArrowRight, FiArrowUpRight, FiCheck, FiClock, FiGithub, FiLinkedin, FiMail, FiMapPin, FiMonitor,
} from "react-icons/fi";
import { personalDataObj } from "../../data/data";
import { capabilityPillars, careerTimeline, faqs, featuredProjects, positioning, services } from "../../data/content";
import ProjectCard from "../../component/site/ProjectCard";
import OsBootOverlay from "../../component/os/OsBootOverlay";
import JsonLd from "../../component/site/JsonLd";
import { faqSchema, graph, pageMeta, personSchema, projectListSchema, SITE_URL, websiteSchema } from "../../lib/seo";
import profileImg from "../../assets/images.jpg";

export const metadata = pageMeta({
  title: { absolute: "Nitin Kumar — Full Stack Developer | React, Next.js, Node.js & AI" },
  description:
    "Full Stack Developer with 4+ years building AI SaaS, real-estate, live-streaming and multi-role dashboard products. React, Next.js, TypeScript, Node.js, NestJS and React Native. Available for freelance, contract and remote work from Noida, India.",
  path: "/",
  type: "profile",
});

const marqueeItems = [
  "React.js", "Next.js", "TypeScript", "Node.js", "NestJS", "React Native", "Redux Toolkit",
  "Tailwind CSS", "MongoDB", "PostgreSQL", "Supabase", "Redis", "Socket.io", "OpenAI",
  "Gemini", "Stripe", "Razorpay", "Expo", "Framer Motion", "Zod",
];

const HomePage = () => (
  <>
    <JsonLd data={graph(personSchema, websiteSchema, {
      "@type": "ProfilePage",
      "@id": `${SITE_URL}/#profilepage`,
      url: SITE_URL,
      name: `${personalDataObj.name} — ${positioning.role}`,
      mainEntity: { "@id": personSchema["@id"] },
    }, projectListSchema, faqSchema)} />

    {/* Boots the OS over this page for real visitors. Client-only, so the
        server-rendered HTML below stays complete and indexable. */}
    <OsBootOverlay />

    {/* ---------------------------------------------------------------- Hero */}
    <section className="nk-hero">
      <div className="nk-shell">
        <div className="nk-hero__grid">
          <div>
            <span className="nk-pill"><span className="nk-dot" /> Available for freelance & full-time</span>
            <h1>
              I build products that ship —<br />
              <span className="nk-grad">interface to production.</span>
            </h1>
            <p className="nk-hero__lede">{positioning.subline}</p>

            <div className="nk-hero__actions">
              <Link href="/projects" className="nk-btn nk-btn--primary">
                See the work <FiArrowRight />
              </Link>
              <Link href="/experience" className="nk-btn nk-btn--ghost">
                Read my experience
              </Link>
            </div>

            <div className="nk-hero__meta">
              <span><FiMapPin /> {positioning.location}</span>
              <span><FiClock /> Works across IST, GMT, EST</span>
              <span><FiCheck /> Replies within 24 hours</span>
            </div>
          </div>

          <div className="nk-portrait">
            <div className="nk-portrait__frame">
              <img src={profileImg.src} alt="Nitin Kumar, Full Stack Developer based in Noida, India" width={640} height={800} />
              <div className="nk-portrait__tag">
                <b>{personalDataObj.name}</b>
                <span>Full Stack Developer · {positioning.years} years</span>
              </div>
            </div>
          </div>
        </div>

        <div className="nk-stats">
          {positioning.proof.map((stat) => (
            <div key={stat.label}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ------------------------------------------------------------ Marquee */}
    <div className="nk-marquee" aria-hidden="true">
      <div className="nk-marquee__track">
        {[0, 1].map((copy) => (
          <div className="nk-marquee__group" key={copy}>
            {marqueeItems.map((item) => <span key={`${copy}-${item}`}>{item}</span>)}
          </div>
        ))}
      </div>
    </div>

    {/* ----------------------------------------------------- Featured work */}
    <section className="nk-section" id="work">
      <div className="nk-shell">
        <div className="nk-section-head nk-reveal">
          <span className="nk-eyebrow">Selected work</span>
          <h2>Products that went live, not prototypes.</h2>
          <p>
            Six of {personalDataObj.projects.length}. Each case study covers the problem, the architecture decisions
            I made, and what I personally owned.
          </p>
        </div>

        <div className="nk-projects">
          {featuredProjects.map((project) => <ProjectCard key={project.slug} project={project} />)}
        </div>

        <div style={{ marginTop: "2.2rem" }}>
          <Link href="/projects" className="nk-btn nk-btn--ghost">
            All {personalDataObj.projects.length} projects <FiArrowRight />
          </Link>
        </div>
      </div>
    </section>

    {/* -------------------------------------------------------- Experience */}
    <section className="nk-section" id="experience">
      <div className="nk-shell">
        <div className="nk-section-head nk-reveal">
          <span className="nk-eyebrow">Experience</span>
          <h2>Four years of shipping, and what I actually own.</h2>
          <p>
            Two companies, {personalDataObj.projects.length}+ delivered products, and a consistent pattern: I take
            responsibility for the whole path from interface to deploy.
          </p>
        </div>

        {careerTimeline.map((role) => (
          <article className="nk-role nk-reveal" key={role.slug}>
            <div className="nk-role__head">
              <div className="nk-role__title">
                <h3>{role.role}</h3>
                <p>{role.company}</p>
              </div>
              <div className="nk-role__when">
                <b>{role.period}</b>
                <span>{role.location} · {role.employment}</span>
              </div>
            </div>
            <p className="nk-role__summary">{role.summary}</p>
            <div className="nk-wins">
              {role.achievements.slice(0, 4).map((win) => (
                <div className={`nk-win${win.metric ? "" : " nk-win--plain"}`} key={win.title}>
                  <div className="nk-win__metric">
                    {win.metric && <b>{win.metric}</b>}
                    {win.label && <span>{win.label}</span>}
                  </div>
                  <div className="nk-win__body">
                    <h4>{win.title}</h4>
                    <p>{win.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </article>
        ))}

        <div style={{ marginTop: "2.4rem" }}>
          <Link href="/experience" className="nk-btn nk-btn--ghost">
            Full career detail <FiArrowRight />
          </Link>
        </div>
      </div>
    </section>

    {/* ------------------------------------------------------ Capabilities */}
    <section className="nk-section" id="stack">
      <div className="nk-shell">
        <div className="nk-section-head nk-reveal">
          <span className="nk-eyebrow">Capabilities</span>
          <h2>The whole stack, and the judgement to use it.</h2>
          <p>Six layers I work across daily — with the reasoning behind each, not just a logo wall.</p>
        </div>

        <div className="nk-caps">
          {capabilityPillars.map((pillar, index) => (
            <article className="nk-card nk-cap nk-reveal" key={pillar.id}>
              <span className="nk-cap__no">{String(index + 1).padStart(2, "0")} / 06</span>
              <h3>{pillar.title}</h3>
              <p className="nk-cap__lede">{pillar.lede}</p>
              <p>{pillar.text}</p>
              <div className="nk-chips">
                {pillar.items.map((item) => <span key={item}>{item}</span>)}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>

    {/* ---------------------------------------------------------- Services */}
    <section className="nk-section" id="services">
      <div className="nk-shell">
        <div className="nk-section-head nk-reveal">
          <span className="nk-eyebrow">What I can build for you</span>
          <h2>Engagements I take on.</h2>
        </div>
        <div className="nk-caps">
          {services.map((service) => (
            <article className="nk-card nk-cap nk-reveal" key={service.title}>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
              <div className="nk-chips">
                {service.tags.map((tag) => <span key={tag}>{tag}</span>)}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>

    {/* --------------------------------------------------------- Nitin OS */}
    <section className="nk-section nk-section--tight">
      <div className="nk-shell">
        <div className="nk-oslaunch nk-reveal">
          <div>
            <span className="nk-eyebrow">Built for fun, engineered seriously</span>
            <h3>Nitin OS — a portfolio that boots like an operating system.</h3>
            <p>
              A full desktop environment in the browser: boot sequence, draggable files with persisted positions,
              a window manager with minimise and maximise, a working terminal, live weather, ten languages,
              theme switching and an AI assistant. Sixteen apps, all real.
            </p>
            <div className="nk-oslaunch__keys">
              <kbd>⌘ K search</kbd><kbd>Drag files</kbd><kbd>Space to Quick Look</kbd><kbd>Right-click menus</kbd>
            </div>
          </div>
          <Link href="/os" className="nk-btn nk-btn--primary">
            <FiMonitor /> Launch Nitin OS
          </Link>
        </div>
      </div>
    </section>

    {/* --------------------------------------------------------------- FAQ */}
    <section className="nk-section" id="faq">
      <div className="nk-shell">
        <div className="nk-section-head nk-reveal">
          <span className="nk-eyebrow">Questions</span>
          <h2>What people ask before hiring me.</h2>
          <p>Or ask the AI assistant in the corner — it answers from the same verified profile.</p>
        </div>
        <div className="nk-faq">
          {faqs.map((item) => (
            <details key={item.q}>
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>

    {/* ----------------------------------------------------------- Contact */}
    <section className="nk-section" id="contact">
      <div className="nk-shell">
        <div className="nk-cta nk-reveal">
          <span className="nk-pill"><span className="nk-dot" /> Open to new projects</span>
          <h2>Let&apos;s build something that ships.</h2>
          <p>
            Freelance, contract, or full-time. Tell me what you are building and I will tell you honestly
            whether I am the right person for it — usually within a day.
          </p>
          <div className="nk-cta__actions">
            <a href={`mailto:${personalDataObj.email}`} className="nk-btn nk-btn--primary">
              <FiMail /> {personalDataObj.email}
            </a>
            <a href={personalDataObj.whatsapp} target="_blank" rel="noreferrer" className="nk-btn nk-btn--ghost">
              WhatsApp <FiArrowUpRight />
            </a>
          </div>
          <div className="nk-cta__links">
            <a href={personalDataObj.linkedin} target="_blank" rel="noreferrer"><FiLinkedin /> LinkedIn</a>
            <a href={personalDataObj.github} target="_blank" rel="noreferrer"><FiGithub /> GitHub</a>
            <Link href="/resume"><FiArrowUpRight /> Résumé</Link>
            <span><FiMapPin /> {positioning.location}</span>
          </div>
        </div>
      </div>
    </section>
  </>
);

export default HomePage;
