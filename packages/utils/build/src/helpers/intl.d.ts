import Big from "big.js";
export declare const getMaxSignificantDigits: (value: number | bigint | string, options: Intl.NumberFormatOptions) => number;
export declare const formatNumber: (value: number | bigint | string | null | undefined, lng?: string, options?: Record<string, unknown>) => string;
export declare const formatPercent: (value: number | bigint | null | undefined, lng?: string, options?: Record<string, unknown>) => string;
export declare const formatCurrency: (_value: number | bigint | string | Big | null | undefined, lng?: string, options?: Record<string, unknown>) => string;
export declare const formatAssetAmount: (amount: string, maxDecimals: number) => string;
