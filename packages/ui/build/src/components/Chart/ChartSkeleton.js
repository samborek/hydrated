import { jsx as _jsx, jsxs as _jsxs } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { LineChartSkeleton } from "@/assets/visuals";
import { Box } from "../Box";
import { Flex } from "../Flex";
import { getToken } from "@/utils";
export const ChartSkeleton = ({ children, color, className, }) => {
    return (_jsxs(Flex, { align: "end", justify: "center", sx: { position: "relative", width: "100%" }, className: className, children: [_jsx(LineChartSkeleton, { width: "95%", height: "80%", sx: { filter: "blur(15px)", color: color || getToken("details.chart") } }), children && (_jsx(Box, { sx: {
                    color: getToken("text.medium"),
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                }, children: children }))] }));
};
