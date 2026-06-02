import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AiFillGithub } from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { FiDownload, FiArrowRight } from "react-icons/fi";
import { FaPlay } from "react-icons/fa";
import { TypeAnimation } from "react-type-animation";
import { personalDataObj } from "../data/data";
import { useTheme } from "../context/ThemeContext";
import resumePDF from "../assets/Resume.pdf";
import profileImg from "../assets/image_01.jpg";

const socialLinks = [
  { name: "GitHub", url: "https://github.com/nitinkumar2003", icon: AiFillGithub },
  { name: "LinkedIn", url: "https://www.linkedin.com/in/nitin-kumar-42026421b", icon: FaLinkedinIn },
  { name: "LeetCode", url: "https://leetcode.com/u/Nitinjanmeda/", icon: SiLeetcode },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const Hero = () => {
  const { dark } = useTheme();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ paddingTop: "5rem" }}
    >
      {/* Background Orbs */}
      <div
        className="orb"
        style={{
          width: 600,
          height: 600,
          background: "#6366f1",
          top: "-10%",
          right: "-10%",
          animation: "float 10s ease-in-out infinite",
        }}
      />
      <div
        className="orb"
        style={{
          width: 400,
          height: 400,
          background: "#a855f7",
          bottom: "0%",
          left: "-5%",
          animation: "float-delayed 12s ease-in-out infinite",
        }}
      />
      <div
        className="orb"
        style={{
          width: 300,
          height: 300,
          background: "#06b6d4",
          top: "30%",
          left: "30%",
          animation: "pulse-glow 6s ease-in-out infinite",
        }}
      />

      {/* Grid bg */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(${dark ? "#fff" : "#000"} 1px, transparent 1px), linear-gradient(90deg, ${dark ? "#fff" : "#000"} 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="container mx-auto relative z-10">
        <div className="flex items-center justify-between gap-12 md:flex-col-reverse md:gap-8 md:pt-4">

          {/* Left Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex-1 flex flex-col gap-6 max-w-2xl"
          >
            <motion.div variants={itemVariants}>
              <span
                className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-full"
                style={{
                  background: "rgba(99, 102, 241, 0.1)",
                  color: "#6366f1",
                  border: "1px solid rgba(99, 102, 241, 0.2)",
                }}
              >
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                Available for hire
              </span>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col gap-2">
              <h1
                className="font-bold leading-tight"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "clamp(2.5rem, 5vw, 4rem)",
                  color: dark ? "#f1f5f9" : "#0f172a",
                }}
              >
                Hi{" "}
                <span className="wave" role="img" aria-label="wave">
                  👋🏻
                </span>
                , I'm{" "}
                <span className="gradient-text">{personalDataObj.name}</span>
              </h1>

              <div style={{ height: "3rem" }}>
                <TypeAnimation
                  sequence={[
                    "Full Stack Developer",
                    2000,
                    "React.js Expert",
                    2000,
                    "Next.js Developer",
                    2000,
                    "AI Integrations Dev",
                    2000,
                  ]}
                  speed={40}
                  wrapper="h2"
                  repeat={Infinity}
                  className="gradient-text-amber font-bold"
                  style={{
                    fontSize: "clamp(1.4rem, 3vw, 2rem)",
                    fontFamily: "'Space Grotesk', sans-serif",
                  }}
                />
              </div>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-base leading-relaxed max-w-lg"
              style={{ color: dark ? "#94a3b8" : "#64748b" }}
            >
              {personalDataObj.about}
            </motion.p>

            {/* Stats */}
            <motion.div variants={itemVariants} className="flex gap-8 sm:gap-5 flex-wrap">
              {personalDataObj.stats.map((stat, i) => (
                <div key={i} className="flex flex-col">
                  <span
                    className="font-bold text-2xl sm:text-xl gradient-text"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    {stat.value}
                  </span>
                  <span className="text-xs" style={{ color: dark ? "#94a3b8" : "#64748b" }}>
                    {stat.label}
                  </span>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="flex gap-4 flex-wrap">
              <a
                href="mailto:nitinkumarja2003@gmail.com"
                data-cursor-hover
                className="btn-primary flex items-center gap-2 px-7 py-3 rounded-xl font-semibold text-sm"
              >
                <span>Hire Me</span>
                <FiArrowRight />
              </a>
              <a
                href={resumePDF}
                download
                data-cursor-hover
                className="btn-outline flex items-center gap-2 px-7 py-3 rounded-xl font-semibold text-sm"
              >
                <FiDownload />
                <span>Resume</span>
              </a>
            </motion.div>

            {/* Social Links */}
            <motion.div variants={itemVariants} className="flex gap-4">
              {socialLinks.map((item, i) => (
                <a
                  key={i}
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor-hover
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                  style={{
                    background: dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",
                    border: dark ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,0,0,0.1)",
                    color: dark ? "#94a3b8" : "#64748b",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(99,102,241,0.15)";
                    e.currentTarget.style.borderColor = "#6366f1";
                    e.currentTarget.style.color = "#6366f1";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)";
                    e.currentTarget.style.borderColor = dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)";
                    e.currentTarget.style.color = dark ? "#94a3b8" : "#64748b";
                  }}
                >
                  <item.icon size={18} />
                </a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            style={{
              transform: `translate(${mousePos.x * 0.3}px, ${mousePos.y * 0.3}px)`,
              transition: "transform 0.1s ease",
            }}
            className="relative flex-shrink-0 md:mt-6"
          >
            {/* Glow rings */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: "radial-gradient(circle, rgba(99,102,241,0.3) 0%, transparent 70%)",
                filter: "blur(30px)",
              }}
            />

            {/* Ring 1 */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-4 rounded-full"
              style={{
                border: "1px dashed rgba(99,102,241,0.3)",
              }}
            />
            {/* Ring 2 */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-8 rounded-full"
              style={{
                border: "1px dashed rgba(168,85,247,0.2)",
              }}
            />

            {/* Image */}
            <div
              className="relative w-72 h-72 md:w-56 md:h-56 sm:w-48 sm:h-48 rounded-full overflow-hidden"
              style={{
                border: "3px solid rgba(99,102,241,0.4)",
                boxShadow: "0 0 60px rgba(99,102,241,0.3), inset 0 0 60px rgba(99,102,241,0.05)",
              }}
            >
              <img
                src={profileImg}
                alt="Nitin Kumar"
                className="w-full h-full object-cover object-top"
              />
              <div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(to bottom, transparent 60%, rgba(99,102,241,0.2))",
                }}
              />
            </div>

            {/* Spinning badge */}
            <div className="absolute -bottom-4 -right-4">
              <div className="relative w-24 h-24">
                <img
                  className="w-full circle-text"
                  src="https://ik.imagekit.io/imgkitt/tr:w-400/Full_Stack_Developer2.png?updatedAt=1683134009107"
                  alt="Full Stack Developer"
                />
                <FaPlay className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white" size={12} />
              </div>
            </div>

            {/* Floating badges */}
            <motion.div
              animate={{ y: [-6, 6, -6] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -left-8 top-8 glass-card rounded-xl px-3 py-2 text-xs font-semibold"
              style={{ color: dark ? "#e2e8f0" : "#0f172a", whiteSpace: "nowrap" }}
            >
              ⚡ React Expert
            </motion.div>

            <motion.div
              animate={{ y: [6, -6, 6] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -right-8 bottom-12 glass-card rounded-xl px-3 py-2 text-xs font-semibold"
              style={{ color: dark ? "#e2e8f0" : "#0f172a", whiteSpace: "nowrap" }}
            >
              🤖 AI Builder
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs tracking-widest uppercase" style={{ color: dark ? "#475569" : "#94a3b8" }}>
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-5 h-8 rounded-full border flex items-start justify-center pt-1"
          style={{ borderColor: dark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)" }}
        >
          <div className="w-1 h-2 rounded-full" style={{ background: "#6366f1" }} />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
