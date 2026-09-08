"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiArrowUpRight, FiMonitor } from "react-icons/fi";
import { personalDataObj } from "../../data/data";
import { usePreferences } from "./Preferences";
import PreferenceControls from "./PreferenceControls";

// `sectionId` is the matching id of that section on the homepage itself, so
// the link can highlight as you scroll past it there — separate from `href`,
// which still takes you to the dedicated page for Work/Experience.
const links = [
  { href: "/projects", key: "navWork", sectionId: "work" },
  { href: "/experience", key: "navExperience", sectionId: "experience" },
  { href: "/resume", key: "navResume" },
  { href: "/#services", key: "navServices", sectionId: "services" },
  { href: "/#contact", key: "navContact", sectionId: "contact" },
];

/** Tracks which of the homepage's own sections is currently in view, so the
 * nav can highlight Work/Experience/Services/Contact as you scroll past
 * them — independent of which page each link actually navigates to. */
const useActiveSection = (pathname) => {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    if (pathname !== "/") { setActiveSection(""); return undefined; }
    const sections = links
      .map((link) => link.sectionId && document.getElementById(link.sectionId))
      .filter(Boolean);
    if (!sections.length) return undefined;

    // The "current" section is the last one (in document order) whose top has
    // crossed a reading line near the top of the viewport — computed directly
    // from live rects rather than a narrow intersection band, so a short
    // section between two tall ones still gets picked up correctly.
    const recompute = () => {
      const line = window.innerHeight * 0.35;
      let current = "";
      sections.forEach((section) => {
        if (section.getBoundingClientRect().top <= line) current = section.id;
      });
      setActiveSection(current);
    };

    const observer = new IntersectionObserver(recompute, { threshold: [0, 0.25, 0.5, 0.75, 1] });
    sections.forEach((section) => observer.observe(section));
    recompute();
    return () => observer.disconnect();
  }, [pathname]);

  return activeSection;
};

const SiteNav = () => {
  const { t } = usePreferences();
  const pathname = usePathname();
  const activeSection = useActiveSection(pathname);

  const isActive = (link) => (
    link.sectionId && pathname === "/"
      ? activeSection === link.sectionId
      : pathname === link.href || pathname.startsWith(`${link.href}/`)
  );

  return (
    <header className="nk-nav">
      <div className="nk-nav__inner">
        <Link href="/" className="nk-brand" aria-label={`${personalDataObj.name} — ${t("home")}`}>
          <span className="nk-brand__mark">NK</span>
          <span className="nk-brand__text">
            <b>{personalDataObj.name}</b>
            <span>{t("role")}</span>
          </span>
        </Link>

        <nav className="nk-nav__links" aria-label="Primary">
          {links.map((link) => {
            const active = isActive(link);
            return (
              <Link key={link.href} href={link.href} className={active ? "active" : ""} aria-current={active ? "page" : undefined}>
                {t(link.key)}
              </Link>
            );
          })}
        </nav>

        <div className="nk-nav__cta">
          <PreferenceControls />
          <Link href="/os" className="nk-btn nk-btn--ghost nk-btn--sm" title={t("navOs")}>
            <FiMonitor /> {t("navOs")}
          </Link>
          <a href={`mailto:${personalDataObj.email}`} className="nk-btn nk-btn--primary nk-btn--sm">
            {t("navHire")} <FiArrowUpRight />
          </a>
        </div>
      </div>
    </header>
  );
};

export default SiteNav;
