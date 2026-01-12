import { ExternalProvider } from "@ethersproject/providers";
import { FC } from "react";
import { AppFormattersProvidersContextType } from "@/hooks/app-data-provider/useAppFormatters";
import { ExternalApyData, MoneyMarketEnv, MoneyMarketTxFn } from "@/types";
export type MoneyMarketProviderProps = AppFormattersProvidersContextType & {
    children: React.ReactNode;
    provider: ExternalProvider;
    env: MoneyMarketEnv;
    onCreateTransaction: MoneyMarketTxFn;
    externalApyData: ExternalApyData;
};
export declare const MoneyMarketProvider: FC<MoneyMarketProviderProps>;
