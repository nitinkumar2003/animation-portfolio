import "../index.css";

export const metadata = {
  title: "Nitin Kumar | Full Stack Developer",
  description: "Nitin OS, an interactive full stack developer portfolio by Nitin Kumar.",
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
