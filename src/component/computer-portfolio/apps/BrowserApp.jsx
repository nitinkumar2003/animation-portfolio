import React, { useEffect, useState } from "react";
import {
  FiActivity, FiArrowLeft, FiArrowRight, FiCompass, FiExternalLink, FiFolder, FiGithub, FiHome, FiLock, FiMapPin, FiRefreshCw, FiSearch,
} from "react-icons/fi";
import { personalDataObj } from "../../../data/data";

const normalizeAddress = (value) => {
  const input = value.trim();
  if (!input) return "";
  if (/^https?:\/\//i.test(input)) return input;
  if (/^(localhost|127\.0\.0\.1)(:\d+)?(\/.*)?$/i.test(input)) return `http://${input}`;
  if (/^[\w-]+(\.[\w-]+)+(\/.*)?$/i.test(input)) return `https://${input}`;
  return `https://www.google.com/search?igu=1&q=${encodeURIComponent(input)}`;
};

const BrowserApp = ({ onOpenApp }) => {
  const [history, setHistory] = useState([""]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [address, setAddress] = useState("");
  const [reloadKey, setReloadKey] = useState(0);
  const [loading, setLoading] = useState(false);
  const activeUrl = history[historyIndex] || "";

  useEffect(() => setAddress(activeUrl), [activeUrl]);

  const visit = (value) => {
    const nextUrl = normalizeAddress(value);
    const nextHistory = [...history.slice(0, historyIndex + 1), nextUrl];
    setHistory(nextHistory);
    setHistoryIndex(nextHistory.length - 1);
    setLoading(Boolean(nextUrl));
  };
  const submitAddress = (event) => { event.preventDefault(); visit(address); };

  return (
    <div className="nkos-browser-app">
      <header className="nkos-browser-toolbar">
        <nav>
          <button type="button" onClick={() => historyIndex > 0 && setHistoryIndex((index) => index - 1)} disabled={historyIndex === 0} aria-label="Back"><FiArrowLeft /></button>
          <button type="button" onClick={() => historyIndex < history.length - 1 && setHistoryIndex((index) => index + 1)} disabled={historyIndex >= history.length - 1} aria-label="Forward"><FiArrowRight /></button>
          <button type="button" onClick={() => { setReloadKey((key) => key + 1); setLoading(Boolean(activeUrl)); }} disabled={!activeUrl} aria-label="Reload"><FiRefreshCw /></button>
          <button type="button" onClick={() => visit("")} aria-label="Browser home"><FiHome /></button>
        </nav>
        <form onSubmit={submitAddress}>{activeUrl ? <FiLock /> : <FiSearch />}<input value={address} onChange={(event) => setAddress(event.target.value)} placeholder="Search anything or enter a web address" aria-label="Browser address and search" /></form>
        <a href={activeUrl || "https://www.google.com"} target="_blank" rel="noreferrer" aria-label="Open current page in a new browser tab" title="Open externally"><FiExternalLink /></a>
      </header>
      <div className="nkos-browser-viewport">
        {activeUrl ? <>
          {loading && <div className="nkos-browser-loading"><span /></div>}
          <iframe key={`${activeUrl}-${reloadKey}`} title="Nitin Browser web view" src={activeUrl} onLoad={() => setLoading(false)} referrerPolicy="strict-origin-when-cross-origin" sandbox="allow-forms allow-modals allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts" />
        </> : <div className="nkos-browser-home">
          <div className="nkos-browser-mark"><FiCompass /><span>NK</span></div><p>NITIN BROWSER</p><h2>Search the web without leaving the portfolio.</h2>
          <form onSubmit={submitAddress}><FiSearch /><input value={address} onChange={(event) => setAddress(event.target.value)} placeholder="What do you want to explore?" autoFocus /><button type="submit"><FiArrowRight /></button></form>
          <div className="nkos-browser-quick">
            <button type="button" onClick={() => onOpenApp("projects")}><FiFolder /><span><b>Portfolio projects</b><small>Open inside Nitin OS</small></span></button>
            <button type="button" onClick={() => visit("latest full stack development trends")}><FiActivity /><span><b>Tech trends</b><small>Search the open web</small></span></button>
            <button type="button" onClick={() => visit(personalDataObj.github)}><FiGithub /><span><b>GitHub profile</b><small>Repositories and code</small></span></button>
            <button type="button" onClick={() => visit("Noida Uttar Pradesh India map")}><FiMapPin /><span><b>Noida map</b><small>Location and directions</small></span></button>
          </div>
        </div>}
      </div>
      <footer><span><i className={loading ? "loading" : ""} /> {loading ? "Loading secure web view" : "Ready"}</span><span>Some websites block embedded viewing. Use <FiExternalLink /> to open them directly.</span></footer>
    </div>
  );
};

export default BrowserApp;
