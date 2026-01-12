import { jsx as _jsx, jsxs as _jsxs } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { Flex } from "@/components/Flex";
import { Separator } from "./Separator";
export default {
    component: Separator,
};
export const Horizontal = {
    render: () => (_jsxs(Flex, { direction: "column", gap: 20, children: ["Lorem ipsum dolor sit amet consectetur adipisicing elit.", _jsx(Separator, {}), "Culpa, deleniti ad optio sunt eum soluta aspernatur libero error a dolor earum.", _jsx(Separator, {}), "Iusto deserunt veniam nostrum dolorem assumenda excepturi amet nemo."] })),
};
export const Vertical = {
    render: () => (_jsxs(Flex, { gap: 20, width: 800, height: 100, align: "center", children: ["Lorem ipsum dolor sit amet consectetur adipisicing elit.", _jsx(Separator, { orientation: "vertical", sx: { height: 50 } }), "Culpa, deleniti ad optio sunt eum soluta aspernatur libero error a dolor earum.", _jsx(Separator, { orientation: "vertical", sx: { height: 50 } }), "Iusto deserunt veniam nostrum dolorem assumenda excepturi amet nemo."] })),
};
