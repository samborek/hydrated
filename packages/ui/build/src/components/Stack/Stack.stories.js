import { jsx as _jsx, jsxs as _jsxs } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { Box } from "@/components/Box";
import { Separator } from "@/components/Separator";
import { Stack } from "./Stack";
export default {
    component: Stack,
};
const Template = (args) => (_jsxs(Stack, { ...args, children: [_jsx(Box, { size: 20, bg: "hotpink" }), _jsx(Box, { size: 20, bg: "hotpink" }), _jsx(Box, { size: 20, bg: "hotpink" }), _jsx(Box, { size: 20, bg: "hotpink" }), _jsx(Box, { size: 20, bg: "hotpink" })] }));
export const Column = {
    render: Template,
    args: {
        direction: "column",
        gap: 20,
    },
};
export const Row = {
    render: Template,
    args: {
        direction: "row",
        gap: 20,
    },
};
export const ColumnWithSeparator = {
    render: Template,
    args: {
        direction: "column",
        separated: true,
        gap: 20,
    },
};
export const RowWithSeparator = {
    render: Template,
    args: {
        direction: "row",
        separated: true,
        gap: 20,
    },
};
export const CustomSeparator = {
    render: Template,
    args: {
        direction: "column",
        separated: true,
        separator: _jsx(Separator, { size: 5, sx: { bg: "hotpink" } }),
        gap: 20,
    },
};
export const Responsive = {
    render: Template,
    args: {
        direction: ["column", null, "row"],
        separated: true,
        separator: _jsx(Separator, { size: 5, sx: { bg: "hotpink" } }),
        gap: 20,
    },
};
