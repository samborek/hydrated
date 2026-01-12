import { jsx as _jsx } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { Flex } from "@/components/Flex";
import { Paper } from "@/components/Paper";
import { ScrollArea } from "./ScrollArea";
export default {
    component: ScrollArea,
};
const tags = Array.from({ length: 50 }).map((_, i, a) => `v1.2.0-beta.${a.length - i}`);
const Template = (args) => (_jsx(Paper, { p: 10, height: 400, width: 400, children: _jsx(ScrollArea, { ...args, children: _jsx(Flex, { gap: 6, direction: args.orientation === "horizontal" ? "row" : "column", children: tags.map((tag) => (_jsx("span", { sx: { whiteSpace: "nowrap" }, children: tag }, tag))) }) }) }));
export const Default = {
    render: Template,
};
export const Horizontal = {
    render: Template,
    args: {
        orientation: "horizontal",
    },
};
export const AlwaysVisible = {
    render: Template,
    args: {
        type: "always",
    },
};
