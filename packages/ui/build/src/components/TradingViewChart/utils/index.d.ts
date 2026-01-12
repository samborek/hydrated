import { BaselineStyleOptions, HistogramData, type IChartApi, type ISeriesApi, type SingleValueData, type Time, type UTCTimestamp, WhitespaceData } from "lightweight-charts";
export type OhlcData = {
    time: Time;
    close: number;
    open?: number;
    high?: number;
    low?: number;
    volume?: number;
};
export type BaselineChartData = SingleValueData & {
    volume?: number;
};
export type ChartDataExtended = {
    type: "Candlestick";
    data: OhlcData;
} | {
    type: "Baseline";
    data: BaselineChartData;
};
export type SeriesType = ChartDataExtended["type"];
export declare const parseTradingViewTime: (time: Time) => number;
export declare const getCrosshairValue: (crosshair: CrosshairCallbackData) => number | undefined;
export declare const toUTCTimestamp: (timestamp: number) => UTCTimestamp;
type ColorOptions = {
    upColor: string;
    downColor: string;
    lineColor: string;
    volumeBarColor: string;
};
export declare const renderSeries: (chart: IChartApi, type: SeriesType, data: Array<OhlcData> | undefined, color: ColorOptions, baseline?: Partial<BaselineStyleOptions>) => [ISeriesApi<SeriesType>, ISeriesApi<"Histogram", Time, WhitespaceData<Time> | HistogramData<Time>>?];
export type CrosshairCallbackData = ChartDataExtended | null;
export declare const subscribeCrosshairMove: (chart: IChartApi, [series, volumeSeries]: [ISeriesApi<SeriesType>, ISeriesApi<"Histogram", Time, WhitespaceData<Time> | HistogramData<Time>>?], chartContainerElement: HTMLDivElement, crosshairElement: HTMLDivElement, priceIndicatorElement: HTMLDivElement | null, onUpdate: (data: CrosshairCallbackData) => void) => void;
export {};
