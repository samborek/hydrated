import { jsx as _jsx } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { ValueStats } from "./ValueStats";
export default {
    component: ValueStats,
};
const Template = (args) => (_jsx(ValueStats, { label: "Net worth", value: "$1 000 000", ...args }));
export const Small = {
    render: Template,
    args: {
        size: "small",
    },
};
export const Medium = {
    render: Template,
    args: {
        size: "medium",
    },
};
export const Large = {
    render: Template,
    args: {
        size: "large",
    },
};
export const BottomLabel = {
    render: Template,
    args: {
        bottomLabel: "$100 in borrows",
    },
};
export const SecondaryFont = {
    render: Template,
    args: {
        size: "small",
        font: "secondary",
    },
};
