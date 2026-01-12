import type { ResponsiveStyleValue, ThemeUICSSProperties } from "@theme-ui/css";
import { FC, Ref } from "react";
import { BoxProps } from "@/components/Box";
type GridOwnProps = {
    gap?: ThemeUICSSProperties["gap"];
    columnGap?: ThemeUICSSProperties["columnGap"];
    rowGap?: ThemeUICSSProperties["rowGap"];
    repeat?: "fit" | "fill";
    justify?: ThemeUICSSProperties["justifyContent"];
    justifyItems?: ThemeUICSSProperties["justifyItems"];
    align?: ThemeUICSSProperties["alignItems"];
    columns?: ResponsiveStyleValue<string | number>;
    columnWidth?: ResponsiveStyleValue<string | number>;
    columnTemplate?: ThemeUICSSProperties["gridTemplateColumns"];
    rowTemplate?: ThemeUICSSProperties["gridTemplateRows"];
};
export type GridProps = GridOwnProps & BoxProps;
export declare const Grid: FC<GridProps & {
    ref?: Ref<HTMLElement>;
}>;
export {};
