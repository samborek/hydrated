import { jsx as _jsx, jsxs as _jsxs } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { Box, Flex, Text } from "@/components";
import { Skeleton } from "./Skeleton";
export default {
    component: Skeleton,
};
const Template = () => (_jsxs(Box, { width: 500, children: [_jsx(Text, { as: "h1", children: _jsx(Skeleton, {}) }), _jsx(Text, { children: _jsx(Skeleton, { count: 2 }) }), _jsxs(Flex, { gap: 10, align: "center", my: 10, children: [_jsx(Skeleton, { circle: true, width: 50, height: 50 }), _jsx(Box, { sx: { flex: 1 }, children: _jsx(Text, { children: _jsx(Skeleton, { count: 2 }) }) })] }), _jsx(Text, { children: _jsx(Skeleton, { count: 10 }) })] }));
export const Default = {
    render: Template,
};
