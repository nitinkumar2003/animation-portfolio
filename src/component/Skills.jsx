import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  IoLogoHtml5, IoLogoCss3, IoLogoJavascript, IoLogoGithub, IoLogoNodejs,
} from "react-icons/io";
import {
  SiTypescript, SiTailwindcss, SiMongodb, SiFirebase, SiEslint, SiExpress,
  SiBootstrap, SiNextdotjs, SiReact, SiAntdesign, SiNestjs, SiRedux,
  SiMysql, SiSupabase, SiRedis, SiStripe, SiOpenai, SiFramer,
  SiZod, SiSocketdotio, SiReactquery, SiRazorpay, SiPaypal, SiReacthookform,
} from "react-icons/si";
import {
  FaMobileAlt, FaRobot, FaBrain, FaCheckCircle, FaSearch, FaNodeJs,
} from "react-icons/fa";
import SectionHeading from "./ui/SectionHeading";
import { useTheme } from "../context/ThemeContext";

/* ─────────────────────────────────────────────────────────── */

const categories = [
  {
    id: "frontend",
    label: "Frontend",
    emoji: "🎨",
    color: "#6366f1",
    skills: [
      { name: "React.js",       icon: SiReact,          color: "#61dafb", level: 95 },
      { name: "Next.js",        icon: SiNextdotjs,       color: "#e2e8f0", level: 92 },
      { name: "TypeScript",     icon: SiTypescript,      color: "#3178c6", level: 88 },
      { name: "JavaScript",     icon: IoLogoJavascript,  color: "#f7df1e", level: 93 },
      { name: "TailwindCSS",    icon: SiTailwindcss,     color: "#38bdf8", level: 90 },
      { name: "HTML5",          icon: IoLogoHtml5,       color: "#e34f26", level: 97 },
      { name: "CSS3",           icon: IoLogoCss3,        color: "#1572b6", level: 92 },
      { name: "Bootstrap",      icon: SiBootstrap,       color: "#7952b3", level: 85 },
      { name: "Ant Design",     icon: SiAntdesign,       color: "#0170fe", level: 82 },
      { name: "Framer Motion",  icon: SiFramer,          color: "#0055ff", level: 80 },
      { name: "React Native",   icon: FaMobileAlt,       color: "#61dafb", level: 72 },
    ],
  },
  {
    id: "state",
    label: "State & Forms",
    emoji: "🔄",
    color: "#8b5cf6",
    skills: [
      { name: "Redux Toolkit",   icon: SiRedux,          color: "#764abc", level: 90 },
      { name: "Redux",           icon: SiRedux,          color: "#7c5cbf", level: 88 },
      { name: "React Query",     icon: SiReactquery,     color: "#ff4154", level: 78 },
      { name: "React Hook Form", icon: SiReacthookform,  color: "#ec4899", level: 85 },
      { name: "Zod",             icon: SiZod,            color: "#3e67b1", level: 82 },
      { name: "Yup",             icon: FaCheckCircle,    color: "#10b981", level: 80 },
      { name: "Zustand",         icon: FaBrain,          color: "#f59e0b", level: 75 },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    emoji: "⚙️",
    color: "#06b6d4",
    skills: [
      { name: "Node.js",    icon: IoLogoNodejs,  color: "#339933", level: 82 },
      { name: "Express.js", icon: SiExpress,     color: "#e2e8f0", level: 80 },
      { name: "NestJS",     icon: SiNestjs,      color: "#e0234e", level: 72 },
      { name: "Socket.io",  icon: SiSocketdotio, color: "#e2e8f0", level: 75 },
      { name: "REST API",   icon: FaNodeJs,      color: "#339933", level: 90 },
      { name: "GitHub",     icon: IoLogoGithub,  color: "#e2e8f0", level: 88 },
      { name: "ESLint",     icon: SiEslint,      color: "#4b32c3", level: 85 },
    ],
  },
  {
    id: "database",
    label: "Database",
    emoji: "🗄️",
    color: "#10b981",
    skills: [
      { name: "MongoDB",  icon: SiMongodb,  color: "#47a248", level: 85 },
      { name: "SQL",      icon: SiMysql,    color: "#00758f", level: 78 },
      { name: "Firebase", icon: SiFirebase, color: "#ffca28", level: 80 },
      { name: "Supabase", icon: SiSupabase, color: "#3ecf8e", level: 78 },
      { name: "Redis",    icon: SiRedis,    color: "#dc382d", level: 70 },
    ],
  },
  {
    id: "ai",
    label: "AI & SaaS",
    emoji: "🤖",
    color: "#a855f7",
    skills: [
      { name: "OpenAI",      icon: SiOpenai,  color: "#74aa9c", level: 82 },
      { name: "Gemini",      icon: FaBrain,   color: "#4285f4", level: 78 },
      { name: "Groq",        icon: FaRobot,   color: "#f97316", level: 75 },
      { name: "DeepSeek",    icon: FaBrain,   color: "#06b6d4", level: 72 },
      { name: "AI SaaS Dev", icon: FaRobot,   color: "#a855f7", level: 80 },
    ],
  },
  {
    id: "payments",
    label: "Payments",
    emoji: "💳",
    color: "#f59e0b",
    skills: [
      { name: "Stripe",   icon: SiStripe,   color: "#635bff", level: 88 },
      { name: "Razorpay", icon: SiRazorpay, color: "#3395ff", level: 82 },
      { name: "PayPal",   icon: SiPaypal,   color: "#003087", level: 78 },
    ],
  },
];

/* Proficiency bars data */
const proficiencyBars = [
  { name: "React.js / Next.js",         value: 95, color: "#6366f1" },
  { name: "TypeScript / JavaScript",    value: 90, color: "#3178c6" },
  { name: "Node.js / NestJS",           value: 80, color: "#10b981" },
  { name: "AI Integrations",            value: 82, color: "#a855f7" },
  { name: "Payment Gateways",           value: 86, color: "#f59e0b" },
  { name: "Redux / State Management",   value: 90, color: "#8b5cf6" },
];

/* ─── Skill card ─────────────────────────────────────────── */
const SkillCard = ({ skill, dark, catColor, i }) => {
  const [hovered, setHovered] = useState(false);
  const displayColor = skill.color === "#e2e8f0"
    ? dark ? "#e2e8f0" : "#334155"
    : skill.color;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.35, delay: i * 0.04, ease: [0.34, 1.56, 0.64, 1] }}
      exit={{ opacity: 0, scale: 0.8, y: -8, transition: { duration: 0.2 } }}
      whileHover={{ y: -8, scale: 1.06 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex flex-col items-center gap-3 p-4 rounded-2xl cursor-default relative overflow-hidden"
      style={{
        background: hovered
          ? dark ? `${skill.color}12` : `${skill.color}08`
          : dark ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.85)",
        border: hovered
          ? `1px solid ${displayColor}40`
          : dark ? "1px solid rgba(255,255,255,0.07)" : "1px solid rgba(0,0,0,0.07)",
        boxShadow: hovered
          ? `0 12px 32px ${displayColor}22`
          : dark ? "none" : "0 2px 12px rgba(0,0,0,0.06)",
        transition: "all 0.25s ease",
      }}
    >
      {/* Icon container */}
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
        style={{
          background: `${displayColor}18`,
          border: `1px solid ${displayColor}30`,
          color: displayColor,
          transition: "all 0.25s ease",
          boxShadow: hovered ? `0 0 16px ${displayColor}30` : "none",
        }}
      >
        <skill.icon />
      </div>

      {/* Name */}
      <span
        className="text-xs font-semibold text-center leading-tight"
        style={{ color: dark ? "#cbd5e1" : "#475569" }}
      >
        {skill.name}
      </span>

      {/* Level pill (shows on hover) */}
      <motion.div
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 4 }}
        transition={{ duration: 0.2 }}
        className="text-xs font-bold px-2 py-0.5 rounded-full"
        style={{
          background: `${displayColor}22`,
          color: displayColor,
          border: `1px solid ${displayColor}35`,
        }}
      >
        {skill.level}%
      </motion.div>
    </motion.div>
  );
};

