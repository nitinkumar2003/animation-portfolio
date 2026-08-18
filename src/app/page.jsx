import NitinOSClient from "./NitinOSClient";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Nitin Kumar",
  jobTitle: "Full Stack Developer",
  description: "Full Stack Developer with 4+ years of experience building web applications, SaaS platforms, dashboards, AI systems, realtime applications, and mobile products.",
  email: "mailto:nitinkumarja2003@gmail.com",
  telephone: "+91 7078216535",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Noida",
    addressRegion: "Uttar Pradesh",
    addressCountry: "IN",
  },
  sameAs: [
    "https://github.com/nitinkumar2003",
    "https://www.linkedin.com/in/nitin-kumar-42026421b",
    "https://leetcode.com/u/Nitinjanmeda/",
  ],
  knowsAbout: ["Next.js", "React.js", "TypeScript", "Node.js", "NestJS", "MongoDB", "Supabase", "OpenAI", "Stripe", "React Native"],
};

const HomePage = () => <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} /><NitinOSClient /></>;

export default HomePage;
