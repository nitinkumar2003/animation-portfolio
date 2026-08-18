"use client";

import dynamic from "next/dynamic";

const ComputerPortfolio = dynamic(() => import("../component/ComputerPortfolio"), {
  ssr: false,
  loading: () => <div className="nkos-next-loading"><span>NK</span><p>Loading Nitin OS</p></div>,
});

const NitinOSClient = () => <ComputerPortfolio />;

export default NitinOSClient;
