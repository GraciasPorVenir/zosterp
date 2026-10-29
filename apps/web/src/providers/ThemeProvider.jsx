import { createContext, useContext, useState, useMemo, useEffect } from "react";
import { ThemeProvider as MuiThemeProvider, createTheme, CssBaseline } from "@mui/material";

const ThemeContext = createContext(undefined);

const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState(() => {
    try {
      return localStorage.getItem("themeMode") || "light";
    } catch {
      return "light";
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("themeMode", mode);
    } catch {
      // ignore
    }
  }, [mode]);

  const toggleTheme = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  const theme = useMemo(() => (mode === "dark" ? darkTheme : lightTheme), [mode]);

  const contextValue = useMemo(
    () => ({ mode, toggleTheme }),
    [mode]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useThemeMode = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useThemeMode debe usarse dentro de ThemeProvider");
  return context;
};

