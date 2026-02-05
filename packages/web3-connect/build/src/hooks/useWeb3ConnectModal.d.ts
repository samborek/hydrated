export declare const useWeb3ConnectModal: () => {
    toggle: (mode?: import("@/hooks/useWeb3Connect").WalletMode, meta?: {
        title?: string;
        description?: string;
    }) => void;
    open: boolean;
    meta?: ({
        title?: string;
        description?: string;
    } | null) | undefined;
};
