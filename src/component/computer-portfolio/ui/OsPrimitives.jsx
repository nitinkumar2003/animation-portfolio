import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FiMaximize2, FiMinimize2, FiMinus, FiX } from "react-icons/fi";
import { windowOffsets, windowSizes } from "../config";

export const StatusTag = ({ children, tone = "green" }) => (
  <span className={`nkos-tag nkos-tag-${tone}`}>{children}</span>
);

const MIN_W = 380;
const MIN_H = 260;
const SNAP_EDGE = 26;

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

/** Resize handles: which edges each one drives. */
const HANDLES = [
  { id: "n", x: 0, y: -1 }, { id: "s", x: 0, y: 1 },
  { id: "w", x: -1, y: 0 }, { id: "e", x: 1, y: 0 },
  { id: "nw", x: -1, y: -1 }, { id: "ne", x: 1, y: -1 },
  { id: "sw", x: -1, y: 1 }, { id: "se", x: 1, y: 1 },
];

/**
 * A draggable, resizable, snappable window.
 *
 * Geometry is owned here rather than by CSS so drag, resize and snap all speak the
 * same model. Pointer events (not framer drag) are used because resizing from the
 * top or left edge has to move the window and change its size in the same frame.
 */
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
  const frameRef = useRef(null);
  const gestureRef = useRef(null);
  const [geometry, setGeometry] = useState(null);
  const [snapHint, setSnapHint] = useState(null);

  const bounds = useCallback(() => {
    const rect = workspaceRef?.current?.getBoundingClientRect();
    return rect || { width: window.innerWidth, height: window.innerHeight, left: 0, top: 0 };
  }, [workspaceRef]);

  // Seed geometry from the app's configured offset and size, clamped to the workspace.
  useEffect(() => {
    if (compact || geometry) return;
    const area = bounds();
    const preferred = windowSizes[app.id] || windowSizes.default;
    const width = clamp(preferred.width, MIN_W, Math.max(MIN_W, area.width - 40));
    const height = clamp(preferred.height, MIN_H, Math.max(MIN_H, area.height - 96));
    const offset = windowOffsets[app.id] || { x: 90, y: 44 };
    setGeometry({
      x: clamp(offset.x, 8, Math.max(8, area.width - width - 8)),
      y: clamp(offset.y, 8, Math.max(8, area.height - height - 86)),
      width,
      height,
    });
  }, [app.id, compact, geometry, bounds]);

  // Keep windows on screen when the workspace shrinks.
  useEffect(() => {
    if (compact) return undefined;
    const onResize = () => setGeometry((current) => {
      if (!current) return current;
      const area = bounds();
      const width = Math.min(current.width, Math.max(MIN_W, area.width - 24));
      const height = Math.min(current.height, Math.max(MIN_H, area.height - 80));
      return {
        width,
        height,
        x: clamp(current.x, 0, Math.max(0, area.width - width)),
        y: clamp(current.y, 0, Math.max(0, area.height - height - 70)),
      };
    });
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [compact, bounds]);

  const endGesture = useCallback(() => {
    const gesture = gestureRef.current;
    gestureRef.current = null;
    setSnapHint(null);
    if (!gesture) return;

    if (gesture.type === "drag" && gesture.snap) {
      const area = bounds();
      if (gesture.snap === "max") {
        onMaximize();
      } else {
        const half = Math.round(area.width / 2);
        setGeometry({
          x: gesture.snap === "left" ? 0 : half,
          y: 0,
          width: half,
          height: Math.max(MIN_H, area.height - 74),
        });
      }
    }
  }, [bounds, onMaximize]);

  useEffect(() => {
    const onMove = (event) => {
      const gesture = gestureRef.current;
      if (!gesture) return;
      const area = bounds();
      const dx = event.clientX - gesture.pointerX;
      const dy = event.clientY - gesture.pointerY;

      if (gesture.type === "drag") {
        const x = clamp(gesture.x + dx, -gesture.width + 120, area.width - 120);
        const y = clamp(gesture.y + dy, 0, Math.max(0, area.height - 92));
        setGeometry((current) => ({ ...current, x, y }));

        // Edge proximity previews a snap target.
        const localX = event.clientX - area.left;
        const localY = event.clientY - area.top;
        const next = localY < SNAP_EDGE ? "max"
          : localX < SNAP_EDGE ? "left"
            : localX > area.width - SNAP_EDGE ? "right"
              : null;
        gesture.snap = next;
        setSnapHint(next);
        return;
      }

      const { dir } = gesture;
      let { x, y, width, height } = gesture;
      if (dir.x === 1) width = clamp(gesture.width + dx, MIN_W, area.width - gesture.x);
      if (dir.x === -1) {
        width = clamp(gesture.width - dx, MIN_W, gesture.x + gesture.width);
        x = gesture.x + gesture.width - width;
      }
      if (dir.y === 1) height = clamp(gesture.height + dy, MIN_H, area.height - gesture.y - 6);
      if (dir.y === -1) {
        height = clamp(gesture.height - dy, MIN_H, gesture.y + gesture.height);
        y = gesture.y + gesture.height - height;
      }
      setGeometry({ x, y, width, height });
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", endGesture);
    window.addEventListener("pointercancel", endGesture);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", endGesture);
      window.removeEventListener("pointercancel", endGesture);
    };
  }, [bounds, endGesture]);

  // On a phone the title bar is a sheet grabber: drag down far enough to dismiss.
  const sheetRef = useRef(null);
  const startSheet = (event) => {
    if (!compact) return;
    sheetRef.current = { y: event.clientY, dy: 0 };
  };
  const moveSheet = (event) => {
    if (!compact || !sheetRef.current) return;
    sheetRef.current.dy = Math.max(0, event.clientY - sheetRef.current.y);
    if (frameRef.current) frameRef.current.style.transform = `translateY(${sheetRef.current.dy}px)`;
  };
  const endSheet = () => {
    if (!compact || !sheetRef.current) return;
    const { dy } = sheetRef.current;
    sheetRef.current = null;
    if (frameRef.current) frameRef.current.style.transform = "";
    if (dy > 90) onClose();
  };

  const startDrag = (event) => {
    if (compact || maximized) return;
    if (event.target.closest(".nkos-window-controls")) return;
    if (event.button !== 0) return;
    onFocus();
    gestureRef.current = { type: "drag", pointerX: event.clientX, pointerY: event.clientY, ...geometry, snap: null };
  };

  const startResize = (event, dir) => {
    if (compact || maximized) return;
    event.stopPropagation();
    onFocus();
    gestureRef.current = { type: "resize", dir, pointerX: event.clientX, pointerY: event.clientY, ...geometry };
  };

  if (minimized) return null;

  const style = compact || maximized || !geometry
    ? { zIndex: 20 + index, "--app-color": app.color }
    : {
      zIndex: 20 + index,
      "--app-color": app.color,
      left: geometry.x,
      top: geometry.y,
      width: geometry.width,
      height: geometry.height,
      minWidth: 0,
      minHeight: 0,
    };

  return (
    <>
      {snapHint && <div className={`nkos-snap-preview snap-${snapHint}`} aria-hidden="true" />}
      <motion.section
        ref={frameRef}
        className={`nkos-window nkos-window-${app.id} ${active ? "active" : ""} ${maximized ? "maximized" : ""}`}
        style={style}
        initial={{ opacity: 0, scale: 0.97, y: 14 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97, y: 10 }}
        transition={{ duration: 0.18, ease: "easeOut" }}
        onMouseDown={onFocus}
      >
        <header
          className="nkos-window-bar"
          onPointerDown={(event) => { startDrag(event); startSheet(event); }}
          onPointerMove={moveSheet}
          onPointerUp={endSheet}
          onPointerCancel={endSheet}
          onDoubleClick={(event) => {
            if (!event.target.closest(".nkos-window-controls")) onMaximize();
          }}
        >
          <div className="nkos-window-controls" onPointerDown={(event) => event.stopPropagation()}>
            <button type="button" className="close" onClick={onClose} aria-label={`Close ${app.label}`}><FiX /></button>
            <button type="button" className="minimize" onClick={onMinimize} aria-label={`Minimize ${app.label}`}><FiMinus /></button>
            <button type="button" className="maximize" onClick={onMaximize} aria-label={`${maximized ? "Restore" : "Maximize"} ${app.label}`}>
              {maximized ? <FiMinimize2 /> : <FiMaximize2 />}
            </button>
          </div>
          {compact && <span className="nkos-sheet-grabber" aria-hidden="true" />}
          <div className="nkos-window-name"><Icon /><span>{app.file}</span></div>
          <div className="nkos-window-state"><span className="nkos-live-dot" /> LIVE</div>
        </header>

        <div className="nkos-window-content">{children}</div>

        {!compact && !maximized && HANDLES.map((handle) => (
          <span
            key={handle.id}
            className={`nkos-resize nkos-resize-${handle.id}`}
            onPointerDown={(event) => startResize(event, handle)}
            aria-hidden="true"
          />
        ))}
      </motion.section>
    </>
  );
};
