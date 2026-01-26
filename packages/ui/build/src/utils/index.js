import { css } from "@emotion/react";
import { get } from "@theme-ui/css";
// Base font size for rem calculations (browser default)
export const REM_BASE = 16;
export const px = (n) => (typeof n === "number" ? n + "px" : n);
export const pxToRem = (px) => `${px / REM_BASE}rem`;
// Helper for template literals in styled components: ${toRem(theme.scales.paddings.m)}
export const toRem = (value) => {
    const numValue = typeof value === "string" ? parseFloat(value) : value;
    return `${(numValue / REM_BASE).toFixed(4).replace(/\.?0+$/, "")}rem`;
};
export const minusPx = true;
export const getToken = (token) => (theme) => Array.isArray(token) ? token.map((t) => get(theme, t)) : get(theme, token);
// Returns token value in pixels (use for borders, shadows, fixed sizes)
export const getTokenPx = (token, minus) => (theme) => Array.isArray(token)
    ? token.map((t) => `${minus ? "-" : ""}${get(theme, t)}px`)
    : `${minus ? "-" : ""}${get(theme, token)}px`;
export const getMinusTokenPx = (token) => getTokenPx(token, minusPx);
// Returns token value in rem (use for spacing, padding, margins, font-sizes)
// This allows the UI to scale based on user's browser font-size preference
export const getTokenRem = (token, minus) => (theme) => {
    const convert = (value) => `${minus ? "-" : ""}${(value / REM_BASE).toFixed(4).replace(/\.?0+$/, "")}rem`;
    return Array.isArray(token)
        ? token.map((t) => convert(Number(get(theme, t))))
        : convert(Number(get(theme, token)));
};
export const getMinusTokenRem = (token) => getTokenRem(token, minusPx);
export function createStyles(callback) {
    return () => ({ theme }) => callback(theme);
}
export function createVariants(callback) {
    return (key) => ({ theme }) => callback(theme)[key];
}
export { css };
export { default as styled } from "@emotion/styled";
// Container Query utilities
export * from "../styles/container";
