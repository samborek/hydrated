import { MarketDataType } from "./marketsConfig";
export declare const queryKeysFactory: {
    pool: readonly ["pool"];
    incentives: readonly ["incentives"];
    gho: readonly ["gho"];
    market: (marketData: MarketDataType) => (boolean | import("./marketsConfig").CustomMarket | import("./networksConfig").ChainId)[];
    user: (user: string) => string[];
    transactionHistory: (user: string, marketData: MarketDataType) => (string | boolean | import("./networksConfig").ChainId)[];
    poolTokens: (user: string, marketData: MarketDataType) => (string | boolean | import("./networksConfig").ChainId)[];
    poolReservesDataHumanized: (marketData: MarketDataType) => (string | boolean | import("./networksConfig").ChainId)[];
    paraswapRates: (chainId: number, amount: string, srcToken: string, destToken: string, user: string) => (string | number)[];
    gasPrices: (chainId: number) => (string | number)[];
    poolApprovedAmount: (user: string, token: string, marketData: MarketDataType) => (string | boolean | import("./networksConfig").ChainId)[];
    approvedAmount: (user: string, token: string, spender: string, marketData: MarketDataType) => (string | boolean | import("./networksConfig").ChainId)[];
    tokenPowers: (user: string, token: string, chainId: number) => (string | number)[];
    tokenDelegatees: (user: string, token: string, chainId: number) => (string | number)[];
};
export declare const POLLING_INTERVAL = 60000;
