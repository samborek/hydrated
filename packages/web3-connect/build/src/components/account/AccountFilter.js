import { jsx as _jsx, jsxs as _jsxs } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { Button, Flex } from "@galacticcouncil/ui/components";
import { WalletMode } from "@/hooks/useWeb3Connect";
import { getWalletModeIcon } from "@/utils/wallet";
export const allAccountFilterOptions = [
    WalletMode.Substrate,
    WalletMode.SubstrateH160,
    WalletMode.EVM,
    WalletMode.Solana,
    WalletMode.Sui,
];
const modeData = {
    [WalletMode.Substrate]: ["Polkadot", getWalletModeIcon(WalletMode.Substrate)],
    [WalletMode.EVM]: ["EVM", getWalletModeIcon(WalletMode.EVM)],
    [WalletMode.Solana]: ["Solana", getWalletModeIcon(WalletMode.Solana)],
    [WalletMode.Sui]: ["Sui", getWalletModeIcon(WalletMode.Sui)],
    [WalletMode.SubstrateH160]: [
        "Substrate H160",
        getWalletModeIcon(WalletMode.Substrate),
    ],
};
const defaultBlacklist = [
    WalletMode.Solana,
    WalletMode.Sui,
    WalletMode.SubstrateH160,
];
export const AccountFilter = ({ active, whitelist, blacklist, onSetActive, }) => {
    const fullBlacklist = blacklist
        ? [...defaultBlacklist, ...blacklist]
        : defaultBlacklist;
    return (_jsxs(Flex, { gap: 10, children: [_jsx(Button, { variant: active === WalletMode.Default ? "secondary" : "muted", outline: active !== WalletMode.Default, onClick: () => onSetActive(WalletMode.Default), sx: { py: 6 }, children: "All" }), Object.entries(modeData)
                .filter(([mode]) => !whitelist ||
                whitelist.includes(mode))
                .filter(([mode]) => !fullBlacklist ||
                !fullBlacklist.includes(mode))
                .map(([mode, [name, icon]]) => (_jsxs(Button, { variant: active === mode ? "secondary" : "muted", outline: active !== mode, size: "small", onClick: () => onSetActive(mode), sx: { position: "relative", pl: 6, py: 6 }, children: [_jsx("img", { sx: { size: 20 }, src: icon, alt: name }), name] }, mode)))] }));
};
