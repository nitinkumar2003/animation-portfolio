"use client";

import { FiMoon, FiSun } from "react-icons/fi";
import { usePreferences } from "./Preferences";
import { siteLanguages } from "../../data/siteI18n";

const THEMES = [
  { id: "light", icon: FiSun, key: "light" },
  { id: "dark", icon: FiMoon, key: "dark" },
];

/** Theme switch + language picker, shared by the nav and the mobile menu. */
const PreferenceControls = () => {
  const { theme, language, setTheme, setLanguage, t } = usePreferences();

  return (
    <div className="nk-prefs">
      <div className="nk-prefs__theme" role="group" aria-label={t("appearance")}>
        {THEMES.map((option) => {
          const Icon = option.icon;
          return (
            <button
              type="button"
              key={option.id}
              onClick={() => setTheme(option.id)}
              aria-pressed={theme === option.id}
              aria-label={t(option.key)}
              title={t(option.key)}
            >
              <Icon />
            </button>
          );
        })}
      </div>

      <select
        className="nk-prefs__lang"
        value={language}
        onChange={(event) => setLanguage(event.target.value)}
        aria-label={t("language")}
      >
        {siteLanguages.map((item) => (
          <option key={item.id} value={item.id}>{item.code}</option>
        ))}
      </select>
    </div>
  );
};

export default PreferenceControls;
