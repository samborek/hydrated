import { GhoReserveData, GhoUserData } from "@aave/math-utils";
import { StateCreator } from "zustand";
import { RootStore } from "./root";
interface GhoMarketConfig {
    ghoTokenAddress: string;
    uiGhoDataProviderAddress: string;
}
interface GhoUtilMintingAvailableParams {
    symbol: string;
    currentMarket: string;
}
export interface GhoSlice {
    ghoReserveData: GhoReserveData;
    ghoUserData: GhoUserData;
    ghoReserveDataFetched: boolean;
    ghoUserDataFetched: boolean;
    ghoUserQualifiesForDiscount: (futureBorrowAmount?: string) => boolean;
    ghoMarketConfig: () => GhoMarketConfig | undefined;
    refreshGhoData: () => Promise<void>;
    displayGho: ({ symbol, currentMarket, }: GhoUtilMintingAvailableParams) => boolean;
}
export declare const createGhoSlice: StateCreator<RootStore, [
    ["zustand/subscribeWithSelector", never],
    ["zustand/devtools", never]
], [
], GhoSlice>;
export {};
