import React from "react";
import ComputerPortfolio from "../component/ComputerPortfolio";

// Re-export so existing component imports (from '../pages/Home') keep working
export { ThemeContext, useTheme } from "../context/ThemeContext";

const Home = () => (
  <div style={{ minHeight: "100vh" }}>
    <ComputerPortfolio />
  </div>
);

export default Home;
