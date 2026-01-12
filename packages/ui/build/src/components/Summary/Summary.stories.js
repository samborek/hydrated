import { jsx as _jsx } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { Toggle } from "@/components";
import { Summary } from "./Summary";
export default {
    component: Summary,
};
export const Default = {
    render: Summary,
    args: {
        rows: [
            {
                label: "Transaction cost",
                content: "$1.00",
            },
            {
                label: "Transaction expiration",
                content: "13/05/2025 17:42:54",
            },
            {
                label: "Nonce",
                content: "124",
            },
            {
                label: "Tip block author",
                content: _jsx(Toggle, { checked: true, onCheckedChange: () => { } }),
            },
        ],
    },
};
