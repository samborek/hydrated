import { jsx as _jsx, jsxs as _jsxs } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { Box } from "../Box";
import { Text } from "../Text";
import { getToken } from "@/utils";
export const ChartCrosshair = ({ date, time, }) => {
    return (_jsxs(Box, { children: [_jsx(Text, { align: "center", fs: "p5", color: getToken("text.low"), fw: 500, lh: 1.2, whiteSpace: "nowrap", children: date }), _jsx(Text, { align: "center", fs: "p3", color: getToken("text.medium"), fw: 500, lh: 1, whiteSpace: "nowrap", children: time })] }));
};
