import { SquidSdk } from "@/squid";
import { TimeSeriesBucketTimeRange } from "@/squid/__generated__/types";
export declare const accountNetWorthHistoricalDataQuery: (squidSdk: SquidSdk, accountId: string, startTimestamp: string | undefined, endTimestamp: string | undefined, bucketSize?: TimeSeriesBucketTimeRange | undefined) => import("@tanstack/query-core").OmitKeyof<import("@tanstack/react-query").UseQueryOptions<import("@/squid").AccountTotalBalancesByPeriodQuery, Error, import("@/squid").AccountTotalBalancesByPeriodQuery, (string | undefined)[]>, "queryFn"> & {
    queryFn?: import("@tanstack/query-core").QueryFunction<import("@/squid").AccountTotalBalancesByPeriodQuery, (string | undefined)[], never> | undefined;
} & {
    queryKey: (string | undefined)[] & {
        [dataTagSymbol]: import("@/squid").AccountTotalBalancesByPeriodQuery;
        [dataTagErrorSymbol]: Error;
    };
};
export declare const latestAccountBalanceQuery: (squidSdk: SquidSdk, accountId: string) => import("@tanstack/query-core").OmitKeyof<import("@tanstack/react-query").UseQueryOptions<import("@/squid").LatestAccountsBalancesQuery, Error, import("@/squid").LatestAccountsBalancesQuery, string[]>, "queryFn"> & {
    queryFn?: import("@tanstack/query-core").QueryFunction<import("@/squid").LatestAccountsBalancesQuery, string[], never> | undefined;
} & {
    queryKey: string[] & {
        [dataTagSymbol]: import("@/squid").LatestAccountsBalancesQuery;
        [dataTagErrorSymbol]: Error;
    };
};
