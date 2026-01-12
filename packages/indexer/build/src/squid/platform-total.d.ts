import { SquidSdk } from ".";
export declare const platformTotalQuery: (squidSdk: SquidSdk) => import("@tanstack/query-core").OmitKeyof<import("@tanstack/react-query").UseQueryOptions<{
    omnipoolTvlNorm: string;
    stablepoolsTvlNorm: string;
    omnipoolVolNorm: string | undefined;
    stableswapVolNorm: string | undefined;
}, Error, {
    omnipoolTvlNorm: string;
    stablepoolsTvlNorm: string;
    omnipoolVolNorm: string | undefined;
    stableswapVolNorm: string | undefined;
}, string[]>, "queryFn"> & {
    queryFn?: import("@tanstack/query-core").QueryFunction<{
        omnipoolTvlNorm: string;
        stablepoolsTvlNorm: string;
        omnipoolVolNorm: string | undefined;
        stableswapVolNorm: string | undefined;
    }, string[], never> | undefined;
} & {
    queryKey: string[] & {
        [dataTagSymbol]: {
            omnipoolTvlNorm: string;
            stablepoolsTvlNorm: string;
            omnipoolVolNorm: string | undefined;
            stableswapVolNorm: string | undefined;
        };
        [dataTagErrorSymbol]: Error;
    };
};
