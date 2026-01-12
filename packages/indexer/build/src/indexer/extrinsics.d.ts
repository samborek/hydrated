import { IndexerSdk } from "@/indexer";
export declare const extrinsicByHashQuery: (indexerSdk: IndexerSdk, hash: string) => import("@tanstack/query-core").OmitKeyof<import("@tanstack/react-query").UseQueryOptions<import("@/indexer").ExtrinsicByHashQuery, Error, import("@/indexer").ExtrinsicByHashQuery, string[]>, "queryFn"> & {
    queryFn?: import("@tanstack/query-core").QueryFunction<import("@/indexer").ExtrinsicByHashQuery, string[], never> | undefined;
} & {
    queryKey: string[] & {
        [dataTagSymbol]: import("@/indexer").ExtrinsicByHashQuery;
        [dataTagErrorSymbol]: Error;
    };
};
export declare const extrinsicByBlockAndIndexQuery: (indexerSdk: IndexerSdk, blockNumber: number, index: number) => import("@tanstack/query-core").OmitKeyof<import("@tanstack/react-query").UseQueryOptions<import("@/indexer").ExtrinsicByBlockAndIndexQuery, Error, import("@/indexer").ExtrinsicByBlockAndIndexQuery, (string | number)[]>, "queryFn"> & {
    queryFn?: import("@tanstack/query-core").QueryFunction<import("@/indexer").ExtrinsicByBlockAndIndexQuery, (string | number)[], never> | undefined;
} & {
    queryKey: (string | number)[] & {
        [dataTagSymbol]: import("@/indexer").ExtrinsicByBlockAndIndexQuery;
        [dataTagErrorSymbol]: Error;
    };
};
