import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import ProjectCover from "./ProjectCover";

/**
 * Two-letter mark for the generated cover. Drops any subtitle after a dash, then
 * splits on spaces and camelCase boundaries so "BlackPearl" reads BP, not B.
 */
export const initialsOf = (title) => {
  const main = title.split(/\s+[-–—]\s+/)[0];
  const words = main
    .replace(/[^A-Za-z0-9 ]/g, " ")
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .split(/\s+/)
    .filter(Boolean);

  if (words.length >= 2) return (words[0][0] + words[1][0]).toUpperCase();
  return (words[0] || title).slice(0, 2).toUpperCase();
};

const ProjectCard = ({ project, headingLevel = 3 }) => {
  const Heading = `h${headingLevel}`;

  return (
    <Link href={`/projects/${project.slug}`} className="nk-card nk-project nk-reveal">
      <div className="nk-project__cover">
        <div className="nk-project__badges">
          <span className="nk-badge">{project.category}</span>
          {project.hasLiveLink && <span className="nk-badge nk-badge--live">Live</span>}
          {project.playStore && <span className="nk-badge nk-badge--store">Play Store</span>}
          {project.appStore && <span className="nk-badge nk-badge--store">App Store</span>}
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
          <em>Case study <FiArrowUpRight /></em>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
