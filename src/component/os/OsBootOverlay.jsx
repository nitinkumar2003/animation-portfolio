"use client";

import { useCallback, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { FiMonitor, FiX } from "react-icons/fi";
import "./os-overlay.css";

/**
 * Boots Nitin OS on top of the server-rendered landing page.
 *
 * The overlay is client-only on purpose: the page's HTML stays the complete,
 * indexable landing page, and the OS is layered over it after hydration. First-time
 * visitors get the OS; once someone leaves it, the choice is remembered and later
 * visits go straight to the written portfolio with a launcher pill instead.
 */

const ComputerPortfolio = dynamic(() => import("../ComputerPortfolio"), {
  ssr: false,
  loading: () => (
    <div className="nkos-overlay__loading">
      <span>NK</span>
      <p>Starting Nitin OS</p>
    </div>
  ),
});

const ENTRY_KEY = "nkos-entry-mode";

const readEntryMode = () => {
  try {
    return window.localStorage.getItem(ENTRY_KEY);
  } catch {
    return null;
  }
};

const writeEntryMode = (mode) => {
  try {
    window.localStorage.setItem(ENTRY_KEY, mode);
  } catch { /* private mode — the preference just won't persist */ }
};

const OsBootOverlay = () => {
  // `null` until the client decides, so the first paint is always the real page.
  const [open, setOpen] = useState(null);

  useEffect(() => {
    const mode = readEntryMode();
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Respect a previous choice; otherwise boot the OS for first-time visitors.
    setOpen(mode === "os" ? true : mode === "site" ? false : !prefersReducedMotion);
  }, []);

  const exitToSite = useCallback(() => {
    setOpen(false);
    writeEntryMode("site");
  }, []);

  const launchOs = useCallback(() => {
    setOpen(true);
    writeEntryMode("os");
  }, []);

  // Let the rest of the page respond (the landing page hides its own chat widget
  // while the OS is on top, so the two assistants never overlap).
  useEffect(() => {
    if (open === null) return undefined;
    document.documentElement.classList.toggle("nkos-booted", open);
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.classList.remove("nkos-booted");
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event) => {
      // Shift+Esc leaves the OS; plain Esc is used by the OS itself.
      if (event.key === "Escape" && event.shiftKey) exitToSite();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, exitToSite]);

  if (open === null) return null;

  if (!open) {
    return (
      <button type="button" className="nkos-relaunch" onClick={launchOs} title="Boot the interactive desktop portfolio">
        <FiMonitor />
        <span>Launch Nitin OS</span>
      </button>
    );
  }

  return (
    <div className="nkos-overlay" role="region" aria-label="Nitin OS interactive portfolio">
      <ComputerPortfolio onExit={exitToSite} />
      <button type="button" className="nkos-overlay__exit" onClick={exitToSite}>
        <FiX />
        <span>Skip to portfolio</span>
      </button>
    </div>
  );
};

export default OsBootOverlay;
