"use client";

import Link from "next/link";
import { FiArrowRight, FiCheck, FiDownload, FiMail } from "react-icons/fi";
import { personalDataObj } from "../../data/data";
import { capabilityPillars, careerTimeline, positioning } from "../../data/content";
import { usePreferences } from "./Preferences";

const PROOF_KEYS = ["statYears", "statProducts", "statApis", "statStores"];

const ExperienceContent = () => {
  const { t, language } = usePreferences();

  return (
    <>
      <section className="nk-section nk-section--tight">
        <div className="nk-shell">
          <div className="nk-crumbs">
            <Link href="/">{t("home")}</Link><span>/</span><span>{t("navExperience")}</span>
          </div>

          <div className="nk-section-head" style={{ marginTop: "1.4rem" }}>
            <span className="nk-eyebrow">{t("experienceEyebrow")}</span>
            <h1 style={{ margin: "1rem 0 0", fontSize: "clamp(1.9rem, 4vw, 3rem)" }}>
              {t("experienceTitle")}
            </h1>
          </div>

          <div className="nk-stats" style={{ marginTop: 0, marginBottom: "clamp(3rem, 6vw, 4.5rem)" }}>
            {positioning.proof.map((stat, index) => (
              <div key={stat.label}>
                <strong>{stat.value}</strong>
                <span>{t(PROOF_KEYS[index])}</span>
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
            </article>
          ))}
        </div>
      </section>

      <section className="nk-section">
        <div className="nk-shell">
          <div className="nk-section-head nk-reveal">
            <span className="nk-eyebrow">{t("capabilitiesEyebrow")}</span>
            <h2>{t("capabilitiesTitle")}</h2>
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

      <section className="nk-section nk-section--tight">
        <div className="nk-shell">
          <div className="nk-section-head nk-reveal">
            <h2>{t("navResume")}</h2>
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
            <span className="nk-pill"><span className="nk-dot" /> {t("contactEyebrow")}</span>
            <h2>{t("contactTitle")}</h2>
            <div className="nk-cta__actions">
              <Link href="/resume" className="nk-btn nk-btn--primary">{t("readResume")} <FiArrowRight /></Link>
              <a href="/NitinKumar.pdf" className="nk-btn nk-btn--ghost" download><FiDownload /> {t("downloadPdf")}</a>
              <a href={`mailto:${personalDataObj.email}`} className="nk-btn nk-btn--ghost"><FiMail /> {t("emailMe")}</a>
            </div>
            <div className="nk-cta__links">
              <span><FiCheck /> {t("availableBadge")}</span>
            </div>
          </div>

          {language !== "en" && <p className="nk-i18n-note">{t("technicalNote")}</p>}
        </div>
      </section>
    </>
  );
};

export default ExperienceContent;
