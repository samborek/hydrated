import { ApprovedAmountService } from "@/services/ApprovedAmountService";
import { UiIncentivesService } from "@/services/UIIncentivesService";
import { UiPoolService } from "@/services/UIPoolService";
import { WalletBalanceService } from "@/services/WalletBalanceService";
interface SharedDependenciesContextProps {
    poolTokensBalanceService: WalletBalanceService;
    approvedAmountService: ApprovedAmountService;
    uiIncentivesService: UiIncentivesService;
    uiPoolService: UiPoolService;
}
export declare const SharedDependenciesProvider: React.FC<{
    children?: React.ReactNode;
}>;
export declare const useSharedDependencies: () => SharedDependenciesContextProps;
export {};
