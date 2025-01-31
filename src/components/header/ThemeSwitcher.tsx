import { ThemeContext } from "../../context/themeContext";
import { useContext } from "react";

function ThemeSwitcher() {
  const { themeName, toggleTheme } = useContext(ThemeContext);

  return <button onClick={toggleTheme}>{themeName}</button>;
}

export default ThemeSwitcher;
