import { jsx as _jsx, jsxs as _jsxs } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { Flex } from "../Flex";
import { Skeleton } from "../Skeleton";
import { Text } from "../Text";
import { getToken } from "@/utils";
export const ChartValues = ({ value, displayValue, isLoading = false, ...props }) => {
    return (_jsxs(Flex, { direction: "column", ...props, children: [(value || isLoading) && (_jsx(Text, { fs: "p3", fw: 600, asChild: typeof value !== "string", children: isLoading ? _jsx(Skeleton, { width: 100 }) : value })), (displayValue || isLoading) && (_jsx(Text, { fs: "p5", color: getToken("text.medium"), asChild: typeof displayValue !== "string", children: isLoading ? _jsx(Skeleton, { width: 50 }) : displayValue }))] }));
};
