import { SquidSdk } from ".";
export declare const latestBlockHeightQuery: (squidSdk: SquidSdk, url: string, refetchInterval?: number) => import("@tanstack/query-core").OmitKeyof<import("@tanstack/react-query").UseQueryOptions<number | null, Error, number | null, string[]>, "queryFn"> & {
    queryFn?: import("@tanstack/query-core").QueryFunction<number | null, string[], never> | undefined;
} & {
    queryKey: string[] & {
        [dataTagSymbol]: number | null;
        [dataTagErrorSymbol]: Error;
    };
};
