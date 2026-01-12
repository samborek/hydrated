import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { ModalBody, ModalHeader } from "@galacticcouncil/ui/components";
import { ProviderSelect } from "@/components/provider/ProviderSelect";
import { Web3ConnectModalPage } from "@/config/modal";
import { useWeb3ConnectContext } from "@/context/Web3ConnectContext";
import { useAccount, useWeb3ConnectModal } from "@/hooks";
export const ProviderSelectContent = () => {
    const { meta } = useWeb3ConnectModal();
    const { isConnected } = useAccount();
    const { setPage, onBackToParent } = useWeb3ConnectContext();
    return (_jsxs(_Fragment, { children: [_jsx(ModalHeader, { title: meta?.title ?? "Connect wallet", description: meta?.description, align: "center", onBack: isConnected
                    ? () => setPage(Web3ConnectModalPage.AccountSelect)
                    : onBackToParent }), _jsx(ModalBody, { scrollable: false, children: _jsx(ProviderSelect, {}) })] }));
};
