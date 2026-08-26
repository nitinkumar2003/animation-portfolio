"use client";

import Link from "next/link";
import { FiArrowLeft, FiArrowRight, FiCheck, FiExternalLink, FiGithub, FiPlay, FiSmartphone } from "react-icons/fi";
import { usePreferences } from "./Preferences";

const ProjectDetailContent = ({ project, previous, next }) => {
  const { t, language } = usePreferences();

  return (
    <article>
      <section className="nk-detail__hero">
        <div className="nk-shell">
          <div className="nk-crumbs">
            <Link href="/">{t("home")}</Link><span>/</span>
            <Link href="/projects">{t("projects")}</Link><span>/</span>
            <span>{project.title}</span>
          </div>

          <div style={{ marginTop: "1.6rem" }}>
            <span className="nk-eyebrow">{project.category} · {project.type}</span>
            <h1>{project.title}</h1>
            <p>{project.desc}</p>
          </div>

          {(project.hasLiveLink || project.hasSource || project.playStore || project.appStore) && (
            <div className="nk-detail__actions">
              {project.hasLiveLink && (
                <a href={project.link} target="_blank" rel="noreferrer noopener" className="nk-btn nk-btn--primary">
                  <FiExternalLink /> {t("visitLive")}
                </a>
              )}
              {project.playStore && (
                <a href={project.playStore} target="_blank" rel="noreferrer noopener" className="nk-btn nk-btn--ghost">
                  <FiPlay /> {t("playStore")}
                </a>
              )}
              {project.appStore && (
                <a href={project.appStore} target="_blank" rel="noreferrer noopener" className="nk-btn nk-btn--ghost">
                  <FiSmartphone /> {t("appStore")}
                </a>
              )}
              {project.hasSource && (
                <a href={project.git} target="_blank" rel="noreferrer noopener" className="nk-btn nk-btn--ghost">
                  <FiGithub /> {t("sourceCode")}
                </a>
              )}
            </div>
          )}

          <div className="nk-facts">
            <div><span>{t("myRole")}</span><b>{project.role}</b></div>
            <div><span>{t("ownership")}</span><b>{project.contribution}%</b></div>
            <div><span>{t("teamSize")}</span><b>{project.teamSize}</b></div>
            <div><span>{t("duration")}</span><b>{project.duration}</b></div>
            {project.company && <div><span>{t("deliveredAt")}</span><b>{project.company}</b></div>}
          </div>
        </div>
      </section>

      <section className="nk-section">
        <div className="nk-shell">
          <div className="nk-prose">
            <div>
              <h2>{t("theProblem")}</h2>
              <p>{project.problem}</p>
            </div>

            {project.build.length > 0 && (
              <div>
                <h2>{t("whatIBuilt")}</h2>
                <ol className="nk-steps">
                  {project.build.map((step) => <li key={step}><span>{step}</span></li>)}
                </ol>
              </div>
            )}

            {project.impact && (
              <div className="nk-callout">
                <span>{t("outcome")}</span>
                <p>{project.impact}</p>
              </div>
            )}

            <div>
              <h2>{t("shippedFeatures")}</h2>
              <ul className="nk-shipped">
                {project.features.map((feature) => <li key={feature}><FiCheck /> {feature}</li>)}
              </ul>
            </div>

            <div>
              <h2>{t("stack")}</h2>
              <div className="nk-chips" style={{ marginTop: "1.1rem" }}>
                {project.tech.map((tech) => <span key={tech}>{tech}</span>)}
              </div>
            </div>

            {language !== "en" && <p className="nk-i18n-note" style={{ marginInline: 0 }}>{t("technicalNote")}</p>}
          </div>
        </div>
      </section>

      <section className="nk-section nk-section--tight">
        <div className="nk-shell">
          <div className="nk-nextprev">
            {previous ? (
              <Link href={`/projects/${previous.slug}`} className="nk-card">
                <span><FiArrowLeft style={{ verticalAlign: "-2px" }} /> {t("previous")}</span>
                <b>{previous.title}</b>
              </Link>
            ) : <span />}
            {next ? (
              <Link href={`/projects/${next.slug}`} className="nk-card" style={{ textAlign: "right" }}>
                <span>{t("next")} <FiArrowRight style={{ verticalAlign: "-2px" }} /></span>
                <b>{next.title}</b>
              </Link>
            ) : <span />}
          </div>
        </div>
      </section>
    </article>
  );
};

export default ProjectDetailContent;
