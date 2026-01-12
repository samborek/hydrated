import { css } from "@emotion/react";
import { get } from "@theme-ui/css";
export const px = (n) => (typeof n === "number" ? n + "px" : n);
export const minusPx = true;
export const getToken = (token) => (theme) => Array.isArray(token) ? token.map((t) => get(theme, t)) : get(theme, token);
export const getTokenPx = (token, minus) => (theme) => Array.isArray(token)
    ? token.map((t) => `${minus ? "-" : ""}${get(theme, t)}px`)
    : `${minus ? "-" : ""}${get(theme, token)}px`;
export const getMinusTokenPx = (token) => getTokenPx(token, minusPx);
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
