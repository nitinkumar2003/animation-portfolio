import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FiChevronLeft, FiChevronRight, FiArrowRight } from "react-icons/fi";
import { personalDataObj } from "../../data/data";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import SectionHeading from "../ui/SectionHeading";
import { useTheme } from "../../pages/Home";

const CARDS_PER_PAGE = 3;

const filterCategories = ["All", "Frontend", "Full Stack", "AI / SaaS", "Dashboard"];

const slideVariants = {
  enter: (dir) => ({
    opacity: 0,
    x: dir > 0 ? 80 : -80,
  }),
  center: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
  exit: (dir) => ({
    opacity: 0,
    x: dir > 0 ? -80 : 80,
    transition: { duration: 0.3 },
  }),
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const Project = () => {
  const { dark } = useTheme();
  const navigate = useNavigate();
  const [filter, setFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(1);
  const [selected, setSelected] = useState(null);

  const filtered =
    filter === "All"
      ? personalDataObj.projects
      : personalDataObj.projects.filter((p) => p.category === filter);

  const totalPages = Math.ceil(filtered.length / CARDS_PER_PAGE);
  const visible = filtered.slice(
    currentPage * CARDS_PER_PAGE,
    (currentPage + 1) * CARDS_PER_PAGE
  );

  useEffect(() => {
    setCurrentPage(0);
    setDirection(1);
  }, [filter]);

  const goPrev = () => {
    if (currentPage > 0) {
      setDirection(-1);
      setCurrentPage((p) => p - 1);
    }
  };

  const goNext = () => {
    if (currentPage < totalPages - 1) {
      setDirection(1);
      setCurrentPage((p) => p + 1);
    }
  };

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
          subtitle="A collection of projects showcasing my skills across frontend, full stack, and AI development."
          dark={dark}
        />

        {/* Filter tabs */}
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
                boxShadow:
                  filter === cat ? "0 4px 20px rgba(99,102,241,0.3)" : "none",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Carousel */}
        <div
          className="relative overflow-hidden"
          style={{ minHeight: 420 }}
        >
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={`${filter}-${currentPage}`}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="grid grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6"
            >
              {visible.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onDetails={() => setSelected(project)}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation row */}
        <div className="flex items-center justify-between mt-10 sm:flex-col sm:gap-6">
          {/* Prev / Dots / Next */}
          <div className="flex items-center gap-4">
            {/* Prev button */}
            <button
              onClick={goPrev}
              disabled={currentPage === 0}
              data-cursor-hover
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
              style={{
                background: dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",
                border: dark
                  ? "1px solid rgba(255,255,255,0.1)"
                  : "1px solid rgba(0,0,0,0.1)",
                color: dark ? "#e2e8f0" : "#0f172a",
              }}
              onMouseEnter={(e) => {
                if (currentPage !== 0) {
                  e.currentTarget.style.background = "rgba(99,102,241,0.15)";
                  e.currentTarget.style.borderColor = "#6366f1";
                  e.currentTarget.style.color = "#6366f1";
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = dark
                  ? "rgba(255,255,255,0.06)"
                  : "rgba(0,0,0,0.06)";
                e.currentTarget.style.borderColor = dark
                  ? "rgba(255,255,255,0.1)"
                  : "rgba(0,0,0,0.1)";
                e.currentTarget.style.color = dark ? "#e2e8f0" : "#0f172a";
              }}
            >
              <FiChevronLeft size={18} />
            </button>

            {/* Dot indicators */}
            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > currentPage ? 1 : -1);
                    setCurrentPage(i);
                  }}
                  data-cursor-hover
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: i === currentPage ? 28 : 8,
                    height: 8,
                    background:
                      i === currentPage
                        ? "linear-gradient(90deg, #6366f1, #a855f7)"
                        : dark
                        ? "rgba(255,255,255,0.18)"
                        : "rgba(0,0,0,0.15)",
                  }}
                />
              ))}
            </div>

            {/* Next button */}
            <button
              onClick={goNext}
              disabled={currentPage === totalPages - 1}
              data-cursor-hover
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
              style={{
                background: dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",
                border: dark
                  ? "1px solid rgba(255,255,255,0.1)"
                  : "1px solid rgba(0,0,0,0.1)",
                color: dark ? "#e2e8f0" : "#0f172a",
              }}
              onMouseEnter={(e) => {
                if (currentPage !== totalPages - 1) {
                  e.currentTarget.style.background = "rgba(99,102,241,0.15)";
                  e.currentTarget.style.borderColor = "#6366f1";
                  e.currentTarget.style.color = "#6366f1";
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = dark
                  ? "rgba(255,255,255,0.06)"
                  : "rgba(0,0,0,0.06)";
                e.currentTarget.style.borderColor = dark
                  ? "rgba(255,255,255,0.1)"
                  : "rgba(0,0,0,0.1)";
                e.currentTarget.style.color = dark ? "#e2e8f0" : "#0f172a";
              }}
            >
              <FiChevronRight size={18} />
            </button>

            {/* Page counter */}
            <span
              className="text-sm font-medium tabular-nums"
              style={{ color: dark ? "#64748b" : "#94a3b8" }}
            >
              {currentPage + 1} / {totalPages}
            </span>
          </div>

          {/* View All Projects button */}
          <motion.button
            onClick={() => navigate("/projects")}
            data-cursor-hover
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="btn-primary flex items-center gap-2 px-7 py-3 rounded-xl font-semibold text-sm"
          >
            <span>View All Projects</span>
            <FiArrowRight size={16} />
          </motion.button>
        </div>
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

export default Project;
