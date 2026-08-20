import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FiActivity, FiArrowLeft, FiArrowRight, FiAward, FiBookOpen, FiCheck, FiChevronRight, FiCode, FiDatabase,
  FiExternalLink, FiFileText, FiFolder, FiGithub, FiHardDrive, FiHome, FiLayers, FiMail, FiMapPin, FiMonitor,
  FiSearch, FiServer, FiSmartphone, FiTarget, FiTrendingUp, FiUser, FiZap,
} from "react-icons/fi";
import { personalDataObj } from "../../../data/data";
import profileImg from "../../../assets/images.jpg";
import { capabilityPillars, careerTimeline, enrichedProjects, positioning } from "../../../data/content";
import { deliveryCapabilities, featuredProject, productDomains, projectFilters, skillInventory } from "../config";
import { StatusTag } from "../ui/OsPrimitives";

/* ------------------------------------------------------------------ README.md */

export const AboutApp = ({ onOpenProjects, onOpenApp, t }) => (
  <div className="nkos-about-app">
    <aside className="nkos-app-sidebar">
      <div className="nkos-sidebar-label">FAVORITES</div>
      <button type="button" className="active"><FiHome /> Home</button>
      <button type="button" onClick={() => onOpenApp?.("journey")}><FiUser /> Experience</button>
      <button type="button" onClick={() => onOpenApp?.("stack")}><FiLayers /> Capabilities</button>
      <button type="button" onClick={() => onOpenApp?.("contact")}><FiActivity /> Availability</button>
      <div className="nkos-sidebar-label">LOCATION</div>
      <span><FiHardDrive /> Noida, India</span>
      <div className="nkos-sidebar-label">FILE</div>
      <span><FiFileText /> README.md</span>
    </aside>

    <article className="nkos-readme">
      <div className="nkos-readme-path"><FiFileText /> Nitin / Profile / README.md</div>

      <div className="nkos-profile-hero">
        <div className="nkos-profile-photo"><img src={profileImg.src} alt="Nitin Kumar" /><span>NK</span></div>
        <div>
          <StatusTag>{t("available")}</StatusTag>
          <p className="nkos-kicker">FULL STACK DEVELOPER · {positioning.years} YEARS · {positioning.location}</p>
          <h1>{positioning.headline}</h1>
          <p className="nkos-about-copy">{positioning.subline}</p>
          <div className="nkos-action-row">
            <button type="button" className="nkos-primary-action" onClick={onOpenProjects}><FiFolder /> Explore work</button>
            <a href={`mailto:${personalDataObj.email}`} className="nkos-secondary-action"><FiMail /> Contact</a>
          </div>
        </div>
      </div>

      <div className="nkos-proof-strip">
        {positioning.proof.map((item) => (
          <div key={item.label}><strong>{item.value}</strong><span>{item.label}</span></div>
        ))}
      </div>

      <div className="nkos-readme-section">
        <h2># What I own end to end</h2>
        <div className="nkos-readme-grid">
          {capabilityPillars.map((pillar) => (
            <button type="button" key={pillar.id} onClick={() => onOpenApp?.("stack")}>
              <b>{pillar.title}</b>
              <small>{pillar.lede}</small>
            </button>
          ))}
        </div>
      </div>

      <div className="nkos-readme-section">
        <h2># Currently</h2>
        <ul className="nkos-readme-list">
          <li><FiTrendingUp /> {careerTimeline[0].role} at {careerTimeline[0].company} — {careerTimeline[0].headline}</li>
          <li><FiZap /> Shipped {featuredProject.title} to the web, Google Play and the Apple App Store.</li>
          <li><FiSmartphone /> Building cross-platform apps in React Native and Expo.</li>
        </ul>
      </div>

      <div className="nkos-capability-line">
        <span>PRODUCT UI</span><FiChevronRight /><span>API ARCHITECTURE</span><FiChevronRight />
        <span>DATA</span><FiChevronRight /><span>AI WORKFLOWS</span><FiChevronRight /><span>SHIP</span>
      </div>
      <div className="nkos-availability-line">
        <FiCheck /><span>Open to freelance, contract, remote and long-term collaboration. Replies within 24 hours.</span>
      </div>
    </article>
  </div>
);

/* -------------------------------------------------------------- Project files */

