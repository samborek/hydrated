import { SeriesType } from "lightweight-charts";
import { BaselineChartData, OhlcData } from "@/components/TradingViewChart/utils";
type ChartTypeProps = {
    type: Extract<SeriesType, "Candlestick">;
    onCrosshairMove?: (data: OhlcData | null) => void;
} | {
    type?: Extract<SeriesType, "Baseline">;
    onCrosshairMove?: (data: BaselineChartData | null) => void;
};
export type TradingViewChartProps = ChartTypeProps & {
    data: Array<OhlcData>;
    height?: number;
    hidePriceIndicator?: boolean;
};
export declare const TradingViewChart: React.FC<TradingViewChartProps>;
export {};
