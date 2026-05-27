import React from "react";
import { motion } from "framer-motion";

const SectionHeading = ({ tag, title, subtitle, dark }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.5 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    className="flex flex-col items-center text-center mb-16 gap-3"
  >
    <span
      className="text-xs font-semibold tracking-[0.2em] uppercase px-4 py-1.5 rounded-full"
      style={{
        background: "rgba(99, 102, 241, 0.1)",
        color: "#6366f1",
        border: "1px solid rgba(99, 102, 241, 0.2)",
      }}
    >
      {tag}
    </span>
    <h2
      className="text-4xl sm:text-3xl font-bold"
      style={{
        fontFamily: "'Space Grotesk', sans-serif",
        color: dark ? "#f1f5f9" : "#0f172a",
      }}
    >
      {title}
    </h2>
    <div className="section-line" />
    {subtitle && (
      <p className="max-w-xl text-base" style={{ color: dark ? "#94a3b8" : "#64748b" }}>
        {subtitle}
      </p>
    )}
  </motion.div>
);

export default SectionHeading;
