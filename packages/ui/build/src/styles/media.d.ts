import { ResponsiveStyleValue } from "@theme-ui/css";
export type ScreenBreakpoint = "xs" | "sm" | "md" | "lg" | "xl";
export type ScreenType = "mobile" | "tablet" | "laptop" | "desktop";
export declare const BREAKPOINTS_TYPES: string[];
export declare const BREAKPOINTS_VALUES: string[];
export declare const breakpointsMap: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
};
type ExtendedBreakpoint = `${ScreenBreakpoint}` | `max-${ScreenBreakpoint}`;
export declare const mediaQueries: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    "max-xs": string;
    "max-sm": string;
    "max-md": string;
    "max-lg": string;
    "max-xl": string;
};
export declare const mq: (bp: ExtendedBreakpoint) => string;
export declare const useBreakpoints: () => {
    screen: ScreenType | null;
    isMobile: boolean;
    isTablet: boolean;
    isLaptop: boolean;
    isDesktop: boolean;
    matches: string[];
    breakpoint: ScreenBreakpoint;
    gte: (givenBp: ScreenBreakpoint) => boolean;
};
export declare function useResponsiveValue<T>(value: ResponsiveStyleValue<T>, defaultValue: T): T;
export declare function useResponsiveValue<T>(value: ResponsiveStyleValue<T>, defaultValue?: undefined): T | undefined;
/**
 * Replaces null values in the array with the last non-null value to match with the breakpoints array
 * @example [50, null, 100] => [50, 50, 100]
 */
export declare function normalizeResponsiveProp<T>(input: ResponsiveStyleValue<T>): T[];
export {};
