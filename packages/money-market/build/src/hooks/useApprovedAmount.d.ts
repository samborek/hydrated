import { MarketDataType } from "@/ui-config/marketsConfig";
export declare const useApprovedAmount: ({ marketData, token, spender, }: {
    marketData: MarketDataType;
    user: string;
    token: string;
    spender: string;
}) => import("@tanstack/react-query").UseQueryResult<number, Error>;
export declare const usePoolApprovedAmount: (marketData: MarketDataType, token: string) => import("@tanstack/react-query").UseQueryResult<import("@aave/contract-helpers").ApproveType, Error>;
