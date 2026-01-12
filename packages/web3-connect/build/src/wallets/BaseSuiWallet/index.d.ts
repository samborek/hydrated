import { WalletWithRequiredFeatures } from "@mysten/wallet-standard";
import { Wallet as StandardWallet } from "@mysten/wallet-standard";
import { WalletProviderType } from "@/config/providers";
import { SuiSigner } from "@/signers/SuiSigner";
import { SubscriptionFn, Wallet, WalletAccount } from "@/types/wallet";
export declare class BaseSuiWallet implements Wallet {
    provider: WalletProviderType;
    accessor: string;
    title: string;
    installUrl: string;
    logo: string;
    _provider: StandardWallet | undefined;
    _rawExtension: StandardWallet | undefined;
    _extension: WalletWithRequiredFeatures | undefined;
    _signer: SuiSigner | undefined;
    _enabled: boolean;
    _accounts: WalletAccount[];
    get installed(): boolean;
    get enabled(): boolean;
    get rawExtension(): StandardWallet | undefined;
    get extension(): WalletWithRequiredFeatures | undefined;
    get signer(): SuiSigner | undefined;
    transformError: (err: Error) => Error;
    enable: () => Promise<void>;
    setAccounts: (accounts: WalletAccount[]) => void;
    getAccounts: () => Promise<WalletAccount[]>;
    subscribeAccounts: (_callback: SubscriptionFn) => () => void;
    disconnect: () => void;
}
