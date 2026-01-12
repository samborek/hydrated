import { ResponsiveStyleValue } from "@theme-ui/css";
import React from "react";
import { FlexProps } from "@/components/Flex";
import { SeparatorProps } from "@/components/Separator";
type StackDirection = "row" | "column";
export type StackProps = Omit<FlexProps, "direction"> & {
    separated?: boolean;
    withLeadingSeparator?: boolean;
    withTrailingSeparator?: boolean;
    separator?: React.ReactElement<Partial<SeparatorProps>>;
    direction?: ResponsiveStyleValue<StackDirection>;
    children: React.ReactNode;
};
export declare const Stack: React.FC<StackProps>;
export {};
