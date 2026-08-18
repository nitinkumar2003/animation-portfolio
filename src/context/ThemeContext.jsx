"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export const ThemeContext = createContext({ dark: true, toggleDark: () => {} });

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
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
      {children}
    </ThemeContext.Provider>
  );
};