export const ProjectsApp = ({ selectedProject, setSelectedProject }) => {
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");

  const filteredProjects = useMemo(() => {
    const normalized = query.toLowerCase().trim();
    return enrichedProjects.filter((project) => {
      const searchable = `${project.title} ${project.category} ${project.tech.join(" ")} ${project.features.join(" ")}`.toLowerCase();
      return (filter === "All" || project.category === filter) && (!normalized || searchable.includes(normalized));
    });
  }, [filter, query]);

  useEffect(() => {
    if (selectedProject && filteredProjects.some((project) => project.id === selectedProject.id)) return;
    if (filteredProjects.length) setSelectedProject(filteredProjects[0]);
  }, [filter, query, selectedProject, filteredProjects, setSelectedProject]);

  const base = selectedProject || featuredProject;
  // The desktop passes plain project objects around; re-resolve to the enriched record.
  const project = enrichedProjects.find((item) => item.id === base.id) || enrichedProjects[0];

  return (
    <div className="nkos-project-app">
      <div className="nkos-explorer-toolbar">
        <div><FiArrowLeft /><FiArrowRight /></div>
        <div className="nkos-address-bar"><FiFolder /> Nitin / Work / Projects</div>
        <label><FiSearch /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search files" /></label>
      </div>

      <aside className="nkos-project-folders">
        <div className="nkos-sidebar-label">PROJECTS</div>
        {projectFilters.map((item) => (
          <button type="button" key={item} className={filter === item ? "active" : ""} onClick={() => setFilter(item)}>
            <FiFolder /> {item}
            <span>{item === "All" ? enrichedProjects.length : enrichedProjects.filter((entry) => entry.category === item).length}</span>
          </button>
        ))}
      </aside>

      <div className="nkos-project-files">
        <div className="nkos-files-head"><span>NAME</span><span>TYPE</span></div>
        {filteredProjects.map((item) => (
          <button type="button" key={item.id} className={project.id === item.id ? "active" : ""} onClick={() => setSelectedProject(item)}>
            <img src={item.img} alt="" />
            <span><b>{item.title}</b><small>{item.shortDesc}</small></span>
            <em>{item.category}</em>
          </button>
        ))}
        {!filteredProjects.length && <div className="nkos-empty-state"><FiSearch /><p>No project files matched.</p></div>}
      </div>

      <AnimatePresence mode="wait">
        <motion.article key={project.id} className="nkos-project-preview" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.18 }}>
          <div className="nkos-project-cover">
            <img src={project.img} alt={project.title} />
            <span>{String(project.id).padStart(2, "0")}</span>
          </div>

          <div className="nkos-project-title-row">
            <div><p>{project.type}{project.company ? ` · ${project.company}` : ""}</p><h2>{project.title}</h2></div>
            <StatusTag tone={project.category === "AI / SaaS" ? "red" : "blue"}>{project.category}</StatusTag>
          </div>

          <div className="nkos-detail-block">
            <span><FiTarget /> THE PROBLEM</span>
            <p className="nkos-project-description">{project.problem}</p>
          </div>

          {project.build.length > 0 && (
            <div className="nkos-detail-block">
              <span><FiCode /> WHAT I BUILT</span>
              <ol className="nkos-build-steps">
                {project.build.map((step, index) => (
                  <li key={step}><b>{String(index + 1).padStart(2, "0")}</b><p>{step}</p></li>
                ))}
              </ol>
            </div>
          )}

          {project.impact && (
            <div className="nkos-project-outcome"><span>OUTCOME</span><p>{project.impact}</p></div>
          )}

          <div className="nkos-project-facts">
            <div><span>ROLE</span><b>{project.role}</b></div>
            <div><span>DURATION</span><b>{project.duration}</b></div>
            <div><span>OWNERSHIP</span><b>{project.contribution}%</b></div>
            <div><span>TEAM</span><b>{project.teamSize}</b></div>
          </div>

          <div className="nkos-detail-block"><span>STACK</span><div>{project.tech.map((tech) => <em key={tech}>{tech}</em>)}</div></div>
          <div className="nkos-detail-block"><span>SHIPPED</span><ul>{project.features.map((feature) => <li key={feature}><FiCheck /> {feature}</li>)}</ul></div>

          {(project.hasLiveLink || project.hasSource || project.playStore || project.appStore) && (
            <div className="nkos-action-row">
              {project.hasLiveLink && <a href={project.link} target="_blank" rel="noreferrer" className="nkos-primary-action"><FiExternalLink /> Live product</a>}
              {project.playStore && <a href={project.playStore} target="_blank" rel="noreferrer" className="nkos-secondary-action"><FiSmartphone /> Google Play</a>}
              {project.appStore && <a href={project.appStore} target="_blank" rel="noreferrer" className="nkos-secondary-action"><FiSmartphone /> App Store</a>}
              {project.hasSource && <a href={project.git} target="_blank" rel="noreferrer" className="nkos-secondary-action"><FiGithub /> Source</a>}
            </div>
          )}
        </motion.article>
      </AnimatePresence>
    </div>
  );
};

