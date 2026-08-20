import Link from "next/link";
import { FiArrowUpRight, FiMonitor } from "react-icons/fi";
import { personalDataObj } from "../../data/data";

const links = [
  { href: "/projects", label: "Work" },
  { href: "/experience", label: "Experience" },
  { href: "/resume", label: "Résumé" },
  { href: "/#services", label: "Services" },
  { href: "/#contact", label: "Contact" },
];

const SiteNav = () => (
  <header className="nk-nav">
    <div className="nk-nav__inner">
      <Link href="/" className="nk-brand" aria-label="Nitin Kumar — home">
        <span className="nk-brand__mark">NK</span>
        <span className="nk-brand__text">
          <b>{personalDataObj.name}</b>
          <span>Full Stack Developer</span>
        </span>
      </Link>

      <nav className="nk-nav__links" aria-label="Primary">
        {links.map((link) => (
          <Link key={link.href} href={link.href}>{link.label}</Link>
        ))}
      </nav>

      <div className="nk-nav__cta">
        <Link href="/os" className="nk-btn nk-btn--ghost nk-btn--sm" title="Launch the interactive desktop portfolio">
          <FiMonitor /> Nitin OS
        </Link>
        <a href={`mailto:${personalDataObj.email}`} className="nk-btn nk-btn--primary nk-btn--sm">
          Hire me <FiArrowUpRight />
        </a>
      </div>
    </div>
  </header>
);

export default SiteNav;
