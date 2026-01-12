import { jsx as _jsx, jsxs as _jsxs } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { CheckIcon, XIcon } from "@/assets/icons";
import { Flex } from "@/components/Flex";
import { Paper } from "@/components/Paper";
import { VirtualizedList } from "./VirtualizedList";
export default {
    component: VirtualizedList,
};
const items = Array.from({ length: 1000 }).map((_, i) => ({
    name: `Item ${i}`,
    checked: i % 3 === 0,
}));
const Template = (args) => (_jsx(Paper, { width: 400, p: 10, children: _jsx(VirtualizedList, { ...args, items: items, height: 400, itemSize: 36, renderItem: (item) => (_jsxs(Flex, { align: "center", gap: 10, p: 6, children: [item.checked ? (_jsx(CheckIcon, { sx: { color: "lime" } })) : (_jsx(XIcon, { sx: { color: "red" } })), item.name] })) }) }));
export const Default = {
    render: Template,
};
export const WithInitialScrollIndex = {
    render: Template,
    args: {
        initialScrollIndex: 500,
    },
};
