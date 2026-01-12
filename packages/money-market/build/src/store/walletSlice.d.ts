import { StateCreator } from "zustand";
import { RootStore } from "./root";
export declare enum WalletType {
    INJECTED = "injected",
    WALLET_CONNECT = "wallet_connect",
    WALLET_LINK = "wallet_link",
    TORUS = "torus",
    FRAME = "frame",
    GNOSIS = "gnosis",
    LEDGER = "ledger",
    READ_ONLY_MODE = "read_only_mode"
}
export declare enum ApprovalMethod {
    APPROVE = "Transaction",
    PERMIT = "Signed message"
}
export interface WalletSlice {
    account: string;
    accountLoading: boolean;
    walletType: WalletType | undefined;
    setAccount: (account: string | undefined) => void;
    setAccountLoading: (loading: boolean) => void;
    setWalletType: (walletType: WalletType | undefined) => void;
    isWalletModalOpen: boolean;
    setWalletModalOpen: (open: boolean) => void;
    walletApprovalMethodPreference: ApprovalMethod;
    setWalletApprovalMethodPreference: (method: ApprovalMethod) => void;
    refreshWalletApprovalMethod: () => void;
}
export declare const createWalletSlice: StateCreator<RootStore, [
    ["zustand/subscribeWithSelector", never],
    ["zustand/devtools", never]
], [
], WalletSlice>;
