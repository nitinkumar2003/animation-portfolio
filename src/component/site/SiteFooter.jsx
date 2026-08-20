import Link from "next/link";
import { FiGithub, FiLinkedin, FiMail, FiMapPin } from "react-icons/fi";
import { personalDataObj } from "../../data/data";
import { enrichedProjects, systemInfo } from "../../data/content";

const SiteFooter = () => (
  <footer className="nk-footer">
    <div className="nk-shell">
      <div className="nk-footer__grid">
        <div className="nk-footer__about">
          <Link href="/" className="nk-brand">
            <span className="nk-brand__mark">NK</span>
            <span className="nk-brand__text">
              <b>{personalDataObj.name}</b>
              <span>Full Stack Developer</span>
            </span>
          </Link>
          <p>
            Building web, mobile and AI products end to end — React, Next.js, TypeScript, Node.js and NestJS.
            Available for freelance, contract and remote work from Noida, India.
          </p>
        </div>

        <div className="nk-footer__col">
          <h4>Explore</h4>
          <ul>
            <li><Link href="/projects">All work</Link></li>
            <li><Link href="/experience">Experience</Link></li>
            <li><Link href="/resume">Résumé</Link></li>
            <li><Link href="/os">Nitin OS</Link></li>
          </ul>
        </div>

        <div className="nk-footer__col">
          <h4>Selected work</h4>
          <ul>
            {enrichedProjects.slice(0, 4).map((project) => (
              <li key={project.slug}>
                <Link href={`/projects/${project.slug}`}>{project.title}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="nk-footer__col">
          <h4>Connect</h4>
          <ul>
            <li><a href={`mailto:${personalDataObj.email}`}>Email</a></li>
            <li><a href={personalDataObj.linkedin} target="_blank" rel="noreferrer">LinkedIn</a></li>
            <li><a href={personalDataObj.github} target="_blank" rel="noreferrer">GitHub</a></li>
            <li><a href={personalDataObj.leetcode} target="_blank" rel="noreferrer">LeetCode</a></li>
          </ul>
        </div>
      </div>

      <div className="nk-footer__bar">
        <span>© {systemInfo.buildYear} {personalDataObj.name}. Built with Next.js.</span>
        <span style={{ display: "inline-flex", gap: "1.4rem", flexWrap: "wrap" }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem" }}><FiMapPin /> Noida, India</span>
          <a href={`mailto:${personalDataObj.email}`} style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem" }}><FiMail /> {personalDataObj.email}</a>
          <a href={personalDataObj.github} target="_blank" rel="noreferrer" aria-label="GitHub"><FiGithub /></a>
          <a href={personalDataObj.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><FiLinkedin /></a>
        </span>
      </div>
    </div>
  </footer>
);

export default SiteFooter;
