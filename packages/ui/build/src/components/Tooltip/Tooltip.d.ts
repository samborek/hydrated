import { TooltipContentProps } from "@radix-ui/react-tooltip";
import { FC, ReactNode } from "react";
import { type BoxProps } from "../Box";
export type InfoTooltipProps = {
    text: ReactNode | string;
    children?: ReactNode;
    side?: TooltipContentProps["side"];
    align?: TooltipContentProps["align"];
    sideOffset?: TooltipContentProps["sideOffset"];
    alignOffset?: TooltipContentProps["alignOffset"];
    asChild?: boolean;
    preventDefault?: boolean;
    iconColor?: BoxProps["color"];
};
export declare const Tooltip: ({ text, children, side, align, sideOffset, alignOffset, asChild, preventDefault, iconColor, }: InfoTooltipProps) => import("react").JSX.Element;
export declare const TooltipIcon: FC<BoxProps>;
