import { jsxs as _jsxs, jsx as _jsx } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { ProtocolAction } from "@aave/contract-helpers";
import { TxActionsWrapper } from "@/components/transactions/TxActionsWrapper";
import { useTransactionHandler } from "@/helpers/useTransactionHandler";
import { useProtocolActionToasts } from "@/hooks";
import { useAppFormatters } from "@/hooks/app-data-provider/useAppFormatters";
import { useRootStore } from "@/store/root";
export const WithdrawActions = ({ poolReserve, amountToWithdraw, poolAddress, symbol, blocked, className, }) => {
    const { formatCurrency } = useAppFormatters();
    const withdraw = useRootStore((state) => state.withdraw);
    const protocolAction = ProtocolAction.withdraw;
    const toasts = useProtocolActionToasts(protocolAction, {
        value: formatCurrency(amountToWithdraw || "0", {
            symbol,
        }),
    });
    const { action, loadingTxns, mainTxState, approvalTxState, requiresApproval, } = useTransactionHandler({
        protocolAction,
        tryPermit: false,
        handleGetTxns: async () => withdraw({
            reserve: poolAddress,
            amount: amountToWithdraw,
            aTokenAddress: poolReserve.aTokenAddress,
        }),
        skip: !amountToWithdraw || parseFloat(amountToWithdraw) === 0 || blocked,
        deps: [amountToWithdraw, poolAddress],
        eventTxInfo: {
            amount: amountToWithdraw,
            assetName: poolReserve.name,
            asset: poolReserve.underlyingAsset,
        },
        toasts,
    });
    return (_jsx(TxActionsWrapper, { blocked: blocked, preparingTransactions: loadingTxns, approvalTxState: approvalTxState, mainTxState: mainTxState, amount: amountToWithdraw, requiresAmount: true, actionInProgressText: _jsxs("span", { children: ["Withdrawing ", symbol] }), actionText: _jsxs("span", { children: ["Withdraw ", symbol] }), handleAction: action, requiresApproval: requiresApproval, className: className }));
};
