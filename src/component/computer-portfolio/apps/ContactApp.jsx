import React from "react";
import { FaLinkedinIn } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { FiArrowUpRight, FiGithub, FiMail, FiMapPin, FiWifi } from "react-icons/fi";
import { personalDataObj } from "../../../data/data";
import { StatusTag } from "../ui/OsPrimitives";

const ContactApp = ({ t }) => (
  <div className="nkos-contact-app">
    <div className="nkos-contact-intro">
      <StatusTag>CHANNEL OPEN</StatusTag><p>CONNECT.EXE</p><h2>{t("contactTitle")}</h2><span>Available for full stack roles, product builds, dashboards, SaaS and AI integrations.</span>
      <a className="nkos-mail-action" href={`mailto:${personalDataObj.email}`}><FiMail /> {personalDataObj.email}<FiArrowUpRight /></a>
    </div>
    <div className="nkos-contact-directory">
      <a href={personalDataObj.github} target="_blank" rel="noreferrer"><FiGithub /><span><b>GitHub</b><small>Inspect repositories</small></span><FiArrowUpRight /></a>
      <a href={personalDataObj.linkedin} target="_blank" rel="noreferrer"><FaLinkedinIn /><span><b>LinkedIn</b><small>Professional profile</small></span><FiArrowUpRight /></a>
      <a href={personalDataObj.leetcode} target="_blank" rel="noreferrer"><SiLeetcode /><span><b>LeetCode</b><small>Problem solving</small></span><FiArrowUpRight /></a>
      <div className="nkos-contact-location"><FiWifi /><span><b>Noida, India</b><small>Open to remote collaboration</small></span><StatusTag>ONLINE</StatusTag></div>
    </div>
    <div className="nkos-map-card">
      <iframe title="Noida, India map" loading="lazy" src="https://www.google.com/maps?q=Noida%2C%20Uttar%20Pradesh%2C%20India&output=embed" />
      <div><span><FiMapPin /><b>Noida, Uttar Pradesh, India</b><small>Current professional location</small></span><a href="https://www.google.com/maps/dir/?api=1&destination=Noida%2C%20Uttar%20Pradesh%2C%20India" target="_blank" rel="noreferrer">Get directions <FiArrowUpRight /></a></div>
    </div>
  </div>
);

export default ContactApp;
