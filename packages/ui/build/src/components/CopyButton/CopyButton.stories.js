import { jsx as _jsx } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { Button } from "@/components/Button";
import { CopyButton } from "./CopyButton";
export default { component: CopyButton };
const Template = (args) => (_jsx(CopyButton, { text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", ...args }));
export const DefaultWithReset = {
    render: Template,
};
export const WithoutReset = {
    render: Template,
    args: {
        delay: 0,
    },
};
export const AsStyledButton = {
    render: () => (_jsx(Button, { asChild: true, size: "large", children: _jsx(Template, {}) })),
};
