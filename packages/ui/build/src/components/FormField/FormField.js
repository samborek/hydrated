import { jsx as _jsx, jsxs as _jsxs } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { Flex } from "@/components/Flex";
import { Text } from "@/components/Text";
import { getToken } from "@/utils";
export const FormLabel = (props) => (_jsx(Text, { fs: 12, fw: 400, color: getToken("text.medium"), ...props }));
export const FormError = (props) => (_jsx(Text, { fs: 12, fw: 400, color: getToken("accents.danger.secondary"), ...props }));
export const FormField = ({ label, error, children, ...props }) => {
    return (_jsxs(Flex, { as: "label", direction: "column", gap: 6, ...props, children: [label && _jsx(FormLabel, { children: label }), children, error && _jsx(FormError, { children: error })] }));
};
