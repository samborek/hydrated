import React from "react";
import { FormatterFn, ReserveFormatterFn } from "@/types";
export type AppFormattersProvidersContextType = {
    formatReserve: ReserveFormatterFn;
    formatNumber: FormatterFn;
    formatCurrency: FormatterFn;
    formatPercent: FormatterFn;
};
export declare const AppFormattersProvider: React.FC<AppFormattersProvidersContextType & {
    children?: React.ReactNode;
}>;
export declare const useAppFormatters: () => AppFormattersProvidersContextType;
