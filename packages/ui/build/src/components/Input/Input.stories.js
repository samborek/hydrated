import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { Download, Search } from "lucide-react";
import { useState } from "react";
import { Box } from "@/components";
import { Input } from "./Input";
import { NumberInput } from "./NumberInput";
export default {
    component: Input,
};
const placeholder = "Search tokens...";
const Template = (args) => (_jsx(Box, { maxWidth: 400, children: _jsx(Input, { ...args }) }));
export const Default = {
    render: Template,
    args: {
        placeholder,
    },
};
export const Small = {
    render: Template,
    args: {
        placeholder,
        customSize: "small",
    },
};
export const Large = {
    render: Template,
    args: {
        placeholder,
        customSize: "large",
    },
};
export const IconStart = {
    render: Template,
    args: {
        placeholder,
        iconStart: Search,
        customSize: "large",
    },
};
export const IconEnd = {
    render: Template,
    args: {
        placeholder,
        iconEnd: Download,
        customSize: "large",
    },
};
export const Unit = {
    render: Template,
    args: {
        placeholder,
        unit: "HDX",
        customSize: "large",
    },
};
export const Disabled = {
    render: Template,
    args: {
        placeholder,
        disabled: true,
    },
};
export const Embedded = {
    render: Template,
    args: {
        placeholder,
        variant: "embedded",
    },
};
export const EmbeddedDisalbed = {
    render: Template,
    args: {
        placeholder,
        disabled: true,
        variant: "embedded",
    },
};
export const Numeric = {
    render: () => {
        const [state, setState] = useState(null);
        return (_jsxs(_Fragment, { children: [_jsx(NumberInput, { customSize: "large", placeholder: "Enter a number", unit: "HDX", onValueChange: setState }), _jsx("pre", { children: JSON.stringify(state, null, 2) })] }));
    },
};
