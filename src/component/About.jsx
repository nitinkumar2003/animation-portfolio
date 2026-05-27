import React from "react";
import { motion } from "framer-motion";
import { FaCode, FaServer, FaRobot, FaMobile } from "react-icons/fa";
import { personalDataObj } from "../data/data";
import SectionHeading from "./ui/SectionHeading";
import { useTheme } from "../pages/Home";

const cards = [
  {
    icon: FaCode,
    title: "Frontend",
    desc: "Pixel-perfect UIs with React, Next.js & Tailwind",
    color: "#6366f1",
  },
  {
    icon: FaServer,
    title: "Backend",
    desc: "Scalable APIs with Node.js, Express & NestJS",
    color: "#a855f7",
  },
  {
    icon: FaRobot,
    title: "AI Integration",
    desc: "Building intelligent apps with OpenAI & Gemini",
    color: "#06b6d4",
  },
  {
    icon: FaMobile,
    title: "Mobile",
    desc: "Cross-platform apps with React Native",
    color: "#f59e0b",
  },
];

const About = () => {
  const { dark } = useTheme();

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="container mx-auto">
        <SectionHeading
          tag="About Me"
          title="Who Am I?"
          subtitle="A passionate Full Stack Developer crafting digital experiences that matter."
          dark={dark}
        />

        <div className="flex gap-16 md:flex-col md:gap-10">

          {/* Left — Specialty Cards */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="flex-1 grid grid-cols-2 gap-4 content-start"
          >
            {cards.map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -6, scale: 1.03 }}
                className="rounded-2xl p-5 flex flex-col gap-3 cursor-default"
                style={{
                  background: dark ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.85)",
                  border: dark ? "1px solid rgba(255,255,255,0.07)" : "1px solid rgba(0,0,0,0.07)",
                  boxShadow: dark ? "none" : "0 2px 16px rgba(0,0,0,0.06)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = `${card.color}40`;
                  e.currentTarget.style.boxShadow = `0 8px 32px ${card.color}18`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = dark
                    ? "rgba(255,255,255,0.07)"
                    : "rgba(0,0,0,0.07)";
                  e.currentTarget.style.boxShadow = dark
                    ? "none"
                    : "0 2px 16px rgba(0,0,0,0.06)";
                }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center"
                  style={{
                    background: `${card.color}18`,
                    color: card.color,
                    border: `1px solid ${card.color}30`,
                  }}
                >
                  <card.icon size={20} />
                </div>
                <p
                  className="font-semibold"
                  style={{ color: dark ? "#f1f5f9" : "#0f172a" }}
                >
                  {card.title}
                </p>
                <p className="text-sm leading-relaxed" style={{ color: dark ? "#94a3b8" : "#64748b" }}>
                  {card.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Right — Text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
            className="flex-1 flex flex-col gap-6 justify-center"
          >
            <div className="flex flex-col gap-3">
              <h3
                className="text-3xl font-bold sm:text-2xl"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  color: dark ? "#f1f5f9" : "#0f172a",
                }}
              >
                Full Stack Developer &{" "}
                <span className="gradient-text">Problem Solver</span>
              </h3>
              <p className="text-base leading-relaxed" style={{ color: dark ? "#94a3b8" : "#64748b" }}>
                {personalDataObj.about}
              </p>
              <p className="text-base leading-relaxed" style={{ color: dark ? "#94a3b8" : "#64748b" }}>
                Over 4+ years I've worked with startups and agencies, building everything from healthcare platforms and AI SaaS applications to real estate platforms and live streaming solutions. I thrive on complex challenges and clean, efficient code.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-1">
              {[
                { label: "Name",       value: personalDataObj.name },
                { label: "Email",      value: personalDataObj.email },
                { label: "Location",   value: personalDataObj.location },
                { label: "Experience", value: "4+ Years" },
                { label: "Status",     value: "Available for Work" },
                { label: "Speciality", value: "Full Stack / AI" },
              ].map((item, i) => (
                <div key={i} className="flex gap-3">
                  <span className="text-sm font-medium" style={{ color: "#6366f1", minWidth: 80 }}>
                    {item.label}:
                  </span>
                  <span className="text-sm" style={{ color: dark ? "#e2e8f0" : "#334155" }}>
                    {item.value}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex gap-4 flex-wrap">
              <a
                href="mailto:nitinkumarja2003@gmail.com"
                data-cursor-hover
                className="btn-primary flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm"
              >
                <span>Let's Talk</span>
              </a>
              <a
                href={personalDataObj.github}
                target="_blank"
                rel="noreferrer"
                data-cursor-hover
                className="btn-outline flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm"
              >
                <span>View GitHub</span>
              </a>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default About;
