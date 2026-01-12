import React from "react";
import { PoolReserve } from "@/store/poolSlice";
interface BackgroundDataProviderContextType {
    refetchGhoData: () => Promise<void>;
    refetchIncentiveData?: () => Promise<void>;
    refetchPoolData?: () => Promise<void> | Promise<void[]>;
    poolData?: PoolReserve;
}
/**
 * Naive provider that subscribes to different data sources.
 * This context provider will run useEffects that relate to instantiating subscriptions as a poll every 60s to consistently fetch data from on-chain and update the Zustand global store.
 */
export declare const BackgroundDataProvider: React.FC<{
    children?: React.ReactNode;
}>;
export declare const useBackgroundDataProvider: () => BackgroundDataProviderContextType;
export {};
