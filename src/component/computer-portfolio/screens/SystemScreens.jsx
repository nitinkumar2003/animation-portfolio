import React from "react";
import { motion } from "framer-motion";
import { FiArrowRight, FiCpu, FiHardDrive, FiPower, FiWifi, FiZap } from "react-icons/fi";
import { personalDataObj } from "../../../data/data";
import profileImg from "../../../assets/images.jpg";
import { bootSteps } from "../config";
import { useClock } from "../lib/hooks";
import { formatDate, formatTime } from "../lib/osUtils";
import { StatusTag } from "../ui/OsPrimitives";

export const PowerScreen = ({ onPower }) => (
  <motion.section className="nkos-power-screen" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
    <div className="nkos-hardware-label"><span>NK / 03</span><span>FULL STACK WORKSTATION</span></div>
    <div className="nkos-power-center">
      <div className="nkos-power-identity"><span>NITIN</span><strong>OS</strong></div>
      <p>React · Next.js · Node.js · AI</p>
      <button type="button" className="nkos-power-button" onClick={onPower} aria-label="Power on Nitin OS"><FiPower /></button>
      <button type="button" className="nkos-power-copy" onClick={onPower}>Power on portfolio</button>
    </div>
    <div className="nkos-power-footer"><span>NOIDA, INDIA</span><span>BUILD 2026.08</span></div>
  </motion.section>
);

export const BootScreen = ({ bootIndex, onSkip }) => {
  const progress = Math.min(((bootIndex + 1) / bootSteps.length) * 100, 100);

  return (
    <motion.section className="nkos-boot-screen" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="nkos-boot-brand"><span>NK</span><div><strong>Nitin OS</strong><small>Developer workstation firmware</small></div></div>
      <div className="nkos-boot-console">
        <div className="nkos-boot-console-head"><span>POST / PROFESSIONAL OPERATING SYSTEM TEST</span><span>{String(Math.round(progress)).padStart(3, "0")}%</span></div>
        <div className="nkos-boot-log">
          {bootSteps.map((step, index) => (
            <motion.div key={step.label} className={index <= bootIndex ? "ready" : "pending"} initial={false} animate={{ opacity: index <= bootIndex ? 1 : 0.25 }}>
              <span>[{step.label}]</span><b>{step.detail}</b><small>{index <= bootIndex ? "OK" : "WAIT"}</small>
            </motion.div>
          ))}
        </div>
        <div className="nkos-progress-track"><motion.span animate={{ width: `${progress}%` }} /></div>
      </div>
      <div className="nkos-boot-specs"><span><FiCpu /> React / Next.js</span><span><FiHardDrive /> Node / Databases</span><span><FiZap /> AI integrations</span></div>
      <button type="button" className="nkos-skip" onClick={onSkip}>Skip boot</button>
    </motion.section>
  );
};

export const LoginScreen = ({ preferences, onEnter, onPowerOff }) => {
  const now = useClock();
  return <motion.section className="nkos-login-screen" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
    <div className="nkos-login-top"><span>NITIN OS</span><button type="button" onClick={onPowerOff} aria-label="Power off"><FiPower /></button></div>
    <div className="nkos-lock-time"><strong>{formatTime(now, preferences)}</strong><span>{formatDate(now, preferences)}</span></div>
    <div className="nkos-login-card">
      <img src={profileImg.src} alt="Nitin Kumar" />
      <div><StatusTag>Available for work</StatusTag><h1>{personalDataObj.name}</h1><p>{personalDataObj.role} · Noida, India</p></div>
      <button type="button" className="nkos-enter-button" onClick={onEnter}>Enter workspace <FiArrowRight /></button>
    </div>
    <div className="nkos-login-network"><FiWifi /> Secure professional network connected</div>
  </motion.section>;
};
