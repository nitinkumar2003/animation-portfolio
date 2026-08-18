import { defaultPreferences, languages, regions } from "../config";

const formatterCache = new Map();

const getFormatter = (locale, options) => {
  const key = `${locale}:${JSON.stringify(options)}`;
  if (!formatterCache.has(key)) formatterCache.set(key, new Intl.DateTimeFormat(locale, options));
  return formatterCache.get(key);
};

export const loadStoredValue = (key, fallback) => {
  try {
    const stored = window.localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch {
    return fallback;
  }
};

export const persistStoredValue = (key, value) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
};

export const optimizeWallpaper = (file) => new Promise((resolve, reject) => {
  if (!file.type.startsWith("image/")) {
    reject(new Error("Please choose an image file."));
    return;
  }

  const reader = new FileReader();
  reader.onerror = () => reject(new Error("This image could not be read."));
  reader.onload = () => {
    const image = new Image();
    image.onerror = () => reject(new Error("This image format is not supported."));
    image.onload = () => {
      const scale = Math.min(1, 1600 / image.width, 1000 / image.height);
      const canvas = document.createElement("canvas");
      canvas.width = Math.max(1, Math.round(image.width * scale));
      canvas.height = Math.max(1, Math.round(image.height * scale));
      const context = canvas.getContext("2d", { alpha: false });
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      resolve(canvas.toDataURL("image/jpeg", 0.8));
    };
    image.src = reader.result;
  };
  reader.readAsDataURL(file);
});

export const getLocale = (preferences) => {
  const language = languages.find((item) => item.id === preferences.language);
  return preferences.language === "en"
    ? regions[preferences.region]?.locale || "en-IN"
    : language?.locale || regions[preferences.region]?.locale || "en-IN";
};

export const formatTime = (date, preferences = defaultPreferences) => getFormatter(getLocale(preferences), {
  timeZone: preferences.timezone,
  hour: "2-digit",
  minute: "2-digit",
  hour12: preferences.hourCycle === "12",
}).format(date);

export const formatDate = (date, preferences = defaultPreferences) => {
  if (preferences.dateStyle === "iso") {
    return getFormatter("en-CA", { timeZone: preferences.timezone, year: "numeric", month: "2-digit", day: "2-digit" }).format(date);
  }

  const options = preferences.dateStyle === "short"
    ? { timeZone: preferences.timezone, year: "2-digit", month: "2-digit", day: "2-digit" }
    : { timeZone: preferences.timezone, weekday: "long", year: "numeric", month: "long", day: "numeric" };
  return getFormatter(getLocale(preferences), options).format(date);
};
