import { jsx as _jsx, jsxs as _jsxs } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { CircleInfo, ExclamationMark, TriangleAlert } from "@/assets/icons";
import { SAlertContainer, SAlertIcon, SAlertTitle, } from "@/components/Alert/Alert.styled";
import { Flex } from "@/components/Flex";
import { Text } from "@/components/Text";
import { getToken } from "@/utils";
export const Alert = ({ variant = "info", title, description, action, className, displayIcon = true, }) => {
    return (_jsxs(SAlertContainer, { variant: variant, className: className, children: [displayIcon && (_jsx(SAlertIcon, { variant: variant, size: 16, component: alertIcons[variant] })), _jsxs(Flex, { direction: "column", gap: 8, align: "baseline", children: [title && _jsx(SAlertTitle, { variant: variant, children: title }), typeof description === "string" ? (_jsx(Text, { fw: title ? 400 : 500, fs: 13, lh: 1.3, color: getToken("text.high"), children: description })) : (description), action] })] }));
};
const alertIcons = {
    info: CircleInfo,
    warning: TriangleAlert,
    error: ExclamationMark,
};
