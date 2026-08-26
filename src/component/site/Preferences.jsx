"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { siteDirection, siteText } from "../../data/siteI18n";

/**
 * Theme + language for the server-rendered site.
 *
 * SSR always renders English + dark. That is deliberate: the HTML search engines
 * index stays the canonical English version, and there is no hydration mismatch.
 * Stored or URL preferences are applied immediately after mount.
 *
 * The actual paint is handled by `themeScript` below, which runs before first paint
 * so the light theme never flashes dark.
 */

const STORAGE_KEY = "nk-site-prefs";

const PreferencesContext = createContext({
  theme: "dark",
  resolvedTheme: "dark",
  language: "en",
  setTheme: () => {},
  setLanguage: () => {},
  t: (key) => key,
});

export const usePreferences = () => useContext(PreferencesContext);

/**
 * Blocking script: applies the stored theme/language to <html> before the first
 * paint. Kept tiny and dependency-free because it is inlined into the document.
 */
export const themeScript = `(function(){try{
var p=JSON.parse(localStorage.getItem(${JSON.stringify(STORAGE_KEY)})||"{}");
var q=new URLSearchParams(location.search);
var t=q.get("theme")||p.theme||"system";
var l=q.get("lang")||p.language||"en";
var m=window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark";
var r=t==="system"?m:t;
var e=document.documentElement;
e.setAttribute("data-theme",r);
e.setAttribute("data-lang",l);
e.setAttribute("dir",l==="ar"?"rtl":"ltr");
e.style.colorScheme=r;
}catch(e){}})();`;

export const PreferencesProvider = ({ children }) => {
  const [theme, setThemeState] = useState("dark");
  const [systemTheme, setSystemTheme] = useState("dark");
  const [language, setLanguageState] = useState("en");

  // Read what themeScript already applied, so provider state matches the DOM.
  useEffect(() => {
    let stored = {};
    try { stored = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "{}"); } catch { /* ignore */ }

    const params = new URLSearchParams(window.location.search);
    const urlLang = params.get("lang");
    const urlTheme = params.get("theme");

    setThemeState(urlTheme || stored.theme || "system");
    setLanguageState(urlLang || stored.language || "en");

    const media = window.matchMedia("(prefers-color-scheme: light)");
    const sync = () => setSystemTheme(media.matches ? "light" : "dark");
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  const resolvedTheme = theme === "system" ? systemTheme : theme;

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", resolvedTheme);
    root.setAttribute("data-lang", language);
    root.setAttribute("dir", siteDirection(language));
    root.setAttribute("lang", language);
    root.style.colorScheme = resolvedTheme;

    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ theme, language }));
    } catch { /* private mode */ }
  }, [resolvedTheme, theme, language]);

  const setTheme = useCallback((value) => setThemeState(value), []);
  const setLanguage = useCallback((value) => setLanguageState(value), []);

  const value = useMemo(() => ({
    theme,
    resolvedTheme,
    language,
    setTheme,
    setLanguage,
    t: (key, vars) => siteText(language, key, vars),
  }), [theme, resolvedTheme, language, setTheme, setLanguage]);

  return <PreferencesContext.Provider value={value}>{children}</PreferencesContext.Provider>;
};
