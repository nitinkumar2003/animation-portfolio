import React, { lazy, Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FiActivity, FiArrowUpRight, FiBattery, FiBatteryCharging, FiBell, FiCheck, FiCode, FiEdit3, FiEye, FiFile, FiFolder, FiGrid, FiPower,
  FiRefreshCw, FiSearch, FiSettings, FiTerminal, FiTrash2, FiUser, FiVolume2, FiWifi, FiX,
} from "react-icons/fi";
import { personalDataObj } from "../../../data/data";
import {
  appCatalog, initialFileContents, nonPreviewableDesktopIds, productDomains, protectedDesktopIds, skillInventory, wallpapers,
} from "../config";
import { translate } from "../lib/i18n";
import { useBatteryStatus, useClock, useCompactLayout, useViewportSize } from "../lib/hooks";
import { formatDate, formatTime, loadStoredValue, persistStoredValue } from "../lib/osUtils";
import { WindowFrame } from "../ui/OsPrimitives";
import { AboutApp, JourneyApp, ProjectsApp, StackApp } from "../apps/PortfolioApps";
import { QuickSettings, RenameDialog, SearchPanel, StartMenu } from "./Overlays";

const TerminalApp = lazy(() => import("../apps/TerminalApp"));
const QuickLookApp = lazy(() => import("../apps/QuickLookApp"));
const BrowserApp = lazy(() => import("../apps/BrowserApp"));
const ResumeApp = lazy(() => import("../apps/ResumeApp"));
const ContactApp = lazy(() => import("../apps/ContactApp"));
const SettingsApp = lazy(() => import("../apps/SettingsApp"));
const BinApp = lazy(() => import("../apps/BinApp"));
const AskNitinApp = lazy(() => import("../apps/AskNitinApp"));
const CalendarApp = lazy(() => import("../apps/CalendarApp"));
const CalculatorApp = lazy(() => import("../apps/CalculatorApp"));
const WeatherApp = lazy(() => import("../apps/WeatherApp"));
const MapsApp = lazy(() => import("../apps/MapsApp"));

const AppLoading = () => <div className="nkos-app-loading"><span /><p>Loading application...</p></div>;

const MenuClock = ({ preferences, onToggle }) => {
  const now = useClock();
  return (
    <button type="button" className="nkos-clock" onClick={onToggle} title={`${formatDate(now, preferences)} · ${preferences.timezone}`}>
      <b>{formatTime(now, preferences)}</b><span>{formatDate(now, { ...preferences, dateStyle: preferences.dateStyle === "long" ? "short" : preferences.dateStyle })}</span>
    </button>
  );
};

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const dockPinnedIds = new Set(["about", "projects", "assistant", "calendar", "browser", "resume", "contact", "settings", "bin"]);

const getDefaultIconPosition = (index, compact, viewportWidth, viewportHeight) => {
  if (!compact) {
    const maxY = Math.max(118, viewportHeight - 36 - 84 - 70);
    const rows = Math.max(2, Math.floor((maxY - 22) / 96) + 1);
    return { x: 18 + Math.floor(index / rows) * 90, y: 22 + (index % rows) * 96 };
  }
  const usableWidth = Math.max(300, viewportWidth - 20);
  const cellWidth = usableWidth / 4;
  return {
    x: Math.round((index % 4) * cellWidth + Math.max(0, (cellWidth - 74) / 2)),
    y: 18 + Math.floor(index / 4) * 90,
  };
};

