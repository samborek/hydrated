import { jsx as _jsx, jsxs as _jsxs } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { ThemeProvider as ThemeUIProvider, useThemeUI as useThemeUIHook, } from "@theme-ui/core";
import { get } from "@theme-ui/css";
import { createContext, useContext, useEffect, useState } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { GlobalStyles } from "@/styles";
import { themes, } from "@/theme";
const getSystemTheme = () => {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
};
const ThemeContext = createContext({
    theme: getSystemTheme(),
    themePreference: "system",
    setThemePreference: () => { },
});
export const useThemeUI = useThemeUIHook;
export function useTheme() {
    const { theme: themeProps } = useThemeUI();
    const themeContext = useContext(ThemeContext);
    return {
        themeProps,
        getToken: (path) => get(themeProps, path),
        ...themeContext,
    };
}
export const useThemeStore = create()(persist((set) => ({
    themePreference: "system",
    setThemePreference: (themePreference) => set({ themePreference }),
}), {
    name: "theme",
    version: 1,
}));
const applyTheme = (theme) => {
    const html = window.document.documentElement;
    html.classList.remove("light", "dark");
    html.classList.add(theme);
    html.style.colorScheme = theme;
};
useThemeStore.subscribe((state) => {
    const { themePreference } = state;
    const theme = themePreference === "system" ? getSystemTheme() : themePreference;
    applyTheme(theme);
});
const getCurrentTheme = (theme) => themes[theme];
export const ThemeProvider = ({ children }) => {
    const { themePreference, setThemePreference } = useThemeStore();
    const [systemTheme, setSystemTheme] = useState(getSystemTheme);
    const resolvedTheme = themePreference === "system" ? systemTheme : themePreference;
    useEffect(() => {
        applyTheme(resolvedTheme);
    }, [resolvedTheme]);
    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        const handleChange = () => {
            const newTheme = getSystemTheme();
            setSystemTheme(newTheme);
            if (themePreference === "system") {
                applyTheme(newTheme);
            }
        };
        setSystemTheme(getSystemTheme());
        mediaQuery.addEventListener("change", handleChange);
        return () => mediaQuery.removeEventListener("change", handleChange);
    }, [themePreference]);
    return (_jsx(ThemeContext.Provider, { value: { theme: resolvedTheme, themePreference, setThemePreference }, children: _jsxs(ThemeUIProvider, { theme: getCurrentTheme(resolvedTheme), children: [_jsx(GlobalStyles, {}), children] }) }));
};
