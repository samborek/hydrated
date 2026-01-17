export declare const useWeb3ConnectModal: () => {
    open: boolean;
    meta?: ({
        title?: string;
        description?: string;
    } | null) | undefined;
    toggle: (mode?: import("@/hooks/useWeb3Connect").WalletMode, meta?: {
        title?: string;
        description?: string;
    }) => void;
};
