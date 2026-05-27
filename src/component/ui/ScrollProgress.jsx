import React, { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

const ScrollProgress = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const el = document.documentElement;
      const progress = (el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100;
      setScrollY(progress);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="scroll-progress"
      style={{ width: `${scrollY}%`, transition: "width 0.1s linear" }}
    />
  );
};

export default ScrollProgress;
