import { jsx as _jsx, jsxs as _jsxs } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { EvmAddr, SolanaAddr, Ss58Addr, SuiAddr } from "@galacticcouncil/utils";
import { lazy, Suspense } from "react";
import { EmptyIdenticon } from "@/components/AccountAvatar/identicons/EmptyIdenticon";
import { SolanaIdenticon } from "@/components/AccountAvatar/identicons/SolanaIdenticon";
import { SuiIdenticon } from "@/components/AccountAvatar/identicons/SuiIdenticon";
import { Box } from "@/components/Box";
import { getToken } from "@/utils";
const PolkadotIdenticon = lazy(async () => ({
    default: await import("@/components/AccountAvatar/identicons/PolkadotIdenticon").then((m) => m.PolkadotIdenticon),
}));
const TalismanIdenticon = lazy(async () => ({
    default: await import("@/components/AccountAvatar/identicons/TalismanIdenticon").then((m) => m.TalismanIdenticon),
}));
const EthereumIdenticon = lazy(async () => ({
    default: await import("@/components/AccountAvatar/identicons/EthereumIdenticon").then((m) => m.EthereumIdenticon),
}));
export const AccountAvatar = ({ size = 32, theme = "auto", ...props }) => {
    const chosenTheme = theme === "auto" ? getAutoTheme(props.address) : theme;
    return (_jsxs(Suspense, { fallback: _jsx(Box, { size: size, borderRadius: "full", bg: getToken("surfaces.containers.dim.dimOnHigh") }), children: [chosenTheme === null && _jsx(EmptyIdenticon, { size: size }), chosenTheme === "evm" && _jsx(EthereumIdenticon, { size: size, ...props }), chosenTheme === "talisman" && (_jsx(TalismanIdenticon, { size: size, ...props })), chosenTheme === "polkadot" && (_jsx(PolkadotIdenticon, { size: size, ...props })), chosenTheme === "solana" && _jsx(SolanaIdenticon, { size: size, ...props }), chosenTheme === "sui" && _jsx(SuiIdenticon, { size: size, ...props })] }));
};
function getAutoTheme(address) {
    switch (true) {
        case EvmAddr.isValid(address):
            return "evm";
        case Ss58Addr.isValid(address):
            return "polkadot";
        case SolanaAddr.isValid(address):
            return "solana";
        case SuiAddr.isValid(address):
            return "sui";
        default:
            return null;
    }
}
