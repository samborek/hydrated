import { BoxProps } from "@/components/Box";
export type AccountAvatarTheme = "auto" | "polkadot" | "evm" | "talisman" | "solana" | "sui";
export type AccountAvatarProps = BoxProps & {
    address: string;
    size?: number;
    theme?: AccountAvatarTheme;
};
export declare const AccountAvatar: React.FC<AccountAvatarProps>;
