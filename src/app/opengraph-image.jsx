import { ImageResponse } from "next/og";
import { personalDataObj } from "../data/data";

export const runtime = "nodejs";
export const alt = "Nitin Kumar — Full Stack Developer building React, Next.js, Node.js and AI products";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "linear-gradient(135deg, #05070a 0%, #0a1218 55%, #071a17 100%)",
          color: "#e9eff3",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 60,
              height: 60,
              borderRadius: 18,
              background: "linear-gradient(140deg, #14b88a, #45e6b0)",
              color: "#04120d",
              fontSize: 26,
              fontWeight: 700,
            }}
          >
            NK
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 28, fontWeight: 600 }}>{personalDataObj.name}</div>
            <div style={{ fontSize: 18, color: "#8b9aa5" }}>Full Stack Developer · Noida, India</div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 66, fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.03em" }}>
            I build products that ship —
          </div>
          <div
            style={{
              fontSize: 66,
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              color: "#45e6b0",
            }}
          >
            interface to production.
          </div>
          <div style={{ marginTop: 28, fontSize: 25, color: "#97a6b2", maxWidth: 900 }}>
            4+ years · AI SaaS, dashboards, real estate, live streaming · React · Next.js · TypeScript · Node.js · NestJS
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 12, height: 12, borderRadius: 6, background: "#45e6b0" }} />
          <div style={{ fontSize: 21, color: "#8b9aa5" }}>Available for freelance, contract and remote work</div>
        </div>
      </div>
    ),
    size,
  );
}
