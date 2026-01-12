import { queryOptions } from "@tanstack/react-query";
export const omnipoolYieldMetricsQuery = (squidSdk) => queryOptions({
    queryKey: ["omnipoolYieldMetrics"],
    queryFn: async () => {
        const data = await squidSdk.OmnipoolYieldMetrics();
        return data.omnipoolAssetsYieldMetrics.nodes
            .filter((node) => node !== null)
            .map((node) => ({
            assetId: node.assetRegistryId ?? node.assetId,
            fee: node.projectedAprPerc,
        }));
    },
});
export const stablepoolYieldMetricsQuery = (squidSdk) => queryOptions({
    queryKey: ["stablepoolYieldMetrics"],
    queryFn: async () => {
        const data = await squidSdk.StableswapYieldMetrics();
        return data.stableswapYieldMetrics.nodes.filter((node) => node !== null);
    },
});
