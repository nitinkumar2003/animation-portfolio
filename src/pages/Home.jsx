import React from "react";
import NavBar from "../component/navbar/NavBar";
import Hero from "../component/Hero";
import About from "../component/About";
import Skills from "../component/Skills";
import Project from "../component/project/Project";
import Resume from "../component/Resume";
import Services from "../component/Services";
import Testimonials from "../component/Testimonials";
import GithubStats from "../component/GithubStats";
import Contact from "../component/Contact";
import Footer from "../component/Footer";
import ScrollProgress from "../component/ui/ScrollProgress";
import CursorEffect from "../component/ui/CursorEffect";

// Re-export so existing component imports (from '../pages/Home') keep working
export { ThemeContext, useTheme } from "../context/ThemeContext";

const Home = () => (
  <div style={{ minHeight: "100vh" }}>
    <CursorEffect />
    <ScrollProgress />
    <NavBar />
    <Hero />
    <About />
    <Skills />
    {/* <Project /> */}
    <Resume />
    {/* <Services /> */}
    {/* <Testimonials /> */}
    {/* <GithubStats /> */}
    <Contact />
    <Footer />
  </div>
);

export default Home;
