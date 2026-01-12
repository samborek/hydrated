import { WalletProviderType } from "@/config/providers";
import { SolanaSigner } from "@/signers/SolanaSigner";
import { SolanaInjectedWindowProvider } from "@/types/solana";
import { Wallet, WalletAccount } from "@/types/wallet";
export declare class BaseSolanaWallet implements Wallet {
    provider: WalletProviderType;
    accessor: string;
    title: string;
    installUrl: string;
    logo: string;
    _rawExtension: SolanaInjectedWindowProvider | undefined;
    _extension: SolanaInjectedWindowProvider | undefined;
    _signer: SolanaSigner | undefined;
    _enabled: boolean;
    _accounts: WalletAccount[];
    get extension(): SolanaInjectedWindowProvider | undefined;
    get signer(): SolanaSigner | undefined;
    get installed(): boolean;
    get enabled(): boolean;
    get rawExtension(): SolanaInjectedWindowProvider | undefined;
    transformError: (err: Error) => Error;
    getAccounts: () => Promise<WalletAccount[]>;
    setAccounts: (accounts: WalletAccount[]) => void;
    enable: () => Promise<void>;
    subscribeAccounts: () => () => void;
    disconnect: () => void;
}