/* --------------------------------------------------------- System architecture */

const pillarIcons = {
  interface: FiMonitor, state: FiCode, backend: FiServer, data: FiDatabase, ai: FiZap, commerce: FiAward,
};

export const StackApp = () => (
  <div className="nkos-stack-app">
    <div className="nkos-architecture-head">
      <div><p>SYSTEM ARCHITECTURE / CAPABILITIES</p><h2>From interface to production.</h2></div>
      <div className="nkos-system-score"><FiActivity /><strong>{skillInventory.length}</strong><span>skills indexed</span></div>
    </div>

    <div className="nkos-architecture-grid">
      {capabilityPillars.map((group, index) => {
        const Icon = pillarIcons[group.id] || FiLayers;
        return (
          <motion.article key={group.id} style={{ "--layer-color": ["#45e6b0", "#5bbcff", "#ffc857", "#ff8f70", "#b9a7ff", "#62d7ff"][index] }} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.06 }}>
            <div className="nkos-layer-index">0{index + 1} / {group.lede.toUpperCase()}</div>
            <Icon />
            <h3>{group.title}</h3>
            <p>{group.text}</p>
            <div>{group.items.map((item) => <span key={item}>{item}</span>)}</div>
          </motion.article>
        );
      })}
    </div>

    <div className="nkos-build-pipeline">
      <span><FiCode /> PRODUCT IDEA</span><i /><span><FiMonitor /> UI SYSTEM</span><i />
      <span><FiServer /> API</span><i /><span><FiDatabase /> DATA</span><i /><span><FiZap /> SHIP</span>
    </div>

    <div className="nkos-capability-matrix">
      <section><span>PRODUCT DOMAINS</span><div>{productDomains.map((item) => <em key={item}>{item}</em>)}</div></section>
      <section><span>END-TO-END OWNERSHIP</span><div>{deliveryCapabilities.map((item) => <em key={item}>{item}</em>)}</div></section>
    </div>
  </div>
);

/* ------------------------------------------------------------- Experience.log */

export const JourneyApp = () => (
  <div className="nkos-journey-app">
    <header>
      <p>CAREER_TIMELINE.LOG</p>
      <h2>{positioning.years} years, two companies, one consistent pattern.</h2>
      <span>Every line below traces back to the verified résumé.</span>
    </header>

    <div className="nkos-timeline">
      {careerTimeline.map((role, index) => (
        <article key={role.slug} className="nkos-timeline-entry">
          <div className="nkos-timeline-marker"><span>{index + 1}</span></div>
          <div className="nkos-timeline-date">{role.period}</div>
          <div className="nkos-timeline-copy">
            <StatusTag>{role.current ? "CURRENT" : "COMPLETED"}</StatusTag>
            <h3>{role.role}</h3>
            <h4>{role.company} · {role.location}</h4>
            <p className="nkos-role-headline">{role.headline}</p>
            <p>{role.summary}</p>

            <div className="nkos-log-wins">
              {role.achievements.map((win) => (
                <div key={win.title}>
                  <b>{win.metric || "—"}</b>
                  <span><strong>{win.title}</strong>{win.text}</span>
                </div>
              ))}
            </div>

            <div className="nkos-log-tags">{role.stack.map((tech) => <em key={tech}>{tech}</em>)}</div>
          </div>
        </article>
      ))}

      {personalDataObj.education.map((item, index) => (
        <article key={`${item.college}-${item.time}`} className="nkos-timeline-entry education">
          <div className="nkos-timeline-marker"><span>{index + careerTimeline.length + 1}</span></div>
          <div className="nkos-timeline-date">{item.time}</div>
          <div className="nkos-timeline-copy">
            <StatusTag tone="blue">EDUCATION</StatusTag>
            <h3>{item.course}</h3><h4>{item.college}</h4><p>{item.description}</p>
          </div>
        </article>
      ))}

      {personalDataObj.certificate.map((item, index) => (
        <article key={item.cerName} className="nkos-timeline-entry education">
          <div className="nkos-timeline-marker"><span>{index + careerTimeline.length + personalDataObj.education.length + 1}</span></div>
          <div className="nkos-timeline-date">{item.time}</div>
          <div className="nkos-timeline-copy">
            <StatusTag tone="blue">CERTIFICATION</StatusTag>
            <h3><FiBookOpen style={{ verticalAlign: "-2px", marginRight: 6 }} />{item.cerName}</h3>
            <h4>{item.institute}</h4><p>{item.description}</p>
          </div>
        </article>
      ))}
    </div>

    <footer className="nkos-journey-foot">
      <FiMapPin /> Based in {positioning.location} · Open to remote collaboration worldwide
    </footer>
  </div>
);
