import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

const DarkModeContext = createContext<{
  isDarkMode: boolean;
  toggleMode: () => void;
}>({
  isDarkMode: false,
  toggleMode: () => {}
});

export function useDarkMode() {
  return useContext(DarkModeContext);
}

interface DarkModeProviderProps {
  children: ReactNode;
}

export function DarkModeProvider({ children }: DarkModeProviderProps) {
  useEffect(() => {
    const userPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setIsDarkMode(userPrefersDark);
  }, []);

  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}
