import { EthereumTransactionTypeExtended, ProtocolAction } from "@aave/contract-helpers";
import { SignatureLike } from "@ethersproject/bytes";
import { DependencyList } from "react";
import { TransactionDetails } from "@/store/transactionsSlice";
import { ToastsConfig } from "@/types";
interface UseTransactionHandlerProps {
    handleGetTxns: () => Promise<EthereumTransactionTypeExtended[]>;
    handleGetPermitTxns?: (signatures: SignatureLike[], deadline: string) => Promise<EthereumTransactionTypeExtended[]>;
    tryPermit?: boolean;
    permitAction?: ProtocolAction;
    skip?: boolean;
    protocolAction?: ProtocolAction;
    deps?: DependencyList;
    eventTxInfo?: TransactionDetails;
    toasts: ToastsConfig;
}
export type Approval = {
    amount: string;
    underlyingAsset: string;
    permitType?: "POOL" | "SUPPLY_MIGRATOR_V3" | "BORROW_MIGRATOR_V3";
};
export declare const useTransactionHandler: ({ handleGetTxns, handleGetPermitTxns, tryPermit, permitAction, skip, protocolAction, deps, toasts, }: UseTransactionHandlerProps) => {
    action: () => Promise<void>;
    loadingTxns: boolean;
    setUsePermit: import("react").Dispatch<import("react").SetStateAction<boolean>>;
    requiresApproval: boolean;
    approvalTxState: import("@/hooks/useModal").TxStateType;
    mainTxState: import("@/hooks/useModal").TxStateType;
    usePermit: boolean;
};
export {};
