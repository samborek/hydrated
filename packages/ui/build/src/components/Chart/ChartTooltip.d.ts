import React from "react";
import { DefaultTooltipContentProps, Tooltip, TooltipContentProps } from "recharts";
import { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent";
type RechartsTooltipProps = React.ComponentProps<typeof Tooltip> & Omit<DefaultTooltipContentProps<ValueType, NameType>, "accessibilityLayer">;
type CoordinateProps = Pick<TooltipContentProps<ValueType, NameType>, "coordinate">;
export declare const ChartTooltipLegendType: ({ active, payload, labelFormatter, formatter, }: RechartsTooltipProps) => React.JSX.Element | null;
export declare const ChartTooltipTimeType: ({ active, payload, coordinate, }: RechartsTooltipProps & CoordinateProps) => React.JSX.Element | null;
export declare const ChartTooltip: (props: React.ComponentProps<typeof Tooltip> & CoordinateProps) => React.JSX.Element | null;
export {};
