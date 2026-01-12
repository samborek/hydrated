import { CustomMarket } from "@/ui-config/marketsConfig";
import { getNetworkConfig, marketsData } from "@/utils/marketsAndNetworksConfig";
export const createProtocolDataSlice = (set, get) => {
    const initialMarket = CustomMarket.hydration_v3;
    const initialMarketData = marketsData[initialMarket];
    return {
        env: "mainnet",
        currentMarket: initialMarket,
        currentMarketData: marketsData[initialMarket],
        currentChainId: initialMarketData.chainId,
        currentNetworkConfig: getNetworkConfig(initialMarketData.chainId),
        provider: null,
        setProvider: (provider, env) => set({ provider, env }),
        jsonRpcProvider: () => get().provider,
        setCurrentMarket: (market) => {
            const nextMarketData = marketsData[market];
            set({
                currentMarket: market,
                currentMarketData: nextMarketData,
                currentChainId: nextMarketData.chainId,
                currentNetworkConfig: getNetworkConfig(nextMarketData.chainId),
            });
        },
        tryPermit: (_) => {
            const testnetPermitEnabled = false;
            const productionPermitEnabled = false;
            return testnetPermitEnabled || productionPermitEnabled;
        },
    };
};
