import { jsx as _jsx, jsxs as _jsxs } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { Flex } from "@/components/Flex";
import { Text } from "@/components/Text";
import { getToken, px } from "@/utils";
export const Amount = ({ label, value, displayValue, variant = "default", className, size = "default", }) => {
    return (_jsxs(Flex, { className: className, direction: variant === "horizontalLabel" ? "row" : "column", justify: variant === "horizontalLabel" ? "space-between" : undefined, gap: 2, children: [label && _jsx(AmountLabel, { variant: variant, children: label }), _jsxs(Flex, { direction: "column", gap: 2, align: variant === "horizontalLabel" ? "flex-end" : undefined, children: [_jsx(AmountValue, { variant: variant, size: size, children: value }), displayValue && (_jsx(AmountDisplayValue, { variant: variant, children: displayValue }))] })] }));
};
const AmountLabel = ({ variant = "default", ...props }) => {
    return variant === "default" ? (_jsx(Text, { fs: 12, lh: px(15), color: getToken("text.medium"), ...props })) : (_jsx(Text, { fs: 13, lh: px(15), color: getToken("text.low"), ...props }));
};
const AmountValue = ({ variant = "default", size = "default", ...props }) => {
    return variant === "default" ? (_jsx(Text, { fw: 500, fs: size === "large" ? "p2" : "p4", lh: 1, color: getToken("text.high"), ...props })) : (_jsx(Text, { fw: 600, fs: size === "large" ? "p2" : 12, lh: px(15), color: getToken("text.high"), ...props }));
};
const AmountDisplayValue = ({ variant = "default", ...props }) => {
    return variant === "default" ? (_jsx(Text, { fs: 10, lh: 1, color: getToken("text.low"), ...props })) : (_jsx(Text, { fs: 11, lh: px(15), color: getToken("text.low"), ...props }));
};
