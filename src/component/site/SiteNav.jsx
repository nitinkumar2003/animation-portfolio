"use client";

import Link from "next/link";
import { FiArrowUpRight, FiMonitor } from "react-icons/fi";
import { personalDataObj } from "../../data/data";
import { usePreferences } from "./Preferences";
import PreferenceControls from "./PreferenceControls";

const links = [
  { href: "/projects", key: "navWork" },
  { href: "/experience", key: "navExperience" },
  { href: "/resume", key: "navResume" },
  { href: "/#services", key: "navServices" },
  { href: "/#contact", key: "navContact" },
];

const SiteNav = () => {
  const { t } = usePreferences();

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
          {links.map((link) => <Link key={link.href} href={link.href}>{t(link.key)}</Link>)}
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
