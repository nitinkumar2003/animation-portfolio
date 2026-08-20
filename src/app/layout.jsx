import { Inter, Space_Grotesk } from "next/font/google";
import "../styles/base.css";
import { personalDataObj } from "../data/data";
import { positioning } from "../data/content";
import { SITE_URL } from "../lib/seo";

// Self-hosted at build time by next/font — no render-blocking request to Google.
const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Nitin Kumar — Full Stack Developer | React, Next.js, Node.js & AI",
    template: "%s | Nitin Kumar",
  },
  description: positioning.subline,
  applicationName: "Nitin Kumar Portfolio",
  authors: [{ name: personalDataObj.name, url: personalDataObj.linkedin }],
  creator: personalDataObj.name,
  publisher: personalDataObj.name,
  category: "technology",
  keywords: [
    "Nitin Kumar", "Nitin Kumar developer", "Full Stack Developer", "Full Stack Developer India",
    "React Developer Noida", "Next.js Developer", "React.js Developer", "Node.js Developer",
    "NestJS Developer", "TypeScript Developer", "React Native Developer", "AI SaaS Developer",
    "OpenAI integration developer", "Stripe integration developer", "Freelance Full Stack Developer India",
    "Hire React developer", "MERN stack developer", "Remote full stack developer",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: "/",
    title: "Nitin Kumar — Full Stack Developer",
    description: positioning.subline,
    siteName: `${personalDataObj.name} — ${positioning.role}`,
    locale: "en_IN",
    firstName: "Nitin",
    lastName: "Kumar",
    username: "nitinkumar2003",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nitin Kumar — Full Stack Developer",
    description: "4+ years building AI SaaS, dashboards, real-estate and streaming products. React, Next.js, Node.js, NestJS, React Native.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [{ url: "/favicon.jpeg", type: "image/jpeg" }],
    apple: [{ url: "/nitin-kumar.jpg" }],
  },
  manifest: "/manifest.webmanifest",
  formatDetection: { telephone: true, email: true, address: false },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "dark",
  themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#05070a" }, { color: "#05070a" }],
};

const RootLayout = ({ children }) => (
  <html lang="en" className={`dark ${inter.variable} ${spaceGrotesk.variable}`} suppressHydrationWarning>
    <body>{children}</body>
  </html>
);

export default RootLayout;
