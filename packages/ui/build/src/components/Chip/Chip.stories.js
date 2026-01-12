import { jsx as _jsx, jsxs as _jsxs } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { Flex } from "@/components";
import { Chip } from "./Chip";
export default {
    component: Chip,
};
const Template = (args) => (_jsxs(Flex, { gap: 20, align: "center", children: [_jsx(Chip, { ...args, size: "large", children: "Voted" }), _jsx(Chip, { ...args, size: "medium", children: "Voted" }), _jsx(Chip, { ...args, size: "small", children: "Voted" })] }));
export const Default = {
    render: Template,
};
export const Primary = {
    render: Template,
    args: {
        variant: "primary",
    },
};
export const Rounded = {
    render: Template,
    args: {
        variant: "primary",
        rounded: true,
    },
};
export const Secondary = {
    render: Template,
    args: {
        variant: "secondary",
    },
};
export const Tertiary = {
    render: Template,
    args: {
        variant: "tertiary",
    },
};
export const Info = {
    render: Template,
    args: {
        variant: "info",
    },
};
export const Success = {
    render: Template,
    args: {
        variant: "success",
    },
};
export const Warning = {
    render: Template,
    args: {
        variant: "warning",
    },
};
export const Danger = {
    render: Template,
    args: {
        variant: "danger",
    },
};
