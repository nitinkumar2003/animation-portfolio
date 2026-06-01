import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  AiFillGithub,
} from "react-icons/ai";
import {
  SiLeetcode,
  SiLinkedin,
  SiGeeksforgeeks,
} from "react-icons/si";
import {
  FiExternalLink,
} from "react-icons/fi";
import {
  FaCodeBranch,
  FaStar,
  FaFire,
  FaTrophy,
} from "react-icons/fa";
import SectionHeading from "./ui/SectionHeading";
import { useTheme } from "../pages/Home";
import { personalDataObj } from "../data/data";

const codingProfiles = [
  {
    name: "GitHub",
    icon: AiFillGithub,
    url: personalDataObj.github,
    color: "#ffffff",
    bg: "#161b22",
    stat: "20+ Repos",
    desc: "Open source projects & contributions",
  },
  {
    name: "LeetCode",
    icon: SiLeetcode,
    url: personalDataObj.leetcode,
    color: "#ffa116",
    bg: "#1a1a1a",
    stat: "200+ Problems",
    desc: "DSA & problem solving practice",
  },
  {
    name: "LinkedIn",
    icon: SiLinkedin,
    url: personalDataObj.linkedin,
    color: "#0a66c2",
    bg: "#f3f2ef",
    stat: "500+ Connections",
    desc: "Professional network & endorsements",
  },
  {
    name: "GeeksForGeeks",
    icon: SiGeeksforgeeks,
    url: "https://www.geeksforgeeks.org/user/nitinjanmeda/",
    color: "#2f8d46",
    bg: "#f5f5f5",
    stat: "50+ Articles",
    desc: "CS fundamentals & algorithms",
  },
];

const achievementCards = [
  { icon: FaCodeBranch, label: "Repositories",  value: "20+",   color: "#6366f1" },
  { icon: FaStar,       label: "GitHub Stars",   value: "50+",   color: "#f59e0b" },
  { icon: FaFire,       label: "Streak Days",    value: "120+",  color: "#ef4444" },
  { icon: FaTrophy,     label: "LeetCode Solved", value: "200+", color: "#10b981" },
];

