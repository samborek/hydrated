import { Account } from "@/hooks/useWeb3Connect";
type UseAccountReturn = {
    isConnected: true;
    account: Account;
    accounts: Account[];
    disconnect: () => void;
} | {
    isConnected: false;
    account: null;
    accounts: [];
    disconnect: () => void;
};
export declare const useAccount: () => UseAccountReturn;
export {};
