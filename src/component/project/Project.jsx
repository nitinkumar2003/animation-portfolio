import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RxExternalLink } from "react-icons/rx";
import { AiOutlineGithub } from "react-icons/ai";
import { personalDataObj } from "../../data/data";
import ProjectModal from "./ProjectModal";
import SectionHeading from "../ui/SectionHeading";
import { useTheme } from "../../pages/Home";

const filterCategories = ["All", "Frontend", "Full Stack", "AI / SaaS", "Dashboard"];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const Project = () => {
  const { dark } = useTheme();
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState(null);

  const filtered =
    filter === "All"
      ? personalDataObj.projects
      : personalDataObj.projects.filter((p) => p.category === filter);

  return (
    <section id="works" className="py-24 relative">
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          background:
            "radial-gradient(ellipse at 80% 50%, #a855f7 0%, transparent 60%)",
        }}
      />

      <div className="container mx-auto relative z-10">
        <SectionHeading
          tag="My Work"
          title="Featured Projects"
          subtitle="A collection of projects that showcase my skills across frontend, full stack, and AI development."
          dark={dark}
        />

        {/* Filter Tabs */}
        <div className="flex justify-center gap-3 mb-12 flex-wrap">
          {filterCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              data-cursor-hover
              className="px-5 py-2 rounded-full text-sm font-medium transition-all duration-300"
              style={{
                background:
                  filter === cat
                    ? "linear-gradient(135deg, #6366f1, #8b5cf6)"
                    : dark
                    ? "rgba(255,255,255,0.05)"
                    : "rgba(0,0,0,0.05)",
                color: filter === cat ? "#fff" : dark ? "#94a3b8" : "#64748b",
                border:
                  filter === cat
                    ? "1px solid transparent"
                    : dark
                    ? "1px solid rgba(255,255,255,0.08)"
                    : "1px solid rgba(0,0,0,0.08)",
                boxShadow: filter === cat ? "0 4px 20px rgba(99,102,241,0.3)" : "none",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Project Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6"
          >
            {filtered.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                dark={dark}
                onDetails={() => setSelected(project)}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <ProjectModal project={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </section>
  );
};

const ProjectCard = ({ project, dark, onDetails }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      variants={cardVariants}
      className="project-card-hover rounded-2xl overflow-hidden flex flex-col"
      style={{
        background: dark ? "rgba(255,255,255,0.04)" : "#fff",
        border: dark ? "1px solid rgba(255,255,255,0.07)" : "1px solid rgba(0,0,0,0.07)",
        boxShadow: hovered
          ? dark
            ? "0 20px 60px rgba(99,102,241,0.2)"
            : "0 20px 60px rgba(0,0,0,0.12)"
          : "none",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <motion.img
          src={project.img}
          alt={project.title}
          className="w-full h-full object-cover"
          animate={{ scale: hovered ? 1.08 : 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
        {/* Overlay */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center gap-3"
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{
            background: "rgba(13,13,26,0.85)",
            backdropFilter: "blur(4px)",
          }}
        >
          <div className="flex gap-3">
            {project.link && project.link !== "#" && (
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                data-cursor-hover
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-all"
                style={{
                  background: "rgba(99,102,241,0.9)",
                  color: "#fff",
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <RxExternalLink size={14} />
                Live
              </a>
            )}
            {project.git && project.git !== "#" && (
              <a
                href={project.git}
                target="_blank"
                rel="noreferrer"
                data-cursor-hover
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-all"
                style={{
                  background: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  color: "#fff",
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <AiOutlineGithub size={14} />
                Code
              </a>
            )}
          </div>
          <button
            onClick={onDetails}
            data-cursor-hover
            className="px-5 py-2 rounded-lg text-sm font-semibold transition-all"
            style={{
              background: "rgba(168,85,247,0.9)",
              color: "#fff",
            }}
          >
            View Details
          </button>
        </motion.div>

        {/* Category badge */}
        <div
          className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold"
          style={{
            background: "rgba(99,102,241,0.9)",
            color: "#fff",
            backdropFilter: "blur(4px)",
          }}
        >
          {project.category}
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex flex-col gap-3 flex-1">
        <h3
          className="font-bold text-lg"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            color: dark ? "#f1f5f9" : "#0f172a",
          }}
        >
          {project.title}
        </h3>
        <p
          className="text-sm leading-relaxed line-clamp-2"
          style={{ color: dark ? "#94a3b8" : "#64748b" }}
        >
          {project.shortDesc}
        </p>

        {/* Tech pills */}
        <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
          {project.tech?.slice(0, 4).map((t, i) => (
            <span
              key={i}
              className="text-xs px-2.5 py-1 rounded-full"
              style={{
                background: dark ? "rgba(99,102,241,0.1)" : "rgba(99,102,241,0.08)",
                color: "#6366f1",
                border: "1px solid rgba(99,102,241,0.2)",
              }}
            >
              {t}
            </span>
          ))}
          {project.tech?.length > 4 && (
            <span
              className="text-xs px-2.5 py-1 rounded-full"
              style={{
                background: dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)",
                color: dark ? "#64748b" : "#94a3b8",
              }}
            >
              +{project.tech.length - 4}
            </span>
          )}
        </div>

        {/* Bottom action row */}
        <div
          className="flex items-center justify-between pt-3"
          style={{
            borderTop: dark ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(0,0,0,0.06)",
          }}
        >
          <div className="flex gap-2">
            {project.link && project.link !== "#" && (
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                data-cursor-hover
                className="p-1.5 rounded-lg transition-colors"
                style={{
                  color: dark ? "#64748b" : "#94a3b8",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#6366f1")}
                onMouseLeave={(e) => (e.currentTarget.style.color = dark ? "#64748b" : "#94a3b8")}
              >
                <RxExternalLink size={16} />
              </a>
            )}
            {project.git && project.git !== "#" && (
              <a
                href={project.git}
                target="_blank"
                rel="noreferrer"
                data-cursor-hover
                className="p-1.5 rounded-lg transition-colors"
                style={{ color: dark ? "#64748b" : "#94a3b8" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#6366f1")}
                onMouseLeave={(e) => (e.currentTarget.style.color = dark ? "#64748b" : "#94a3b8")}
              >
                <AiOutlineGithub size={16} />
              </a>
            )}
          </div>
          <button
            onClick={onDetails}
            data-cursor-hover
            className="text-xs font-semibold px-3 py-1.5 rounded-lg transition-all"
            style={{
              background: "rgba(99,102,241,0.1)",
              color: "#6366f1",
              border: "1px solid rgba(99,102,241,0.2)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(99,102,241,0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(99,102,241,0.1)";
            }}
          >
            Details →
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Project;
