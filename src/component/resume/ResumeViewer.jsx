"use client";

import { useEffect, useState } from "react";
import { FiDownload, FiMoon, FiPrinter, FiSun } from "react-icons/fi";
import ResumeDocument from "./ResumeDocument";
import { resumeLanguages, resumeText } from "../../data/resumeI18n";
import { usePreferences } from "../site/Preferences";
import "../../styles/resume.css";

const STORAGE_KEY = "nk-resume-prefs";

/**
 * Résumé with live theme and language switching.
 *
 * Initial state is deliberately English + dark so the server-rendered HTML is the
 * English résumé — that is what search engines index. Stored preferences are
 * applied after mount.
 */
const ResumeViewer = ({ initialLanguage = "en", initialTheme = "dark", compact = false }) => {
  // The résumé follows the site preference by default, but can be overridden here
  // (a recruiter may want the document in one language and the site in another).
  const site = usePreferences();
  const [language, setLanguage] = useState(initialLanguage);
  const [theme, setTheme] = useState(initialTheme);
  const [linked, setLinked] = useState(true);

  useEffect(() => {
    if (!linked) return;
    setLanguage(site.language);
    setTheme(site.resolvedTheme);
  }, [linked, site.language, site.resolvedTheme]);

  // A ?lang= / ?theme= link wins over stored preferences, so the résumé can be
  // shared in a specific language: /resume?lang=ja&theme=light
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlLanguage = params.get("lang");
    const urlTheme = params.get("theme");
    const known = resumeLanguages.some((item) => item.id === urlLanguage);

    if (known || urlTheme) {
      if (known) setLanguage(urlLanguage);
      if (urlTheme === "light" || urlTheme === "dark") setTheme(urlTheme);
      return;
    }

    try {
      const stored = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "null");
      if (stored?.language) setLanguage(stored.language);
      if (stored?.theme) setTheme(stored.theme);
    } catch { /* ignore */ }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ language, theme }));
    } catch { /* ignore */ }

    // Keep the address bar shareable without adding a history entry.
    const params = new URLSearchParams(window.location.search);
    if (language === "en") params.delete("lang"); else params.set("lang", language);
    if (theme === "dark") params.delete("theme"); else params.set("theme", theme);
    const query = params.toString();
    window.history.replaceState(null, "", query ? `${window.location.pathname}?${query}` : window.location.pathname);
  }, [language, theme]);

  const t = (key) => resumeText(language, key);

  return (
    <div className={compact ? "nkr-wrap nkr-wrap--compact" : "nkr-wrap"}>
      <div className="nkr-bar">
        <div className="nkr-bar__group" role="group" aria-label={t("appearance")}>
          <button type="button" aria-pressed={theme === "dark"} onClick={() => { setLinked(false); setTheme("dark"); }}>
            <FiMoon /> {t("dark")}
          </button>
          <button type="button" aria-pressed={theme === "light"} onClick={() => { setLinked(false); setTheme("light"); }}>
            <FiSun /> {t("light")}
          </button>
        </div>

        <select value={language} onChange={(event) => { setLinked(false); setLanguage(event.target.value); }} aria-label={t("language")}>
          {resumeLanguages.map((item) => (
            <option key={item.id} value={item.id}>{item.code} · {item.name}</option>
          ))}
        </select>

        <div className="nkr-bar__spacer" />

        <div className="nkr-bar__group">
          <button type="button" onClick={() => window.print()}>
            <FiPrinter /> {t("print")}
          </button>
        </div>
        <a className="nk-btn nk-btn--primary nk-btn--sm" href="/NitinKumar.pdf" download>
          <FiDownload /> {t("download")}
        </a>
      </div>

      <ResumeDocument language={language} theme={theme} />
    </div>
  );
};

export default ResumeViewer;
