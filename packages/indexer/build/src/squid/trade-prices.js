import { keepPreviousData, queryOptions } from "@tanstack/react-query";
export const tradePricesQuery = (squidSdk, assetInId, assetOutId, startTimestamp, endTimestamp, bucketSize) => queryOptions({
    placeholderData: keepPreviousData,
    queryKey: [
        "trade",
        "prices",
        assetInId,
        assetOutId,
        startTimestamp,
        endTimestamp,
        bucketSize,
    ],
    queryFn: () => squidSdk.TradePrices({
        assetInId,
        assetOutId,
        startTimestamp,
        endTimestamp,
        bucketSize,
    }),
});
