import { QUERY_KEY_BLOCK_PREFIX } from "@galacticcouncil/utils";
import { queryOptions } from "@tanstack/react-query";
export const accountNetWorthHistoricalDataQuery = (squidSdk, accountId, startTimestamp, endTimestamp, bucketSize) => {
    return queryOptions({
        queryKey: [
            "account",
            "net-worth",
            "historical-data",
            accountId,
            startTimestamp,
            endTimestamp,
            bucketSize,
        ],
        queryFn: () => squidSdk.AccountTotalBalancesByPeriod({
            accountId,
            startTimestamp,
            endTimestamp,
            bucketSize,
        }),
        enabled: !!accountId,
    });
};
export const latestAccountBalanceQuery = (squidSdk, accountId) => {
    return queryOptions({
        queryKey: [
            QUERY_KEY_BLOCK_PREFIX,
            "account",
            "balance",
            "latest",
            accountId,
        ],
        queryFn: () => squidSdk.LatestAccountsBalances({ accountId }),
    });
};
