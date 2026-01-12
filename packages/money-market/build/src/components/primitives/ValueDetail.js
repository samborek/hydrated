import { jsx as _jsx, jsxs as _jsxs } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { Flex, Text } from "@galacticcouncil/ui/components";
import { getToken } from "@galacticcouncil/ui/utils";
export const ValueDetail = ({ value, subValue, ...props }) => {
    return (_jsxs(Flex, { direction: "column", ...props, children: [_jsx(Text, { fw: 500, children: value }), subValue && (_jsx(Text, { fs: 12, lh: 1, color: getToken("text.low"), children: subValue }))] }));
};
