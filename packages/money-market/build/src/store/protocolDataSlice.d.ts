import { Provider } from "@ethersproject/providers";
import { StateCreator } from "zustand";
import { MoneyMarketEnv } from "@/types";
import { CustomMarket, MarketDataType } from "@/ui-config/marketsConfig";
import { NetworkConfig } from "@/ui-config/networksConfig";
import { RootStore } from "./root";
type TypePermitParams = {
    reserveAddress: string;
    isWrappedBaseAsset: boolean;
};
export interface ProtocolDataSlice {
    env: MoneyMarketEnv;
    provider: Provider | null;
    currentMarket: CustomMarket;
    currentMarketData: MarketDataType;
    currentChainId: number;
    currentNetworkConfig: NetworkConfig;
    setProvider: (provider: Provider, env: MoneyMarketEnv) => void;
    jsonRpcProvider: () => Provider;
    setCurrentMarket: (market: CustomMarket, omitQueryParameterUpdate?: boolean) => void;
    tryPermit: ({ reserveAddress, isWrappedBaseAsset, }: TypePermitParams) => boolean;
}
export declare const createProtocolDataSlice: StateCreator<RootStore, [
    ["zustand/subscribeWithSelector", never],
    ["zustand/devtools", never]
], [
], ProtocolDataSlice>;
export {};
