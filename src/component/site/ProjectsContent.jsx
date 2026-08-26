"use client";

import Link from "next/link";
import { personalDataObj } from "../../data/data";
import { enrichedProjects } from "../../data/content";
import ProjectGrid from "./ProjectGrid";
import { usePreferences } from "./Preferences";

const ProjectsContent = () => {
  const { t, language } = usePreferences();

  return (
    <section className="nk-section nk-section--tight">
      <div className="nk-shell">
        <div className="nk-crumbs">
          <Link href="/">{t("home")}</Link><span>/</span><span>{t("projects")}</span>
        </div>

        <div className="nk-section-head" style={{ marginTop: "1.4rem" }}>
          <span className="nk-eyebrow">{t("selectedWork")}</span>
          <h1 style={{ margin: "1rem 0 0", fontSize: "clamp(1.9rem, 4vw, 3rem)" }}>
            {t("projectsTitle", { count: personalDataObj.projects.length })}
          </h1>
        </div>

        <ProjectGrid projects={enrichedProjects} />

        {language !== "en" && <p className="nk-i18n-note">{t("technicalNote")}</p>}
      </div>
    </section>
  );
};

export default ProjectsContent;
