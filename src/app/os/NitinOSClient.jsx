"use client";

import dynamic from "next/dynamic";

/**
 * The OS is client-only (it needs window at module scope), so this loading state is
 * what the server renders and what every visitor sees before the bundle arrives.
 * It carries the real page heading rather than a bare spinner.
 */
const ComputerPortfolio = dynamic(() => import("../../component/ComputerPortfolio"), {
  ssr: false,
  loading: () => (
    <div className="nkos-next-loading">
      <span>NK</span>
      <p>Loading Nitin OS</p>
    </div>
  ),
});

const NitinOSClient = () => <ComputerPortfolio />;

export default NitinOSClient;
