import { ReactNode } from "react";
import { DotProps, ReferenceLine } from "recharts";
import { CurveType } from "recharts/types/shape/Curve";
import { AxisLabelCssProps, ChartSharedProps, TChartData } from "@/components/Chart/types";
type AreaChartOwnProps<TData extends TChartData> = {
    curveType?: CurveType;
    gradient?: "area" | "line" | "all" | "none";
    strokeWidth?: number;
    strokeDasharray?: string;
    customDot?: (props: DotProps & {
        payload: TData;
    }) => React.ReactElement<SVGElement>;
    referenceLines?: React.ComponentPropsWithoutRef<typeof ReferenceLine>[];
    xAxisLabelProps?: AxisLabelCssProps;
    yAxisLabelProps?: AxisLabelCssProps;
    withoutReferenceLine?: boolean;
    withoutTooltip?: boolean;
    withoutActiveDot?: boolean;
    legend?: ReactNode;
};
export type AreaChartProps<TData extends TChartData> = AreaChartOwnProps<TData> & ChartSharedProps<TData>;
export declare function AreaChart<TData extends TChartData>({ data, config, height, aspectRatio, horizontalGridHidden, verticalGridHidden, gridHorizontalValues, gridVerticalValues, xAxisHidden, yAxisHidden, xAxisProps, yAxisProps, xAxisLabel, yAxisLabel, onCrosshairMove, curveType, gradient, strokeWidth, strokeDasharray, customDot, referenceLines, xAxisLabelProps, yAxisLabelProps, withoutReferenceLine, withoutTooltip, legend, withoutActiveDot, }: AreaChartProps<TData>): import("react").JSX.Element;
export {};
