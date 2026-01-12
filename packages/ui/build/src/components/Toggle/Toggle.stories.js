import { jsx as _jsx } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { useState } from "react";
import { Toggle } from "./Toggle";
export default {
    component: Toggle,
};
const Template = (args) => {
    const [value, setValue] = useState(args.checked);
    return _jsx(Toggle, { ...args, checked: value, onCheckedChange: setValue });
};
export const Default = {
    render: (args) => _jsx(Template, { ...args }),
};
export const Large = {
    render: (args) => _jsx(Template, { ...args }),
    args: { size: "large" },
};
export const Active = {
    render: (args) => _jsx(Template, { ...args }),
    args: { checked: true },
};
export const Disabled = {
    render: (args) => _jsx(Template, { ...args }),
    args: { disabled: true },
};
export const DisabledActive = {
    render: (args) => _jsx(Template, { ...args, checked: true }),
    args: { disabled: true },
};
