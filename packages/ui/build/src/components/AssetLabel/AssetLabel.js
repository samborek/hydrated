import { jsx as _jsx, jsxs as _jsxs } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { getToken } from "@/utils";
import { Flex } from "../Flex";
import { Skeleton } from "../Skeleton";
import { Text } from "../Text";
export const AssetLabel = ({ name, symbol, size = "medium", loading, badge, }) => {
    const isMedium = size === "medium";
    if (loading) {
        return (_jsxs("div", { children: [_jsx(Skeleton, { width: 32, height: 12 }), _jsx(Skeleton, { width: 56, height: 12 })] }));
    }
    return (_jsxs(Flex, { direction: "column", gap: 2, minWidth: 0, children: [badge ? (_jsxs(Flex, { gap: 4, align: "center", children: [_jsx(Text, { color: getToken("text.high"), fs: isMedium ? "p5" : "p3", fw: 600, lh: 1, whiteSpace: "nowrap", children: symbol }), badge] })) : (_jsx(Text, { color: getToken("text.high"), fs: isMedium ? "p5" : "p3", fw: 600, lh: 1, whiteSpace: "nowrap", children: symbol })), name && (_jsx(Text, { color: getToken("text.medium"), fs: isMedium ? "p6" : "p5", fw: 400, lh: 1, truncate: true, children: name }))] }));
};
