"use client";

import dynamic from "next/dynamic";
import { ThemeProvider } from "../../context/ThemeContext";

const ProjectsPage = dynamic(() => import("../../views/ProjectsPage"), {
  ssr: false,
  loading: () => <div className="nkos-next-loading"><span>NK</span><p>Loading project archive</p></div>,
});

const ProjectsClient = () => (
  <ThemeProvider>
    <ProjectsPage />
  </ThemeProvider>
);

export default ProjectsClient;
