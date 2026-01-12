import { jsx as _jsx, jsxs as _jsxs } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { MoveRight, Warning } from "@/assets/icons";
import { Flex } from "@/components/Flex";
import { Text } from "@/components/Text";
import { getToken, px } from "@/utils";
export const AssetWarning = ({ title, description, titleInfo, }) => {
    return (_jsxs(Flex, { direction: "column", gap: 8, children: [_jsxs(Flex, { justify: "space-between", align: "center", children: [_jsxs(Flex, { gap: 2, align: "center", color: getToken("accents.danger.secondary"), children: [_jsx(Warning, {}), _jsx(Text, { fw: 500, fs: "p5", lh: 1.2, children: title })] }), titleInfo] }), _jsx(Text, { fw: 400, fs: 11, lh: px(15), color: getToken("text.medium"), children: description })] }));
};
export const AssetPropertyChanged = ({ previous, current, }) => {
    return (_jsxs(Flex, { gap: 6, align: "center", children: [_jsx(Text, { fw: 600, fs: "p5", color: getToken("text.high"), children: typeof previous === "bigint" ? previous.toString() : previous }), _jsx(MoveRight, { sx: { color: getToken("accents.danger.secondary") } }), _jsx(Text, { fw: 600, fs: "p5", color: getToken("text.high"), children: typeof current === "bigint" ? current.toString() : current })] }));
};
