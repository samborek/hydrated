import { CustomMarket, MarketDataType } from "@/ui-config/marketsConfig";
import { BaseNetworkConfig, ChainId, NetworkConfig } from "@/ui-config/networksConfig";
export type Pool = {
    address: string;
};
export declare const networkConfigs: {
    [key: string]: BaseNetworkConfig;
};
export declare const marketsData: {
    [key: string]: MarketDataType;
};
export declare function getDefaultChainId(): ChainId;
export declare function getSupportedChainIds(): number[];
export declare const availableMarkets: CustomMarket[];
export declare function getNetworkConfig(chainId: ChainId): NetworkConfig;
export declare const isFeatureEnabled: {
    faucet: (data: MarketDataType) => boolean | undefined;
    liquiditySwap: (data: MarketDataType) => boolean | undefined;
    collateralRepay: (data: MarketDataType) => boolean | undefined;
    permissions: (data: MarketDataType) => boolean | undefined;
    debtSwitch: (data: MarketDataType) => boolean | undefined;
    withdrawAndSwitch: (data: MarketDataType) => boolean | undefined;
    switch: (data: MarketDataType) => boolean | undefined;
};
export { CustomMarket };
export type { MarketDataType, NetworkConfig };
