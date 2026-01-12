export declare enum WalletProviderType {
    AlephZero = "aleph-zero",
    BraveWallet = "bravewallet",
    BraveWalletSol = "bravewallet-sol",
    Enkrypt = "enkrypt",
    ExternalWallet = "external",
    FearlessWallet = "fearless-wallet",
    MantaWallet = "manta-wallet-js",
    MetaMask = "metamask",
    NovaWallet = "nova-wallet",
    Phantom = "phantom",
    PolkadotJS = "polkadot-js",
    Polkagate = "polkagate",
    RabbyWallet = "rabby-wallet",
    Solflare = "solflare",
    SubwalletEvm = "subwallet-evm",
    SubwalletH160 = "subwallet-h160",
    Subwallet = "subwallet",
    Talisman = "talisman",
    TalismanEvm = "talisman-evm",
    TalismanH160 = "talisman-h160",
    TrustWallet = "trustwallet",
    Slush = "slush",
    Suiet = "suiet",
    PhantomSui = "phantom-sui",
    WalletConnect = "walletconnect",
    WalletConnectEvm = "walletconnect-evm"
}
export declare const isWalletProviderType: (provider: string) => provider is WalletProviderType;
export declare const TALISMAN_PROVIDERS: WalletProviderType[];
export declare const EVM_PROVIDERS: WalletProviderType[];
export declare const SUBSTRATE_PROVIDERS: WalletProviderType[];
export declare const SUBSTRATE_H160_PROVIDERS: WalletProviderType[];
export declare const SOLANA_PROVIDERS: WalletProviderType[];
export declare const SUI_PROVIDERS: WalletProviderType[];
export declare const ALTERNATIVE_PROVIDERS: WalletProviderType[];
