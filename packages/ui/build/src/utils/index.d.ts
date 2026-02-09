import { css, SerializedStyles, Theme as EmotionTheme } from "@emotion/react";
import { SxProp } from "@theme-ui/core";
import { Theme as ThemeUI } from "@theme-ui/css";
import { ThemeToken } from "@/theme";
export declare const REM_BASE = 16;
export declare const px: (n: number | string) => string;
export declare const pxToRem: (px: number) => string;
export declare const toRem: (value: number | string) => string;
declare const __brand: unique symbol;
export type Branded<T> = true & {
    [__brand]: T;
};
export type MinusPx = Branded<"MinusPx">;
export declare const minusPx: MinusPx;
export declare const getToken: (token: ThemeToken | ThemeToken[]) => (theme: ThemeUI) => any;
export declare const getTokenPx: (token: ThemeToken | ThemeToken[], minus?: MinusPx) => (theme: ThemeUI) => string | string[];
export declare const getMinusTokenPx: (token: ThemeToken | ThemeToken[]) => (theme: ThemeUI) => string | string[];
export declare const getTokenRem: (token: ThemeToken | ThemeToken[], minus?: MinusPx) => (theme: ThemeUI) => string | string[];
export declare const getMinusTokenRem: (token: ThemeToken | ThemeToken[]) => (theme: ThemeUI) => string | string[];
export declare function createStyles<T extends SerializedStyles>(callback: (theme: EmotionTheme) => T): () => ({ theme }: {
    theme: EmotionTheme;
}) => T;
type ExtractString<T> = T extends string ? T : never;
export declare function createVariants<TKey = string>(callback: (theme: EmotionTheme) => Record<ExtractString<TKey>, SerializedStyles>): (key: ExtractString<TKey>) => ({ theme }: {
    theme: EmotionTheme;
}) => Record<ExtractString<TKey>, SerializedStyles>[ExtractString<TKey>];
export { css, type SxProp };
export { default as styled } from "@emotion/styled";
export * from "../styles/container";
