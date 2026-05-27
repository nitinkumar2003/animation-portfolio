import React, { useEffect, useRef, useState } from "react";

const CursorEffect = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (isMobile) return;

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;
    let rafId;

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
      }
    };

    const animate = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      if (ringRef.current) {
        const size = hovering ? 56 : 36;
        ringRef.current.style.transform = `translate(${ringX - size / 2}px, ${ringY - size / 2}px)`;
      }
      rafId = requestAnimationFrame(animate);
    };

    const onEnter = (e) => {
      if (e.target.closest("a, button, [data-cursor-hover]")) {
        setHovering(true);
      }
    };
    const onLeave = () => setHovering(false);

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onEnter);
    document.addEventListener("mouseout", onLeave);
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onEnter);
      document.removeEventListener("mouseout", onLeave);
      cancelAnimationFrame(rafId);
    };
  }, [hovering]);

  const isMobile =
    typeof window !== "undefined" &&
    window.matchMedia("(max-width: 768px)").matches;
  if (isMobile) return null;

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className={`cursor-ring ${hovering ? "hovering" : ""}`} />
    </>
  );
};

export default CursorEffect;
