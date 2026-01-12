import { jsxs as _jsxs, jsx as _jsx } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { ProtocolAction } from "@aave/contract-helpers";
import { TxActionsWrapper } from "@/components/transactions/TxActionsWrapper";
import { useTransactionHandler } from "@/helpers/useTransactionHandler";
import { useProtocolActionToasts } from "@/hooks";
import { useRootStore } from "@/store/root";
export const CollateralChangeActions = ({ poolReserve, usageAsCollateral, blocked, symbol, }) => {
    const setUsageAsCollateral = useRootStore((state) => state.setUsageAsCollateral);
    const toasts = useProtocolActionToasts(ProtocolAction.setUsageAsCollateral, {
        value: poolReserve.symbol,
        state: usageAsCollateral ? "on" : "off",
    });
    const { action, loadingTxns, mainTxState, requiresApproval } = useTransactionHandler({
        tryPermit: false,
        protocolAction: ProtocolAction.setUsageAsCollateral,
        eventTxInfo: {
            assetName: poolReserve.name,
            asset: poolReserve.underlyingAsset,
            previousState: (!usageAsCollateral).toString(),
            newState: usageAsCollateral.toString(),
        },
        handleGetTxns: async () => {
            return setUsageAsCollateral({
                reserve: poolReserve.underlyingAsset,
                usageAsCollateral,
            });
        },
        skip: blocked,
        toasts,
    });
    return (_jsx(TxActionsWrapper, { requiresApproval: requiresApproval, blocked: blocked, preparingTransactions: loadingTxns, mainTxState: mainTxState, actionText: usageAsCollateral ? (_jsxs("span", { children: ["Enable ", symbol, " as collateral"] })) : (_jsxs("span", { children: ["Disable ", symbol, " as collateral"] })), actionInProgressText: _jsx("span", { children: "Pending..." }), handleAction: action }));
};
