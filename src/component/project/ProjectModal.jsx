import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RxCross2 } from "react-icons/rx";
import { RxExternalLink } from "react-icons/rx";
import { AiOutlineGithub } from "react-icons/ai";
import { useTheme } from "../../context/ThemeContext";

const Pill = ({ children, color = "#6366f1" }) => (
  <span
    className="text-xs px-3 py-1 rounded-full font-medium"
    style={{
      background: `${color}18`,
      color: color,
      border: `1px solid ${color}30`,
    }}
  >
    {children}
  </span>
);

const InfoRow = ({ label, value, dark }) => (
  <div className="flex gap-3 items-start">
    <span
      className="text-xs font-semibold uppercase tracking-wider pt-0.5"
      style={{ color: "#6366f1", minWidth: 100 }}
    >
      {label}
    </span>
    <span className="text-sm" style={{ color: dark ? "#cbd5e1" : "#475569" }}>
      {value || "—"}
    </span>
  </div>
);

const ProjectModal = ({ project, onClose }) => {
  const { dark } = useTheme();

  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ background: "rgba(0,0,0,0.8)", backdropFilter: "blur(12px)" }}
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl"
          style={{
            background: dark ? "#0d0d1a" : "#fff",
            border: dark
              ? "1px solid rgba(255,255,255,0.08)"
              : "1px solid rgba(0,0,0,0.1)",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Gradient top strip */}
          <div
            className="h-1 w-full rounded-t-2xl"
            style={{ background: "linear-gradient(90deg, #6366f1, #a855f7, #06b6d4)" }}
          />

          {/* Header */}
          <div className="p-6 pb-0 flex items-start justify-between gap-4">
            <div className="flex flex-col gap-2">
              <h2
                className="text-2xl font-bold sm:text-xl"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  color: dark ? "#f1f5f9" : "#0f172a",
                }}
              >
                {project.title}
              </h2>
              <div className="flex gap-2 flex-wrap">
                <Pill color="#6366f1">{project.category}</Pill>
                {project.type && <Pill color="#a855f7">{project.type}</Pill>}
              </div>
            </div>
            <button
              onClick={onClose}
              data-cursor-hover
              className="p-2 rounded-full flex-shrink-0 transition-colors"
              style={{
                background: dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",
                color: dark ? "#94a3b8" : "#64748b",
              }}
            >
              <RxCross2 size={18} />
            </button>
          </div>

          {/* Image */}
          <div className="px-6 pt-5">
            <div className="w-full h-52 rounded-xl overflow-hidden">
              <img
                src={project.img}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Body */}
          <div className="p-6 flex flex-col gap-6">
            {/* Description */}
            <div className="flex flex-col gap-2">
              <h3
                className="text-sm font-semibold uppercase tracking-wider"
                style={{ color: "#6366f1" }}
              >
                Overview
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: dark ? "#94a3b8" : "#64748b" }}
              >
                {project.desc}
              </p>
            </div>

            {/* Project Info */}
            <div
              className="rounded-xl p-4 flex flex-col gap-3"
              style={{
                background: dark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)",
                border: dark ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(0,0,0,0.06)",
              }}
            >
              <h3
                className="text-sm font-semibold uppercase tracking-wider mb-1"
                style={{ color: "#6366f1" }}
              >
                Project Information
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-1 gap-2">
                <InfoRow label="Type" value={project.type} dark={dark} />
                <InfoRow label="Company" value={project.company} dark={dark} />
                <InfoRow label="Role" value={project.role} dark={dark} />
                <InfoRow label="Duration" value={project.duration} dark={dark} />
                <InfoRow label="Team Size" value={project.teamSize ? `${project.teamSize} members` : undefined} dark={dark} />
                <InfoRow label="Contribution" value={project.contribution ? `${project.contribution}%` : undefined} dark={dark} />
              </div>
            </div>

            {/* Tech Stack */}
            {project.tech?.length > 0 && (
              <div className="flex flex-col gap-3">
                <h3
                  className="text-sm font-semibold uppercase tracking-wider"
                  style={{ color: "#6366f1" }}
                >
                  Tech Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t, i) => (
                    <Pill key={i} color="#6366f1">{t}</Pill>
                  ))}
                </div>
              </div>
            )}

            {/* Features */}
            {project.features?.length > 0 && (
              <div className="flex flex-col gap-3">
                <h3
                  className="text-sm font-semibold uppercase tracking-wider"
                  style={{ color: "#a855f7" }}
                >
                  Key Features
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-1 gap-2">
                  {project.features.map((f, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ background: "#a855f7" }}
                      />
                      <span
                        className="text-sm"
                        style={{ color: dark ? "#cbd5e1" : "#475569" }}
                      >
                        {f}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Additional Details */}
            {(project.payment || project.ai?.length > 0 || project.database) && (
              <div
                className="rounded-xl p-4 flex flex-col gap-2"
                style={{
                  background: dark ? "rgba(99,102,241,0.06)" : "rgba(99,102,241,0.04)",
                  border: "1px solid rgba(99,102,241,0.15)",
                }}
              >
                <h3
                  className="text-sm font-semibold uppercase tracking-wider mb-1"
                  style={{ color: "#6366f1" }}
                >
                  Integrations
                </h3>
                {project.payment && <InfoRow label="Payment" value={project.payment} dark={dark} />}
                {project.ai?.length > 0 && <InfoRow label="AI Models" value={project.ai.join(", ")} dark={dark} />}
                {project.database && <InfoRow label="Database" value={project.database} dark={dark} />}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2 flex-wrap">
              {project.link && project.link !== "#" && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor-hover
                  className="btn-primary flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold flex-1"
                >
                  <span>Live Demo</span>
                  <RxExternalLink size={15} />
                </a>
              )}
              {project.git && project.git !== "#" && (
                <a
                  href={project.git}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor-hover
                  className="btn-outline flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold flex-1"
                >
                  <AiOutlineGithub size={16} />
                  <span>GitHub</span>
                </a>
              )}
              <a
                href="mailto:nitinkumarja2003@gmail.com"
                data-cursor-hover
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold flex-1 justify-center transition-all"
                style={{
                  background: dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)",
                  border: dark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.08)",
                  color: dark ? "#94a3b8" : "#64748b",
                }}
              >
                <span>Contact About Project</span>
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProjectModal;
