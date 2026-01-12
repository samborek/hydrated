import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { Box, Button, Spinner } from "@galacticcouncil/ui/components";
import { useModalContext } from "@/hooks/useModal";
import { TxAction } from "@/ui-config/errorMapping";
export const TxActionsWrapper = ({ actionInProgressText, actionText, amount, approvalTxState, handleAction, mainTxState, preparingTransactions, requiresAmount, requiresApproval = false, blocked, fetchingData = false, errorParams, className, }) => {
    const { txError } = useModalContext();
    const isAmountMissing = requiresAmount && requiresAmount && Number(amount) === 0;
    function getMainParams() {
        if (blocked)
            return { loading: false, disabled: true, content: actionText };
        if ((txError?.txAction === TxAction.GAS_ESTIMATION ||
            txError?.txAction === TxAction.MAIN_ACTION) &&
            txError?.actionBlocked) {
            if (errorParams)
                return errorParams;
            return { loading: false, disabled: true, content: actionText };
        }
        if (fetchingData)
            return {
                loading: false,
                disabled: true,
                content: _jsx("span", { children: "Fetching data..." }),
            };
        if (isAmountMissing)
            return {
                loading: false,
                disabled: true,
                content: _jsx("span", { children: "Enter an amount" }),
            };
        if (preparingTransactions)
            return { loading: true, disabled: true };
        if (mainTxState?.loading)
            return { loading: true, disabled: true, content: actionInProgressText };
        if (requiresApproval && !approvalTxState?.success)
            return { loading: false, disabled: true, content: actionText };
        return { loading: false, content: actionText, handleClick: handleAction };
    }
    const { loading, content, disabled, handleClick } = getMainParams();
    const isSubmitDisabled = loading || disabled || blocked;
    return (_jsx(Box, { mt: "var(--modal-content-padding)", className: className, children: _jsxs(Button, { variant: isSubmitDisabled ? "tertiary" : "primary", width: "100%", disabled: isSubmitDisabled, onClick: () => handleClick?.(), size: "large", sx: { position: "relative" }, children: [loading && (_jsx("span", { sx: {
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                    }, children: _jsx(Spinner, {}) })), _jsx("span", { sx: { opacity: loading ? 0 : 1 }, children: content || _jsx(_Fragment, { children: "\u00A0" }) })] }) }));
};
