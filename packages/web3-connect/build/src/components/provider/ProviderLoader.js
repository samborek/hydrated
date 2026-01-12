import { jsx as _jsx, jsxs as _jsxs } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { Box, Spinner, Text } from "@galacticcouncil/ui/components";
import { getToken } from "@galacticcouncil/ui/utils";
import { useMemo } from "react";
import { isNonNullish } from "remeda";
import { ProviderIcons } from "@/components/provider/ProviderIcons";
import { getWallet } from "@/wallets";
import { SContainer, SpinnerContainer } from "./ProviderLoader.styled";
export const ProviderLoader = ({ providers }) => {
    const wallets = useMemo(() => {
        return providers.map(getWallet).filter(isNonNullish);
    }, [providers]);
    return (_jsxs(SContainer, { children: [_jsxs(SpinnerContainer, { children: [_jsx(Spinner, { size: 140, strokeWidth: 1 }), _jsx(ProviderIcons, { providers: wallets.map(({ provider }) => provider) })] }), _jsxs(Box, { my: 20, children: [_jsx(Text, { fs: 19, fw: 500, align: "center", transform: "uppercase", children: "Waiting for authorization" }), _jsx(Text, { align: "center", fs: 16, color: getToken("text.medium"), fw: 400, children: "Please authorize your wallet extension to connect to Hydration." })] })] }));
};
