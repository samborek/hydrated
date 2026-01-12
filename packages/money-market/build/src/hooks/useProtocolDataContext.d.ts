export declare const useProtocolDataContext: () => {
    currentChainId: number;
    currentMarket: import("../utils").CustomMarket;
    currentMarketData: import("../utils").MarketDataType;
    currentNetworkConfig: import("../utils").NetworkConfig;
    jsonRpcProvider: () => import("@ethersproject/abstract-provider").Provider;
    setCurrentMarket: (market: import("../utils").CustomMarket, omitQueryParameterUpdate?: boolean) => void;
};
