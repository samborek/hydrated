export var WalletProviderType;
(function (WalletProviderType) {
    WalletProviderType["AlephZero"] = "aleph-zero";
    WalletProviderType["BraveWallet"] = "bravewallet";
    WalletProviderType["BraveWalletSol"] = "bravewallet-sol";
    WalletProviderType["Enkrypt"] = "enkrypt";
    WalletProviderType["ExternalWallet"] = "external";
    WalletProviderType["FearlessWallet"] = "fearless-wallet";
    WalletProviderType["MantaWallet"] = "manta-wallet-js";
    WalletProviderType["MetaMask"] = "metamask";
    WalletProviderType["NovaWallet"] = "nova-wallet";
    WalletProviderType["Phantom"] = "phantom";
    WalletProviderType["PolkadotJS"] = "polkadot-js";
    WalletProviderType["Polkagate"] = "polkagate";
    WalletProviderType["RabbyWallet"] = "rabby-wallet";
    WalletProviderType["Solflare"] = "solflare";
    WalletProviderType["SubwalletEvm"] = "subwallet-evm";
    WalletProviderType["SubwalletH160"] = "subwallet-h160";
    WalletProviderType["Subwallet"] = "subwallet";
    WalletProviderType["Talisman"] = "talisman";
    WalletProviderType["TalismanEvm"] = "talisman-evm";
    WalletProviderType["TalismanH160"] = "talisman-h160";
    WalletProviderType["TrustWallet"] = "trustwallet";
    WalletProviderType["Slush"] = "slush";
    WalletProviderType["Suiet"] = "suiet";
    WalletProviderType["PhantomSui"] = "phantom-sui";
    WalletProviderType["WalletConnect"] = "walletconnect";
    WalletProviderType["WalletConnectEvm"] = "walletconnect-evm";
})(WalletProviderType || (WalletProviderType = {}));
export const isWalletProviderType = (provider) => {
    return Object.values(WalletProviderType).includes(provider);
};
export const TALISMAN_PROVIDERS = [
    WalletProviderType.Talisman,
    WalletProviderType.TalismanEvm,
];
export const EVM_PROVIDERS = [
    WalletProviderType.MetaMask,
    WalletProviderType.TalismanEvm,
    WalletProviderType.SubwalletEvm,
    WalletProviderType.TrustWallet,
    WalletProviderType.BraveWallet,
    WalletProviderType.RabbyWallet,
    WalletProviderType.WalletConnectEvm,
];
export const SUBSTRATE_PROVIDERS = [
    WalletProviderType.PolkadotJS,
    WalletProviderType.Talisman,
    WalletProviderType.Subwallet,
    WalletProviderType.Enkrypt,
    WalletProviderType.NovaWallet,
    WalletProviderType.MantaWallet,
    WalletProviderType.FearlessWallet,
    WalletProviderType.Polkagate,
    WalletProviderType.AlephZero,
    WalletProviderType.WalletConnect,
];
export const SUBSTRATE_H160_PROVIDERS = [
    WalletProviderType.TalismanH160,
    WalletProviderType.SubwalletH160,
];
export const SOLANA_PROVIDERS = [
    WalletProviderType.Phantom,
    WalletProviderType.Solflare,
    WalletProviderType.BraveWalletSol,
];
export const SUI_PROVIDERS = [
    WalletProviderType.Suiet,
    WalletProviderType.Slush,
    WalletProviderType.PhantomSui,
];
export const ALTERNATIVE_PROVIDERS = [
    WalletProviderType.ExternalWallet,
];
