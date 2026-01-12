import { SquidSdk } from "@/squid";
export declare const omnipoolYieldMetricsQuery: (squidSdk: SquidSdk) => import("@tanstack/query-core").OmitKeyof<import("@tanstack/react-query").UseQueryOptions<{
    assetId: string;
    fee: string;
}[], Error, {
    assetId: string;
    fee: string;
}[], string[]>, "queryFn"> & {
    queryFn?: import("@tanstack/query-core").QueryFunction<{
        assetId: string;
        fee: string;
    }[], string[], never> | undefined;
} & {
    queryKey: string[] & {
        [dataTagSymbol]: {
            assetId: string;
            fee: string;
        }[];
        [dataTagErrorSymbol]: Error;
    };
};
export declare const stablepoolYieldMetricsQuery: (squidSdk: SquidSdk) => import("@tanstack/query-core").OmitKeyof<import("@tanstack/react-query").UseQueryOptions<{
    __typename?: "StableswapYieldMetricsAggregated";
    poolId: string;
    projectedAprPerc: string;
    projectedApyPerc: string;
}[], Error, {
    __typename?: "StableswapYieldMetricsAggregated";
    poolId: string;
    projectedAprPerc: string;
    projectedApyPerc: string;
}[], string[]>, "queryFn"> & {
    queryFn?: import("@tanstack/query-core").QueryFunction<{
        __typename?: "StableswapYieldMetricsAggregated";
        poolId: string;
        projectedAprPerc: string;
        projectedApyPerc: string;
    }[], string[], never> | undefined;
} & {
    queryKey: string[] & {
        [dataTagSymbol]: {
            __typename?: "StableswapYieldMetricsAggregated";
            poolId: string;
            projectedAprPerc: string;
            projectedApyPerc: string;
        }[];
        [dataTagErrorSymbol]: Error;
    };
};
