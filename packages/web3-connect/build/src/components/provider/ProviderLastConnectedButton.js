import { jsx as _jsx, jsxs as _jsxs } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { ChevronRight } from "@galacticcouncil/ui/assets/icons";
import { Flex, Icon, Text } from "@galacticcouncil/ui/components";
import { getToken } from "@galacticcouncil/ui/utils";
import { prop } from "remeda";
import { SProviderButton } from "@/components/provider/ProviderButton.styled";
import { ProviderIcons } from "@/components/provider/ProviderIcons";
import { useWeb3ConnectContext } from "@/context/Web3ConnectContext";
import { useWeb3Connect } from "@/hooks";
export const ProviderLastConnectedButton = ({ onClick }) => {
    const { mode } = useWeb3ConnectContext();
    const getConnectedProviders = useWeb3Connect((state) => state.getConnectedProviders);
    const connectedProviders = getConnectedProviders(mode);
    const connected = connectedProviders.map(prop("type"));
    if (connected.length === 0) {
        return null;
    }
    return (_jsxs(SProviderButton, { type: "button", onClick: onClick, children: [_jsx(ProviderIcons, { providers: connected }), _jsx(Text, { fs: [12, 14], sx: { mt: 8 }, align: "center", children: "Last connected" }), _jsxs(Flex, { color: getToken("text.tint.primary"), gap: 4, align: "center", children: [_jsx(Text, { fs: [12, 13], children: "Continue" }), _jsx(Icon, { size: 14, component: ChevronRight })] })] }));
};
