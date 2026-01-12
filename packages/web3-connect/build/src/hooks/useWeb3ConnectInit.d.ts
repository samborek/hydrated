import { Web3ConnectModalPage } from "@/config/modal";
import { WalletMode } from "@/hooks/useWeb3Connect";
export declare const useWeb3ConnectInit: ({ mode }: {
    mode: WalletMode;
}) => {
    page: Web3ConnectModalPage;
    setPage: import("react").Dispatch<import("react").SetStateAction<Web3ConnectModalPage>>;
};
