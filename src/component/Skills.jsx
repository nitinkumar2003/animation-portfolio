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
  FaNodeJs, FaMobileAlt, FaRobot, FaBrain, FaCheckCircle, FaCreditCard, FaSearch,
} from "react-icons/fa";
import SectionHeading from "./ui/SectionHeading";
import { useTheme } from "../pages/Home";

const categories = [
  {
    id: "frontend",
    label: "Frontend",
    skills: [
      { name: "React.js",       icon: SiReact,       color: "#61dafb" },
      { name: "Next.js",        icon: SiNextdotjs,   color: "#ffffff" },
      { name: "TypeScript",     icon: SiTypescript,  color: "#3178c6" },
      { name: "JavaScript",     icon: IoLogoJavascript, color: "#f7df1e" },
      { name: "TailwindCSS",    icon: SiTailwindcss, color: "#38bdf8" },
      { name: "HTML5",          icon: IoLogoHtml5,   color: "#e34f26" },
      { name: "CSS3",           icon: IoLogoCss3,    color: "#1572b6" },
      { name: "Bootstrap",      icon: SiBootstrap,   color: "#7952b3" },
      { name: "Ant Design",     icon: SiAntdesign,   color: "#0170fe" },
      { name: "Framer Motion",  icon: SiFramer,      color: "#0055ff" },
      { name: "React Native",   icon: FaMobileAlt,   color: "#61dafb" },
      { name: "SEO",            icon: FaSearch,      color: "#10b981" },
    ],
  },
  {
    id: "state",
    label: "State & Forms",
    skills: [
      { name: "Redux",            icon: SiRedux,          color: "#764abc" },
      { name: "Redux Toolkit",    icon: SiRedux,          color: "#7c5cbf" },
      { name: "Zustand",          icon: FaBrain,          color: "#f59e0b" },
      { name: "React Query",      icon: SiReactquery,     color: "#ff4154" },
      { name: "React Hook Form",  icon: SiReacthookform,  color: "#ec4899" },
      { name: "Zod",              icon: SiZod,            color: "#3e67b1" },
      { name: "Yup",              icon: FaCheckCircle,    color: "#10b981" },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    skills: [
      { name: "Node.js",     icon: IoLogoNodejs,  color: "#339933" },
      { name: "Express.js",  icon: SiExpress,     color: "#ffffff" },
      { name: "NestJS",      icon: SiNestjs,      color: "#e0234e" },
      { name: "Socket.io",   icon: SiSocketdotio, color: "#ffffff" },
      { name: "REST API",    icon: FaNodeJs,      color: "#339933" },
      { name: "ESLint",      icon: SiEslint,      color: "#4b32c3" },
      { name: "GitHub",      icon: IoLogoGithub,  color: "#ffffff" },
    ],
  },
  {
    id: "database",
    label: "Database & Cloud",
    skills: [
      { name: "MongoDB",   icon: SiMongodb,  color: "#47a248" },
      { name: "SQL",       icon: SiMysql,    color: "#00758f" },
      { name: "Firebase",  icon: SiFirebase, color: "#ffca28" },
      { name: "Supabase",  icon: SiSupabase, color: "#3ecf8e" },
      { name: "Redis",     icon: SiRedis,    color: "#dc382d" },
    ],
  },
  {
    id: "ai",
    label: "AI Integration",
    skills: [
      { name: "OpenAI",      icon: SiOpenai,   color: "#74aa9c" },
      { name: "Gemini",      icon: FaBrain,    color: "#4285f4" },
      { name: "Venice AI",   icon: FaRobot,    color: "#6366f1" },
      { name: "Groq",        icon: FaRobot,    color: "#f97316" },
      { name: "DeepSeek",    icon: FaBrain,    color: "#06b6d4" },
      { name: "AI SaaS Dev", icon: FaRobot,    color: "#a855f7" },
    ],
  },
  {
    id: "payments",
    label: "Payments",
    skills: [
      { name: "Stripe",    icon: SiStripe,    color: "#635bff" },
      { name: "PayPal",    icon: SiPaypal,    color: "#003087" },
      { name: "Razorpay",  icon: SiRazorpay,  color: "#3395ff" },
    ],
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const cardVariants = {
  hidden:  { opacity: 0, scale: 0.8, y: 20 },
  visible: { opacity: 1, scale: 1,   y: 0,  transition: { duration: 0.4, ease: "easeOut" } },
  exit:    { opacity: 0, scale: 0.8, y: -10, transition: { duration: 0.2 } },
};

const Skills = () => {
  const { dark } = useTheme();
  const [active, setActive] = useState("frontend");

  const current = categories.find((c) => c.id === active);

  return (
    <section id="skills" className="py-24 relative">
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{ background: "radial-gradient(ellipse at center, #6366f1 0%, transparent 70%)" }}
      />

      <div className="container mx-auto relative z-10">
        <SectionHeading
          tag="My Skills"
          title="Tech Stack I Use"
          subtitle="A comprehensive toolkit built over 4+ years of professional development."
          dark={dark}
        />

        {/* Category Tabs */}
        <div className="flex justify-center gap-3 mb-12 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActive(cat.id)}
              data-cursor-hover
              className="px-5 py-2 rounded-full text-sm font-medium transition-all duration-300"
              style={{
                background: active === cat.id
                  ? "linear-gradient(135deg, #6366f1, #8b5cf6)"
                  : dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
                color: active === cat.id ? "#fff" : dark ? "#94a3b8" : "#64748b",
                border: active === cat.id
                  ? "1px solid transparent"
                  : dark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.08)",
                boxShadow: active === cat.id ? "0 4px 20px rgba(99,102,241,0.3)" : "none",
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="grid grid-cols-6 md:grid-cols-4 sm:grid-cols-3 gap-5"
          >
            {current.skills.map((skill) => (
              <motion.div
                key={skill.name}
                variants={cardVariants}
                whileHover={{ y: -8, scale: 1.05 }}
                className="skill-badge flex flex-col items-center gap-3 p-4 rounded-2xl cursor-default"
                style={{
                  background: dark ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.8)",
                  border:     dark ? "1px solid rgba(255,255,255,0.07)" : "1px solid rgba(0,0,0,0.07)",
                  boxShadow:  dark ? "none" : "0 2px 12px rgba(0,0,0,0.06)",
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                  style={{
                    background: `${skill.color}18`,
                    color:      skill.color === "#ffffff" ? (dark ? "#e2e8f0" : "#334155") : skill.color,
                    border:     `1px solid ${skill.color}30`,
                  }}
                >
                  <skill.icon />
                </div>
                <span
                  className="text-xs font-medium text-center leading-tight"
                  style={{ color: dark ? "#cbd5e1" : "#475569" }}
                >
                  {skill.name}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Core proficiency bars */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-1 gap-6"
        >
          {[
            { name: "React.js / Next.js",          value: 95, color: "#6366f1" },
            { name: "TypeScript / JavaScript",     value: 90, color: "#3178c6" },
            { name: "Node.js / NestJS",            value: 78, color: "#339933" },
            { name: "AI Integrations",             value: 82, color: "#06b6d4" },
            { name: "Stripe / Razorpay / PayPal",  value: 85, color: "#635bff" },
            { name: "Redux / Zustand",             value: 88, color: "#764abc" },
          ].map((item, i) => (
            <div key={i} className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium" style={{ color: dark ? "#e2e8f0" : "#334155" }}>
                  {item.name}
                </span>
                <span className="text-sm font-bold" style={{ color: item.color }}>
                  {item.value}%
                </span>
              </div>
              <div
                className="h-2 rounded-full overflow-hidden"
                style={{ background: dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)" }}
              >
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${item.value}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: i * 0.1, ease: "easeOut" }}
                  className="h-full rounded-full"
                  style={{
                    background:  `linear-gradient(90deg, ${item.color}, ${item.color}aa)`,
                    boxShadow:   `0 0 10px ${item.color}60`,
                  }}
                />
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
