import { queryOptions } from "@tanstack/react-query";
export const latestBlockHeightQuery = (squidSdk, url, refetchInterval) => queryOptions({
    queryKey: ["latestBlockHeight", url],
    queryFn: async () => {
        const result = await squidSdk.LatestBlockHeightQuery();
        return result.blocks?.edges?.[0]?.node?.height ?? null;
    },
    refetchInterval,
});
