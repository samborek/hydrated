import { ThemeUICSSObject } from "@theme-ui/css";
import { FC, ReactNode } from "react";
export type ProgressBarSize = "small" | "medium" | "large";
export type ProgressBarOrientation = "horizontal" | "vertical";
type Props = {
    readonly value: number;
    readonly customLabel?: string | ReactNode;
    readonly size?: ProgressBarSize;
    readonly format?: (percentage: number) => string;
    readonly orientation?: ProgressBarOrientation;
    readonly hideLabel?: boolean;
    readonly className?: string;
    readonly color?: ThemeUICSSObject["color"];
};
export declare const ProgressBar: FC<Props>;
export {};
