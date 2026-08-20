import { personalDataObj } from "../data/data";
import { positioning } from "../data/content";

export default function manifest() {
  return {
    name: `${personalDataObj.name} — ${positioning.role}`,
    short_name: "Nitin Kumar",
    description: positioning.subline,
    start_url: "/",
    display: "standalone",
    background_color: "#05070a",
    theme_color: "#05070a",
    categories: ["portfolio", "developer", "technology"],
    icons: [
      { src: "/favicon.jpeg", sizes: "any", type: "image/jpeg" },
      { src: "/nitin-kumar.jpg", sizes: "512x512", type: "image/jpeg", purpose: "any" },
    ],
  };
}
