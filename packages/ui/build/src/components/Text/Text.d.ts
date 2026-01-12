import { ResponsiveStyleValue, ThemeUICSSProperties } from "@theme-ui/core";
import { FC, Ref } from "react";
import { BoxProps } from "@/components";
import { ThemeFont, ThemeProps } from "@/theme";
export type TextSize = keyof ThemeProps["typography"]["text"]["size"];
export type TextProps = BoxProps & {
    fw?: ResponsiveStyleValue<400 | 500 | 600 | 700>;
    lh?: ResponsiveStyleValue<number | string>;
    fs?: TextSize | ResponsiveStyleValue<number>;
    font?: ThemeFont;
    align?: ThemeUICSSProperties["textAlign"];
    transform?: ThemeUICSSProperties["textTransform"];
    decoration?: ThemeUICSSProperties["textDecoration"];
    whiteSpace?: ThemeUICSSProperties["whiteSpace"];
    wordBreak?: ThemeUICSSProperties["wordBreak"];
    truncate?: true | ResponsiveStyleValue<number | string>;
    ref?: Ref<HTMLParagraphElement>;
};
export declare const getFontSizeProps: (fs: TextProps["fs"]) => {
    variant: string;
    fontSize?: undefined;
} | {
    fontSize: ResponsiveStyleValue<number>;
    variant?: undefined;
};
export declare const Text: FC<TextProps>;
