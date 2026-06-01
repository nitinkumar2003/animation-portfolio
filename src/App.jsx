import React, { useState, useEffect, Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeProvider } from "./context/ThemeContext";
import "./App.css";

const Home = lazy(() => import("./pages/Home"));
const ProjectsPage = lazy(() => import("./pages/ProjectsPage"));

const LoadingScreen = () => (
  <motion.div
    key="loader"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0, scale: 1.05 }}
    transition={{ duration: 0.5, ease: "easeInOut" }}
    className="fixed inset-0 z-50 flex flex-col items-center justify-center"
    style={{ background: "#0d0d1a" }}
  >
    {/* Background orbs */}
    <div
      style={{
        position: "absolute",
        width: 400,
        height: 400,
        borderRadius: "50%",
        background: "#6366f1",
        filter: "blur(100px)",
        opacity: 0.08,
        top: "20%",
        left: "30%",
        pointerEvents: "none",
      }}
    />
    <div
      style={{
        position: "absolute",
        width: 300,
        height: 300,
        borderRadius: "50%",
        background: "#a855f7",
        filter: "blur(90px)",
        opacity: 0.07,
        bottom: "20%",
        right: "25%",
        pointerEvents: "none",
      }}
    />

    <motion.div
      initial={{ scale: 0.6, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
      className="flex flex-col items-center gap-6"
    >
      <div className="relative">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          style={{
            position: "absolute",
            inset: -12,
            borderRadius: "50%",
            border: "1.5px dashed rgba(99,102,241,0.4)",
          }}
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          style={{
            position: "absolute",
            inset: -22,
            borderRadius: "50%",
            border: "1px dashed rgba(168,85,247,0.25)",
          }}
        />
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center"
          style={{
            background: "linear-gradient(135deg, #6366f1, #8b5cf6, #a855f7)",
            boxShadow:
              "0 0 40px rgba(99,102,241,0.5), 0 0 80px rgba(99,102,241,0.2)",
          }}
        >
          <span
            className="text-white font-bold text-2xl"
            style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: 1 }}
          >
            NK
          </span>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="flex flex-col items-center gap-1"
      >
        <p
          className="text-lg font-semibold"
          style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#e2e8f0" }}
        >
          Nitin Kumar
        </p>
        <p
          className="text-xs tracking-widest uppercase"
          style={{ color: "#6366f1", letterSpacing: "0.25em" }}
        >
          Full Stack Developer
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="loader-bar"
      >
        <div className="loader-bar-fill" />
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
    <ThemeProvider>
      <Suspense fallback={<LoadingScreen />}>
        <AnimatePresence mode="wait">
          {loading ? (
            <LoadingScreen key="loading" />
          ) : (
            <motion.div
              key="main"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/projects" element={<ProjectsPage />} />
              </Routes>
            </motion.div>
          )}
        </AnimatePresence>
      </Suspense>
    </ThemeProvider>
  );
};

export default App;
