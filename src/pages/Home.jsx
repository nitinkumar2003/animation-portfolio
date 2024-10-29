import React, { useState } from "react";
import NavBar from "../component/navbar/NavBar";
import Hero from "../component/Hero";
import Skills from "../component/Skills";
import Resume from "../component/Resume";
import Contact from "../component/Contact";
import Footer from "../component/Footer";
import Project from "../component/project/Project";
const Home = () => {
  const [darkMode, setDarkMode] = useState(false);
  function toggleDarkMode() {
    setDarkMode((prevDarkMode) => !prevDarkMode);
  }
  return (
    <>
      <NavBar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <Hero />
      <Skills />  
      <Project />
      <Resume />
      <Contact />
      <Footer />
    </>
  );
};

export default Home;
