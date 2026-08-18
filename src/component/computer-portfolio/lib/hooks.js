import { useEffect, useState } from "react";

export const useClock = () => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  return now;
};

export const useCompactLayout = () => {
  const [compact, setCompact] = useState(() => window.matchMedia("(max-width: 760px)").matches);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 760px)");
    const update = () => setCompact(media.matches);
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return compact;
};

export const useViewportSize = () => {
  const [size, setSize] = useState(() => ({ width: window.innerWidth, height: window.innerHeight }));

  useEffect(() => {
    const update = () => setSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return size;
};

export const useResolvedTheme = (preference = "dark") => {
  const [systemTheme, setSystemTheme] = useState(() => (
    window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark"
  ));

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: light)");
    const update = () => setSystemTheme(media.matches ? "light" : "dark");
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return preference === "system" ? systemTheme : preference;
};

export const useBatteryStatus = () => {
  const [battery, setBattery] = useState({ level: 87, charging: true, supported: false });

  useEffect(() => {
    if (typeof navigator.getBattery !== "function") return undefined;
    let manager;

    const update = () => setBattery({
      level: Math.round(manager.level * 100),
      charging: manager.charging,
      supported: true,
    });

    navigator.getBattery().then((value) => {
      manager = value;
      update();
      manager.addEventListener("levelchange", update);
      manager.addEventListener("chargingchange", update);
    }).catch(() => undefined);

    return () => {
      manager?.removeEventListener("levelchange", update);
      manager?.removeEventListener("chargingchange", update);
    };
  }, []);

  return battery;
};
