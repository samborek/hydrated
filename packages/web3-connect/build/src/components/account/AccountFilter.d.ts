import { WalletMode } from "@/hooks/useWeb3Connect";
export declare const allAccountFilterOptions: [WalletMode.Substrate, WalletMode.SubstrateH160, WalletMode.EVM, WalletMode.Solana, WalletMode.Sui];
export type AccountFilterOptionOverride = (typeof allAccountFilterOptions)[number];
export type AccountFilterOption = AccountFilterOptionOverride | WalletMode.Default;
export type AccountFilterProps = {
    readonly active: AccountFilterOption;
    readonly whitelist?: ReadonlyArray<AccountFilterOptionOverride>;
    readonly blacklist?: ReadonlyArray<AccountFilterOptionOverride>;
    readonly onSetActive: (mode: AccountFilterOption) => void;
};
export declare const AccountFilter: React.FC<AccountFilterProps>;
