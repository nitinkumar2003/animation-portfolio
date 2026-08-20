"use client";

import { useMemo, useState } from "react";
import { FiSearch, FiX } from "react-icons/fi";
import ProjectCard from "./ProjectCard";

const CATEGORIES = ["All", "AI / SaaS", "Full Stack", "Dashboard", "Frontend"];

/**
 * Client component so filtering is instant, but Next still server-renders the full
 * list into the static HTML — every project stays crawlable without JavaScript.
 */
const ProjectGrid = ({ projects }) => {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");

  const counts = useMemo(() => Object.fromEntries(
    CATEGORIES.map((item) => [
      item,
      item === "All" ? projects.length : projects.filter((project) => project.category === item).length,
    ]),
  ), [projects]);

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return projects.filter((project) => {
      if (category !== "All" && project.category !== category) return false;
      if (!needle) return true;
      return `${project.title} ${project.shortDesc} ${project.tech.join(" ")} ${project.features.join(" ")}`
        .toLowerCase()
        .includes(needle);
    });
  }, [projects, category, query]);

  return (
    <>
      <div className="nk-toolbar">
        <nav className="nk-filters" aria-label="Filter projects by category">
          {CATEGORIES.map((item) => (
            <button
              type="button"
              key={item}
              onClick={() => setCategory(item)}
              aria-current={category === item}
            >
              {item} <span style={{ opacity: 0.6 }}>({counts[item]})</span>
            </button>
          ))}
        </nav>

        <label className="nk-search">
          <FiSearch aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search projects, tech, features…"
            aria-label="Search projects"
          />
          {query && (
            <button type="button" onClick={() => setQuery("")} aria-label="Clear search"><FiX /></button>
          )}
        </label>
      </div>

      {visible.length > 0 ? (
        <div className="nk-projects">
          {visible.map((project) => <ProjectCard key={project.slug} project={project} headingLevel={2} />)}
        </div>
      ) : (
        <p className="nk-empty">
          No projects match “{query}”{category !== "All" ? ` in ${category}` : ""}.{" "}
          <button type="button" onClick={() => { setQuery(""); setCategory("All"); }}>Clear filters</button>
        </p>
      )}
    </>
  );
};

export default ProjectGrid;
