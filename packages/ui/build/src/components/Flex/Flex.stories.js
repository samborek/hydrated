import { jsx as _jsx } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { Flex } from "./Flex";
export default {
    component: Flex,
};
const Template = (args) => {
    const hasAlign = !!args?.align;
    return (_jsx(Flex, { gap: 20, ...args, children: Array.from({ length: 5 }).map((_, i) => (_jsx(Flex, { size: hasAlign ? 80 - i * 12 : 80, align: "center", justify: "center", bg: "skyBlue.600", color: "white", borderRadius: "lg", children: i + 1 }, i))) }));
};
export const Default = {
    render: Template,
};
export const JustifyBetween = {
    render: Template,
    args: {
        justify: "space-between",
    },
};
export const JustifyAround = {
    render: Template,
    args: {
        justify: "space-around",
    },
};
export const JustifyFlexEnd = {
    render: Template,
    args: {
        justify: "flex-end",
    },
};
export const AlignStart = {
    render: Template,
    args: {
        align: "start",
    },
};
export const AlignCenter = {
    render: Template,
    args: {
        align: "center",
    },
};
export const AlignEnd = {
    render: Template,
    args: {
        align: "end",
    },
};
export const DirectionColumn = {
    render: Template,
    args: {
        direction: "column",
    },
};
export const Responsive = {
    render: Template,
    args: {
        gap: [5, null, 30],
        direction: ["column", null, "row"],
    },
};
