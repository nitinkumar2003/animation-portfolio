import React from "react";
import { motion } from "framer-motion";
import { FiBattery, FiBatteryCharging, FiCheck, FiChevronRight, FiEdit3, FiFileText, FiLogOut, FiMonitor, FiMoon, FiSave, FiSearch, FiSettings, FiSun, FiVolume2, FiVolumeX, FiWifi, FiX } from "react-icons/fi";
import { personalDataObj } from "../../../data/data";
import profileImg from "../../../assets/images.jpg";
import { appCatalog } from "../config";
import { systemInfo } from "../../../data/content";
import { useClock } from "../lib/hooks";
import { formatTime } from "../lib/osUtils";

export const RenameDialog = ({ item, onChange, onCancel, onSave, t }) => (
  <motion.div className="nkos-dialog-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={onCancel}>
    <motion.form className="nkos-rename-dialog" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }} onMouseDown={(event) => event.stopPropagation()} onSubmit={onSave}>
      <span><FiEdit3 /></span><div><h3>{t("rename")}</h3><p>Enter a new desktop file name.</p></div>
      <input value={item.value} onChange={(event) => onChange({ ...item, value: event.target.value })} autoFocus maxLength={32} aria-label="New file name" />
      <footer><button type="button" onClick={onCancel}>{t("cancel")}</button><button type="submit"><FiSave /> {t("save")}</button></footer>
    </motion.form>
  </motion.div>
);

export const SearchPanel = ({ query, setQuery, results, indexedCount, onSelect, onClose, t }) => (
  <motion.div className="nkos-search-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={onClose}>
    <motion.div className="nkos-search-panel" data-testid="global-search" initial={{ opacity: 0, y: -18, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -10, scale: 0.98 }} onMouseDown={(event) => event.stopPropagation()}>
      <label><FiSearch /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={t("search")} autoFocus /><span>ESC</span></label>
      <div className="nkos-search-results"><div className="nkos-search-label">{query ? t("matched") : t("quickAccess")}</div>
        {results.slice(0, 8).map((item) => { const Icon = item.icon; return <button type="button" key={item.key} onClick={() => onSelect(item)}><span className="nkos-result-icon" style={{ "--result-color": item.color }}><Icon /></span><span><b>{item.label}</b><small>{item.detail}</small></span><em>{item.kind}</em><FiChevronRight /></button>; })}
        {!results.length && <div className="nkos-empty-state"><FiSearch /><p>{t("noResults")}</p></div>}
      </div>
      <footer><span><b>↵</b> Open</span><span><b>ESC</b> Close</span><span>{indexedCount || personalDataObj.projects.length + appCatalog.length} items indexed</span></footer>
    </motion.div>
  </motion.div>
);

export const StartMenu = ({ onOpen, onClose, preferences, onExit }) => {
  const now = useClock();
  return <motion.div className="nkos-start-menu" data-testid="start-menu" initial={{ opacity: 0, y: 16, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 12, scale: 0.97 }}>
    <div className="nkos-start-profile"><img src={profileImg.src} alt="" /><span><b>Nitin Kumar</b><small>Full Stack Developer</small></span><button type="button" onClick={onClose} aria-label="Close menu"><FiX /></button></div>
    <div className="nkos-start-heading"><span>PINNED</span><small>{formatTime(now, preferences)}</small></div>
    <div className="nkos-start-grid">{appCatalog.map((app) => { const Icon = app.icon; return <button type="button" key={app.id} onClick={() => onOpen(app.id)}><span style={{ "--app-color": app.color }}><Icon /></span><small>{app.label}</small></button>; })}</div>
    <div className="nkos-start-switch"><button type="button" onClick={() => onOpen("resume")}><FiFileText /><span><b>Résumé</b><small>Live, themed and translated</small></span><FiChevronRight /></button><button type="button" onClick={onExit}><FiLogOut /><span><b>Written portfolio</b><small>Case studies and experience</small></span><FiChevronRight /></button></div><div className="nkos-start-recent"><span>FEATURED WORK</span>{personalDataObj.projects.slice(-2).map((project) => <button type="button" key={project.id} onClick={() => onOpen("projects", project)}><img src={project.img} alt="" /><span><b>{project.title}</b><small>{project.category}</small></span><FiChevronRight /></button>)}</div>
  </motion.div>;
};

export const QuickSettings = ({ focusMode, setFocusMode, soundOn, setSoundOn, battery, preferences, setPreferences, resolvedTheme, onOpenSettings, t }) => {
  const BatteryIcon = battery.charging ? FiBatteryCharging : FiBattery;
  const ThemeIcon = preferences.theme === "system" ? FiMonitor : resolvedTheme === "light" ? FiSun : FiMoon;
  const themeOrder = ["dark", "light", "system"];
  const cycleTheme = () => {
    const currentIndex = themeOrder.indexOf(preferences.theme);
    setPreferences((current) => ({ ...current, theme: themeOrder[(currentIndex + 1) % themeOrder.length] }));
  };

  return <motion.div className="nkos-quick-settings" data-testid="quick-settings" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
      <header><span>{t("controlCenter")}</span><button type="button" onClick={onOpenSettings} aria-label={t("openSettings")}><FiSettings /></button></header>
      <div className="nkos-toggle-grid">
        <button type="button" className="active"><FiWifi /><span><b>{t("network")}</b><small>{t("connected")}</small></span></button>
        <button type="button" className={focusMode ? "active" : ""} onClick={() => setFocusMode((value) => !value)}><FiMoon /><span><b>{t("focus")}</b><small>{focusMode ? t("on") : t("off")}</small></span></button>
        <button type="button" className={soundOn ? "active" : ""} onClick={() => setSoundOn((value) => !value)}>{soundOn ? <FiVolume2 /> : <FiVolumeX />}<span><b>{t("sound")}</b><small>{soundOn ? t("on") : t("muted")}</small></span></button>
        <button type="button" className="active" onClick={cycleTheme}><ThemeIcon /><span><b>Appearance</b><small>{preferences.theme === "system" ? `System · ${resolvedTheme}` : preferences.theme}</small></span></button>
      </div>
      <div className="nkos-control-slider"><FiSun /><span><i /></span><b>82%</b></div>
      <div className="nkos-battery-card"><BatteryIcon /><span><b>{battery.level}% · {battery.charging ? "Power adapter" : "On battery"}</b><small>{battery.supported ? "Live system battery" : "Browser fallback · live access unavailable"}</small></span><i><span style={{ width: `${battery.level}%` }} /></i></div>
      <div className="nkos-system-ready"><FiCheck /><span><b>{t("allOperational")}</b><small>{systemInfo.osName} {systemInfo.osVersion} · build {systemInfo.buildStamp}</small></span></div>
    </motion.div>;
};
