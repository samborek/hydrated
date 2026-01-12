import { queryOptions } from "@tanstack/react-query";
export const platformTotalQuery = (squidSdk) => queryOptions({
    queryKey: ["platformTotal"],
    queryFn: async () => {
        const data = await squidSdk.PlatformTotal();
        const tvl = data.platformTotalTvl.nodes.filter((node) => node !== null)[0];
        const volumes = data.platformTotalVolumesByPeriod.nodes.find((node) => node !== null);
        return {
            omnipoolTvlNorm: tvl?.omnipoolTvlNorm,
            stablepoolsTvlNorm: tvl?.stablepoolsTvlNorm,
            omnipoolVolNorm: volumes?.omnipoolVolNorm,
            stableswapVolNorm: volumes?.stableswapVolNorm,
        };
    },
});
