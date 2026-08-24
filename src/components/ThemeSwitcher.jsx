import { THEMES } from "../data/themes.js";

// The dropdown. Selecting an option calls setTheme(), which swaps the CSS file.
export default function ThemeSwitcher({ theme, setTheme }) {
  return (
    <div className="theme-switcher">
      <label htmlFor="theme-select" className="theme-label">
        Style
      </label>
      <select
        id="theme-select"
        className="theme-select"
        value={theme}
        onChange={(e) => setTheme(e.target.value)}
      >
        {THEMES.map((t) => (
          <option key={t.id} value={t.id}>
            {t.label}
          </option>
        ))}
      </select>
    </div>
  );
}
