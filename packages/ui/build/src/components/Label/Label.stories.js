import { jsx as _jsx, jsxs as _jsxs } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { useId } from "react";
import { Box, Checkbox, Input } from "@/components";
import { Label } from "./Label";
export default {
    component: Label,
};
export const Default = {
    render: (args) => {
        const id = useId();
        return (_jsxs(Box, { maxWidth: 400, children: [_jsx(Label, { ...args, htmlFor: id, children: "E-mail" }), _jsx(Input, { id: id, placeholder: "Type your e-mail..." })] }));
    },
};
export const Customized = {
    render: (args) => {
        const id = useId();
        return (_jsxs(Box, { maxWidth: 400, children: [_jsx(Label, { ...args, htmlFor: id, children: "E-mail" }), _jsx(Input, { id: id, placeholder: "Type your e-mail..." })] }));
    },
    args: {
        fw: 600,
        fs: 16,
        color: "red",
    },
};
export const AsWrapper = {
    render: (args) => (_jsx(Box, { maxWidth: 400, children: _jsxs(Label, { ...args, sx: { display: "flex", alignItems: "center", gap: 10 }, children: [_jsx(Checkbox, {}), _jsx("span", { children: "I accept the terms and conditions" })] }) })),
};
