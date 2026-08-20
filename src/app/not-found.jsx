import Link from "next/link";
import { FiArrowLeft, FiFolder, FiMail, FiMonitor } from "react-icons/fi";
import "../styles/site.css";
import { personalDataObj } from "../data/data";

export const metadata = {
  title: "Page not found",
  description: "This page does not exist on Nitin Kumar's portfolio.",
  robots: { index: false, follow: true },
};

const NotFound = () => (
  <div className="nk">
    <main className="nk-section" style={{ display: "grid", placeItems: "center", minHeight: "100vh" }}>
      <div className="nk-shell" style={{ textAlign: "center" }}>
        <span className="nk-eyebrow" style={{ justifyContent: "center" }}>Error 404</span>
        <h1 style={{ margin: "1.2rem 0 0", fontSize: "clamp(2.2rem, 6vw, 3.6rem)" }}>
          That page doesn&apos;t exist.
        </h1>
        <p style={{ maxWidth: "34rem", margin: "1.2rem auto 0", color: "var(--nk-dim)", fontSize: "1.05rem", lineHeight: 1.7 }}>
          The link may be outdated or mistyped. Everything worth seeing is one click away.
        </p>
        <div className="nk-cta__actions">
          <Link href="/" className="nk-btn nk-btn--primary"><FiArrowLeft /> Back to portfolio</Link>
          <Link href="/projects" className="nk-btn nk-btn--ghost"><FiFolder /> Browse the work</Link>
          <Link href="/os" className="nk-btn nk-btn--ghost"><FiMonitor /> Launch Nitin OS</Link>
        </div>
        <div className="nk-cta__links">
          <Link href="/experience">Experience</Link>
          <Link href="/resume">Résumé</Link>
          <a href={`mailto:${personalDataObj.email}`}><FiMail /> Email Nitin</a>
        </div>
      </div>
    </main>
  </div>
);

export default NotFound;
