import { WalletData } from "@/types/wallet";
export type ProviderButtonProps = WalletData & {
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    isConnected?: boolean;
    accountCount?: number;
    actionLabel?: string;
};
export declare const ProviderButton: React.FC<ProviderButtonProps>;
