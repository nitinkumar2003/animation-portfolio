import "../index.css";

const siteUrl = new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000");

export const metadata = {
  metadataBase: siteUrl,
  title: {
    default: "Nitin Kumar | Full Stack Developer",
    template: "%s | Nitin Kumar",
  },
  description: "Interactive developer portfolio of Nitin Kumar, a Full Stack Developer with 4+ years of experience in Next.js, React, Node.js, NestJS, AI SaaS, payments, dashboards, realtime systems, and mobile apps.",
  applicationName: "Nitin OS",
  authors: [{ name: "Nitin Kumar", url: "https://www.linkedin.com/in/nitin-kumar-42026421b" }],
  creator: "Nitin Kumar",
  publisher: "Nitin Kumar",
  keywords: [
    "Nitin Kumar", "Full Stack Developer", "Next.js Developer", "React Developer", "Node.js Developer",
    "NestJS Developer", "TypeScript", "AI SaaS Developer", "Freelance Developer India", "React Native Developer",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: "/",
    title: "Nitin Kumar | Full Stack Developer",
    description: "Explore Nitin OS: projects, architecture, experience, resume, and an AI-powered professional profile assistant.",
    siteName: "Nitin OS",
    locale: "en_IN",
    images: [{ url: "/nitin-kumar.jpg", width: 630, height: 673, alt: "Nitin Kumar, Full Stack Developer" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nitin Kumar | Full Stack Developer",
    description: "Full Stack Developer building web, mobile, SaaS, AI, dashboard, payment, and realtime products.",
    images: ["/nitin-kumar.jpg"],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: "/favicon.jpeg",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "dark light",
};

const RootLayout = ({ children }) => (
  <html lang="en" className="dark" suppressHydrationWarning>
    <body>{children}</body>
  </html>
);

export default RootLayout;
