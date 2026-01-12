import { ResponsiveStyleValue } from "@theme-ui/css";
import { FC, Ref } from "react";
import { BoxProps } from "@/components/Box";
export type LabelPosition = "start" | "center" | "end";
export type ProgressCircleProps = BoxProps & {
    radius?: ResponsiveStyleValue<number>;
    thickness?: ResponsiveStyleValue<number>;
    percent: number;
    label?: React.ReactNode;
    isReversed?: boolean;
    labelPosition?: ResponsiveStyleValue<LabelPosition>;
    fontSize?: ResponsiveStyleValue<number>;
    ref?: Ref<HTMLDivElement>;
};
export declare const ProgressCircle: FC<ProgressCircleProps>;
