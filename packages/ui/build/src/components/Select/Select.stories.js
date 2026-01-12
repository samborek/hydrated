import { jsx as _jsx } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { Select } from "./Select";
const items = [
    { key: "0", label: "hydra" },
    { key: "1", label: "polkadot" },
    { key: "2", label: "moonbeam" },
    { key: "3", label: "astar" },
];
export default {
    component: Select,
};
const Template = (args) => _jsx(Select, { ...args, items: items });
export const Default = {
    render: (args) => (_jsx(Template, { placeholder: "Select chain", label: "Chain:", ...args })),
};
