import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FiActivity, FiArrowLeft, FiArrowRight, FiCheck, FiChevronRight, FiCode, FiDatabase, FiExternalLink,
  FiFileText, FiFolder, FiGithub, FiHardDrive, FiHome, FiMail, FiMonitor, FiSearch, FiServer, FiUser, FiZap,
} from "react-icons/fi";
import { personalDataObj } from "../../../data/data";
import profileImg from "../../../assets/images.jpg";
import { deliveryCapabilities, productDomains, projectFilters, skillInventory, stackGroups } from "../config";
import { StatusTag } from "../ui/OsPrimitives";

export const AboutApp = ({ onOpenProjects, t }) => (
  <div className="nkos-about-app">
    <aside className="nkos-app-sidebar">
      <div className="nkos-sidebar-label">FAVORITES</div>
      <button type="button" className="active"><FiHome /> Home</button><button type="button"><FiUser /> Profile</button><button type="button"><FiActivity /> Availability</button>
      <div className="nkos-sidebar-label">LOCATION</div><span><FiHardDrive /> Noida, India</span>
    </aside>
    <article className="nkos-readme">
      <div className="nkos-readme-path"><FiFileText /> Nitin / Profile / README.md</div>
      <div className="nkos-profile-hero">
        <div className="nkos-profile-photo"><img src={profileImg.src} alt="Nitin Kumar" /><span>NK</span></div>
        <div>
          <StatusTag>{t("available")}</StatusTag><p className="nkos-kicker">FULL STACK DEVELOPER · 4+ YEARS</p><h1>{t("heroTitle")}</h1><p className="nkos-about-copy">{t("heroCopy")}</p>
          <div className="nkos-action-row"><button type="button" className="nkos-primary-action" onClick={onOpenProjects}><FiFolder /> Explore work</button><a href={`mailto:${personalDataObj.email}`} className="nkos-secondary-action"><FiMail /> Contact</a></div>
        </div>
      </div>
      <div className="nkos-proof-strip"><div><strong>15</strong><span>Project systems</span></div><div><strong>4+</strong><span>Years building</span></div><div><strong>{skillInventory.length}</strong><span>Skills indexed</span></div><div><strong>Full</strong><span>Product ownership</span></div></div>
      <div className="nkos-capability-line"><span>PRODUCT UI</span><FiChevronRight /><span>API ARCHITECTURE</span><FiChevronRight /><span>DATA</span><FiChevronRight /><span>AI WORKFLOWS</span></div>
      <div className="nkos-availability-line"><FiCheck /><span>Open to freelance, remote, contract and long-term collaboration.</span></div>
    </article>
  </div>
);

export const ProjectsApp = ({ selectedProject, setSelectedProject }) => {
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");
  const filteredProjects = useMemo(() => {
    const normalized = query.toLowerCase().trim();
    return personalDataObj.projects.filter((project) => {
      const searchable = `${project.title} ${project.category} ${project.tech.join(" ")} ${project.features.join(" ")}`.toLowerCase();
      return (filter === "All" || project.category === filter) && (!normalized || searchable.includes(normalized));
    });
  }, [filter, query]);

  useEffect(() => {
    if (selectedProject && filteredProjects.some((project) => project.id === selectedProject.id)) return;
    if (filteredProjects.length) setSelectedProject(filteredProjects[0]);
  }, [filter, query, selectedProject, filteredProjects, setSelectedProject]);

  const project = selectedProject || personalDataObj.projects[13];
  return (
    <div className="nkos-project-app">
      <div className="nkos-explorer-toolbar"><div><FiArrowLeft /><FiArrowRight /></div><div className="nkos-address-bar"><FiFolder /> Nitin / Work / Projects</div><label><FiSearch /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search files" /></label></div>
      <aside className="nkos-project-folders"><div className="nkos-sidebar-label">PROJECTS</div>{projectFilters.map((item) => <button type="button" key={item} className={filter === item ? "active" : ""} onClick={() => setFilter(item)}><FiFolder /> {item}<span>{item === "All" ? personalDataObj.projects.length : personalDataObj.projects.filter((entry) => entry.category === item).length}</span></button>)}</aside>
      <div className="nkos-project-files">
        <div className="nkos-files-head"><span>NAME</span><span>TYPE</span></div>
        {filteredProjects.map((item) => <button type="button" key={item.id} className={project.id === item.id ? "active" : ""} onClick={() => setSelectedProject(item)}><img src={item.img} alt="" /><span><b>{item.title}</b><small>{item.shortDesc}</small></span><em>{item.category}</em></button>)}
        {!filteredProjects.length && <div className="nkos-empty-state"><FiSearch /><p>No project files matched.</p></div>}
      </div>
      <AnimatePresence mode="wait">
        <motion.article key={project.id} className="nkos-project-preview" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.18 }}>
          <div className="nkos-project-cover"><img src={project.img} alt={project.title} /><span>{String(project.id).padStart(2, "0")}</span></div>
          <div className="nkos-project-title-row"><div><p>{project.type}</p><h2>{project.title}</h2></div><StatusTag tone={project.category === "AI / SaaS" ? "red" : "blue"}>{project.category}</StatusTag></div>
          <p className="nkos-project-description">{project.desc}</p>
          <div className="nkos-project-facts"><div><span>ROLE</span><b>{project.role}</b></div><div><span>DURATION</span><b>{project.duration}</b></div><div><span>OWNERSHIP</span><b>{project.contribution}%</b></div><div><span>TEAM</span><b>{project.teamSize}</b></div></div>
          <div className="nkos-detail-block"><span>STACK</span><div>{project.tech.map((tech) => <em key={tech}>{tech}</em>)}</div></div>
          <div className="nkos-detail-block"><span>SHIPPED</span><ul>{project.features.map((feature) => <li key={feature}><FiCheck /> {feature}</li>)}</ul></div>
          {(project.link !== "#" || project.git !== "#") && <div className="nkos-action-row">{project.link !== "#" && <a href={project.link} target="_blank" rel="noreferrer" className="nkos-primary-action"><FiExternalLink /> Live product</a>}{project.git !== "#" && <a href={project.git} target="_blank" rel="noreferrer" className="nkos-secondary-action"><FiGithub /> Source</a>}</div>}
        </motion.article>
      </AnimatePresence>
    </div>
  );
};

