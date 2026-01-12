import { jsx as _jsx, jsxs as _jsxs } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { AccountAvatar, Box, Flex, Skeleton, Text, } from "@galacticcouncil/ui/components";
import { getToken } from "@galacticcouncil/ui/utils";
import { formatCurrency, shortenAccountAddress } from "@galacticcouncil/utils";
import { useState } from "react";
import { AccountDeleteButton } from "@/components/account/AccountDeleteButton";
import { AccountEditButton } from "@/components/account/AccountEditButton";
import { AccountNameEdit } from "@/components/account/AccountNameEdit";
import { SAccountOption, SCopyButton, } from "@/components/account/AccountOption.styled";
import { ProviderLogo } from "@/components/provider/ProviderLogo";
import { getAccountAvatarTheme } from "@/utils";
import { getWallet } from "@/wallets";
export const AccountOption = ({ className, isActive, isProxy = false, balance, isBalanceLoading, onSelect, onEdit, onDelete, ...account }) => {
    const [isEditing, setIsEditing] = useState(false);
    const wallet = getWallet(account.provider);
    return (_jsx(SAccountOption, { className: className, "data-active": isActive, "data-proxy": isProxy, ...(onSelect
            ? {
                onClick: () => onSelect(account),
            }
            : {
                disabled: true,
            }), children: _jsxs(Flex, { align: "center", gap: 12, children: [_jsx(Box, { sx: { flexShrink: 0 }, children: _jsx(AccountAvatar, { address: account.displayAddress, theme: getAccountAvatarTheme(account) }) }), _jsxs(Flex, { direction: "column", width: "100%", sx: { minWidth: 0 }, children: [_jsxs(Flex, { align: "center", justify: "space-between", children: [isEditing ? (_jsx(AccountNameEdit, { name: account.name, onChange: (name) => {
                                        onEdit?.(name);
                                        setIsEditing(false);
                                    }, onCancel: () => setIsEditing(false) })) : (_jsxs(Flex, { align: "center", gap: 4, sx: { minWidth: 0 }, children: [onDelete && _jsx(AccountDeleteButton, { onClick: onDelete }), wallet && _jsx(ProviderLogo, { size: 12, wallet: wallet }), _jsx(Text, { fs: "p3", truncate: 200, children: account.name })] })), isBalanceLoading && balance === undefined ? (_jsx(Skeleton, { sx: { width: 75, ml: "auto" } })) : (balance !== undefined && (_jsx(Text, { fs: "p3", children: formatCurrency(balance) }))), onEdit && _jsx(AccountEditButton, { onClick: () => setIsEditing(true) })] }), _jsxs(Flex, { align: "center", justify: "space-between", gap: 4, children: [_jsxs(Text, { fs: "p4", color: getToken("text.medium"), sx: { minWidth: 0 }, children: [_jsx(Text, { as: "span", truncate: true, display: ["none", "block"], children: account.displayAddress }), _jsx(Text, { as: "span", display: ["block", "none"], children: shortenAccountAddress(account.displayAddress, 12) })] }), _jsx(SCopyButton, { text: account.displayAddress })] })] })] }) }));
};
