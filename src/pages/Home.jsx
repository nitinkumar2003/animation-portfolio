import React, { useState, useEffect, createContext, useContext } from "react";
import NavBar from "../component/navbar/NavBar";
import Hero from "../component/Hero";
import About from "../component/About";
import Skills from "../component/Skills";
import Project from "../component/project/Project";
import Resume from "../component/Resume";
import Services from "../component/Services";
import Contact from "../component/Contact";
import Footer from "../component/Footer";
import ScrollProgress from "../component/ui/ScrollProgress";
import CursorEffect from "../component/ui/CursorEffect";

export const ThemeContext = createContext({ dark: true, toggleDark: () => {} });

const Home = () => {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "light") setDark(false);
  }, []);

  const toggleDark = () => {
    const next = !dark;
    setDark(next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    document.documentElement.classList.toggle("light", !dark);
    document.body.style.backgroundColor = dark ? "#0d0d1a" : "#f8fafc";
    document.body.style.color = dark ? "#e2e8f0" : "#0f172a";
  }, [dark]);

  return (
    <ThemeContext.Provider value={{ dark, toggleDark }}>
      <div
        style={{
          backgroundColor: dark ? "#0d0d1a" : "#f8fafc",
          color: dark ? "#e2e8f0" : "#0f172a",
          minHeight: "100vh",
          transition: "background-color 0.3s ease, color 0.3s ease",
        }}
      >
        <CursorEffect />
        <ScrollProgress />
        <NavBar />
        <Hero />
        <About />
        <Skills />
        <Project />
        <Resume />
        <Services />
        <Contact />
        <Footer />
      </div>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

export default Home;
