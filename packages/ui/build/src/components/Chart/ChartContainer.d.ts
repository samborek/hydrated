import { ResponsiveContainer } from "recharts";
import { ChartConfig, ChartSizeProps, TChartData } from "@/components/Chart/types";
export declare function useChart(): {
    config: {
        xAxisType: import("@/components/Chart/types").ChartSeriesType;
        yAxisType: import("@/components/Chart/types").ChartSeriesType;
        tooltipType: import("@/components/Chart/types").ChartTooltipType;
        xAxisKey: string;
        xAxisFormatter?: ((value: unknown) => string) | undefined;
        tooltipFormatter?: ((value: unknown) => string) | undefined;
        yAxisFormatter?: (value: number) => string;
        seriesLabel?: string;
        series: {
            key: never;
            label?: string;
            color?: string | [string, string] | [string, string, stopOpacity?: number, opacity?: number];
        }[];
    };
};
export type ChartContainerProps<TData extends TChartData> = React.ComponentProps<"div"> & {
    config: ChartConfig<TData>;
    children: React.ComponentProps<typeof ResponsiveContainer>["children"];
} & ChartSizeProps;
export declare function ChartContainer<TData extends TChartData>({ id, children, config, height, aspectRatio, ...props }: ChartContainerProps<TData>): import("react").JSX.Element;
