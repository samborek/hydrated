import { jsx as _jsx } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { Box } from "../Box";
import { Slider } from "./Slider";
export default {
    component: Slider,
};
const Template = (args) => (_jsx(Box, { width: "500px", children: _jsx(Slider, { ...args }) }));
export const Default = {
    render: (args) => _jsx(Template, { ...args }),
};
