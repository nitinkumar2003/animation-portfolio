import React from "react";
import { FiCheck, FiDownload, FiFileText, FiPrinter } from "react-icons/fi";
import { personalDataObj } from "../../../data/data";
import resumePDF from "../../../../NitinKumar.pdf";
import { deliveryCapabilities, productDomains, resumeHighlights, stackGroups } from "../config";

const ResumeApp = () => (
  <div className="nkos-resume-app">
    <div className="nkos-document-toolbar"><span><FiFileText /> Nitin_Kumar_Live_Resume</span><div><button type="button" onClick={() => window.print()}><FiPrinter /> Print / Save PDF</button><a href={resumePDF} download="NitinKumar.pdf"><FiDownload /> Verified PDF</a></div></div>
    <article className="nkos-live-resume">
      <header>
        <div><p>FULL STACK DEVELOPER</p><h1>{personalDataObj.name}</h1><span>{personalDataObj.about}</span></div>
        <aside><a href={`mailto:${personalDataObj.email}`}>{personalDataObj.email}</a><span>{personalDataObj.phone}</span><span>{personalDataObj.location}</span><a href={personalDataObj.linkedin} target="_blank" rel="noreferrer">LinkedIn profile</a><a href={personalDataObj.github} target="_blank" rel="noreferrer">GitHub portfolio</a></aside>
      </header>
      <section className="nkos-resume-section"><h2>Selected Impact</h2><div className="nkos-resume-highlights">{resumeHighlights.map((highlight) => <p key={highlight}><FiCheck /> {highlight}</p>)}</div></section>
      <section className="nkos-resume-section"><h2>Core Engineering Stack</h2><div className="nkos-resume-stack">{stackGroups.map((group) => <div key={group.title}><b>{group.title}</b><p>{group.items.join(" · ")}</p></div>)}</div></section>
      <section className="nkos-resume-section"><h2>Product Domains</h2><div className="nkos-resume-domain-list">{productDomains.map((domain) => <span key={domain}>{domain}</span>)}</div></section>
      <section className="nkos-resume-section"><h2>End-to-End Ownership</h2><div className="nkos-resume-domain-list ownership">{deliveryCapabilities.map((capability) => <span key={capability}>{capability}</span>)}</div></section>
      <section className="nkos-resume-section"><h2>Professional Experience</h2>{personalDataObj.experience.map((item) => <div className="nkos-resume-entry" key={`${item.company}-${item.time}`}><div><b>{item.profile}</b><span>{item.company}</span></div><time>{item.time}</time><p>{item.description}</p></div>)}</section>
      <section className="nkos-resume-section"><h2>Project Portfolio · {personalDataObj.projects.length} Systems</h2><div className="nkos-resume-project-grid">{personalDataObj.projects.map((project) => <div key={project.id}><span>{String(project.id).padStart(2, "0")}</span><b>{project.title}</b><small>{project.category} · {project.role} · {project.contribution}% ownership</small><p>{project.tech.join(" / ")}</p></div>)}</div></section>
      <div className="nkos-resume-bottom-grid">
        <section className="nkos-resume-section"><h2>Education</h2>{personalDataObj.education.map((item) => <div className="nkos-resume-entry compact" key={item.course}><div><b>{item.course}</b><span>{item.college}</span></div><time>{item.time}</time></div>)}</section>
        <section className="nkos-resume-section"><h2>Certification</h2>{personalDataObj.certificate.map((item) => <div className="nkos-resume-entry compact" key={item.cerName}><div><b>{item.cerName}</b><span>{item.institute}</span></div><time>{item.time}</time></div>)}</section>
      </div>
    </article>
  </div>
);

export default ResumeApp;
