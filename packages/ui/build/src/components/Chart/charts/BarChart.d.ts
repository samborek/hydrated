import { CartesianLayout } from "recharts/types/util/types";
import { ChartSharedProps, TChartData } from "@/components/Chart/types";
type BarChartOwnProps = {
    layout?: CartesianLayout;
    barSize?: number;
    barGap?: number;
    barCategoryGap?: number;
    stacked?: boolean;
};
export type BarChartProps<TData extends TChartData> = BarChartOwnProps & ChartSharedProps<TData>;
export declare function BarChart<TData extends TChartData>({ config, data, height, aspectRatio, horizontalGridHidden, verticalGridHidden, xAxisHidden, yAxisHidden, xAxisProps, yAxisProps, xAxisLabel, yAxisLabel, onCrosshairMove, layout, barSize, barGap, barCategoryGap, stacked, }: BarChartProps<TData>): import("react").JSX.Element;
export {};
