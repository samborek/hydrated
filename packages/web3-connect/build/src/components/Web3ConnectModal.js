import { jsx as _jsx, jsxs as _jsxs } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { Modal } from "@galacticcouncil/ui/components";
import { useMemo } from "react";
import { pick } from "remeda";
import { useShallow } from "zustand/shallow";
import { AccountSelectContent } from "@/components/content/AccountSelectContent";
import { ErrorContent } from "@/components/content/ErrorContent";
import { ExternalWalletContent } from "@/components/content/ExternalWalletContent";
import { ProviderSelectContent } from "@/components/content/ProviderSelectContent";
import { AccountActionsFooter } from "@/components/footer/AccountActionsFooter";
import { Web3ConnectModalPage } from "@/config/modal";
import { Web3ConnectProvider, } from "@/context/Web3ConnectContext";
import { useWeb3Connect } from "@/hooks/useWeb3Connect";
import { useWeb3ConnectInit } from "@/hooks/useWeb3ConnectInit";
import { useWeb3ConnectModal } from "@/hooks/useWeb3ConnectModal";
import { useWeb3EagerEnable } from "@/hooks/useWeb3EagerEnable";
const contentMap = {
    [Web3ConnectModalPage.ProviderSelect]: _jsx(ProviderSelectContent, {}),
    [Web3ConnectModalPage.ExternalWallet]: _jsx(ExternalWalletContent, {}),
    [Web3ConnectModalPage.AccountSelect]: _jsx(AccountSelectContent, {}),
    [Web3ConnectModalPage.Error]: _jsx(ErrorContent, {}),
};
const Web3ConnectModalContent = (props) => {
    const { squidSdk } = props;
    const isControlled = "open" in props &&
        "onOpenChange" in props &&
        "onAccountSelect" in props &&
        "mode" in props;
    const store = useWeb3Connect(useShallow(pick(["setAccount", "mode"])));
    const mode = isControlled ? props.mode : store.mode;
    const onAccountSelect = isControlled
        ? props.onAccountSelect
        : store.setAccount;
    const { page, setPage } = useWeb3ConnectInit({
        mode,
    });
    const context = useMemo(() => ({
        isControlled,
        page,
        setPage,
        squidSdk,
        onAccountSelect,
        mode,
    }), [page, setPage, squidSdk, onAccountSelect, isControlled, mode]);
    return (_jsxs(Web3ConnectProvider, { value: context, children: [contentMap[page], page !== Web3ConnectModalPage.ProviderSelect && _jsx(AccountActionsFooter, {})] }));
};
export const Web3ConnectModal = (props) => {
    const isControlled = "open" in props && "onOpenChange" in props && "onAccountSelect" in props;
    useWeb3EagerEnable(!isControlled);
    const modalState = useWeb3ConnectModal();
    const open = isControlled ? props.open : modalState.open;
    const onOpenChange = isControlled
        ? props.onOpenChange
        : () => modalState.toggle();
    return (_jsx(Modal, { open: open, onOpenChange: onOpenChange, disableInteractOutside: true, children: _jsx(Web3ConnectModalContent, { ...props }) }));
};
