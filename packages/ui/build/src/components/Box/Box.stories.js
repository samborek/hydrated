import { jsx as _jsx } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { Box } from "./Box";
export default {
    component: Box,
};
const Template = (args) => (_jsx(Box, { display: "flex", sx: { alignItems: "center", justifyContent: "center", textAlign: "center" }, ...args, children: "I am a box" }));
export const Default = {
    render: Template,
    args: {
        sx: {},
    },
};
export const WithBorderRadius = {
    render: Template,
    args: {
        p: 10,
        bg: "pink",
        borderRadius: "lg",
    },
};
export const WithBackground = {
    render: Template,
    args: {
        p: 10,
        bg: "pink",
    },
};
export const WithColor = {
    render: Template,
    args: {
        p: 10,
        color: "red",
    },
};
export const WithPadding = {
    render: Template,
    args: {
        p: 40,
        bg: "pink",
    },
};
export const WithMargin = {
    render: Template,
    args: {
        p: 10,
        m: 40,
        bg: "pink",
    },
};
export const WithSize = {
    render: Template,
    args: {
        p: 10,
        size: 100,
        bg: "pink",
    },
};
export const Responsive = {
    render: Template,
    args: {
        p: [20, null, 40],
        m: [20, null, 40],
        size: [100, null, 200],
        bg: ["skyblue", null, "pink"],
    },
};
