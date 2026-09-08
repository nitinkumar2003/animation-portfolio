"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { bootSteps, defaultPreferences } from "./computer-portfolio/config";
import { clearSessionValue, loadSessionValue, loadStoredValue, persistSessionValue, persistStoredValue } from "./computer-portfolio/lib/osUtils";
import { BootScreen, LoginScreen, PowerScreen } from "./computer-portfolio/screens/SystemScreens";
import Desktop from "./computer-portfolio/shell/Desktop";
import "../index.css";

const STAGE_KEY = "nkos-stage";

const ComputerPortfolio = ({ onExit }) => {
  // A refresh mid-session resumes the desktop instead of forcing Power → Boot
  // → Login again; a deliberate Power Off clears this so the *next* boot
  // still goes through the full sequence.
  const [stage, setStage] = useState(() => (loadSessionValue(STAGE_KEY, "power") === "desktop" ? "desktop" : "power"));
  const [bootIndex, setBootIndex] = useState(0);
  const [preferences, setPreferences] = useState(() => {
    const stored = loadStoredValue("nkos-preferences", {});
    // Only "light"/"dark" are valid themes now — collapse any legacy "system" value.
    return { ...defaultPreferences, ...stored, theme: stored.theme === "light" ? "light" : "dark" };
  });
  const resolvedTheme = preferences.theme;

  useEffect(() => {
    persistStoredValue("nkos-preferences", preferences);
  }, [preferences]);

  useEffect(() => {
    if (stage === "desktop") persistSessionValue(STAGE_KEY, "desktop");
  }, [stage]);

  // A deliberate Power Off means "start fresh next time" — only a reload the
  // visitor didn't ask for should skip back to where they were.
  const powerOff = () => { clearSessionValue(STAGE_KEY); setStage("power"); };

  useEffect(() => {
    if (stage !== "boot") return undefined;
    setBootIndex(0);
    let index = 0;
    const timer = window.setInterval(() => {
      index += 1;
      setBootIndex(index);
      if (index >= bootSteps.length - 1) {
        window.clearInterval(timer);
        window.setTimeout(() => setStage("login"), 650);
      }
    }, 430);
    return () => window.clearInterval(timer);
  }, [stage]);

  return (
    <main className={`nkos-root theme-${resolvedTheme}`} lang={preferences.language} dir={preferences.language === "ar" ? "rtl" : "ltr"} data-theme={resolvedTheme}>
      <AnimatePresence mode="wait">
        {stage === "power" && <PowerScreen key="power" onPower={() => setStage("boot")} onExit={onExit} />}
        {stage === "boot" && <BootScreen key="boot" bootIndex={bootIndex} onSkip={() => setStage("login")} />}
        {stage === "login" && <LoginScreen key="login" preferences={preferences} onEnter={() => setStage("desktop")} onPowerOff={powerOff} onExit={onExit} />}
        {stage === "desktop" && <Desktop key="desktop" preferences={preferences} setPreferences={setPreferences} resolvedTheme={resolvedTheme} onPowerOff={powerOff} onExit={onExit} />}
      </AnimatePresence>
    </main>
  );
};

export default ComputerPortfolio;
