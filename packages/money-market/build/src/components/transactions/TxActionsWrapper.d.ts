import { ReactNode } from "react";
import { TxStateType } from "@/hooks/useModal";
interface TxActionsWrapperProps {
    actionInProgressText: ReactNode;
    actionText: ReactNode;
    amount?: string;
    approvalTxState?: TxStateType;
    handleAction: () => Promise<void>;
    mainTxState: TxStateType;
    preparingTransactions: boolean;
    requiresAmount?: boolean;
    requiresApproval?: boolean;
    blocked?: boolean;
    fetchingData?: boolean;
    errorParams?: {
        loading: boolean;
        disabled: boolean;
        content: ReactNode;
        handleClick: () => Promise<void>;
    };
    tryPermit?: boolean;
    className?: string;
}
export declare const TxActionsWrapper: ({ actionInProgressText, actionText, amount, approvalTxState, handleAction, mainTxState, preparingTransactions, requiresAmount, requiresApproval, blocked, fetchingData, errorParams, className, }: TxActionsWrapperProps) => import("react").JSX.Element;
export {};
