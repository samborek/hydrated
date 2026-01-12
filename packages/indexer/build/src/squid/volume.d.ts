import { SquidSdk } from "@/squid";
export declare const omnipoolVolumeQuery: (squidSdk: SquidSdk) => import("@tanstack/query-core").OmitKeyof<import("@tanstack/react-query").UseQueryOptions<{
    assetId: string;
    assetVolNorm: string;
}[], Error, {
    assetId: string;
    assetVolNorm: string;
}[], string[]>, "queryFn"> & {
    queryFn?: import("@tanstack/query-core").QueryFunction<{
        assetId: string;
        assetVolNorm: string;
    }[], string[], never> | undefined;
} & {
    queryKey: string[] & {
        [dataTagSymbol]: {
            assetId: string;
            assetVolNorm: string;
        }[];
        [dataTagErrorSymbol]: Error;
    };
};
export declare const stablepoolVolumeQuery: (squidSdk: SquidSdk) => import("@tanstack/query-core").OmitKeyof<import("@tanstack/react-query").UseQueryOptions<{
    poolId: string;
    poolVolNorm: string;
    assetVolumes: {
        assetId: string;
        assetVolNorm: string;
    }[];
}[], Error, {
    poolId: string;
    poolVolNorm: string;
    assetVolumes: {
        assetId: string;
        assetVolNorm: string;
    }[];
}[], string[]>, "queryFn"> & {
    queryFn?: import("@tanstack/query-core").QueryFunction<{
        poolId: string;
        poolVolNorm: string;
        assetVolumes: {
            assetId: string;
            assetVolNorm: string;
        }[];
    }[], string[], never> | undefined;
} & {
    queryKey: string[] & {
        [dataTagSymbol]: {
            poolId: string;
            poolVolNorm: string;
            assetVolumes: {
                assetId: string;
                assetVolNorm: string;
            }[];
        }[];
        [dataTagErrorSymbol]: Error;
    };
};
export declare const xykVolumeQuery: (squidSdk: SquidSdk, addresses: string[]) => import("@tanstack/query-core").OmitKeyof<import("@tanstack/react-query").UseQueryOptions<{
    [x: string]: string;
    poolId: string;
    assetId: string;
    assetIdB: string;
    poolVolume: string;
}[], Error, {
    [x: string]: string;
    poolId: string;
    assetId: string;
    assetIdB: string;
    poolVolume: string;
}[], string[]>, "queryFn"> & {
    queryFn?: import("@tanstack/query-core").QueryFunction<{
        [x: string]: string;
        poolId: string;
        assetId: string;
        assetIdB: string;
        poolVolume: string;
    }[], string[], never> | undefined;
} & {
    queryKey: string[] & {
        [dataTagSymbol]: {
            [x: string]: string;
            poolId: string;
            assetId: string;
            assetIdB: string;
            poolVolume: string;
        }[];
        [dataTagErrorSymbol]: Error;
    };
};
