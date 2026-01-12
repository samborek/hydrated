import { jsx as _jsx, jsxs as _jsxs } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { Web3Provider } from "@ethersproject/providers";
import { lazy, Suspense, useEffect } from "react";
import { BackgroundDataProvider } from "@/hooks/app-data-provider/BackgroundDataProvider";
import { AppDataProvider } from "@/hooks/app-data-provider/useAppDataProvider";
import { AppFormattersProvider, } from "@/hooks/app-data-provider/useAppFormatters";
import { ModalContextProvider } from "@/hooks/useModal";
import { PermissionProvider } from "@/hooks/usePermissions";
import { Web3ContextProvider } from "@/libs/web3-data-provider/Web3Provider";
import { useRootStore } from "@/store/root";
import { SharedDependenciesProvider } from "@/ui-config/SharedDependenciesProvider";
import { CustomMarket } from "@/utils";
const SupplyModal = lazy(async () => ({
    default: (await import("@/components/transactions/supply/SupplyModal"))
        .SupplyModal,
}));
const WithdrawModal = lazy(async () => ({
    default: (await import("@/components/transactions/withdraw/WithdrawModal"))
        .WithdrawModal,
}));
const BorrowModal = lazy(async () => ({
    default: (await import("@/components/transactions/borrow/BorrowModal"))
        .BorrowModal,
}));
const RepayModal = lazy(async () => ({
    default: (await import("@/components/transactions/repay/RepayModal"))
        .RepayModal,
}));
const CollateralChangeModal = lazy(async () => ({
    default: (await import("@/components/transactions/collateral/CollateralChangeModal")).CollateralChangeModal,
}));
const EmodeModal = lazy(async () => ({
    default: (await import("@/components/transactions/emode/EmodeModal"))
        .EmodeModal,
}));
const ClaimRewardsModal = lazy(async () => ({
    default: (await import("@/components/transactions/claim/ClaimRewardsModal"))
        .ClaimRewardsModal,
}));
export const MoneyMarketProvider = ({ children, env, onCreateTransaction, provider: externalProvider, externalApyData, ...formatters }) => {
    const provider = useRootStore((state) => state.provider);
    const [setProvider, setCurrentMarket] = useRootStore((state) => [
        state.setProvider,
        state.setCurrentMarket,
    ]);
    useEffect(() => {
        if (!externalProvider)
            return;
        if (!provider) {
            setCurrentMarket(env === "mainnet"
                ? CustomMarket.hydration_v3
                : CustomMarket.hydration_testnet_v3);
            setProvider(new Web3Provider(externalProvider), env);
        }
    }, [env, externalProvider, provider, setCurrentMarket, setProvider]);
    if (!provider)
        return null;
    return (_jsx(AppFormattersProvider, { ...formatters, children: _jsx(BackgroundDataProvider, { children: _jsx(Web3ContextProvider, { onCreateTransaction: onCreateTransaction, children: _jsx(PermissionProvider, { children: _jsx(ModalContextProvider, { children: _jsx(AppDataProvider, { externalApyData: externalApyData, children: _jsxs(SharedDependenciesProvider, { children: [children, _jsxs(Suspense, { children: [_jsx(SupplyModal, {}), _jsx(WithdrawModal, {}), _jsx(BorrowModal, {}), _jsx(RepayModal, {}), _jsx(CollateralChangeModal, {}), _jsx(EmodeModal, {}), _jsx(ClaimRewardsModal, {})] })] }) }) }) }) }) }) }));
};
