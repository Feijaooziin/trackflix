import { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { darkTheme } from "@/theme/dark";
import { lightTheme } from "@/theme/light";

interface ThemeContextProps {
  theme: any;
  isDark: boolean;
  toggleTheme: () => void;
}

export const ThemeContext = createContext({} as ThemeContextProps);

export function ThemeProvider({ children }: any) {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    loadTheme();
  }, []);

  async function loadTheme() {
    const savedTheme = await AsyncStorage.getItem("@trackflix_theme");

    if (savedTheme === "light") {
      setIsDark(false);
    }
  }

  async function toggleTheme() {
    const newTheme = !isDark;

    setIsDark(newTheme);

    await AsyncStorage.setItem("@trackflix_theme", newTheme ? "dark" : "light");
  }

  const theme = isDark ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