const GithubStats = () => {
  const { dark } = useTheme();
  const [imgDark, setImgDark] = useState({ stats: true, streak: true });

  const statTheme = dark ? "tokyonight" : "default";
  const statsBg = dark ? "0d0d1a" : "f8fafc";
  const statsBorder = dark ? "1e1e3a" : "e2e8f0";
  const statsTitle = dark ? "e2e8f0" : "0f172a";
  const statsText = dark ? "94a3b8" : "64748b";
  const statsIcon = dark ? "6366f1" : "6366f1";

  return (
    <section id="stats" className="py-24 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          background:
            "radial-gradient(ellipse at 20% 50%, #06b6d4 0%, transparent 60%)",
        }}
      />

      <div className="container mx-auto relative z-10">
        <SectionHeading
          tag="Open Source"
          title="GitHub & Coding Profiles"
          subtitle="My development activity, open source work, and coding profiles across platforms."
          dark={dark}
        />

        {/* Achievement counters */}
        <div className="grid grid-cols-4 md:grid-cols-2 sm:grid-cols-2 gap-5 mb-16">
          {achievementCards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
              whileHover={{ y: -6, scale: 1.04 }}
              className="rounded-2xl p-5 flex flex-col items-center gap-3 text-center cursor-default"
              style={{
                background: dark ? "rgba(255,255,255,0.04)" : "#fff",
                border: dark
                  ? "1px solid rgba(255,255,255,0.07)"
                  : "1px solid rgba(0,0,0,0.07)",
                boxShadow: dark ? "none" : "0 2px 16px rgba(0,0,0,0.06)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = `${card.color}40`;
                e.currentTarget.style.boxShadow = `0 12px 40px ${card.color}18`;
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
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{
                  background: `${card.color}18`,
                  color: card.color,
                  border: `1px solid ${card.color}30`,
                }}
              >
                <card.icon size={20} />
              </div>
              <div>
                <p
                  className="text-2xl font-bold"
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    color: card.color,
                  }}
                >
                  {card.value}
                </p>
                <p
                  className="text-xs font-medium mt-0.5"
                  style={{ color: dark ? "#94a3b8" : "#64748b" }}
                >
                  {card.label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* GitHub Stats Images */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-1 gap-6 mb-16"
        >
          {/* GitHub Stats Card */}
          <div
            className="rounded-2xl overflow-hidden"
            style={{
              border: dark
                ? "1px solid rgba(255,255,255,0.07)"
                : "1px solid rgba(0,0,0,0.07)",
            }}
          >
            {imgDark.stats ? (
              <img
                src={`https://github-readme-stats.vercel.app/api?username=nitinkumar2003&show_icons=true&theme=${statTheme}&bg_color=${statsBg}&border_color=${statsBorder}&title_color=${statsTitle}&text_color=${statsText}&icon_color=${statsIcon}&hide_border=true&count_private=true`}
                alt="GitHub Stats"
                className="w-full"
                onError={() => setImgDark((p) => ({ ...p, stats: false }))}
              />
            ) : (
              <div
                className="flex flex-col items-center justify-center py-12 gap-3"
                style={{ color: dark ? "#64748b" : "#94a3b8" }}
              >
                <AiFillGithub size={32} />
                <p className="text-sm">GitHub Stats</p>
                <a
                  href={personalDataObj.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs"
                  style={{ color: "#6366f1" }}
                >
                  View on GitHub
                </a>
              </div>
            )}
          </div>

          {/* GitHub Streak Card */}
          <div
            className="rounded-2xl overflow-hidden"
            style={{
              border: dark
                ? "1px solid rgba(255,255,255,0.07)"
                : "1px solid rgba(0,0,0,0.07)",
            }}
          >
            {imgDark.streak ? (
              <img
                src={`https://github-readme-streak-stats.herokuapp.com/?user=nitinkumar2003&theme=${statTheme}&background=${statsBg}&border=${statsBorder}&ring=6366f1&fire=a855f7&currStreakLabel=6366f1&hide_border=true`}
                alt="GitHub Streak"
                className="w-full"
                onError={() => setImgDark((p) => ({ ...p, streak: false }))}
              />
            ) : (
              <div
                className="flex flex-col items-center justify-center py-12 gap-3"
                style={{ color: dark ? "#64748b" : "#94a3b8" }}
              >
                <FaFire size={32} style={{ color: "#ef4444" }} />
                <p className="text-sm">Contribution Streak</p>
                <a
                  href={personalDataObj.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs"
                  style={{ color: "#6366f1" }}
                >
                  View on GitHub
                </a>
              </div>
            )}
          </div>
        </motion.div>

        {/* Coding Profiles */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h3
            className="text-center text-lg font-semibold mb-8"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              color: dark ? "#f1f5f9" : "#0f172a",
            }}
          >
            Coding Profiles
          </h3>

          <div className="grid grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-5">
            {codingProfiles.map((profile, i) => (
              <motion.a
                key={i}
                href={profile.url}
                target="_blank"
                rel="noreferrer"
                data-cursor-hover
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="rounded-2xl p-5 flex flex-col gap-3 group"
                style={{
                  background: dark ? "rgba(255,255,255,0.04)" : "#fff",
                  border: dark
                    ? "1px solid rgba(255,255,255,0.07)"
                    : "1px solid rgba(0,0,0,0.07)",
                  boxShadow: dark ? "none" : "0 2px 12px rgba(0,0,0,0.05)",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = `${profile.color}50`;
                  e.currentTarget.style.boxShadow = `0 12px 40px ${profile.color}20`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = dark
                    ? "rgba(255,255,255,0.07)"
                    : "rgba(0,0,0,0.07)";
                  e.currentTarget.style.boxShadow = dark
                    ? "none"
                    : "0 2px 12px rgba(0,0,0,0.05)";
                }}
              >
                <div className="flex items-center justify-between">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center"
                    style={{
                      background: `${profile.color}18`,
                      border: `1px solid ${profile.color}30`,
                      color:
                        profile.color === "#ffffff"
                          ? dark
                            ? "#e2e8f0"
                            : "#334155"
                          : profile.color,
                    }}
                  >
                    <profile.icon size={22} />
                  </div>
                  <FiExternalLink
                    size={14}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ color: dark ? "#64748b" : "#94a3b8" }}
                  />
                </div>

                <div>
                  <p
                    className="font-bold text-sm"
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      color: dark ? "#f1f5f9" : "#0f172a",
                    }}
                  >
                    {profile.name}
                  </p>
                  <p
                    className="text-xs font-medium mt-0.5"
                    style={{ color: profile.color === "#ffffff" ? "#6366f1" : profile.color }}
                  >
                    {profile.stat}
                  </p>
                  <p
                    className="text-xs mt-1 leading-relaxed"
                    style={{ color: dark ? "#64748b" : "#94a3b8" }}
                  >
                    {profile.desc}
                  </p>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default GithubStats;
