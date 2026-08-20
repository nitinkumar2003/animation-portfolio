import { ImageResponse } from "next/og";
import { enrichedProjects, getProjectBySlug } from "../../../../data/content";
import { initialsOf } from "../../../../component/site/ProjectCard";

export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export const alt = "Project case study by Nitin Kumar, Full Stack Developer";

export const generateStaticParams = () => enrichedProjects.map((project) => ({ slug: project.slug }));

/** Each case study shares with its own artwork, tinted by the project's accent. */
export default async function ProjectOgImage({ params }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return new ImageResponse(<div style={{ background: "#05070a", width: "100%", height: "100%" }} />, size);

  const [c1, c2] = project.accent;
  const badges = [
    project.hasLiveLink && "Live",
    project.playStore && "Google Play",
    project.appStore && "App Store",
  ].filter(Boolean);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#05070a",
          color: "#e9eff3",
          fontFamily: "sans-serif",
        }}
      >
        {/* Accent panel carrying the project's mark */}
        <div
          style={{
            width: 380,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: `linear-gradient(150deg, ${c1} 0%, ${c2} 100%)`,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 210,
              height: 210,
              borderRadius: 54,
              background: "rgba(5, 7, 10, 0.42)",
              border: "2px solid rgba(255,255,255,0.28)",
              fontSize: 92,
              fontWeight: 700,
              letterSpacing: "-0.05em",
              color: "#fff",
            }}
          >
            {initialsOf(project.title)}
          </div>
        </div>

        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "62px 60px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                padding: "7px 16px",
                borderRadius: 8,
                border: `1px solid ${c1}`,
                color: c1,
                fontSize: 20,
                fontWeight: 600,
              }}
            >
              {project.category}
            </div>
            {badges.map((badge) => (
              <div
                key={badge}
                style={{
                  padding: "7px 16px",
                  borderRadius: 8,
                  border: "1px solid rgba(255,255,255,0.2)",
                  color: "#97a6b2",
                  fontSize: 20,
                }}
              >
                {badge}
              </div>
            ))}
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 58, fontWeight: 700, lineHeight: 1.08, letterSpacing: "-0.03em" }}>
              {project.title}
            </div>
            <div style={{ marginTop: 22, fontSize: 26, lineHeight: 1.45, color: "#97a6b2" }}>
              {project.shortDesc}
            </div>
            <div style={{ marginTop: 26, fontSize: 21, color: "#6a7b88" }}>
              {project.tech.slice(0, 5).join("  ·  ")}
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 42,
                height: 42,
                borderRadius: 12,
                background: "linear-gradient(140deg, #14b88a, #45e6b0)",
                color: "#04120d",
                fontSize: 18,
                fontWeight: 700,
              }}
            >
              NK
            </div>
            <div style={{ fontSize: 22, color: "#97a6b2" }}>
              {`Nitin Kumar · Full Stack Developer · ${project.role}`}
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
