import { SquidSdk } from "@/squid";
import { TimeSeriesBucketTimeRange } from "@/squid/__generated__/types";
export declare const tradePricesQuery: (squidSdk: SquidSdk, assetInId: string, assetOutId: string, startTimestamp: string | undefined, endTimestamp: string | undefined, bucketSize?: TimeSeriesBucketTimeRange | undefined) => import("@tanstack/query-core").OmitKeyof<import("@tanstack/react-query").UseQueryOptions<import("@/squid").TradePricesQuery, Error, import("@/squid").TradePricesQuery, (string | undefined)[]>, "queryFn"> & {
    queryFn?: import("@tanstack/query-core").QueryFunction<import("@/squid").TradePricesQuery, (string | undefined)[], never> | undefined;
} & {
    queryKey: (string | undefined)[] & {
        [dataTagSymbol]: import("@/squid").TradePricesQuery;
        [dataTagErrorSymbol]: Error;
    };
};
