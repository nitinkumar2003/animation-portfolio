import React, { useState } from "react";
import { motion } from "framer-motion";
import { personalDataObj } from "../data/data";
import SectionHeading from "./ui/SectionHeading";
import { useTheme } from "../context/ThemeContext";
import resumePDF from "../../NitinKumar.pdf";
import { FiDownload } from "react-icons/fi";

const tabs = ["Experience", "Education", "Certificate"];

const TimelineItem = ({ heading, insName, time, description, dark, index }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
    className="flex gap-5 relative"
  >
    {/* Timeline left */}
    <div className="flex flex-col items-center gap-1 pt-1">
      <div className="timeline-dot" />
      <div className="timeline-line" style={{ minHeight: 40 }} />
    </div>

    {/* Content */}
    <div
      className="flex-1 rounded-2xl p-5 mb-6 transition-all duration-300 hover:shadow-lg"
      style={{
        background: dark ? "rgba(255,255,255,0.04)" : "#fff",
        border: dark ? "1px solid rgba(255,255,255,0.07)" : "1px solid rgba(0,0,0,0.07)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "rgba(99,102,241,0.3)";
        e.currentTarget.style.boxShadow = "0 8px 30px rgba(99,102,241,0.12)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = dark
          ? "rgba(255,255,255,0.07)"
          : "rgba(0,0,0,0.07)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <div className="flex flex-col gap-1 mb-3">
        <h3
          className="font-bold text-base"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            color: dark ? "#f1f5f9" : "#0f172a",
          }}
        >
          {heading}
        </h3>
        <p className="text-sm font-medium" style={{ color: "#6366f1" }}>
          {insName}
        </p>
        <span
          className="text-xs font-medium px-3 py-1 rounded-full w-fit"
          style={{
            background: "rgba(245,158,11,0.1)",
            color: "#f59e0b",
            border: "1px solid rgba(245,158,11,0.2)",
          }}
        >
          {time}
        </span>
      </div>
      <p
        className="text-sm leading-relaxed"
        style={{ color: dark ? "#94a3b8" : "#64748b" }}
      >
        {description}
      </p>
    </div>
  </motion.div>
);

const Resume = () => {
  const { dark } = useTheme();
  const [activeTab, setActiveTab] = useState("Experience");

  const getItems = () => {
    switch (activeTab) {
      case "Experience":
        return personalDataObj.experience.map((e) => ({
          heading: e.profile,
          insName: e.company,
          time: e.time,
          description: e.description,
        }));
      case "Education":
        return personalDataObj.education.map((e) => ({
          heading: e.course,
          insName: e.college,
          time: e.time,
          description: e.description,
        }));
      case "Certificate":
        return personalDataObj.certificate.map((e) => ({
          heading: e.cerName,
          insName: e.institute,
          time: e.time,
          description: e.description,
        }));
      default:
        return [];
    }
  };

  return (
    <section id="resume" className="py-24 relative">
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          background:
            "radial-gradient(ellipse at 20% 80%, #06b6d4 0%, transparent 60%)",
        }}
      />

      <div className="container mx-auto relative z-10">
        <SectionHeading
          tag="My Journey"
          title="Resume & Experience"
          subtitle="My professional journey, education, and certifications."
          dark={dark}
        />

        {/* Tabs */}
        <div className="flex justify-center gap-3 mb-12 flex-wrap">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              data-cursor-hover
              className="px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300"
              style={{
                background:
                  activeTab === tab
                    ? "linear-gradient(135deg, #6366f1, #8b5cf6)"
                    : dark
                    ? "rgba(255,255,255,0.05)"
                    : "rgba(0,0,0,0.05)",
                color: activeTab === tab ? "#fff" : dark ? "#94a3b8" : "#64748b",
                border:
                  activeTab === tab
                    ? "none"
                    : dark
                    ? "1px solid rgba(255,255,255,0.08)"
                    : "1px solid rgba(0,0,0,0.08)",
                boxShadow:
                  activeTab === tab ? "0 4px 20px rgba(99,102,241,0.3)" : "none",
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Timeline */}
        <div className="max-w-2xl mx-auto">
          {getItems().map((item, i) => (
            <TimelineItem
              key={i}
              index={i}
              heading={item.heading}
              insName={item.insName}
              time={item.time}
              description={item.description}
              dark={dark}
            />
          ))}
        </div>

        {/* Download Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mt-8"
        >
          <a
            href={resumePDF}
            download
            data-cursor-hover
            className="btn-primary flex items-center gap-3 px-8 py-3.5 rounded-xl font-semibold"
          >
            <FiDownload size={18} />
            <span>Download Full Resume</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Resume;
