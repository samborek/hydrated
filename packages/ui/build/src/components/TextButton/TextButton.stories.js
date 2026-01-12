import { jsx as _jsx } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { TextButton } from "./TextButton";
export default {
    component: TextButton,
};
const Template = (args) => (_jsx(TextButton, { ...args, children: "More info" }));
export const Default = {
    render: Template,
};
export const Underline = {
    render: Template,
    args: {
        variant: "underline",
    },
};
export const UnderlineInternal = {
    render: Template,
    args: {
        variant: "underline",
        direction: "internal",
    },
};
export const UnderlineExternal = {
    render: Template,
    args: {
        variant: "underline",
        direction: "external",
    },
};
