import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FiChevronLeft, FiChevronRight, FiArrowRight } from "react-icons/fi";
import { personalDataObj } from "../../data/data";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import SectionHeading from "../ui/SectionHeading";
import { useTheme } from "../../context/ThemeContext";

/* ─────────────────────────────────────────────────────────── */

const FILTER_CATS = ["All", "Frontend", "Full Stack", "AI / SaaS", "Dashboard"];
const GAP = 24; // px — gap-6 equivalent

/* Breakpoints for cards-per-view */
const getCardsPerView = (w) => {
  if (w < 640) return 1;
  if (w < 1024) return 2;
  return 3;
};

/* ─── NavArrow button ────────────────────────────────────── */
const NavArrow = ({ onClick, disabled, dark, children }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    data-cursor-hover
    className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200"
    style={{
      background: disabled
        ? dark
          ? "rgba(255,255,255,0.03)"
          : "rgba(0,0,0,0.03)"
        : dark
        ? "rgba(255,255,255,0.06)"
        : "rgba(0,0,0,0.06)",
      border: dark ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,0,0,0.1)",
      color: disabled
        ? dark
          ? "rgba(255,255,255,0.2)"
          : "rgba(0,0,0,0.2)"
        : dark
        ? "#e2e8f0"
        : "#0f172a",
      cursor: disabled ? "not-allowed" : "pointer",
    }}
    onMouseEnter={(e) => {
      if (!disabled) {
        e.currentTarget.style.background = "rgba(99,102,241,0.18)";
        e.currentTarget.style.borderColor = "#6366f1";
        e.currentTarget.style.color = "#6366f1";
      }
    }}
    onMouseLeave={(e) => {
      if (!disabled) {
        e.currentTarget.style.background = dark
          ? "rgba(255,255,255,0.06)"
          : "rgba(0,0,0,0.06)";
        e.currentTarget.style.borderColor = dark
          ? "rgba(255,255,255,0.1)"
          : "rgba(0,0,0,0.1)";
        e.currentTarget.style.color = dark ? "#e2e8f0" : "#0f172a";
      }
    }}
  >
    {children}
  </button>
);