/* ─── Main Skills component ──────────────────────────────── */
const Skills = () => {
  const { dark } = useTheme();
  const [active, setActive] = useState("frontend");

  const current = categories.find((c) => c.id === active);

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      {/* bg glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 50% 30%, ${current.color}18 0%, transparent 65%)`,
          transition: "background 0.6s ease",
        }}
      />

      <div className="container mx-auto relative z-10">
        <SectionHeading
          tag="My Skills"
          title="Tech Stack I Use"
          subtitle="Built over 4+ years of professional full-stack development. Hover a skill to see proficiency."
          dark={dark}
        />

        {/* ── Category tabs ── */}
        <div className="flex justify-center gap-2 mb-12 flex-wrap">
          {categories.map((cat) => {
            const isActive = active === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActive(cat.id)}
                data-cursor-hover
                className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300"
                style={{
                  background: isActive
                    ? `linear-gradient(135deg, ${cat.color}, ${cat.color}cc)`
                    : dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
                  color: isActive ? "#fff" : dark ? "#94a3b8" : "#64748b",
                  border: isActive
                    ? "1px solid transparent"
                    : dark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.08)",
                  boxShadow: isActive ? `0 4px 20px ${cat.color}45` : "none",
                  transform: isActive ? "translateY(-1px)" : "none",
                }}
              >
                <span>{cat.emoji}</span>
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* ── Skill count badge ── */}
        <motion.p
          key={active}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-xs mb-8 font-medium"
          style={{ color: dark ? "#475569" : "#94a3b8" }}
        >
          {current.skills.length} skills in this category · hover for proficiency
        </motion.p>

        {/* ── Skills grid ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-6 md:grid-cols-4 sm:grid-cols-3 gap-4"
          >
            {current.skills.map((skill, i) => (
              <SkillCard
                key={skill.name}
                skill={skill}
                dark={dark}
                catColor={current.color}
                i={i}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* ── Proficiency bars ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6 }}
          className="mt-16 rounded-2xl p-8 sm:p-5"
          style={{
            background: dark ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.7)",
            border: dark ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(0,0,0,0.07)",
          }}
        >
          <h3
            className="text-sm font-semibold uppercase tracking-wider mb-6"
            style={{ color: dark ? "#64748b" : "#94a3b8" }}
          >
            Core Proficiency
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-1 gap-5">
            {proficiencyBars.map((item, i) => (
              <div key={i} className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <span
                    className="text-sm font-medium"
                    style={{ color: dark ? "#e2e8f0" : "#334155" }}
                  >
                    {item.name}
                  </span>
                  <span
                    className="text-sm font-bold tabular-nums"
                    style={{ color: item.color }}
                  >
                    {item.value}%
                  </span>
                </div>

                {/* Track */}
                <div
                  className="h-2 rounded-full overflow-hidden"
                  style={{
                    background: dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)",
                  }}
                >
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${item.value}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: i * 0.1, ease: "easeOut" }}
                    className="h-full rounded-full relative"
                    style={{
                      background: `linear-gradient(90deg, ${item.color}, ${item.color}99)`,
                      boxShadow: `0 0 12px ${item.color}55`,
                    }}
                  >
                    {/* Shimmer */}
                    <span
                      className="absolute inset-0 rounded-full"
                      style={{
                        background:
                          "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.25) 50%, transparent 100%)",
                        backgroundSize: "200% 100%",
                        animation: "shimmer 2s infinite linear",
                      }}
                    />
                  </motion.div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
