import { jsx as _jsx } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { ProtocolAction } from "@aave/contract-helpers";
import { useMemo } from "react";
import { TxActionsWrapper } from "@/components/transactions/TxActionsWrapper";
import { useTransactionHandler } from "@/helpers/useTransactionHandler";
import { useProtocolActionToasts } from "@/hooks";
import { useRootStore } from "@/store/root";
import { getAction, getEmodeMessage } from "./emode.utils";
export const EmodeActions = ({ blocked, selectedEmode, activeEmode, eModes, }) => {
    const setUserEMode = useRootStore((state) => state.setUserEMode);
    const protocolAction = ProtocolAction.setEModeUsage;
    const previousState = getEmodeMessage(eModes[activeEmode].label);
    const newState = getEmodeMessage(eModes[selectedEmode].label);
    const isDisabling = selectedEmode === 0;
    const toasts = useProtocolActionToasts(protocolAction, {
        value: isDisabling ? previousState : newState,
        state: isDisabling ? "off" : "on",
    });
    const { action, loadingTxns, mainTxState, requiresApproval } = useTransactionHandler({
        tryPermit: false,
        handleGetTxns: async () => {
            return setUserEMode(selectedEmode);
        },
        skip: blocked,
        deps: [selectedEmode],
        protocolAction,
        eventTxInfo: {
            previousState,
            newState,
        },
        toasts,
    });
    const getActionData = useMemo(() => getAction(selectedEmode, activeEmode), [selectedEmode, activeEmode]);
    return (_jsx(TxActionsWrapper, { requiresApproval: requiresApproval, blocked: blocked, mainTxState: mainTxState, preparingTransactions: loadingTxns, handleAction: action, actionText: getActionData({
            enable: "Enable E-Mode",
            disable: "Disable E-Mode",
            switch: "Switch E-Mode",
        }), actionInProgressText: getActionData({
            enable: "Enabling E-Mode",
            disable: "Disabling E-Mode",
            switch: "Switching E-Mode",
        }) }));
};
