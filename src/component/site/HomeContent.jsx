"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import {
  FiArrowRight, FiArrowUpRight, FiCheck, FiClock, FiGithub, FiLinkedin, FiMail, FiMapPin, FiMonitor,
} from "react-icons/fi";
import { personalDataObj } from "../../data/data";
import { capabilityPillars, careerTimeline, faqs, featuredProjects, positioning, services } from "../../data/content";
import ProjectCard from "./ProjectCard";
import { usePreferences } from "./Preferences";
import profileImg from "../../assets/images.jpg";

// Client-only: it renders a WebGL canvas, so it has nothing useful to say
// during SSR and would break server rendering if it ran there.
const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

const marqueeItems = [
  "React.js", "Next.js", "TypeScript", "Node.js", "NestJS", "React Native", "Redux Toolkit",
  "Tailwind CSS", "MongoDB", "PostgreSQL", "Supabase", "Redis", "Socket.io", "OpenAI",
  "Gemini", "Stripe", "Razorpay", "Expo", "Framer Motion", "Zod",
];

// Proof figures are data; only their labels are translated.
const PROOF_KEYS = ["statYears", "statProducts", "statApis", "statStores"];

const HomeContent = () => {
  const { t, language, resolvedTheme } = usePreferences();

  return (
    <>
      <section className="nk-hero">
        <div className="nk-hero__scene" aria-hidden="true">
          <HeroScene theme={resolvedTheme} />
        </div>
        <div className="nk-shell">
          <div className="nk-hero__grid">
            <div>
              <span className="nk-pill"><span className="nk-dot" /> {t("availableBadge")}</span>
              <h1>
                {t("heroLine1")}<br />
                <span className="nk-grad">{t("heroLine2")}</span>
              </h1>
              <p className="nk-hero__lede">{positioning.subline}</p>

              <div className="nk-hero__actions">
                <Link href="/projects" className="nk-btn nk-btn--primary">{t("seeWork")} <FiArrowRight /></Link>
                <Link href="/experience" className="nk-btn nk-btn--ghost">{t("readExperience")}</Link>
              </div>

              <div className="nk-hero__meta">
                <span><FiMapPin /> {positioning.location}</span>
                <span><FiClock /> {t("worksAcross")}</span>
                <span><FiCheck /> {t("repliesWithin")}</span>
              </div>
            </div>

            <div className="nk-portrait">
              <div className="nk-portrait__frame">
                <img src={profileImg.src} alt={`${personalDataObj.name}, ${positioning.role}`} width={640} height={800} />
                <div className="nk-portrait__tag">
                  <b>{personalDataObj.name}</b>
                  <span>{positioning.role} · {positioning.years}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="nk-stats">
            {positioning.proof.map((stat, index) => (
              <div key={stat.label}>
                <strong>{stat.value}</strong>
                <span>{t(PROOF_KEYS[index])}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="nk-marquee" aria-hidden="true">
        <div className="nk-marquee__track">
          {[0, 1].map((copy) => (
            <div className="nk-marquee__group" key={copy}>
              {marqueeItems.map((item) => <span key={`${copy}-${item}`}>{item}</span>)}
            </div>
          ))}
        </div>
      </div>

      <section className="nk-section" id="work">
        <div className="nk-shell">
          <div className="nk-section-head nk-reveal">
            <span className="nk-eyebrow">{t("selectedWork")}</span>
            <h2>{t("selectedWorkTitle")}</h2>
          </div>
          <div className="nk-projects">
            {featuredProjects.map((project) => <ProjectCard key={project.slug} project={project} />)}
          </div>
          <div style={{ marginTop: "2.2rem" }}>
            <Link href="/projects" className="nk-btn nk-btn--ghost">
              {t("allProjects", { count: personalDataObj.projects.length })} <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>

      <section className="nk-section" id="experience">
        <div className="nk-shell">
          <div className="nk-section-head nk-reveal">
            <span className="nk-eyebrow">{t("experienceEyebrow")}</span>
            <h2>{t("experienceTitle")}</h2>
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
            <Link href="/experience" className="nk-btn nk-btn--ghost">{t("fullCareer")} <FiArrowRight /></Link>
          </div>
        </div>
      </section>

      <section className="nk-section" id="stack">
        <div className="nk-shell">
          <div className="nk-section-head nk-reveal">
            <span className="nk-eyebrow">{t("capabilitiesEyebrow")}</span>
            <h2>{t("capabilitiesTitle")}</h2>
            <p>{t("capabilitiesLede")}</p>
          </div>
          <div className="nk-caps">
            {capabilityPillars.map((pillar, index) => (
              <article className="nk-card nk-cap nk-reveal" key={pillar.id}>
                <span className="nk-cap__no">{String(index + 1).padStart(2, "0")} / 06</span>
                <h3>{pillar.title}</h3>
                <p className="nk-cap__lede">{pillar.lede}</p>
                <p>{pillar.text}</p>
                <div className="nk-chips">{pillar.items.map((item) => <span key={item}>{item}</span>)}</div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="nk-section" id="services">
        <div className="nk-shell">
          <div className="nk-section-head nk-reveal">
            <span className="nk-eyebrow">{t("servicesEyebrow")}</span>
            <h2>{t("servicesTitle")}</h2>
          </div>
          <div className="nk-caps">
            {services.map((service) => (
              <article className="nk-card nk-cap nk-reveal" key={service.title}>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
                <div className="nk-chips">{service.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="nk-section nk-section--tight">
        <div className="nk-shell">
          <div className="nk-oslaunch nk-reveal">
            <div>
              <span className="nk-eyebrow">{t("osEyebrow")}</span>
              <h3>{t("osTitle")}</h3>
              <p>
                A full desktop environment in the browser: boot sequence, resizable and snappable windows,
                a working terminal, a voice assistant, live weather, ten languages and theme switching.
                Sixteen apps, all real.
              </p>
              <div className="nk-oslaunch__keys">
                <kbd>⌘ K</kbd><kbd>⌘ J</kbd><kbd>Drag &amp; resize</kbd><kbd>Right-click menus</kbd>
              </div>
            </div>
            <Link href="/os" className="nk-btn nk-btn--primary"><FiMonitor /> {t("launchOs")}</Link>
          </div>
        </div>
      </section>

      <section className="nk-section" id="faq">
        <div className="nk-shell">
          <div className="nk-section-head nk-reveal">
            <span className="nk-eyebrow">{t("faqEyebrow")}</span>
            <h2>{t("faqTitle")}</h2>
            <p>{t("faqLede")}</p>
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

      <section className="nk-section" id="contact">
        <div className="nk-shell">
          <div className="nk-cta nk-reveal">
            <span className="nk-pill"><span className="nk-dot" /> {t("contactEyebrow")}</span>
            <h2>{t("contactTitle")}</h2>
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
              <Link href="/resume"><FiArrowUpRight /> {t("navResume")}</Link>
              <span><FiMapPin /> {positioning.location}</span>
            </div>
          </div>

          {language !== "en" && (
            <p className="nk-i18n-note">{t("technicalNote")}</p>
          )}
        </div>
      </section>
    </>
  );
};

export default HomeContent;
