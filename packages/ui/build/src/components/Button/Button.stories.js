import { jsx as _jsx, jsxs as _jsxs } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { Flex } from "@/components";
import { Button, LoadingButton } from "./Button";
export default {
    component: Button,
};
const Template = (args) => _jsx(Button, { ...args, children: "Button" });
const VariantTemplate = (args) => (_jsxs(Flex, { direction: "column", gap: 20, children: [_jsxs(Flex, { align: "center", gap: 20, children: [_jsx(Button, { ...args, size: "large", children: "Button" }), _jsx(Button, { ...args, size: "medium", children: "Button" }), _jsx(Button, { ...args, size: "small", children: "Button" })] }), _jsxs(Flex, { align: "center", gap: 20, children: [_jsx(Button, { ...args, outline: true, size: "large", children: "Button" }), _jsx(Button, { ...args, outline: true, size: "medium", children: "Button" }), _jsx(Button, { ...args, outline: true, size: "small", children: "Button" })] })] }));
export const Default = {
    render: Template,
};
export const Disabled = {
    render: Template,
    args: {
        disabled: true,
    },
};
export const Primary = {
    render: VariantTemplate,
    args: {
        variant: "primary",
    },
};
export const Secondary = {
    render: VariantTemplate,
    args: {
        variant: "secondary",
    },
};
export const Tertiary = {
    render: VariantTemplate,
    args: {
        variant: "tertiary",
    },
};
export const Danger = {
    render: VariantTemplate,
    args: {
        variant: "danger",
    },
};
export const Emphasis = {
    render: VariantTemplate,
    args: {
        variant: "emphasis",
    },
};
export const Accent = {
    render: VariantTemplate,
    args: {
        variant: "accent",
    },
};
export const Muted = {
    render: VariantTemplate,
    args: {
        variant: "muted",
    },
};
export const Transparent = {
    render: VariantTemplate,
    args: {
        variant: "transparent",
    },
};
export const WithSpinner = {
    render: (args) => _jsx(LoadingButton, { ...args, children: "Loading" }),
    args: {
        isLoading: true,
    },
};
