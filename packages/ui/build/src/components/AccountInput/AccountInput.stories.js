import { jsx as _jsx } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { useState } from "react";
import { Paper } from "@/components";
import { AccountInput } from "./AccountInput";
export default {
    component: AccountInput,
    title: "Components/AccountInput",
};
const Template = (args) => {
    const [value, setValue] = useState(args.value || "");
    return (_jsx(Paper, { p: 20, maxWidth: 500, children: _jsx(AccountInput, { ...args, value: value, onChange: setValue }) }));
};
export const Default = {
    render: Template,
    args: {
        placeholder: "Paste address here...",
    },
};
export const WithValue = {
    render: Template,
    args: {
        value: "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY",
        placeholder: "Paste address here...",
    },
};
export const WithError = {
    render: Template,
    args: {
        value: "0x19912230039c10861946dF36CDe0eFeF09C3894A",
        placeholder: "Paste address here...",
        isError: true,
    },
};
