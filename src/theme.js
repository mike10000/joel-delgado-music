import { useEffect, useState } from "react";
import { DEFAULT_THEME } from "./data/themes.js";

const STORAGE_KEY = "jd-theme";
const LINK_ID = "theme-stylesheet";

// Points the swappable <link> at /themes/<id>.css.
function applyTheme(id) {
  const link = document.getElementById(LINK_ID);
  if (link) link.href = `/themes/${id}.css`;
}

// React hook that connects a dropdown to the active stylesheet.
// `theme` is the current id; `setTheme` swaps the CSS file and persists it.
export function useTheme() {
  const [theme, setThemeState] = useState(() => {
    if (typeof localStorage !== "undefined") {
      return localStorage.getItem(STORAGE_KEY) || DEFAULT_THEME;
    }
    return DEFAULT_THEME;
  });

  useEffect(() => {
    applyTheme(theme);
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // ignore storage failures (e.g. private mode)
    }
  }, [theme]);

  return { theme, setTheme: setThemeState };
}
