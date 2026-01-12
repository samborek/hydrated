import { SquidSdk } from "@galacticcouncil/indexer/squid";
import { Web3ConnectModalPage } from "@/config/modal";
import { Account, WalletMode } from "@/hooks/useWeb3Connect";
export type Web3ConnectContextType = {
    isControlled: boolean;
    page: Web3ConnectModalPage;
    setPage: (page: Web3ConnectModalPage) => void;
    squidSdk: SquidSdk;
    onAccountSelect: (account: Account) => void;
    mode: WalletMode;
    onBackToParent?: () => void;
};
export declare const Web3ConnectProvider: import("react").Provider<Web3ConnectContextType | null>;
export declare const useWeb3ConnectContext: () => Web3ConnectContextType;
