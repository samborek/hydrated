import { jsx as _jsx } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { createContext, useContext } from "react";
import invariant from "tiny-invariant";
import { ApprovedAmountService } from "@/services/ApprovedAmountService";
import { UiIncentivesService } from "@/services/UIIncentivesService";
import { UiPoolService } from "@/services/UIPoolService";
import { WalletBalanceService } from "@/services/WalletBalanceService";
import { getProvider } from "@/utils/provider";
const SharedDependenciesContext = createContext(null);
export const SharedDependenciesProvider = ({ children }) => {
    const poolTokensBalanceService = new WalletBalanceService(getProvider);
    const approvedAmountService = new ApprovedAmountService(getProvider);
    const uiPoolService = new UiPoolService(getProvider);
    const uiIncentivesService = new UiIncentivesService(getProvider);
    return (_jsx(SharedDependenciesContext.Provider, { value: {
            poolTokensBalanceService,
            approvedAmountService,
            uiPoolService,
            uiIncentivesService,
        }, children: children }));
};
export const useSharedDependencies = () => {
    const context = useContext(SharedDependenciesContext);
    invariant(context, "Component should be wrapper inside a <SharedDependenciesProvider />");
    return context;
};
