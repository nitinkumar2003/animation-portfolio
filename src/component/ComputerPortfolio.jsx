import React, { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { bootSteps, defaultPreferences } from "./computer-portfolio/config";
import { loadStoredValue, persistStoredValue } from "./computer-portfolio/lib/osUtils";
import { useResolvedTheme } from "./computer-portfolio/lib/hooks";
import { BootScreen, LoginScreen, PowerScreen } from "./computer-portfolio/screens/SystemScreens";
import Desktop from "./computer-portfolio/shell/Desktop";

const ComputerPortfolio = () => {
  const [stage, setStage] = useState("power");
  const [bootIndex, setBootIndex] = useState(0);
  const [preferences, setPreferences] = useState(() => ({
    ...defaultPreferences,
    ...loadStoredValue("nkos-preferences", {}),
  }));
  const resolvedTheme = useResolvedTheme(preferences.theme);

  useEffect(() => {
    persistStoredValue("nkos-preferences", preferences);
  }, [preferences]);

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
        {stage === "power" && <PowerScreen key="power" onPower={() => setStage("boot")} />}
        {stage === "boot" && <BootScreen key="boot" bootIndex={bootIndex} onSkip={() => setStage("login")} />}
        {stage === "login" && <LoginScreen key="login" preferences={preferences} onEnter={() => setStage("desktop")} onPowerOff={() => setStage("power")} />}
        {stage === "desktop" && <Desktop key="desktop" preferences={preferences} setPreferences={setPreferences} resolvedTheme={resolvedTheme} onPowerOff={() => setStage("power")} />}
      </AnimatePresence>
    </main>
  );
};

export default ComputerPortfolio;
