import { jsx as _jsx, jsxs as _jsxs } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { CaretDown, Wallet } from "@galacticcouncil/ui/assets/icons";
import { AccountAvatar, Box, Button, Flex, Icon, Text, } from "@galacticcouncil/ui/components";
import { getToken } from "@galacticcouncil/ui/utils";
import { shortenAccountAddress, stringEquals } from "@galacticcouncil/utils";
import { SConnectedButton } from "@/components/Web3ConnectButton.styled";
import { useAccount } from "@/hooks/useAccount";
import { useWeb3ConnectModal } from "@/hooks/useWeb3ConnectModal";
import { getAccountAvatarTheme } from "@/utils";
export const Web3ConnectButton = ({ ref, allowIncompatibleAccounts = false, ...props }) => {
    const { account } = useAccount();
    const { toggle } = useWeb3ConnectModal();
    if (!allowIncompatibleAccounts && account?.isIncompatible) {
        return (_jsxs(Button, { ref: ref, onClick: () => toggle(), ...props, variant: "accent", outline: true, children: [_jsx(Icon, { size: 16, component: Wallet, mr: 4 }), _jsx(Text, { fs: "p3", children: "Select Account" })] }));
    }
    if (account) {
        const shortDisplayAddr = shortenAccountAddress(account.displayAddress);
        return (_jsxs(SConnectedButton, { ref: ref, onClick: () => toggle(), ...props, variant: "tertiary", sx: { px: 10, gap: 8 }, children: [_jsx(Box, { sx: {
                        flexShrink: 0,
                        width: 24,
                        height: 24,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        overflow: "hidden",
                        borderRadius: "full",
                    }, children: _jsx(AccountAvatar, { size: 24, address: account.displayAddress, theme: getAccountAvatarTheme(account) }) }), _jsxs(Flex, { direction: "column", align: "start", children: [_jsx(Text, { fs: "p3", lh: 1.2, truncate: 140, children: account.name }), !stringEquals(account.name, shortDisplayAddr) && (_jsx(Text, { fs: "p6", color: getToken("text.medium"), children: shortDisplayAddr }))] }), _jsx(Icon, { size: 8, component: CaretDown })] }));
    }
    return (_jsxs(Button, { ref: ref, onClick: () => toggle(), ...props, children: [_jsx(Icon, { size: 16, component: Wallet, mr: 4 }), _jsx(Text, { fs: "p3", children: "Connect Wallet" })] }));
};
