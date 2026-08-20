import Link from "next/link";
import { FiArrowRight, FiCheck, FiDownload, FiMail } from "react-icons/fi";
import { personalDataObj } from "../../../data/data";
import { capabilityPillars, careerTimeline, positioning } from "../../../data/content";
import JsonLd from "../../../component/site/JsonLd";
import { breadcrumbSchema, graph, pageMeta, personSchema } from "../../../lib/seo";

export const metadata = pageMeta({
  title: "Experience — 4+ Years as a Full Stack Developer",
  description:
    "Nitin Kumar's professional experience: Full Stack Developer at iByte Infomatics since Nov 2024 and React.js Developer at Ideahelix Pvt. Ltd. from 2022–2024. 40+ REST APIs, 8+ client products, ~30% smaller bundles and ~40% faster load times.",
  path: "/experience",
  type: "profile",
});

const ExperiencePage = () => (
  <>
    <JsonLd data={graph(
      breadcrumbSchema([{ name: "Home", href: "/" }, { name: "Experience", href: "/experience" }]),
      personSchema,
    )} />

    <section className="nk-section nk-section--tight">
      <div className="nk-shell">
        <div className="nk-crumbs">
          <Link href="/">Home</Link><span>/</span><span>Experience</span>
        </div>

        <div className="nk-section-head" style={{ marginTop: "1.4rem" }}>
          <span className="nk-eyebrow">Career</span>
          <h1 style={{ margin: "1rem 0 0", fontSize: "clamp(1.9rem, 4vw, 3rem)" }}>
            {positioning.years} years, two companies, one consistent pattern.
          </h1>
          <p>
            I do not hand work over a wall. On every team I have been on, I have owned the component
            architecture, the state layer, the API contract and the performance budget — and on the AI products,
            the billing and the mobile release too. Here is the detail, role by role.
          </p>
        </div>

        <div className="nk-stats" style={{ marginTop: 0, marginBottom: "clamp(3rem, 6vw, 4.5rem)" }}>
          {positioning.proof.map((stat) => (
            <div key={stat.label}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
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
              {role.achievements.map((win) => (
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

            <div className="nk-chips" style={{ marginTop: "1.4rem" }}>
              {role.stack.map((tech) => <span key={tech}>{tech}</span>)}
            </div>

            <p style={{ marginTop: "1rem", color: "var(--nk-faint)", fontSize: "0.85rem" }}>
              Domains: {role.domains.join(" · ")}
            </p>
          </article>
        ))}
      </div>
    </section>

    <section className="nk-section">
      <div className="nk-shell">
        <div className="nk-section-head nk-reveal">
          <span className="nk-eyebrow">How I work</span>
          <h2>Six layers, and the reasoning behind each.</h2>
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

    <section className="nk-section nk-section--tight">
      <div className="nk-shell">
        <div className="nk-section-head nk-reveal">
          <span className="nk-eyebrow">Education & certification</span>
          <h2>Where the foundations came from.</h2>
        </div>
        <div className="nk-caps">
          {personalDataObj.education.map((item) => (
            <article className="nk-card nk-cap nk-reveal" key={item.college}>
              <span className="nk-cap__no">{item.time}</span>
              <h3 style={{ fontSize: "1.08rem" }}>{item.course}</h3>
              <p className="nk-cap__lede">{item.college}</p>
              <p>{item.description}</p>
            </article>
          ))}
          {personalDataObj.certificate.map((item) => (
            <article className="nk-card nk-cap nk-reveal" key={item.cerName}>
              <span className="nk-cap__no">{item.time}</span>
              <h3 style={{ fontSize: "1.08rem" }}>{item.cerName}</h3>
              <p className="nk-cap__lede">{item.institute}</p>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>

    <section className="nk-section">
      <div className="nk-shell">
        <div className="nk-cta nk-reveal">
          <span className="nk-pill"><span className="nk-dot" /> Available now</span>
          <h2>Want the one-page version?</h2>
          <p>Read the full résumé online, download the ATS-friendly PDF, or just email me.</p>
          <div className="nk-cta__actions">
            <Link href="/resume" className="nk-btn nk-btn--primary">Read the résumé <FiArrowRight /></Link>
            <a href="/NitinKumar.pdf" className="nk-btn nk-btn--ghost" download><FiDownload /> Download PDF</a>
            <a href={`mailto:${personalDataObj.email}`} className="nk-btn nk-btn--ghost"><FiMail /> Email me</a>
          </div>
          <div className="nk-cta__links">
            <span><FiCheck /> Freelance</span>
            <span><FiCheck /> Contract</span>
            <span><FiCheck /> Remote</span>
            <span><FiCheck /> Full-time</span>
          </div>
        </div>
      </div>
    </section>
  </>
);

export default ExperiencePage;
