import { jsx as _jsx } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { Provider as TooltipProvider } from "@radix-ui/react-tooltip";
import { Tooltip } from "./Tooltip";
export default {
    component: Tooltip,
};
const Template = (args) => (_jsx(TooltipProvider, { delayDuration: 0, children: _jsx(Tooltip, { ...args }) }));
export const Default = {
    render: (args) => (_jsx(Template, { ...args, text: "Some short explanation of the feature here " })),
};
