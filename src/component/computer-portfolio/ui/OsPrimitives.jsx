import React from "react";
import { motion, useDragControls } from "framer-motion";
import { FiMaximize2, FiMinimize2, FiX } from "react-icons/fi";
import { windowOffsets } from "../config";

export const StatusTag = ({ children, tone = "green" }) => (
  <span className={`nkos-tag nkos-tag-${tone}`}>{children}</span>
);

export const WindowFrame = ({
  app,
  children,
  active,
  index,
  minimized,
  maximized,
  compact,
  workspaceRef,
  onFocus,
  onClose,
  onMinimize,
  onMaximize,
}) => {
  const Icon = app.icon;
  const offset = windowOffsets[app.id] || { x: 80, y: 40 };
  const dragControls = useDragControls();

  if (minimized) return null;

  return (
    <motion.section
      className={`nkos-window nkos-window-${app.id} ${active ? "active" : ""} ${maximized ? "maximized" : ""}`}
      style={{
        zIndex: 20 + index,
        left: maximized || compact ? undefined : offset.x,
        top: maximized || compact ? undefined : offset.y,
        "--app-color": app.color,
      }}
      initial={{ opacity: 0, scale: 0.96, y: 18 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96, y: 12 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      drag={!maximized && !compact}
      dragControls={dragControls}
      dragListener={false}
      dragConstraints={workspaceRef}
      dragMomentum={false}
      dragElastic={0.04}
      onMouseDown={onFocus}
    >
      <header
        className="nkos-window-bar"
        onDoubleClick={(event) => {
          if (!event.target.closest(".nkos-window-controls")) onMaximize();
        }}
        onPointerDown={(event) => {
          if (!maximized && !compact) dragControls.start(event);
        }}
      >
        <div className="nkos-window-controls" onPointerDown={(event) => event.stopPropagation()}>
          <button type="button" className="close" onClick={onClose} aria-label={`Close ${app.label}`}><FiX /></button>
          <button type="button" className="minimize" onClick={onMinimize} aria-label={`Minimize ${app.label}`}><FiMinimize2 /></button>
          <button type="button" className="maximize" onClick={onMaximize} aria-label={`Maximize ${app.label}`}><FiMaximize2 /></button>
        </div>
        <div className="nkos-window-name"><Icon /><span>{app.file}</span></div>
        <div className="nkos-window-state"><span className="nkos-live-dot" /> LIVE</div>
      </header>
      <div className="nkos-window-content">{children}</div>
    </motion.section>
  );
};
