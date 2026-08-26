"use client";

import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import ProjectCover from "./ProjectCover";
import { usePreferences } from "./Preferences";
import { initialsOf } from "../../data/content";

const ProjectCard = ({ project, headingLevel = 3 }) => {
  const { t } = usePreferences();
  const Heading = `h${headingLevel}`;

  return (
    <Link href={`/projects/${project.slug}`} className="nk-card nk-project nk-reveal">
      <div className="nk-project__cover">
        <div className="nk-project__badges">
          <span className="nk-badge">{project.category}</span>
          {project.hasLiveLink && <span className="nk-badge nk-badge--live">{t("live")}</span>}
          {project.playStore && <span className="nk-badge nk-badge--store">{t("playStore")}</span>}
          {project.appStore && <span className="nk-badge nk-badge--store">{t("appStore")}</span>}
        </div>
        <ProjectCover slug={project.slug} initials={initialsOf(project.title)} accent={project.accent} />
      </div>

      <div className="nk-project__body">
        <Heading>{project.title}</Heading>
        <p>{project.shortDesc}</p>
        <div className="nk-chips">
          {project.tech.slice(0, 4).map((tech) => <span key={tech}>{tech}</span>)}
          {project.tech.length > 4 && <span>+{project.tech.length - 4}</span>}
        </div>
        <div className="nk-project__foot">
          <span>{project.type}{project.duration ? ` · ${project.duration}` : ""}</span>
          <em>{t("caseStudy")} <FiArrowUpRight /></em>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
