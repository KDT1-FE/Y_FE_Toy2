import { useEffect, useState } from "react";
import { Theme, darkTheme, lightTheme } from "../style/theme";

export const useDarkMode = () => {
  const [theme, setTheme] = useState<Theme>(lightTheme);

  const setMode = (mode: Theme) => {
    if (mode === lightTheme) {
      window.localStorage.setItem("theme", "light");
    } else {
      window.localStorage.setItem("theme", "dark");
    }
    setTheme(mode);
  };

  const toggleTheme = () => {
    return theme === lightTheme ? setMode(darkTheme) : setMode(lightTheme);
  };

  const localTheme = window.localStorage.getItem("theme");
  useEffect(() => {
    if (localTheme !== null) {
      if (localTheme === "dark") {
        setTheme(darkTheme);
      } else {
        setTheme(lightTheme);
      }
    }
  }, [localTheme]);
  return { theme, toggleTheme };
};
