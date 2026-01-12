import { jsx as _jsx, jsxs as _jsxs } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { Box } from "@galacticcouncil/ui/components";
import { AccountOption, } from "@/components/account/AccountOption";
import { SChangeAccountButton } from "@/components/account/AccountOption.styled";
import { isEip1193Provider, requestAccounts } from "@/utils";
import { getWallet, MetaMask } from "@/wallets";
export const AccountMetaMaskOption = (props) => {
    const wallet = getWallet(props.provider);
    // Only MetaMask seems to support switching accounts
    const metaMaskExtension = wallet instanceof MetaMask && isEip1193Provider(wallet.extension)
        ? wallet.extension
        : undefined;
    return (_jsxs(Box, { children: [_jsx(AccountOption, { ...props, sx: { borderBottomLeftRadius: 0, borderBottomRightRadius: 0 } }), metaMaskExtension && (_jsx(SChangeAccountButton, { onClick: () => requestAccounts(metaMaskExtension), isActive: props.isActive, variant: "muted", size: "small", children: "Change Account" }))] }));
};
