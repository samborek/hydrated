import { ThemeUIContextValue } from "@theme-ui/core";
import React from "react";
import { ThemeName, ThemePreference, ThemeProps, ThemeToken } from "@/theme";
type ThemeProviderProps = {
    children: React.ReactNode;
};
interface ExactContextValue extends Omit<ThemeUIContextValue, "theme"> {
    theme: ThemeProps;
}
export declare const useThemeUI: () => ExactContextValue;
export declare function useTheme(): {
    theme: ThemeName;
    themePreference: ThemePreference;
    setThemePreference: (theme: ThemePreference) => void;
    themeProps: ThemeProps;
    getToken: (path: ThemeToken) => any;
};
type ThemeStore = {
    themePreference: ThemePreference;
    setThemePreference: (theme: ThemePreference) => void;
};
export declare const useThemeStore: import("zustand").UseBoundStore<Omit<import("zustand").StoreApi<ThemeStore>, "setState" | "persist"> & {
    setState(partial: ThemeStore | Partial<ThemeStore> | ((state: ThemeStore) => ThemeStore | Partial<ThemeStore>), replace?: false | undefined): unknown;
    setState(state: ThemeStore | ((state: ThemeStore) => ThemeStore), replace: true): unknown;
    persist: {
        setOptions: (options: Partial<import("zustand/middleware").PersistOptions<ThemeStore, ThemeStore, unknown>>) => void;
        clearStorage: () => void;
        rehydrate: () => Promise<void> | void;
        hasHydrated: () => boolean;
        onHydrate: (fn: (state: ThemeStore) => void) => () => void;
        onFinishHydration: (fn: (state: ThemeStore) => void) => () => void;
        getOptions: () => Partial<import("zustand/middleware").PersistOptions<ThemeStore, ThemeStore, unknown>>;
    };
}>;
export declare const ThemeProvider: React.FC<ThemeProviderProps>;
export {};
