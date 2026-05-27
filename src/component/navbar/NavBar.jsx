import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenuAlt3 } from "react-icons/hi";
import { RxCross2 } from "react-icons/rx";
import { HiSun, HiMoon } from "react-icons/hi";
import { navItems } from "../../data/Constant";
import { personalDataObj } from "../../data/data";
import { useTheme } from "../../pages/Home";

const NavBar = () => {
  const { dark, toggleDark } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    navItems.forEach(({ name }) => {
      const el = document.getElementById(name);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id) => {
    setIsOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const bgStyle = scrolled
    ? dark
      ? "rgba(13,13,26,0.9)"
      : "rgba(248,250,252,0.9)"
    : "transparent";

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{
          background: bgStyle,
          backdropFilter: scrolled ? "blur(20px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled
            ? dark
              ? "1px solid rgba(255,255,255,0.06)"
              : "1px solid rgba(0,0,0,0.06)"
            : "none",
          transition: "all 0.3s ease",
        }}
        className="fixed top-0 left-0 right-0 z-40 py-4"
      >
        <nav className="container mx-auto flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => scrollTo("home")}
            className="relative group"
            data-cursor-hover
          >
            <span
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "1.5rem",
                fontWeight: 700,
              }}
              className="gradient-text"
            >
              NK
            </span>
            <span
              className="hidden sm:hidden md:inline ml-2 font-semibold"
              style={{ color: dark ? "#e2e8f0" : "#0f172a" }}
            >
              {personalDataObj.name}
            </span>
            <span
              className="absolute -bottom-1 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-300 rounded-full"
              style={{ background: "linear-gradient(90deg, #6366f1, #a855f7)" }}
            />
          </button>

          {/* Desktop Nav */}
          <div className="flex items-center gap-8 md:hidden">
            <ul className="flex items-center gap-6">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollTo(item.name)}
                    data-cursor-hover
                    className="relative group py-1 text-sm font-medium"
                    style={{
                      color:
                        activeSection === item.name
                          ? "#6366f1"
                          : dark
                          ? "#94a3b8"
                          : "#64748b",
                      transition: "color 0.2s ease",
                    }}
                  >
                    {item.label}
                    <span
                      className="absolute -bottom-1 left-0 h-[2px] rounded-full transition-all duration-300"
                      style={{
                        width: activeSection === item.name ? "100%" : "0%",
                        background: "linear-gradient(90deg, #6366f1, #a855f7)",
                      }}
                    />
                  </button>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-3">
              <button
                onClick={toggleDark}
                data-cursor-hover
                className="p-2 rounded-full transition-all duration-200"
                style={{
                  background: dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)",
                  color: dark ? "#e2e8f0" : "#0f172a",
                }}
              >
                {dark ? <HiSun size={18} /> : <HiMoon size={18} />}
              </button>

              <a
                href="mailto:nitinkumarja2003@gmail.com"
                data-cursor-hover
                className="btn-primary px-5 py-2 rounded-lg text-sm font-semibold"
              >
                <span>Hire Me</span>
              </a>
            </div>
          </div>

          {/* Mobile Controls */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={toggleDark}
              data-cursor-hover
              className="p-2 rounded-full"
              style={{
                background: dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)",
                color: dark ? "#e2e8f0" : "#0f172a",
              }}
            >
              {dark ? <HiSun size={18} /> : <HiMoon size={18} />}
            </button>
            <button
              onClick={() => setIsOpen(true)}
              style={{ color: dark ? "#e2e8f0" : "#0f172a" }}
            >
              <HiMenuAlt3 size={26} />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40"
              style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-72 flex flex-col p-8"
              style={{
                background: dark ? "#0d0d1a" : "#fff",
                borderLeft: dark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.08)",
              }}
            >
              <div className="flex items-center justify-between mb-10">
                <span
                  style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 }}
                  className="gradient-text text-2xl"
                >
                  NK
                </span>
                <button
                  onClick={() => setIsOpen(false)}
                  style={{ color: dark ? "#e2e8f0" : "#0f172a" }}
                >
                  <RxCross2 size={22} />
                </button>
              </div>

              <ul className="flex flex-col gap-2 flex-1">
                {navItems.map((item, i) => (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <button
                      onClick={() => scrollTo(item.name)}
                      className="w-full text-left py-3 px-4 rounded-lg text-base font-medium transition-all"
                      style={{
                        color:
                          activeSection === item.name
                            ? "#6366f1"
                            : dark
                            ? "#94a3b8"
                            : "#64748b",
                        background:
                          activeSection === item.name
                            ? "rgba(99,102,241,0.1)"
                            : "transparent",
                      }}
                    >
                      {item.label}
                    </button>
                  </motion.li>
                ))}
              </ul>

              <a
                href="mailto:nitinkumarja2003@gmail.com"
                className="btn-primary text-center py-3 rounded-xl font-semibold mt-4"
              >
                <span>Hire Me</span>
              </a>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default NavBar;
