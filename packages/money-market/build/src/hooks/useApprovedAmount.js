import { useQuery } from "@tanstack/react-query";
import { useRootStore } from "@/store/root";
import { queryKeysFactory } from "@/ui-config/queries";
import { useSharedDependencies } from "@/ui-config/SharedDependenciesProvider";
export const useApprovedAmount = ({ marketData, token, spender, }) => {
    const { approvedAmountService } = useSharedDependencies();
    const user = useRootStore((store) => store.account);
    return useQuery({
        queryFn: () => approvedAmountService.getApprovedAmount(marketData, user, token, spender),
        queryKey: queryKeysFactory.approvedAmount(user, token, spender, marketData),
        enabled: !!user,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    });
};
export const usePoolApprovedAmount = (marketData, token) => {
    const { approvedAmountService } = useSharedDependencies();
    const user = useRootStore((store) => store.account);
    return useQuery({
        queryFn: () => approvedAmountService.getPoolApprovedAmount(marketData, user, token),
        queryKey: queryKeysFactory.poolApprovedAmount(user, token, marketData),
        enabled: !!user,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    });
};
