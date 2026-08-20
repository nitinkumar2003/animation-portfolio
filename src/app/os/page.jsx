import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import NitinOSClient from "./NitinOSClient";
import JsonLd from "../../component/site/JsonLd";
import { personalDataObj } from "../../data/data";
import { breadcrumbSchema, graph, pageMeta, PERSON_ID } from "../../lib/seo";
import "./os-page.css";

export const metadata = pageMeta({
  title: "Nitin OS — Interactive Desktop Portfolio",
  description:
    "Nitin OS is an interactive desktop-style portfolio built in Next.js and React: a boot sequence, draggable files with persisted positions, a window manager, a working terminal, live weather, ten languages and an AI profile assistant across 16 apps.",
  path: "/os",
});

const OsPage = () => (
  <div className="nkos-page">
    <JsonLd data={graph(
      breadcrumbSchema([{ name: "Home", href: "/" }, { name: "Nitin OS", href: "/os" }]),
      {
        "@type": "SoftwareApplication",
        name: "Nitin OS",
        applicationCategory: "DeveloperApplication",
        operatingSystem: "Any web browser",
        description:
          "An interactive desktop-style developer portfolio with a boot sequence, window manager, terminal, live weather and an AI profile assistant.",
        author: { "@id": PERSON_ID },
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      },
    )} />

    {/* Server-rendered: this is the real pre-boot state, and it keeps the page
        meaningful for search engines and for anyone without JavaScript. */}
    <header className="nkos-page__intro">
      <Link href="/" className="nkos-page__back">
        <FiArrowLeft /> Back to portfolio
      </Link>
      <h1>Nitin OS — an interactive desktop portfolio</h1>
      <p>
        Built by {personalDataObj.name} in Next.js and React. Boot the machine to explore sixteen working
        applications: a project explorer, a résumé viewer, a developer terminal, live global weather, a
        calculator, maps, a browser, settings with ten languages and theme switching, a recycle bin — and an
        AI assistant that answers questions about his experience. Files are draggable and remember where you
        put them.
      </p>
      <p className="nkos-page__hint">
        Prefer to read instead? The <Link href="/experience">experience</Link>,{" "}
        <Link href="/projects">project case studies</Link> and <Link href="/resume">résumé</Link> are all written out.
      </p>
    </header>

    <NitinOSClient />
  </div>
);

export default OsPage;
