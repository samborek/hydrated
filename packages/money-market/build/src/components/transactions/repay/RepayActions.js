import { jsxs as _jsxs, jsx as _jsx } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { ProtocolAction } from "@aave/contract-helpers";
import { useQueryClient } from "@tanstack/react-query";
import { parseUnits } from "ethers/lib/utils";
import { useEffect } from "react";
import { TxActionsWrapper } from "@/components/transactions/TxActionsWrapper";
import { useProtocolActionToasts } from "@/hooks";
import { useBackgroundDataProvider } from "@/hooks/app-data-provider/BackgroundDataProvider";
import { useAppFormatters } from "@/hooks/app-data-provider/useAppFormatters";
import { usePoolApprovedAmount } from "@/hooks/useApprovedAmount";
import { useModalContext } from "@/hooks/useModal";
import { useWeb3Context } from "@/libs/hooks/useWeb3Context";
import { useRootStore } from "@/store/root";
import { getErrorTextFromError, TxAction } from "@/ui-config/errorMapping";
import { queryKeysFactory } from "@/ui-config/queries";
export const RepayActions = ({ amountToRepay, poolReserve, poolAddress, symbol, debtType, repayWithATokens, blocked, className, }) => {
    const { formatCurrency } = useAppFormatters();
    const queryClient = useQueryClient();
    const [repay, encodeRepayParams, estimateGasLimit, optimizedPath, currentMarketData,] = useRootStore((store) => [
        store.repay,
        store.encodeRepayParams,
        store.estimateGasLimit,
        store.useOptimizedPath,
        store.currentMarketData,
    ]);
    const { sendTx } = useWeb3Context();
    const { refetchGhoData, refetchIncentiveData, refetchPoolData } = useBackgroundDataProvider();
    const { approvalTxState, mainTxState, loadingTxns, setMainTxState, setTxError, setLoadingTxns, close, } = useModalContext();
    const { data: approvedAmount, refetch: fetchApprovedAmount, isFetching: fetchingApprovedAmount, isFetchedAfterMount, } = usePoolApprovedAmount(currentMarketData, poolAddress);
    setLoadingTxns(fetchingApprovedAmount);
    useEffect(() => {
        if (!isFetchedAfterMount && !repayWithATokens) {
            fetchApprovedAmount();
        }
    }, [fetchApprovedAmount, isFetchedAfterMount, repayWithATokens]);
    const protocolAction = ProtocolAction.repay;
    const toasts = useProtocolActionToasts(protocolAction, {
        value: formatCurrency(amountToRepay || "0", { symbol }),
    });
    const action = async () => {
        try {
            setMainTxState({ ...mainTxState, loading: true });
            const repayParams = {
                amountToRepay: amountToRepay === "-1"
                    ? amountToRepay
                    : parseUnits(amountToRepay, poolReserve.decimals).toString(),
                poolAddress,
                repayWithATokens,
                debtType,
            };
            let encodedParams;
            if (optimizedPath()) {
                encodedParams = await encodeRepayParams(repayParams);
            }
            let repayTxData = repay({
                ...repayParams,
                encodedTxData: encodedParams,
            });
            repayTxData = await estimateGasLimit(repayTxData, protocolAction);
            await sendTx(repayTxData, toasts, protocolAction);
            queryClient.invalidateQueries({ queryKey: queryKeysFactory.pool });
            refetchPoolData && refetchPoolData();
            refetchIncentiveData && refetchIncentiveData();
            refetchGhoData && refetchGhoData();
        }
        catch (error) {
            const parsedError = getErrorTextFromError(error, TxAction.GAS_ESTIMATION, false);
            setTxError(parsedError);
            setMainTxState({
                txHash: undefined,
                loading: false,
            });
        }
        finally {
            close();
        }
    };
    return (_jsx(TxActionsWrapper, { blocked: blocked, preparingTransactions: loadingTxns || !approvedAmount, mainTxState: mainTxState, approvalTxState: approvalTxState, requiresAmount: true, amount: amountToRepay, className: className, handleAction: action, actionText: _jsxs("span", { children: ["Repay ", symbol] }), actionInProgressText: _jsxs("span", { children: ["Repaying ", symbol] }) }));
};
