import React, { useRef, useState } from "react";
import { FiCheck, FiClock, FiGlobe, FiImage, FiMonitor, FiMoon, FiSettings, FiSun, FiTrash2, FiUploadCloud } from "react-icons/fi";
import { languages, regions, timezoneOptions, wallpapers } from "../config";
import { useClock } from "../lib/hooks";
import { formatDate, formatTime, optimizeWallpaper } from "../lib/osUtils";

const appearanceOptions = [
  { id: "dark", label: "Dark", icon: FiMoon },
  { id: "light", label: "Light", icon: FiSun },
  { id: "system", label: "System", icon: FiMonitor },
];

const SettingsApp = ({ preferences, setPreferences, t }) => {
  const now = useClock();
  const wallpaperInputRef = useRef(null);
  const [uploadState, setUploadState] = useState("");
  const update = (changes) => setPreferences((current) => ({ ...current, ...changes }));
  const wallpaperChoices = preferences.customWallpaper ? [...wallpapers, { id: "custom", name: "My Upload", image: preferences.customWallpaper }] : wallpapers;

  const handleWallpaperUpload = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    if (file.size > 20 * 1024 * 1024) {
      setUploadState("Choose an image smaller than 20 MB.");
      return;
    }

    setUploadState("Optimizing wallpaper...");
    try {
      const customWallpaper = await optimizeWallpaper(file);
      update({ customWallpaper, wallpaper: "custom" });
      setUploadState(`${file.name} is now your desktop wallpaper.`);
    } catch (error) {
      setUploadState(error.message);
    }
  };

  const handleTimezoneChange = (event) => {
    const selected = timezoneOptions.find((item) => item.timezone === event.target.value);
    update({ timezone: event.target.value, region: selected?.region || preferences.region });
  };

  return (
    <div className="nkos-settings-app">
      <aside><div className="nkos-settings-icon"><FiSettings /></div><h2>{t("settings")}</h2><p>{t("personalize")}</p><span>{t("autoSave")}</span></aside>
      <div className="nkos-settings-content">
        <section>
          <header><FiSun /><div><h3>Appearance</h3><p>Choose a workspace theme or follow this device.</p></div></header>
          <div className="nkos-appearance-options">
            {appearanceOptions.map((option) => { const Icon = option.icon; return <button type="button" key={option.id} className={preferences.theme === option.id ? "active" : ""} onClick={() => update({ theme: option.id })}><span><Icon /></span><b>{option.label}</b>{preferences.theme === option.id && <FiCheck />}</button>; })}
          </div>
        </section>
        <section>
          <header><FiImage /><div><h3>{t("wallpaper")}</h3><p>{t("chooseWallpaper")}</p></div></header>
          <div className="nkos-wallpaper-options">{wallpaperChoices.map((wallpaper) => <button type="button" key={wallpaper.id} className={preferences.wallpaper === wallpaper.id ? "active" : ""} onClick={() => update({ wallpaper: wallpaper.id })}><span style={wallpaper.image ? { backgroundImage: `url(${wallpaper.image})` } : undefined} className={!wallpaper.image ? "grid-preview" : ""}>{preferences.wallpaper === wallpaper.id && <FiCheck />}</span><b>{wallpaper.name}</b></button>)}</div>
          <div className="nkos-wallpaper-upload">
            <input ref={wallpaperInputRef} type="file" accept="image/*" onChange={handleWallpaperUpload} />
            <button type="button" onClick={() => wallpaperInputRef.current?.click()}><FiUploadCloud /><span><b>{t("uploadWallpaper")}</b><small>{t("uploadCopy")}</small></span></button>
            {preferences.customWallpaper && <button type="button" className="remove" onClick={() => update({ customWallpaper: "", wallpaper: preferences.wallpaper === "custom" ? "circuit" : preferences.wallpaper })}><FiTrash2 /> {t("removeUpload")}</button>}
            {uploadState && <p>{uploadState}</p>}
          </div>
        </section>
        <section>
          <header><FiGlobe /><div><h3>{t("regionTimezone")}</h3><p>{t("regionCopy")}</p></div></header>
          <div className="nkos-region-options">{Object.entries(regions).map(([regionKey, region]) => <button type="button" key={region.name} className={preferences.region === regionKey ? "active" : ""} onClick={() => update({ region: regionKey, timezone: region.zones[0] })}><span>{region.code}</span><b>{region.name}</b></button>)}</div>
          <label className="nkos-settings-select">{t("timezone")}<select value={preferences.timezone} onChange={handleTimezoneChange}>{timezoneOptions.map((option) => <option key={option.timezone} value={option.timezone}>{option.label}</option>)}</select></label>
        </section>
        <section>
          <header><FiClock /><div><h3>{t("dateTime")}</h3><p>{formatDate(now, preferences)} · {formatTime(now, preferences)}</p></div></header>
          <div className="nkos-setting-controls"><div><span>{t("clock")}</span>{["12", "24"].map((value) => <button type="button" key={value} className={preferences.hourCycle === value ? "active" : ""} onClick={() => update({ hourCycle: value })}>{value}-hour</button>)}</div><div><span>{t("date")}</span>{["short", "long", "iso"].map((value) => <button type="button" key={value} className={preferences.dateStyle === value ? "active" : ""} onClick={() => update({ dateStyle: value })}>{value.toUpperCase()}</button>)}</div></div>
        </section>
        <section>
          <header><FiGlobe /><div><h3>{t("language")}</h3><p>{t("languageCopy")}</p></div></header>
          <div className="nkos-language-options">{languages.map((language) => <button type="button" key={language.id} className={preferences.language === language.id ? "active" : ""} onClick={() => update({ language: language.id })}><span>{language.code}</span><b>{language.name}</b></button>)}</div>
        </section>
      </div>
    </div>
  );
};

export default SettingsApp;
