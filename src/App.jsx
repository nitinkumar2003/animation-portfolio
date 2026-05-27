import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Home from "./pages/Home";
import "./App.css";

const LoadingScreen = () => (
  <motion.div
    initial={{ opacity: 1 }}
    exit={{ opacity: 0, scale: 1.05 }}
    transition={{ duration: 0.6, ease: "easeInOut" }}
    className="fixed inset-0 z-50 flex flex-col items-center justify-center"
    style={{ background: "#0d0d1a" }}
  >
    <motion.div
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, ease: "backOut" }}
      className="flex flex-col items-center gap-6"
    >
      <div className="relative">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          className="w-20 h-20 rounded-full"
          style={{
            background: "conic-gradient(from 0deg, transparent, #6366f1, #a855f7, transparent)",
          }}
        />
        <div
          className="absolute inset-2 rounded-full flex items-center justify-center"
          style={{ background: "#0d0d1a" }}
        >
          <span className="loading-logo-text text-2xl font-bold gradient-text">NK</span>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex flex-col items-center gap-2"
      >
        <p className="text-slate-400 text-sm tracking-widest uppercase">
          Loading Portfolio
        </p>
        <div className="w-48 h-[2px] rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.1)" }}>
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "0%" }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="h-full rounded-full"
            style={{ background: "linear-gradient(90deg, #6366f1, #a855f7, #06b6d4)" }}
          />
        </div>
      </motion.div>
    </motion.div>
  </motion.div>
);

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {loading ? (
        <LoadingScreen key="loading" />
      ) : (
        <motion.div
          key="content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Home />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default App;
