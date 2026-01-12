import { IndexerSdk } from "@/indexer";
export declare const otcOrderStatusQuery: (indexerSdk: IndexerSdk, orderId: number, isPartiallyFillable: boolean) => import("@tanstack/query-core").OmitKeyof<import("@tanstack/react-query").UseQueryOptions<import("@/indexer").OtcOrderStatusQuery, Error, import("@/indexer").OtcOrderStatusQuery, (string | number)[]>, "queryFn"> & {
    queryFn?: import("@tanstack/query-core").QueryFunction<import("@/indexer").OtcOrderStatusQuery, (string | number)[], never> | undefined;
} & {
    queryKey: (string | number)[] & {
        [dataTagSymbol]: import("@/indexer").OtcOrderStatusQuery;
        [dataTagErrorSymbol]: Error;
    };
};
