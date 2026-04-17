import { jsx as _jsx, jsxs as _jsxs } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { Box } from "../Box";
import { Flex } from "../Flex";
import { Text } from "../Text";
import { getToken } from "@/utils";
export const ChartStatus = ({ icon, message }) => {
    return (_jsxs(Flex, { direction: "column", align: "center", justify: "center", maxWidth: 200, children: [_jsx(Box, { sx: { flexShrink: 0 }, children: icon }), message && (_jsx(Text, { align: "center", fs: "p3", fw: 500, lh: 1, color: getToken("text.high"), children: message }))] }));
};
