import { AccountAvatarTheme } from "@galacticcouncil/ui/components";
import { AccountFilterOption } from "@/components/account/AccountFilter";
import { WalletProviderType } from "@/config/providers";
import { Account, StoredAccount, WalletMode } from "@/hooks/useWeb3Connect";
import { Wallet, WalletAccount } from "@/types/wallet";
export declare const toStoredAccount: ({ address, name, provider, }: WalletAccount) => StoredAccount;
export declare const toAccount: (account: StoredAccount) => Account;
export declare const getAccountAvatarTheme: (account: Account) => AccountAvatarTheme;
export declare const getWalletModeByAddress: (address: string) => WalletMode.EVM | WalletMode.Substrate | WalletMode.Solana | null;
export declare const getDefaultAccountFilterByMode: (mode: WalletMode) => AccountFilterOption;
export type AccountsSubscribeOptions = {
    onDisconnect: () => void;
    onAccountsChange: (accounts: WalletAccount[]) => void | Promise<void>;
    onMainAccountChange: (mainAccount: WalletAccount) => void | Promise<void>;
};
export declare function subscribeWalletAccounts(wallet: Wallet, { onDisconnect, onAccountsChange, onMainAccountChange, }: AccountsSubscribeOptions): () => void;
export declare function getWalletModeIcon(mode: WalletMode): "" | "https://cdn.jsdelivr.net/gh/galacticcouncil/intergalactic-asset-metadata@latest/v2/ethereum/1/icon.svg" | "https://cdn.jsdelivr.net/gh/galacticcouncil/intergalactic-asset-metadata@latest/v2/polkadot/2034/assets/5/icon.svg" | "https://cdn.jsdelivr.net/gh/galacticcouncil/intergalactic-asset-metadata@latest/v2/solana/101/icon.svg" | "https://cdn.jsdelivr.net/gh/galacticcouncil/intergalactic-asset-metadata@latest/v2/polkadot/2034/assets/1000753/icon.svg";
export declare function getWalletModesByProviderType(walletType: WalletProviderType): WalletMode[];