/* ─── Project component ──────────────────────────────────── */
const Project = () => {
  const { dark } = useTheme();
  const navigate = useNavigate();

  const [filter, setFilter]         = useState("All");
  const [startIdx, setStartIdx]     = useState(0);
  const [selected, setSelected]     = useState(null);
  const [cardsPerView, setCardsPerView] = useState(3);
  const [trackW, setTrackW]         = useState(0);
  const [ready, setReady]           = useState(false);

  const wrapperRef = useRef(null);

  /* responsive cardsPerView */
  useEffect(() => {
    const update = () => setCardsPerView(getCardsPerView(window.innerWidth));
    update();
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, []);

  /* measure track width via ResizeObserver */
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      setTrackW(entry.contentRect.width);
      setReady(true);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  /* filtered list */
  const filtered =
    filter === "All"
      ? personalDataObj.projects
      : personalDataObj.projects.filter((p) => p.category === filter);

  const total  = filtered.length;
  const maxIdx = Math.max(0, total - cardsPerView);

  /* reset on filter / cardsPerView change */
  useEffect(() => {
    setStartIdx(0);
  }, [filter, cardsPerView]);

  /* clamp if maxIdx shrinks */
  useEffect(() => {
    setStartIdx((i) => Math.min(i, maxIdx));
  }, [maxIdx]);

  /* pixel-perfect card width & translation */
  const cardW = trackW > 0
    ? (trackW - GAP * (cardsPerView - 1)) / cardsPerView
    : 0;
  const translateX = -(startIdx * (cardW + GAP));

  /* nav handlers */
  const goPrev = useCallback(() => {
    setStartIdx((i) => Math.max(0, i - 1));
  }, []);

  const goNext = useCallback(() => {
    setStartIdx((i) => Math.min(maxIdx, i + 1));
  }, [maxIdx]);

  /* dot page groups */
  const totalGroups  = Math.ceil(total / cardsPerView);
  const activeDot    = Math.floor(startIdx / cardsPerView);
  const showDots     = totalGroups <= 6; // show dots only if ≤6 groups

  /* progress bar percentage */
  const progressPct  = maxIdx > 0 ? (startIdx / maxIdx) * 100 : 100;

  /* range label  "1 – 3 of 15" */
  const rangeStart = startIdx + 1;
  const rangeEnd   = Math.min(startIdx + cardsPerView, total);

  return (
    <section id="works" className="py-24 relative overflow-hidden">
      {/* bg orb */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 80% 50%, #a855f7 0%, transparent 60%)",
        }}
      />

      <div className="container mx-auto relative z-10">
        <SectionHeading
          tag="My Work"
          title="Featured Projects"
          subtitle="A curated look at projects spanning frontend, full stack, and AI — use the arrows to explore."
          dark={dark}
        />

        {/* ── Filter tabs ── */}
        <div className="flex justify-center gap-2 mb-10 flex-wrap">
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

        {/* ── Carousel ── */}
        <div
          ref={wrapperRef}
          className="overflow-hidden"
          style={{
            /* fade in only after we've measured the width */
            opacity: ready ? 1 : 0,
            transition: "opacity 0.2s ease",
          }}
        >
          <motion.div
            className="flex"
            style={{ gap: GAP }}
            animate={{ x: translateX }}
            transition={{ type: "spring", stiffness: 300, damping: 36, mass: 1 }}
          >
            {filtered.map((project) => (
              /* Each slot: fixed pixel width, fixed total height */
              <div
                key={project.id}
                style={{
                  width: cardW,
                  flexShrink: 0,
                  /* 208 image + 5*12 gap + title+desc+pills+bottomRow ≈ 420 total */
                  height: 420,
                }}
              >
                <ProjectCard
                  project={project}
                  onDetails={() => setSelected(project)}
                />
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── Navigation row ── */}
        <div className="flex items-center justify-between mt-8 sm:flex-col sm:gap-5 sm:items-stretch">

          {/* Left cluster: prev + indicator + next + range */}
          <div className="flex items-center gap-3 sm:justify-center">

            {/* Prev */}
            <NavArrow onClick={goPrev} disabled={startIdx === 0} dark={dark}>
              <FiChevronLeft size={17} />
            </NavArrow>

            {/* Dots or progress bar */}
            {showDots ? (
              <div className="flex items-center gap-2">
                {Array.from({ length: totalGroups }).map((_, gi) => (
                  <button
                    key={gi}
                    data-cursor-hover
                    onClick={() =>
                      setStartIdx(Math.min(gi * cardsPerView, maxIdx))
                    }
                    className="rounded-full transition-all duration-300"
                    style={{
                      width: gi === activeDot ? 28 : 8,
                      height: 8,
                      background:
                        gi === activeDot
                          ? "linear-gradient(90deg, #6366f1, #a855f7)"
                          : dark
                          ? "rgba(255,255,255,0.18)"
                          : "rgba(0,0,0,0.14)",
                    }}
                  />
                ))}
              </div>
            ) : (
              /* Progress bar (when too many groups for dots) */
              <div
                className="rounded-full overflow-hidden"
                style={{
                  width: 120,
                  height: 6,
                  background: dark
                    ? "rgba(255,255,255,0.08)"
                    : "rgba(0,0,0,0.08)",
                }}
              >
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background:
                      "linear-gradient(90deg, #6366f1, #a855f7)",
                  }}
                  animate={{ width: `${progressPct}%` }}
                  transition={{ type: "spring", stiffness: 300, damping: 36 }}
                />
              </div>
            )}

            {/* Next */}
            <NavArrow onClick={goNext} disabled={startIdx === maxIdx} dark={dark}>
              <FiChevronRight size={17} />
            </NavArrow>

            {/* Range counter */}
            <span
              className="text-sm tabular-nums"
              style={{ color: dark ? "#64748b" : "#94a3b8", fontVariantNumeric: "tabular-nums" }}
            >
              {rangeStart}–{rangeEnd}{" "}
              <span style={{ color: dark ? "#475569" : "#cbd5e1" }}>/ {total}</span>
            </span>
          </div>

          {/* View All Projects */}
          <motion.button
            onClick={() => navigate("/projects")}
            data-cursor-hover
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="btn-primary flex items-center justify-center gap-2 px-7 py-3 rounded-xl font-semibold text-sm sm:w-full"
          >
            <span>View All Projects</span>
            <FiArrowRight size={15} />
          </motion.button>
        </div>
      </div>

      {/* ── Modal ── */}
      <AnimatePresence>
        {selected && (
          <ProjectModal project={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Project;
