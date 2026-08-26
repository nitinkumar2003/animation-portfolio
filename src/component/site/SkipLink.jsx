"use client";

import { usePreferences } from "./Preferences";

const SkipLink = () => {
  const { t } = usePreferences();
  return <a href="#main" className="nk-skip">{t("skipToContent")}</a>;
};

export default SkipLink;
