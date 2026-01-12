import { queryOptions } from "@tanstack/react-query";
export const moneyMarketQuery = (squidSdk, address, eventNames, searchPhrase, pageSize, pageIndex) => queryOptions({
    queryKey: [
        "accountMoneyMarketEvents",
        address,
        eventNames,
        searchPhrase,
        pageSize,
        pageIndex,
    ],
    queryFn: () => squidSdk.MoneyMarketEvents({
        first: pageSize,
        offset: pageIndex * pageSize,
        filter: {
            allInvolvedParticipants: { contains: [address] },
            ...(eventNames.length && { eventName: { in: eventNames } }),
            ...(searchPhrase.length && {
                allInvolvedAssetDetails: { includesInsensitive: searchPhrase },
            }),
        },
    }),
    enabled: !!address,
});
