import { jsx as _jsx, Fragment as _Fragment } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { API_ETH_MOCK_ADDRESS } from "@aave/contract-helpers";
import { useAppDataContext } from "@/hooks/app-data-provider/useAppDataProvider";
import { useWalletBalances } from "@/hooks/app-data-provider/useWalletBalances";
import { AssetCapsProvider } from "@/hooks/useAssetCaps";
import { useModalContext } from "@/hooks/useModal";
import { usePermissions } from "@/hooks/usePermissions";
import { useRootStore } from "@/store/root";
import { isFeatureEnabled } from "@/utils/marketsAndNetworksConfig";
export const TxModalWrapper = ({ underlyingAsset, children, requiredChainId: _requiredChainId, requiredPermission, }) => {
    const currentMarketData = useRootStore((store) => store.currentMarketData);
    const { walletBalances } = useWalletBalances(currentMarketData);
    const { user, reserves } = useAppDataContext();
    const { txError } = useModalContext();
    const { permissions } = usePermissions();
    if (txError && txError.blocking) {
        return _jsx("span", { children: "Transaction failed" });
    }
    if (requiredPermission &&
        isFeatureEnabled.permissions(currentMarketData) &&
        !permissions.includes(requiredPermission) &&
        currentMarketData.permissionComponent) {
        return _jsx(_Fragment, { children: currentMarketData.permissionComponent });
    }
    const poolReserve = reserves.find((reserve) => {
        if (underlyingAsset?.toLowerCase() === API_ETH_MOCK_ADDRESS.toLowerCase())
            return reserve?.isWrappedBaseAsset;
        return underlyingAsset === reserve.underlyingAsset;
    });
    const userReserve = user?.userReservesData.find((userReserve) => {
        if (underlyingAsset?.toLowerCase() === API_ETH_MOCK_ADDRESS.toLowerCase())
            return userReserve?.reserve?.isWrappedBaseAsset;
        return underlyingAsset === userReserve?.underlyingAsset;
    });
    return (_jsx(AssetCapsProvider, { asset: poolReserve, children: children({
            nativeBalance: walletBalances[API_ETH_MOCK_ADDRESS.toLowerCase()]?.amount || "0",
            tokenBalance: walletBalances[poolReserve?.underlyingAsset?.toLowerCase()]?.amount ||
                "0",
            poolReserve,
            symbol: poolReserve?.symbol,
            underlyingAsset,
            userReserve,
        }) }));
};
