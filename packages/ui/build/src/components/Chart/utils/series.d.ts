import { AxisLabelCssProps, ChartConfig, ChartSeriesType, TChartData } from "@/components/Chart/types";
export declare const pickPrimarySeries: <T extends TChartData>(config: ChartConfig<T>) => {
    key: { [K in keyof T]: T[K] extends number ? K : never; }[keyof T] & string;
    label?: string;
    color?: string | [string, string] | [string, string, stopOpacity?: number, opacity?: number];
} | undefined;
export declare const getColorSet: (color?: ChartConfig<TChartData>["series"][number]["color"], defaultColor?: string) => {
    primary: string;
    secondary: string;
};
export declare const getDefaultFormatterByType: (type?: ChartSeriesType) => ((date?: Date | number) => string) | undefined;
export declare const getConfigWithDefaults: <T extends TChartData>(config: ChartConfig<T>) => {
    xAxisType: ChartSeriesType;
    yAxisType: ChartSeriesType;
    tooltipType: import("@/components/Chart/types").ChartTooltipType;
    xAxisKey: keyof T & string;
    xAxisFormatter?: ((value: T[keyof T]) => string) | undefined;
    tooltipFormatter?: ((value: T[keyof T]) => string) | undefined;
    yAxisFormatter?: (value: number) => string;
    seriesLabel?: string;
    series: {
        key: { [K in keyof T]: T[K] extends number ? K : never; }[keyof T] & string;
        label?: string;
        color?: string | [string, string] | [string, string, stopOpacity?: number, opacity?: number];
    }[];
};
export declare const getDerivedChartProps: <T extends TChartData>(config: ChartConfig<T>) => {
    margin: {
        top: number;
        bottom: number;
    };
    labelFormatter: ((date?: Date | number) => string) | ((value: T[keyof T]) => string) | undefined;
    tooltipFormatter: ((date?: Date | number) => string) | ((value: T[keyof T]) => string) | undefined;
    valueFormatter: ((value: number) => string) | undefined;
    tooltipWrapperStyles: {
        readonly position: "static";
    } | undefined;
};
export declare const getBarSeriesBorderRadius: (index: number, total: number, isStacked?: boolean, isVerticalLayout?: boolean) => [number, number, number, number];
export declare const getAxisLabelProps: (config: any, isVerticalLayout: boolean, labelProps?: AxisLabelCssProps) => import("react").ReactElement<unknown, string | import("react").JSXElementConstructor<any>> | {
    position: string;
    angle: number;
    dy: number;
    dx: number;
    fontSize: number;
    lineHeight?: number;
    fontWeight?: number;
    fill?: string;
    value: string | number;
} | {
    position: string;
    angle: number;
    dy: number;
    dx: number;
    fontSize: number;
    lineHeight?: number;
    fontWeight?: number;
    fill?: string;
} | undefined;
