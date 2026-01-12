import { jsx as _jsx } from "@galacticcouncil/ui/jsx/jsx-runtime";
import React, { useContext } from "react";
import { useCurrentMarketData, useGhoDataSubscription, useIncentiveDataSubscription, usePoolDataSubscription, } from "@/store/root";
const BackgroundDataProviderContext = React.createContext({});
/**
 * Naive provider that subscribes to different data sources.
 * This context provider will run useEffects that relate to instantiating subscriptions as a poll every 60s to consistently fetch data from on-chain and update the Zustand global store.
 */
export const BackgroundDataProvider = ({ children }) => {
    const refetchPoolData = usePoolDataSubscription();
    const refetchIncentiveData = useIncentiveDataSubscription();
    const refetchGhoData = useGhoDataSubscription();
    const poolData = useCurrentMarketData();
    return (_jsx(BackgroundDataProviderContext.Provider, { value: {
            refetchIncentiveData,
            refetchPoolData,
            refetchGhoData,
            poolData,
        }, children: children }));
};
export const useBackgroundDataProvider = () => useContext(BackgroundDataProviderContext);
