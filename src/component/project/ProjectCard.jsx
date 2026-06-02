import React, { useState } from "react";
import { motion } from "framer-motion";
import { RxExternalLink } from "react-icons/rx";
import { AiOutlineGithub } from "react-icons/ai";
import { useTheme } from "../../context/ThemeContext";

/* ─── constants ────────────────────────────────────────────── */
const IMG_H = 208; // px — every card image uses this exact height

const ProjectCard = ({ project, onDetails }) => {
  const { dark } = useTheme();
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="project-card-hover rounded-2xl overflow-hidden flex flex-col w-full"
      /* h-full lets the parent (carousel slot or grid cell) control total height */
      style={{
        height: "100%",
        background: dark ? "rgba(255,255,255,0.04)" : "#fff",
        border: dark
          ? "1px solid rgba(255,255,255,0.07)"
          : "1px solid rgba(0,0,0,0.07)",
        boxShadow: hovered
          ? dark
            ? "0 20px 60px rgba(99,102,241,0.22)"
            : "0 20px 60px rgba(0,0,0,0.12)"
          : "none",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* ── IMAGE — fixed height, never shrinks ── */}
      <div
        className="relative overflow-hidden flex-shrink-0"
        style={{ height: IMG_H }}
      >
        <motion.img
          src={project.img}
          alt={project.title}
          className="w-full h-full object-cover"
          animate={{ scale: hovered ? 1.08 : 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />

        {/* hover overlay */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center gap-3"
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.25 }}
          style={{
            background: "rgba(13,13,26,0.85)",
            backdropFilter: "blur(4px)",
          }}
        >
          <div className="flex gap-2">
            {project.link && project.link !== "#" && (
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                data-cursor-hover
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold"
                style={{ background: "rgba(99,102,241,0.9)", color: "#fff" }}
              >
                <RxExternalLink size={13} /> Live
              </a>
            )}
            {project.git && project.git !== "#" && (
              <a
                href={project.git}
                target="_blank"
                rel="noreferrer"
                data-cursor-hover
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold"
                style={{
                  background: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  color: "#fff",
                }}
              >
                <AiOutlineGithub size={13} /> Code
              </a>
            )}
          </div>
          <button
            onClick={onDetails}
            data-cursor-hover
            className="px-5 py-2 rounded-lg text-sm font-semibold"
            style={{ background: "rgba(168,85,247,0.9)", color: "#fff" }}
          >
            View Details
          </button>
        </motion.div>

        {/* category badge */}
        <span
          className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold"
          style={{
            background: "rgba(99,102,241,0.9)",
            color: "#fff",
            backdropFilter: "blur(4px)",
          }}
        >
          {project.category}
        </span>
      </div>

      {/* ── BODY — grows to fill remaining card height ── */}
      <div className="flex flex-col flex-1 p-5" style={{ gap: 12 }}>
        {/* title — 1 line max */}
        <h3
          className="font-bold leading-snug"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "1rem",
            color: dark ? "#f1f5f9" : "#0f172a",
            display: "-webkit-box",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {project.title}
        </h3>

        {/* description — 2 lines, fills remaining space */}
        <p
          className="text-sm leading-relaxed flex-1"
          style={{
            color: dark ? "#94a3b8" : "#64748b",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {project.shortDesc}
        </p>

        {/* tech pills — single row, overflow hidden */}
        <div
          className="flex gap-1.5"
          style={{ overflow: "hidden", flexWrap: "nowrap" }}
        >
          {project.tech?.slice(0, 3).map((t, i) => (
            <span
              key={i}
              className="text-xs px-2.5 py-1 rounded-full flex-shrink-0"
              style={{
                background: dark
                  ? "rgba(99,102,241,0.1)"
                  : "rgba(99,102,241,0.08)",
                color: "#6366f1",
                border: "1px solid rgba(99,102,241,0.2)",
              }}
            >
              {t}
            </span>
          ))}
          {project.tech?.length > 3 && (
            <span
              className="text-xs px-2.5 py-1 rounded-full flex-shrink-0"
              style={{
                background: dark
                  ? "rgba(255,255,255,0.05)"
                  : "rgba(0,0,0,0.04)",
                color: dark ? "#64748b" : "#94a3b8",
              }}
            >
              +{project.tech.length - 3}
            </span>
          )}
        </div>

        {/* bottom row — always at the bottom */}
        <div
          className="flex items-center justify-between pt-3"
          style={{
            borderTop: dark
              ? "1px solid rgba(255,255,255,0.06)"
              : "1px solid rgba(0,0,0,0.06)",
          }}
        >
          <div className="flex gap-1">
            {project.link && project.link !== "#" && (
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                data-cursor-hover
                className="p-1.5 rounded-lg transition-colors"
                style={{ color: dark ? "#64748b" : "#94a3b8" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#6366f1")}
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = dark ? "#64748b" : "#94a3b8")
                }
              >
                <RxExternalLink size={15} />
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
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = dark ? "#64748b" : "#94a3b8")
                }
              >
                <AiOutlineGithub size={15} />
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
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "rgba(99,102,241,0.22)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "rgba(99,102,241,0.1)")
            }
          >
            Details →
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