export const StackApp = () => (
  <div className="nkos-stack-app">
    <div className="nkos-architecture-head"><div><p>SYSTEM ARCHITECTURE / CAPABILITIES</p><h2>From interface to production.</h2></div><div className="nkos-system-score"><FiActivity /><strong>{stackGroups.length}</strong><span>capability systems</span></div></div>
    <div className="nkos-architecture-grid">{stackGroups.map((group, index) => { const Icon = group.icon; return <motion.article key={group.title} style={{ "--layer-color": group.color }} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.06 }}><div className="nkos-layer-index">0{index + 1} / {group.level}</div><Icon /><h3>{group.title}</h3><p>{group.summary}</p><div>{group.items.map((item) => <span key={item}>{item}</span>)}</div></motion.article>; })}</div>
    <div className="nkos-build-pipeline"><span><FiCode /> PRODUCT IDEA</span><i /><span><FiMonitor /> UI SYSTEM</span><i /><span><FiServer /> API</span><i /><span><FiDatabase /> DATA</span><i /><span><FiZap /> SHIP</span></div>
    <div className="nkos-capability-matrix"><section><span>PRODUCT DOMAINS</span><div>{productDomains.map((item) => <em key={item}>{item}</em>)}</div></section><section><span>END-TO-END OWNERSHIP</span><div>{deliveryCapabilities.map((item) => <em key={item}>{item}</em>)}</div></section></div>
  </div>
);

export const JourneyApp = () => (
  <div className="nkos-journey-app">
    <header><p>CAREER_TIMELINE.LOG</p><h2>Building across product teams since 2022.</h2></header>
    <div className="nkos-timeline">
      {personalDataObj.experience.map((item, index) => <article key={`${item.company}-${item.time}`} className="nkos-timeline-entry"><div className="nkos-timeline-marker"><span>{index + 1}</span></div><div className="nkos-timeline-date">{item.time}</div><div className="nkos-timeline-copy"><StatusTag>{index === 0 ? "CURRENT" : "COMPLETED"}</StatusTag><h3>{item.profile}</h3><h4>{item.company}</h4><p>{item.description}</p></div></article>)}
      {personalDataObj.education.map((item, index) => <article key={`${item.college}-${item.time}`} className="nkos-timeline-entry education"><div className="nkos-timeline-marker"><span>{index + personalDataObj.experience.length + 1}</span></div><div className="nkos-timeline-date">{item.time}</div><div className="nkos-timeline-copy"><StatusTag tone="blue">EDUCATION</StatusTag><h3>{item.course}</h3><h4>{item.college}</h4><p>{item.description}</p></div></article>)}
    </div>
  </div>
);
