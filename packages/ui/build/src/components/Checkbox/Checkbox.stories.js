import { jsx as _jsx } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { useState } from "react";
import { Checkbox } from "./Checkbox";
export default {
    component: Checkbox,
};
const Template = (args) => {
    const [value, setValue] = useState(args.checked);
    return (_jsx(Checkbox, { ...args, checked: value, onCheckedChange: setValue, name: "checkbox" }));
};
export const Default = {
    render: (args) => _jsx(Template, { ...args }),
};
export const Small = {
    render: (args) => _jsx(Template, { ...args, size: "small" }),
};
export const Large = {
    render: (args) => _jsx(Template, { ...args, size: "large" }),
};
export const Disabled = {
    render: (args) => _jsx(Template, { ...args, disabled: true }),
};
export const DisabledActive = {
    render: (args) => _jsx(Template, { ...args, checked: true, disabled: true }),
};
