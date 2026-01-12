import { useQueries } from "@tanstack/react-query";
import { POLLING_INTERVAL, queryKeysFactory } from "@/ui-config/queries";
import { useSharedDependencies } from "@/ui-config/SharedDependenciesProvider";
export const usePoolsReservesHumanized = (marketsData, opts) => {
    const { uiPoolService } = useSharedDependencies();
    return useQueries({
        queries: marketsData.map((marketData) => ({
            queryKey: queryKeysFactory.poolReservesDataHumanized(marketData),
            queryFn: () => uiPoolService.getReservesHumanized(marketData),
            refetchInterval: POLLING_INTERVAL,
            meta: {},
            ...opts,
        })),
    });
};
export const usePoolReservesHumanized = (marketData) => {
    return usePoolsReservesHumanized([marketData])[0];
};
