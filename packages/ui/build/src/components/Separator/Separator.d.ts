import * as RadixSeparator from "@radix-ui/react-separator";
import { ResponsiveStyleValue } from "@theme-ui/css";
import React from "react";
import { BoxProps } from "@/components/Box";
type SeparatorOwnProps = {
    size?: number;
    orientation?: ResponsiveStyleValue<"horizontal" | "vertical">;
};
export type SeparatorProps = Omit<React.ComponentPropsWithoutRef<typeof RadixSeparator.Root>, "orientation"> & BoxProps & SeparatorOwnProps;
export declare const Separator: React.FC<SeparatorProps>;
export {};
