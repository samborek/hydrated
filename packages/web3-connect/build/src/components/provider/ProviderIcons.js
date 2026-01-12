import { jsx as _jsx, jsxs as _jsxs } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { getToken } from "@galacticcouncil/ui/utils";
import { isNonNullish, reverse } from "remeda";
import { SContainer, SWalletBox, } from "@/components/provider/ProviderIcons.styled";
import { ProviderLogo } from "@/components/provider/ProviderLogo";
import { getWallet } from "@/wallets";
const DISPLAY_THRESHOLD = 4;
const getImgSize = (count) => {
    if (count >= 4)
        return 28;
    return 32;
};
const getFilteredWallets = (providers) => {
    const maxVisible = providers.length > DISPLAY_THRESHOLD
        ? DISPLAY_THRESHOLD - 1 // reserve one slot for an overflow indicator
        : DISPLAY_THRESHOLD;
    return reverse(providers)
        .slice(0, maxVisible)
        .map(getWallet)
        .filter(isNonNullish);
};
export const ProviderIcons = ({ providers = [], }) => {
    const wallets = getFilteredWallets(providers);
    const overflowCount = Math.max(0, providers.length - wallets.length);
    return (_jsxs(SContainer, { children: [wallets.map((wallet) => (_jsx(SWalletBox, { size: getImgSize(providers.length), bg: getToken("surfaces.containers.high.hover"), children: _jsx(ProviderLogo, { wallet: wallet, size: "100%" }) }, wallet.provider))), overflowCount > 0 && (_jsxs(SWalletBox, { bg: getToken("buttons.primary.low.rest"), size: getImgSize(providers.length), children: ["+", overflowCount] }))] }));
};
