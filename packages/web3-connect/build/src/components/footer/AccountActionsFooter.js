import { jsx as _jsx, jsxs as _jsxs } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { ChevronRight, LogOut } from "@galacticcouncil/ui/assets/icons";
import { Button, Flex, Icon, ModalFooter, Text, } from "@galacticcouncil/ui/components";
import { getToken } from "@galacticcouncil/ui/utils";
import { prop } from "remeda";
import { ProviderIcons } from "@/components/provider/ProviderIcons";
import { Web3ConnectModalPage } from "@/config/modal";
import { useWeb3ConnectContext } from "@/context/Web3ConnectContext";
import { useAccount, useWeb3Connect, useWeb3ConnectModal } from "@/hooks";
export const AccountActionsFooter = () => {
    const { mode, setPage, isControlled } = useWeb3ConnectContext();
    const { toggle } = useWeb3ConnectModal();
    const { account, disconnect } = useAccount();
    const getConnectedProviders = useWeb3Connect((state) => state.getConnectedProviders);
    const connectedProviders = getConnectedProviders(mode);
    const connected = connectedProviders.map(prop("type"));
    const onLogout = () => {
        disconnect();
        toggle();
    };
    return (_jsxs(ModalFooter, { justify: "space-between", children: [connected.length > 0 && (_jsxs(Flex, { gap: 8, align: "center", display: ["none", null, "flex"], children: [_jsx(ProviderIcons, { providers: connected }), _jsxs(Text, { fs: "p4", color: getToken("text.medium"), children: [connected.length, " connected"] })] })), _jsxs(Flex, { gap: 8, justify: "space-between", ml: "auto", children: [account && !isControlled && (_jsxs(Button, { variant: "tertiary", onClick: onLogout, children: ["Log out", _jsx(Icon, { size: 14, component: LogOut, ml: 4, mr: -4 })] })), _jsxs(Button, { variant: "accent", size: "small", outline: true, onClick: () => setPage(Web3ConnectModalPage.ProviderSelect), children: ["Manage wallets", _jsx(Icon, { size: 14, component: ChevronRight, ml: 4, mr: -4 })] })] })] }));
};
