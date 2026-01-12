import { type CrosshairOptions, type DeepPartial, type GridOptions, type LayoutOptions, type PriceScaleOptions, type TimeScaleOptions } from "lightweight-charts";
import { ThemeProps } from "@/theme";
export declare const layout: (theme: ThemeProps) => Partial<LayoutOptions>;
export declare const rightPriceScale: Partial<PriceScaleOptions>;
export declare const leftPriceScale: Partial<PriceScaleOptions>;
export declare const timeScale: Partial<TimeScaleOptions>;
export declare const crosshair: (theme: ThemeProps) => DeepPartial<CrosshairOptions>;
export declare const grid: DeepPartial<GridOptions>;
