import { FiCheck, FiGithub, FiGlobe, FiLinkedin, FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import { personalDataObj } from "../../data/data";
import { capabilityPillars, careerTimeline, enrichedProjects, positioning } from "../../data/content";
import { resumeDirection, resumeText } from "../../data/resumeI18n";

// Publicly shipped or explicitly featured work — what belongs on a résumé.
const resumeProjects = enrichedProjects
  .filter((project) => project.featured || project.hasLiveLink)
  .slice(0, 5);

/**
 * The résumé, rendered from the same data as every other page.
 * `language` swaps chrome, headings and the summary (and reading direction for
 * Arabic); `theme` switches the document between dark and light.
 */
const ResumeDocument = ({ language = "en", theme = "dark", headingLevel = 1 }) => {
  const NameHeading = `h${headingLevel}`;
  const t = (key) => resumeText(language, key);
  const direction = resumeDirection(language);

  return (
    <article className="nkr" data-resume-theme={theme} dir={direction} lang={language}>
      <header className="nkr__head">
        <div className="nkr__identity">
          <NameHeading>{personalDataObj.name}</NameHeading>
          <p className="nkr__role">{t("role")} · {t("years")}</p>
          <p className="nkr__tagline">{t("tagline")}</p>
        </div>
        <ul className="nkr__contact">
          <li><FiMapPin /> {t("location")}</li>
          <li><FiMail /> <a href={`mailto:${personalDataObj.email}`} dir="ltr">{personalDataObj.email}</a></li>
          <li><FiPhone /> <a href={`tel:${personalDataObj.phone.replace(/\s/g, "")}`} dir="ltr">{personalDataObj.phone}</a></li>
          <li><FiLinkedin /> <a href={personalDataObj.linkedin} target="_blank" rel="noreferrer">LinkedIn</a></li>
          <li><FiGithub /> <a href={personalDataObj.github} target="_blank" rel="noreferrer">GitHub</a></li>
          <li><FiGlobe /> <a href={personalDataObj.leetcode} target="_blank" rel="noreferrer">LeetCode</a></li>
        </ul>
      </header>

      <p className="nkr__availability"><FiCheck /> {t("availability")}</p>

      <section className="nkr__section">
        <h2>{t("profile")}</h2>
        <p className="nkr__lede">{positioning.subline}</p>
        <div className="nkr__metrics">
          {positioning.proof.map((item) => (
            <div key={item.label}>
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="nkr__section">
        <h2>{t("skills")}</h2>
        <dl className="nkr__skills">
          {capabilityPillars.map((pillar) => (
            <div key={pillar.id}>
              <dt>{pillar.title}</dt>
              <dd>{pillar.items.join(" · ")}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="nkr__section">
        <h2>{t("experience")}</h2>
        {careerTimeline.map((role) => (
          <div className="nkr__entry" key={role.slug}>
            <header>
              <h3>{role.role} — {role.company}</h3>
              <time>{role.current ? role.period.replace(/Present$/, t("present")) : role.period}</time>
            </header>
            <p className="nkr__meta">{role.location} · {role.employment}</p>
            <ul>
              {role.achievements.map((win) => (
                <li key={win.title}>
                  {win.metric && <b className="nkr__metric">{win.metric}</b>}
                  {win.text}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="nkr__section">
        <h2>{t("projects")}</h2>
        {resumeProjects.map((project) => (
          <div className="nkr__entry" key={project.slug}>
            <header>
              <h3>{project.title}</h3>
              <time>{project.duration}</time>
            </header>
            <p className="nkr__meta">{project.tech.join(" · ")}</p>
            <ul>
              <li>{project.shortDesc}</li>
              {project.impact && <li>{project.impact}</li>}
            </ul>
          </div>
        ))}
      </section>

      <div className="nkr__split">
        <section className="nkr__section">
          <h2>{t("education")}</h2>
          {personalDataObj.education.map((item) => (
            <div className="nkr__entry" key={item.college}>
              <header>
                <h3>{item.course}</h3>
                <time>{item.time}</time>
              </header>
              <p className="nkr__meta">{item.college}</p>
            </div>
          ))}
        </section>

        <section className="nkr__section">
          <h2>{t("certification")}</h2>
          {personalDataObj.certificate.map((item) => (
            <div className="nkr__entry" key={item.cerName}>
              <header>
                <h3>{item.cerName}</h3>
                <time>{item.time}</time>
              </header>
              <p className="nkr__meta">{item.institute}</p>
            </div>
          ))}
        </section>
      </div>

      {language !== "en" && <p className="nkr__note">{t("technicalNote")}</p>}
    </article>
  );
};

export default ResumeDocument;
