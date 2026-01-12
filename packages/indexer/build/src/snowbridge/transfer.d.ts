import { SnowbridgeSdk } from "@/snowbridge";
export declare const snowbridgeStatusToPolkadotQuery: (snowbridgeSdk: SnowbridgeSdk, txHash: string, limit?: number) => import("@tanstack/query-core").OmitKeyof<import("@tanstack/react-query").UseQueryOptions<import("@/snowbridge").TransferStatusToPolkadotQuery, Error, import("@/snowbridge").TransferStatusToPolkadotQuery, (string | number)[]>, "queryFn"> & {
    queryFn?: import("@tanstack/query-core").QueryFunction<import("@/snowbridge").TransferStatusToPolkadotQuery, (string | number)[], never> | undefined;
} & {
    queryKey: (string | number)[] & {
        [dataTagSymbol]: import("@/snowbridge").TransferStatusToPolkadotQuery;
        [dataTagErrorSymbol]: Error;
    };
};
export declare const snowbridgeStatusToEthQuery: (snowbridgeSdk: SnowbridgeSdk, txHash: string, limit?: number) => import("@tanstack/query-core").OmitKeyof<import("@tanstack/react-query").UseQueryOptions<import("@/snowbridge").TransferStatusToEthQuery, Error, import("@/snowbridge").TransferStatusToEthQuery, (string | number)[]>, "queryFn"> & {
    queryFn?: import("@tanstack/query-core").QueryFunction<import("@/snowbridge").TransferStatusToEthQuery, (string | number)[], never> | undefined;
} & {
    queryKey: (string | number)[] & {
        [dataTagSymbol]: import("@/snowbridge").TransferStatusToEthQuery;
        [dataTagErrorSymbol]: Error;
    };
};
