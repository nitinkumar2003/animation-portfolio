import React, { useState } from "react";
import { FiDownload, FiExternalLink, FiEye, FiFileText, FiGlobe, FiMoon, FiPrinter, FiSun } from "react-icons/fi";
import ResumeDocument from "../../resume/ResumeDocument";
import { resumeLanguages, resumeText } from "../../../data/resumeI18n";
import "../../../styles/resume.css";

const resumePDF = "/NitinKumar.pdf";

/**
 * Résumé app. Opens on the live document, which inherits the OS language and
 * theme but can be overridden here, and can switch to the verified PDF.
 */
const ResumeApp = ({ preferences, resolvedTheme }) => {
  const [mode, setMode] = useState("live");
  const [language, setLanguage] = useState(preferences?.language || "en");
  const [theme, setTheme] = useState(resolvedTheme || "dark");
  const t = (key) => resumeText(language, key);

  return (
    <div className="nkos-resume-app">
      <div className="nkos-document-toolbar">
        <div className="nkos-document-name">
          <FiFileText />
          <b>{mode === "live" ? `${t("resume")} · ${t("role")}` : "NitinKumar.pdf"}</b>
          <small>{mode === "live" ? t("availability") : "2-page verified resume"}</small>
        </div>
        <div>
          <button type="button" className={mode === "live" ? "active" : ""} onClick={() => setMode("live")}>
            <FiEye /><span>{t("resume")}</span>
          </button>
          <button type="button" className={mode === "pdf" ? "active" : ""} onClick={() => setMode("pdf")}>
            <FiFileText /><span>PDF</span>
          </button>
          <a href={resumePDF} download="NitinKumar.pdf"><FiDownload /><span>{t("download")}</span></a>
        </div>
      </div>

      {mode === "live" ? (
        <div className="nkos-resume-live">
          <div className="nkos-resume-controls">
            <label>
              <FiGlobe />
              <select value={language} onChange={(event) => setLanguage(event.target.value)} aria-label={t("language")}>
                {resumeLanguages.map((item) => <option key={item.id} value={item.id}>{item.code} · {item.name}</option>)}
              </select>
            </label>
            <div className="nkos-resume-theme" role="group" aria-label={t("appearance")}>
              <button type="button" className={theme === "dark" ? "active" : ""} onClick={() => setTheme("dark")}><FiMoon /> {t("dark")}</button>
              <button type="button" className={theme === "light" ? "active" : ""} onClick={() => setTheme("light")}><FiSun /> {t("light")}</button>
            </div>
            <button type="button" className="nkos-resume-print" onClick={() => window.print()}><FiPrinter /> {t("print")}</button>
            <a href={resumePDF} target="_blank" rel="noreferrer" className="nkos-resume-print"><FiExternalLink /> {t("viewPdf")}</a>
          </div>
          <div className="nkos-resume-scroll">
            <ResumeDocument language={language} theme={theme} headingLevel={2} />
          </div>
        </div>
      ) : (
        <iframe
          className="nkos-pdf-viewer"
          src={`${resumePDF}#view=FitH&toolbar=1&navpanes=0`}
          title="Nitin Kumar resume PDF"
        />
      )}
    </div>
  );
};

export default ResumeApp;
