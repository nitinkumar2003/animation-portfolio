import Link from "next/link";
import ResumeViewer from "../../../component/resume/ResumeViewer";
import JsonLd from "../../../component/site/JsonLd";
import { breadcrumbSchema, graph, pageMeta, personSchema } from "../../../lib/seo";

export const metadata = pageMeta({
  title: "Résumé — Nitin Kumar, Full Stack Developer",
  description:
    "Full résumé of Nitin Kumar: 4+ years as a Full Stack / React.js Developer across React, Next.js, TypeScript, Node.js, NestJS, React Native, AI integrations and payment gateways. Switchable dark/light theme, ten languages, printable, or download the PDF.",
  path: "/resume",
  type: "profile",
});

const ResumePage = () => (
  <>
    <JsonLd data={graph(
      breadcrumbSchema([{ name: "Home", href: "/" }, { name: "Résumé", href: "/resume" }]),
      personSchema,
    )} />

    <section className="nk-section nk-section--tight">
      <div className="nk-shell">
        <div className="nk-crumbs">
          <Link href="/">Home</Link><span>/</span><span>Résumé</span>
        </div>

        {/* Renders English + dark on the server; the viewer restores the visitor's
            stored theme and language after hydration. */}
        <div style={{ marginTop: "1.8rem" }}>
          <ResumeViewer />
        </div>
      </div>
    </section>
  </>
);

export default ResumePage;
