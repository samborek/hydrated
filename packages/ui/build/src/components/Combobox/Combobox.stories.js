import { jsx as _jsx } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { Combobox } from "@/components/Combobox/Combobox";
export default {
    component: Combobox,
};
export const ComboboxStory = () => {
    return (_jsx(Combobox, { items: [
            {
                key: "item-1",
                label: "Item 1",
            },
            {
                key: "item-2",
                label: "Item 2",
            },
            {
                key: "item-3",
                label: "Item 3",
            },
        ], onSelectionChange: () => { } }));
};
