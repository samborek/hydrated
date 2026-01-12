import { jsx as _jsx, jsxs as _jsxs } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { shortenAccountAddress } from "@galacticcouncil/utils";
import { AccountAvatar } from "@/components/AccountAvatar";
import { Flex } from "@/components/Flex";
import { Logo } from "@/components/Logo";
import { Text } from "@/components/Text";
import { getToken, getTokenPx, px } from "@/utils";
import { SAccountTileContainer } from "./AccountTile.styled";
export const AccountTile = ({ name, address, value, active, label, className, walletLogoSrc, onClick, }) => {
    return (_jsxs(Flex, { direction: "column", gap: getTokenPx("containers.paddings.quint"), onClick: onClick, tabIndex: -1, children: [label && (_jsx(Text, { fw: 500, fs: "p5", lh: 1.2, color: getToken("text.medium"), children: label })), _jsxs(SAccountTileContainer, { active: active, className: className, isInteractive: !!onClick, children: [_jsx(AccountAvatar, { address: address }), _jsxs(Flex, { direction: "column", gap: 4, children: [_jsxs(Flex, { gap: 4, align: "center", children: [walletLogoSrc && _jsx(Logo, { size: "extra-small", src: walletLogoSrc }), _jsx(Text, { fw: 500, fs: "p3", lh: 1, color: getToken("text.high"), truncate: 160, children: name })] }), _jsx(Flex, { gap: 2, children: _jsx(Text, { fs: "p5", lh: px(15), color: getToken("text.medium"), children: shortenAccountAddress(address) }) })] }), _jsx(Text, { fw: 500, fs: "p3", lh: 1, color: getToken("text.high"), children: value })] })] }));
};
