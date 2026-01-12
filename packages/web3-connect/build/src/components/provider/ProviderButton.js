import { jsx as _jsx, jsxs as _jsxs } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { ChevronRight, Download, LogOut, } from "@galacticcouncil/ui/assets/icons";
import { Box, Flex, Icon, Text } from "@galacticcouncil/ui/components";
import { getToken } from "@galacticcouncil/ui/utils";
import { SAccountIndicator, SConnectionIndicator, SProviderButton, } from "@/components/provider/ProviderButton.styled";
import { WalletMode } from "@/hooks/useWeb3Connect";
import { getWalletModeIcon, getWalletModesByProviderType } from "@/utils/wallet";
const modesWithIconsConfig = {
    [WalletMode.EVM]: true,
    [WalletMode.Solana]: true,
    [WalletMode.Sui]: true,
};
function hasModeIcon(mode) {
    return mode in modesWithIconsConfig;
}
export const ProviderButton = ({ title, logo, installed, provider, onClick, isConnected, accountCount = 0, actionLabel, }) => {
    const modes = getWalletModesByProviderType(provider);
    return (_jsxs(SProviderButton, { type: "button", onClick: onClick, children: [_jsxs(Box, { sx: { position: "relative" }, children: [_jsx("img", { width: 32, height: 32, src: logo, alt: title }), modes.filter(hasModeIcon).map((mode) => (_jsx(Box, { sx: { position: "absolute", bottom: -4, right: -4 }, borderRadius: "full", bg: getToken("surfaces.themeBasePalette.background"), children: _jsx("img", { width: 16, height: 16, src: getWalletModeIcon(mode) }) }, mode)))] }), _jsx(Text, { fs: 14, align: "center", mt: 10, children: title }), _jsxs(Flex, { color: getToken(isConnected ? "text.medium" : "text.tint.primary"), gap: 4, align: "center", children: [_jsx(Text, { fs: [12, 13], children: actionLabel }), _jsx(Icon, { size: 14, component: isConnected ? LogOut : installed ? ChevronRight : Download })] }), isConnected && _jsx(SConnectionIndicator, {}), accountCount > 0 && (_jsxs(SAccountIndicator, { children: ["+", accountCount] }))] }));
};
