import React from "react";
import { motion } from "framer-motion";
import { AiFillGithub } from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { IoLogoWhatsapp } from "react-icons/io";
import { RiInstagramFill } from "react-icons/ri";
import { FaTelegramPlane } from "react-icons/fa";
import { personalDataObj } from "../data/data";
import { useTheme } from "../context/ThemeContext";
import { navItems } from "../data/Constant";

const socialLinks = [
  { icon: AiFillGithub, href: personalDataObj.github, label: "GitHub" },
  { icon: FaLinkedinIn, href: personalDataObj.linkedin, label: "LinkedIn" },
  { icon: SiLeetcode, href: personalDataObj.leetcode, label: "LeetCode" },
  { icon: IoLogoWhatsapp, href: personalDataObj.whatsapp, label: "WhatsApp" },
  { icon: RiInstagramFill, href: personalDataObj.instagram, label: "Instagram" },
];

const Footer = () => {
  const { dark } = useTheme();

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer
      className="relative overflow-hidden"
      style={{
        background: dark ? "#080814" : "#f1f5f9",
        borderTop: dark ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(0,0,0,0.06)",
      }}
    >
      {/* Top gradient line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, #6366f1, #a855f7, transparent)" }}
      />

      {/* Background decoration */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full opacity-5"
        style={{
          background: "radial-gradient(circle, #6366f1, transparent)",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />

      <div className="container mx-auto py-16 relative z-10">
        {/* Main footer content */}
        <div className="grid grid-cols-3 md:grid-cols-1 gap-12 mb-12">
          {/* Brand */}
          <div className="flex flex-col gap-5">
            <button onClick={() => scrollTo("home")} className="w-fit">
              <span
                className="gradient-text text-3xl font-bold"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                NK
              </span>
              <span
                className="ml-2 text-lg font-semibold"
                style={{ color: dark ? "#e2e8f0" : "#0f172a" }}
              >
                {personalDataObj.name}
              </span>
            </button>
            <p className="text-sm leading-relaxed" style={{ color: dark ? "#64748b" : "#94a3b8" }}>
              Full Stack Developer specializing in React, Next.js, and AI integrations. Building scalable, beautiful web applications.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor-hover
                  title={s.label}
                  className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300"
                  style={{
                    background: dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
                    border: dark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.08)",
                    color: dark ? "#64748b" : "#94a3b8",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(99,102,241,0.15)";
                    e.currentTarget.style.borderColor = "rgba(99,102,241,0.3)";
                    e.currentTarget.style.color = "#6366f1";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)";
                    e.currentTarget.style.borderColor = dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";
                    e.currentTarget.style.color = dark ? "#64748b" : "#94a3b8";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <s.icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-5">
            <h4
              className="font-semibold text-sm uppercase tracking-wider"
              style={{ color: dark ? "#e2e8f0" : "#0f172a" }}
            >
              Quick Links
            </h4>
            <ul className="flex flex-col gap-3">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollTo(item.name)}
                    data-cursor-hover
                    className="text-sm transition-colors"
                    style={{ color: dark ? "#64748b" : "#94a3b8" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#6366f1")}
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = dark ? "#64748b" : "#94a3b8")
                    }
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col gap-5">
            <h4
              className="font-semibold text-sm uppercase tracking-wider"
              style={{ color: dark ? "#e2e8f0" : "#0f172a" }}
            >
              Contact
            </h4>
            <div className="flex flex-col gap-3">
              <a
                href="mailto:nitinkumarja2003@gmail.com"
                className="text-sm transition-colors"
                style={{ color: dark ? "#64748b" : "#94a3b8" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#6366f1")}
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = dark ? "#64748b" : "#94a3b8")
                }
              >
                nitinkumarja2003@gmail.com
              </a>
              <a
                href={personalDataObj.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="text-sm transition-colors"
                style={{ color: dark ? "#64748b" : "#94a3b8" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#6366f1")}
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = dark ? "#64748b" : "#94a3b8")
                }
              >
                +91 7078216535
              </a>
              <span className="text-sm" style={{ color: dark ? "#64748b" : "#94a3b8" }}>
                Delhi, India
              </span>
            </div>

            <div
              className="rounded-xl p-4 mt-2"
              style={{
                background: "rgba(99,102,241,0.08)",
                border: "1px solid rgba(99,102,241,0.15)",
              }}
            >
              <p className="text-xs text-center font-medium" style={{ color: "#6366f1" }}>
                Available for freelance & full-time opportunities
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div
          className="h-px w-full mb-6"
          style={{
            background: dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",
          }}
        />

        {/* Bottom */}
        <div className="flex items-center justify-between sm:flex-col sm:gap-3 sm:text-center">
          <p className="text-xs" style={{ color: dark ? "#475569" : "#94a3b8" }}>
            © 2026 {personalDataObj.name}. All rights reserved.
          </p>
          <p className="text-xs" style={{ color: dark ? "#475569" : "#94a3b8" }}>
            Built with{" "}
            <span className="gradient-text font-semibold">React + Framer Motion</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
