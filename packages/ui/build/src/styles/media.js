import { useCallback, useMemo } from "react";
import { useMedia } from "react-use";
export const BREAKPOINTS_TYPES = ["xs", "sm", "md", "lg", "xl"];
export const BREAKPOINTS_VALUES = ["480px", "768px", "1024px", "1280px"];
export const breakpointsMap = {
    xs: "0px",
    sm: BREAKPOINTS_VALUES[0],
    md: BREAKPOINTS_VALUES[1],
    lg: BREAKPOINTS_VALUES[2],
    xl: BREAKPOINTS_VALUES[3],
};
const breakpointsEntries = Object.entries(breakpointsMap);
export const mediaQueries = breakpointsEntries.reduce((acc, [bp, width], i, arr) => {
    return {
        ...acc,
        [bp]: `@media (min-width: ${parseInt(width, 10)}px)`,
        [`max-${bp}`]: `@media (max-width: ${parseInt(arr[i + 1]?.[1] ?? "9999px", 10) - 1}px)`,
    };
}, {});
export const mq = (bp) => mediaQueries[bp];
export const useBreakpoints = () => {
    const xs = useMedia(`(min-width: ${breakpointsMap.xs})`);
    const sm = useMedia(`(min-width: ${breakpointsMap.sm})`);
    const md = useMedia(`(min-width: ${breakpointsMap.md})`);
    const lg = useMedia(`(min-width: ${breakpointsMap.lg})`);
    const xl = useMedia(`(min-width: ${breakpointsMap.xl})`);
    const match = useMemo(() => {
        const bps = [
            { bp: "xl", match: xl },
            { bp: "lg", match: lg },
            { bp: "md", match: md },
            { bp: "sm", match: sm },
            { bp: "xs", match: xs },
        ].filter((bp) => bp.match === true);
        return {
            matches: bps.map((item) => item.bp),
            current: (bps[0] ? bps[0].bp : "xs"),
        };
    }, [lg, md, sm, xl, xs]);
    const gte = useCallback((givenBp) => {
        return match.matches.includes(givenBp);
    }, [match]);
    const screen = useMemo(() => {
        return gte("lg")
            ? "desktop"
            : gte("md")
                ? "laptop"
                : gte("sm")
                    ? "tablet"
                    : gte("xs")
                        ? "mobile"
                        : null;
    }, [gte]);
    return {
        screen,
        isMobile: screen === "mobile",
        isTablet: screen === "tablet",
        isLaptop: screen === "laptop",
        isDesktop: screen === "desktop",
        matches: match.matches,
        breakpoint: match.current,
        gte,
    };
};
export function useResponsiveValue(value, defaultValue) {
    const { breakpoint } = useBreakpoints();
    if (!value)
        return defaultValue;
    if (!Array.isArray(value))
        return value;
    const index = BREAKPOINTS_TYPES.indexOf(breakpoint);
    const normalizedProp = normalizeResponsiveProp(value);
    return normalizedProp?.[index] ?? defaultValue;
}
/**
 * Replaces null values in the array with the last non-null value to match with the breakpoints array
 * @example [50, null, 100] => [50, 50, 100]
 */
export function normalizeResponsiveProp(input) {
    const total = BREAKPOINTS_TYPES.length;
    const array = Array.isArray(input) ? input : [input];
    return Array.from({ length: total }).reduce((acc, _, i) => {
        const val = array[i];
        const prev = acc[i - 1];
        acc[i] = val ? val : prev;
        return acc;
    }, []);
}
