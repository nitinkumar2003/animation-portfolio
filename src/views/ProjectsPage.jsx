"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch, FiX, FiArrowRight } from "react-icons/fi";
import { personalDataObj } from "../data/data";
import NavBar from "../component/navbar/NavBar";
import ProjectCard from "../component/project/ProjectCard";
import ProjectModal from "../component/project/ProjectModal";
import ScrollProgress from "../component/ui/ScrollProgress";
import CursorEffect from "../component/ui/CursorEffect";
import { useTheme } from "../context/ThemeContext";

const FILTER_CATS = ["All", "Frontend", "Full Stack", "AI / SaaS", "Dashboard"];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const cardVariants = {
  hidden:   { opacity: 0, y: 24, scale: 0.97 },
  visible:  { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: "easeOut" } },
};

const ProjectsPage = () => {
  const { dark } = useTheme();
  const [filter, setFilter] = useState("All");
  const [search, setSearch]  = useState("");
  const [selected, setSelected] = useState(null);

  const projects = personalDataObj.projects;

  const filtered = useMemo(() => {
    let list =
      filter === "All"
        ? projects
        : projects.filter((p) => p.category === filter);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.shortDesc.toLowerCase().includes(q) ||
          p.tech?.some((t) => t.toLowerCase().includes(q))
      );
    }
    return list;
  }, [filter, search, projects]);

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: dark ? "#0d0d1a" : "#f8fafc",
        color: dark ? "#e2e8f0" : "#0f172a",
      }}
    >
      <CursorEffect />
      <ScrollProgress />

      {/* ── Same NavBar as home ── */}
      <NavBar />

      {/* ── Page content — offset by navbar height ── */}
      <div className="container mx-auto" style={{ paddingTop: "7rem", paddingBottom: "4rem" }}>

        {/* Page heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center gap-4 mb-12"
        >
          <span
            className="text-xs font-semibold tracking-[0.2em] uppercase px-4 py-1.5 rounded-full"
            style={{
              background: "rgba(99,102,241,0.1)",
              color: "#6366f1",
              border: "1px solid rgba(99,102,241,0.2)",
            }}
          >
            Portfolio
          </span>
          <h1
            className="text-5xl sm:text-3xl font-bold"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              color: dark ? "#f1f5f9" : "#0f172a",
            }}
          >
            All <span className="gradient-text">Projects</span>
          </h1>
          <div className="section-line" />
          <p
            className="max-w-xl text-base"
            style={{ color: dark ? "#94a3b8" : "#64748b" }}
          >
            Every project I've built — from personal experiments to enterprise client
            work across frontend, full stack, and AI integrations.
          </p>
        </motion.div>

        {/* ── Search + Filters ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col gap-5 mb-8"
        >
          {/* Search bar */}
          <div className="relative max-w-md mx-auto w-full">
            <FiSearch
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2"
              style={{ color: dark ? "#64748b" : "#94a3b8" }}
            />
            <input
              type="text"
              placeholder="Search by name, tech, or description…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="premium-input w-full pl-10 pr-10 py-3 rounded-xl text-sm"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                data-cursor-hover
                className="absolute right-3 top-1/2 -translate-y-1/2"
                style={{ color: dark ? "#64748b" : "#94a3b8" }}
              >
                <FiX size={16} />
              </button>
            )}
          </div>

          {/* Filter tabs */}
          <div className="flex justify-center gap-2 flex-wrap">
            {FILTER_CATS.map((cat) => (
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
                  boxShadow:
                    filter === cat ? "0 4px 20px rgba(99,102,241,0.3)" : "none",
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Result count */}
        <p className="text-sm mb-6" style={{ color: dark ? "#64748b" : "#94a3b8" }}>
          Showing{" "}
          <span style={{ color: "#6366f1", fontWeight: 600 }}>{filtered.length}</span>
          {" "}project{filtered.length !== 1 ? "s" : ""}
          {search && (
            <>
              {" "}for{" "}
              <span style={{ color: "#a855f7", fontWeight: 600 }}>"{search}"</span>
            </>
          )}
        </p>

        {/* ── Grid ── */}
        <AnimatePresence mode="wait">
          {filtered.length > 0 ? (
            <motion.div
              key={`${filter}-${search}`}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0 }}
              className="grid grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6"
              style={{ gridAutoRows: "420px" }}
            >
              {filtered.map((project) => (
                <motion.div
                  key={project.id}
                  variants={cardVariants}
                  style={{ height: "420px" }}
                >
                  <ProjectCard
                    project={project}
                    onDetails={() => setSelected(project)}
                  />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-4 py-24 text-center"
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-3xl"
                style={{
                  background: dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
                }}
              >
                🔍
              </div>
              <p
                className="font-semibold text-lg"
                style={{ color: dark ? "#f1f5f9" : "#0f172a" }}
              >
                No projects found
              </p>
              <p className="text-sm" style={{ color: dark ? "#64748b" : "#94a3b8" }}>
                Try a different search term or filter.
              </p>
              <button
                onClick={() => { setSearch(""); setFilter("All"); }}
                data-cursor-hover
                className="btn-outline px-5 py-2 rounded-xl text-sm font-semibold mt-2"
              >
                Clear filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Bottom CTA ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col items-center gap-4 mt-20 text-center"
        >
          <p className="text-sm" style={{ color: dark ? "#64748b" : "#94a3b8" }}>
            Interested in working together?
          </p>
          <a
            href="mailto:nitinkumarja2003@gmail.com"
            data-cursor-hover
            className="btn-primary flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-sm"
          >
            <span>Let's Build Something</span>
            <FiArrowRight size={15} />
          </a>
        </motion.div>
      </div>

      {/* ── Modal ── */}
      <AnimatePresence>
        {selected && (
          <ProjectModal project={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectsPage;