const Desktop = ({ preferences, setPreferences, resolvedTheme, onPowerOff }) => {
  const workspaceRef = useRef(null);
  const draggingIconRef = useRef(false);
  const compact = useCompactLayout();
  const viewport = useViewportSize();
  const battery = useBatteryStatus();
  const BatteryIcon = battery.charging ? FiBatteryCharging : FiBattery;
  const layoutKey = compact ? "mobile" : "desktop";
  const t = useCallback((key) => translate(preferences.language, key), [preferences.language]);
  const [openWindows, setOpenWindows] = useState(["about"]);
  const [activeWindow, setActiveWindow] = useState("about");
  const [windowState, setWindowState] = useState({});
  const [selectedProject, setSelectedProject] = useState(personalDataObj.projects[13]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [startOpen, setStartOpen] = useState(false);
  const [quickOpen, setQuickOpen] = useState(false);
  const [focusMode, setFocusMode] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const [notification, setNotification] = useState(`Workspace ready · ${personalDataObj.projects.length} project files indexed`);
  const [contextMenu, setContextMenu] = useState(null);
  const [renameItem, setRenameItem] = useState(null);
  const [selectedDesktopId, setSelectedDesktopId] = useState(null);
  const [quickLookTargetId, setQuickLookTargetId] = useState("editor");
  const [desktopItems, setDesktopItems] = useState(() => {
    const storedItems = loadStoredValue("nkos-desktop-items", []);
    return appCatalog.map((app) => {
      const stored = storedItems.find((item) => item.id === app.id);
      const storedName = (app.id === "resume" && stored?.name === "Nitin_Kumar.pdf")
        || (app.id === "editor" && stored?.name === "Workspace.nk")
        ? app.file
        : stored?.name;
      const content = initialFileContents[app.id] ?? "";
      return stored
        ? { ...stored, name: storedName || app.file, content }
        : { id: app.id, name: app.file, content, deleted: false, deletedAt: null };
    });
  });

  const activeWallpaper = preferences.wallpaper === "custom" && preferences.customWallpaper
    ? { id: "custom", name: "My Upload", image: preferences.customWallpaper }
    : wallpapers.find((wallpaper) => wallpaper.id === preferences.wallpaper) || wallpapers[0];
  const deletedItems = desktopItems.filter((item) => item.deleted);

  useEffect(() => {
    const metadata = desktopItems.map(({ content, ...item }) => item);
    if (!persistStoredValue("nkos-desktop-items", metadata)) setNotification("Local storage is full. Remove a custom wallpaper and try again.");
  }, [desktopItems]);

  useEffect(() => {
    if (!notification) return undefined;
    const timer = window.setTimeout(() => setNotification(""), 3600);
    return () => window.clearTimeout(timer);
  }, [notification]);

  const pushNotification = (message) => setNotification(message);
  const openApp = (id, project) => {
    if (project) setSelectedProject(project);
    setOpenWindows((current) => [...current.filter((item) => item !== id), id]);
    setWindowState((current) => ({ ...current, [id]: { ...current[id], minimized: false } }));
    setActiveWindow(id); setStartOpen(false); setSearchOpen(false); setContextMenu(null);
  };
  const closeApp = (id) => {
    setOpenWindows((current) => current.filter((item) => item !== id));
    if (activeWindow === id) {
      const remaining = openWindows.filter((item) => item !== id);
      setActiveWindow(remaining[remaining.length - 1] || "");
    }
  };
  const focusApp = (id) => { setOpenWindows((current) => [...current.filter((item) => item !== id), id]); setActiveWindow(id); };
  const minimizeApp = (id) => {
    setWindowState((current) => ({ ...current, [id]: { ...current[id], minimized: true } }));
    const remaining = openWindows.filter((item) => item !== id && !windowState[item]?.minimized);
    setActiveWindow(remaining[remaining.length - 1] || "");
  };
  const toggleMaximize = (id) => { setWindowState((current) => ({ ...current, [id]: { ...current[id], maximized: !current[id]?.maximized } })); focusApp(id); };

  const deleteDesktopItem = (id) => {
    if (protectedDesktopIds.has(id)) return;
    const item = desktopItems.find((entry) => entry.id === id);
    setDesktopItems((current) => current.map((entry) => entry.id === id ? { ...entry, deleted: true, deletedAt: new Date().toISOString() } : entry));
    closeApp(id); setSelectedDesktopId(null); setContextMenu(null); pushNotification(`${item?.name || "File"} moved to Recycle Bin`);
  };
  const restoreDesktopItem = (id) => {
    const item = desktopItems.find((entry) => entry.id === id);
    setDesktopItems((current) => current.map((entry) => entry.id === id ? { ...entry, deleted: false, deletedAt: null } : entry));
    pushNotification(`${item?.name || "File"} restored to desktop`);
  };
  const restoreAllDesktopItems = () => { setDesktopItems((current) => current.map((entry) => ({ ...entry, deleted: false, deletedAt: null }))); pushNotification("All deleted files restored to desktop"); };
  const saveRenamedItem = (event) => {
    event.preventDefault();
    const nextName = renameItem?.value.trim();
    if (!nextName) return;
    setDesktopItems((current) => current.map((entry) => entry.id === renameItem.id ? { ...entry, name: nextName } : entry));
    setRenameItem(null); pushNotification(`File renamed to ${nextName}`);
  };
  const openQuickLook = (id) => {
    if (id === "resume" || nonPreviewableDesktopIds.has(id)) {
      openApp(id);
      return;
    }
    setQuickLookTargetId(id);
    openApp("editor");
  };

  useEffect(() => {
    const handleKey = (event) => {
      const modifier = event.metaKey || event.ctrlKey;
      const target = event.target;
      const isTyping = target instanceof HTMLElement
        && (target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName));

      if (modifier && (event.code === "Space" || event.key.toLowerCase() === "k")) {
        event.preventDefault();
        setSearchOpen(true); setStartOpen(false); setQuickOpen(false); setContextMenu(null);
        return;
      }
      if (event.key === "Escape") {
        setSearchOpen(false); setStartOpen(false); setQuickOpen(false); setContextMenu(null); setRenameItem(null);
        return;
      }
      if (isTyping || !selectedDesktopId) return;

      if (event.code === "Space" && !modifier) {
        event.preventDefault();
        if (activeWindow === "editor" && openWindows.includes("editor")) closeApp("editor");
        else openQuickLook(selectedDesktopId);
      }
      if (event.key === "Enter" && !protectedDesktopIds.has(selectedDesktopId)) {
        event.preventDefault();
        const item = desktopItems.find((entry) => entry.id === selectedDesktopId);
        setRenameItem({ id: selectedDesktopId, value: item?.name || "" });
      }
      if (modifier && (event.key === "Backspace" || event.key === "Delete") && !protectedDesktopIds.has(selectedDesktopId)) {
        event.preventDefault();
        deleteDesktopItem(selectedDesktopId);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [activeWindow, desktopItems, openWindows, selectedDesktopId]);

  const getIconPosition = (item, index) => {
    const fallback = getDefaultIconPosition(index, compact, viewport.width, viewport.height);
    const saved = item?.positions?.[layoutKey];
    const position = saved || fallback;
    const iconWidth = compact ? 74 : 82;
    const iconHeight = 84;
    const workspaceHeight = viewport.height - (compact ? 40 : 36);
    return {
      x: clamp(position.x, 0, Math.max(0, viewport.width - iconWidth)),
      y: clamp(position.y, 0, Math.max(0, workspaceHeight - iconHeight - 70)),
    };
  };

  const handleIconDragEnd = (event, id) => {
    const workspaceBounds = workspaceRef.current?.getBoundingClientRect();
    const iconElement = event.currentTarget || event.target?.closest?.("button");
    const iconBounds = iconElement?.getBoundingClientRect();
    if (workspaceBounds && iconBounds) {
      const x = clamp(Math.round(iconBounds.left - workspaceBounds.left), 0, Math.max(0, workspaceBounds.width - iconBounds.width));
      const y = clamp(Math.round(iconBounds.top - workspaceBounds.top), 0, Math.max(0, workspaceBounds.height - iconBounds.height - 70));
      setDesktopItems((current) => current.map((entry) => entry.id === id
        ? { ...entry, positions: { ...entry.positions, [layoutKey]: { x, y } } }
        : entry));
      pushNotification("Desktop icon position saved");
    }
    window.setTimeout(() => { draggingIconRef.current = false; }, 0);
  };

  const resetIconLayout = () => {
    setDesktopItems((current) => current.map((entry) => ({
      ...entry,
      positions: { ...entry.positions, [layoutKey]: null },
    })));
    setContextMenu(null);
    pushNotification(`${compact ? "Mobile" : "Desktop"} icons arranged automatically`);
  };

  const searchResults = useMemo(() => {
    const normalized = searchQuery.toLowerCase().trim();
    const apps = appCatalog.map((app) => {
      const desktopItem = desktopItems.find((item) => item.id === app.id);
      return { key: `app-${app.id}`, kind: "APP", label: app.label, detail: desktopItem?.name || app.file, icon: app.icon, color: app.color, app: app.id, search: `${app.label} ${desktopItem?.name || app.file} ${app.keywords}`.toLowerCase() };
    });
    const projects = personalDataObj.projects.map((project) => ({ key: `project-${project.id}`, kind: "PROJECT", label: project.title, detail: `${project.category} · ${project.tech.slice(0, 3).join(" / ")}`, icon: FiFile, color: project.category === "AI / SaaS" ? "#ff6b6b" : "#ffc857", app: "projects", project, search: `${project.title} ${project.category} ${project.tech.join(" ")} ${project.features.join(" ")}`.toLowerCase() }));
    const skills = skillInventory.map((skill) => ({ key: `skill-${skill.group}-${skill.name}`, kind: "SKILL", label: skill.name, detail: `${skill.group} · ${skill.level}`, icon: skill.icon || FiCode, color: skill.color, app: "stack", search: `${skill.name} ${skill.group} ${skill.level} skill technology`.toLowerCase() }));
    const domains = productDomains.map((domain) => ({ key: `domain-${domain}`, kind: "DOMAIN", label: domain, detail: "Product experience", icon: FiFolder, color: "#ff8f70", app: "stack", search: `${domain} product project experience`.toLowerCase() }));
    const all = [...apps, ...projects, ...skills, ...domains];
    return normalized ? all.filter((item) => item.search.includes(normalized)) : [...apps.slice(0, 5), ...projects.slice(-2)];
  }, [searchQuery, desktopItems]);

  const renderApp = (id) => ({
    about: <AboutApp onOpenProjects={() => openApp("projects")} t={t} />,
    projects: <ProjectsApp selectedProject={selectedProject} setSelectedProject={setSelectedProject} />,
    assistant: <AskNitinApp />,
    stack: <StackApp />,
    journey: <JourneyApp />,
    calendar: <CalendarApp preferences={preferences} />,
    weather: <WeatherApp />,
    calculator: <CalculatorApp />,
    maps: <MapsApp />,
    terminal: <TerminalApp openApp={openApp} />,
    editor: <QuickLookApp item={desktopItems.find((item) => item.id === quickLookTargetId)} />,
    browser: <BrowserApp onOpenApp={openApp} />,
    resume: <ResumeApp />,
    contact: <ContactApp t={t} />,
    settings: <SettingsApp preferences={preferences} setPreferences={setPreferences} t={t} />,
    bin: <BinApp deletedItems={deletedItems} onRestore={restoreDesktopItem} onRestoreAll={restoreAllDesktopItems} preferences={preferences} t={t} />,
  }[id]);

  const handleDesktopContext = (event) => {
    event.preventDefault();
    setSelectedDesktopId(null);
    setContextMenu({ type: "desktop", x: Math.min(event.clientX, window.innerWidth - 210), y: Math.min(event.clientY, window.innerHeight - 220) });
    setStartOpen(false); setQuickOpen(false);
  };
  const handleFileContext = (event, id) => {
    event.preventDefault(); event.stopPropagation();
    setSelectedDesktopId(id);
    setContextMenu({ type: "file", id, x: Math.min(event.clientX, window.innerWidth - 220), y: Math.min(event.clientY, window.innerHeight - 230) });
    setStartOpen(false); setQuickOpen(false);
  };
  const activeAppName = appCatalog.find((app) => app.id === activeWindow)?.label || "Finder";

  return (
    <motion.section className={`nkos-desktop wallpaper-${activeWallpaper.id} ${activeWallpaper.image ? "has-wallpaper" : ""} ${focusMode ? "focus-mode" : ""}`} style={activeWallpaper.image ? { "--nkos-wallpaper": `url(${activeWallpaper.image})` } : undefined} initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={() => { setContextMenu(null); setSelectedDesktopId(null); }} onContextMenu={handleDesktopContext}>
      <header className="nkos-menu-bar">
        <div className="nkos-menu-left"><button type="button" className="nkos-brand-button" onClick={() => setStartOpen((value) => !value)} aria-label="Open Nitin OS menu"><span>NK</span></button><b>{activeAppName}</b><button type="button" onClick={() => openApp("projects")}>{t("file")}</button><button type="button" onClick={() => selectedDesktopId ? openQuickLook(selectedDesktopId) : setQuickOpen(true)}>{t("view")}</button><button type="button" onClick={() => openApp("browser")}>{t("go")}</button><button type="button" onClick={() => activeWindow ? toggleMaximize(activeWindow) : openApp("about")}>{t("window")}</button><button type="button" onClick={() => openApp("contact")}>{t("help")}</button></div>
        <div className="nkos-menu-right"><button type="button" className="nkos-menu-search" onClick={() => setSearchOpen(true)} aria-label={t("search")} title={`${t("search")} · ⌘ Space`}><FiSearch /></button><button type="button" aria-label="Notifications" onClick={() => pushNotification("No pending notifications · system is clear")}><FiBell /></button><button type="button" className="nkos-system-tray" onClick={() => setQuickOpen((value) => !value)} aria-label={`Open quick settings, battery ${battery.level}%`}><FiWifi /><FiVolume2 /><BatteryIcon /><span className="nkos-battery-percent">{battery.level}%</span></button><MenuClock preferences={preferences} onToggle={() => setQuickOpen((value) => !value)} /></div>
      </header>

      <div className="nkos-workspace" ref={workspaceRef}>
        <nav className="nkos-desktop-files" aria-label="Desktop files">
          {appCatalog.filter((app) => !desktopItems.find((item) => item.id === app.id)?.deleted).map((app, index) => { const Icon = app.icon; const desktopItem = desktopItems.find((item) => item.id === app.id); const position = getIconPosition(desktopItem, index); const selected = selectedDesktopId === app.id; return <motion.button type="button" key={app.id} className={selected ? "selected" : ""} aria-pressed={selected} drag dragConstraints={workspaceRef} dragMomentum={false} dragElastic={0} style={{ x: position.x, y: position.y }} whileDrag={{ scale: 1.06, opacity: 0.88, zIndex: 18 }} onDragStart={() => { draggingIconRef.current = true; setSelectedDesktopId(app.id); }} onDragEnd={(event) => handleIconDragEnd(event, app.id)} onClick={(event) => { event.stopPropagation(); if (draggingIconRef.current) return; setSelectedDesktopId(app.id); if (compact) openApp(app.id); }} onDoubleClick={(event) => { event.stopPropagation(); if (!compact) openApp(app.id); }} onContextMenu={(event) => handleFileContext(event, app.id)} title={compact ? `Open ${app.label}` : `Select or drag ${app.label}; double-click to open`}><span className="nkos-file-icon" style={{ "--app-color": app.color }}><Icon />{app.id === "bin" && deletedItems.length > 0 && <b>{deletedItems.length}</b>}</span><small>{desktopItem?.name || app.file}</small></motion.button>; })}
        </nav>
        <aside className="nkos-desktop-widgets">
          <div className="nkos-role-widget"><div><span className="nkos-live-dot" /> {t("available")}</div><h1>Full Stack<br />Developer</h1><p>React · Next.js · Node.js · AI</p></div>
          <button type="button" className="nkos-featured-widget" onClick={() => openApp("projects", personalDataObj.projects[13])}><img src={personalDataObj.projects[13].img} alt="" /><span><small>{t("featured")}</small><b>{personalDataObj.projects[13].title}</b><em>{t("openProject")} <FiArrowUpRight /></em></span></button>
          <div className="nkos-metrics-widget"><span><FiActivity /> {t("systemCapacity")}</span><div><b>{personalDataObj.projects.length}</b><small>{t("projects")}</small></div><div><b>4+</b><small>{t("years")}</small></div><div><b>4</b><small>{t("layers")}</small></div></div>
        </aside>
        <AnimatePresence>{openWindows.map((id, index) => { const baseApp = appCatalog.find((item) => item.id === id); const desktopItem = desktopItems.find((item) => item.id === id); const app = baseApp ? { ...baseApp, file: desktopItem?.name || baseApp.file } : null; if (!app) return null; return <WindowFrame key={id} app={app} active={activeWindow === id} index={index} minimized={windowState[id]?.minimized} maximized={windowState[id]?.maximized} compact={compact} workspaceRef={workspaceRef} onFocus={() => focusApp(id)} onClose={() => closeApp(id)} onMinimize={() => minimizeApp(id)} onMaximize={() => toggleMaximize(id)}><Suspense fallback={<AppLoading />}>{renderApp(id)}</Suspense></WindowFrame>; })}</AnimatePresence>
      </div>

      <AnimatePresence>
        {searchOpen && <SearchPanel key="search" query={searchQuery} setQuery={setSearchQuery} results={searchResults} indexedCount={appCatalog.length + personalDataObj.projects.length + skillInventory.length + productDomains.length} onSelect={(item) => openApp(item.app, item.project)} onClose={() => setSearchOpen(false)} t={t} />}
        {startOpen && <StartMenu key="start" onOpen={openApp} onClose={() => setStartOpen(false)} preferences={preferences} />}
        {quickOpen && <QuickSettings key="quick-settings" focusMode={focusMode} setFocusMode={setFocusMode} soundOn={soundOn} setSoundOn={setSoundOn} battery={battery} preferences={preferences} setPreferences={setPreferences} resolvedTheme={resolvedTheme} onOpenSettings={() => openApp("settings")} t={t} />}
        {notification && <motion.div key="notification" className="nkos-notification" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 30 }}><span><FiCheck /></span><div><b>Nitin OS</b><p>{notification}</p></div><button type="button" onClick={() => setNotification("")} aria-label="Dismiss notification"><FiX /></button></motion.div>}
        {contextMenu && <motion.div key="context-menu" className="nkos-context-menu" style={{ left: contextMenu.x, top: contextMenu.y }} initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }} onClick={(event) => event.stopPropagation()}>
          {contextMenu.type === "file" ? <><button type="button" onClick={() => openApp(contextMenu.id)}><FiFolder /> {t("open")}</button>{!nonPreviewableDesktopIds.has(contextMenu.id) && <button type="button" onClick={() => openQuickLook(contextMenu.id)}><FiEye /> {t("quickLook")}</button>}{!protectedDesktopIds.has(contextMenu.id) && <button type="button" onClick={() => { const item = desktopItems.find((entry) => entry.id === contextMenu.id); setRenameItem({ id: contextMenu.id, value: item?.name || "" }); setContextMenu(null); }}><FiEdit3 /> {t("rename")}</button>}{!protectedDesktopIds.has(contextMenu.id) && <button type="button" className="danger" onClick={() => deleteDesktopItem(contextMenu.id)}><FiTrash2 /> {t("delete")}</button>}</> : <><button type="button" onClick={() => openApp("about")}><FiUser /> Open profile</button><button type="button" onClick={() => openApp("terminal")}><FiTerminal /> Open terminal</button><button type="button" onClick={() => openApp("settings")}><FiSettings /> {t("settings")}</button><button type="button" onClick={resetIconLayout}><FiGrid /> Clean Up</button><button type="button" onClick={() => { pushNotification("Desktop refreshed · all files are current"); setContextMenu(null); }}><FiRefreshCw /> Refresh</button><span /><button type="button" onClick={onPowerOff}><FiPower /> Power off</button></>}
        </motion.div>}
        {renameItem && <RenameDialog key="rename" item={renameItem} onChange={setRenameItem} onCancel={() => setRenameItem(null)} onSave={saveRenamedItem} t={t} />}
      </AnimatePresence>

      <nav className="nkos-dock" aria-label="Running apps">
        <button type="button" className={`nkos-launcher ${startOpen ? "active" : ""}`} onClick={() => setStartOpen((value) => !value)} aria-label="Open app launcher"><FiGrid /></button><i />
        {appCatalog.filter((app) => dockPinnedIds.has(app.id) || openWindows.includes(app.id)).map((app) => { const Icon = app.icon; const isOpen = openWindows.includes(app.id); return <button type="button" key={app.id} className={`${activeWindow === app.id ? "active" : ""} ${isOpen ? "running" : ""}`} onClick={() => openApp(app.id)} title={app.label} aria-label={app.label} style={{ "--app-color": app.color }}><Icon /><span>{app.id === "settings" ? t("settings") : app.id === "bin" ? t("recycleBin") : app.label}</span></button>; })}
        <i /><button type="button" onClick={onPowerOff} aria-label="Power off" title="Power off"><FiPower /></button>
      </nav>
    </motion.section>
  );
};

export default Desktop;
