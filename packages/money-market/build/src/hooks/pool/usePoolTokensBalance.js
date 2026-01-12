import { useQueries } from "@tanstack/react-query";
import { useRootStore } from "@/store/root";
import { POLLING_INTERVAL, queryKeysFactory } from "@/ui-config/queries";
import { useSharedDependencies } from "@/ui-config/SharedDependenciesProvider";
export const usePoolsTokensBalance = (marketsData, user, opts) => {
    const { poolTokensBalanceService } = useSharedDependencies();
    return useQueries({
        queries: marketsData.map((marketData) => ({
            queryKey: queryKeysFactory.poolTokens(user, marketData),
            queryFn: () => poolTokensBalanceService.getPoolTokensBalances(marketData, user),
            enabled: !!user,
            refetchInterval: POLLING_INTERVAL,
            ...opts,
        })),
    });
};
export const usePoolTokensBalance = (marketData) => {
    const user = useRootStore((store) => store.account);
    return usePoolsTokensBalance([marketData], user)[0];
};
