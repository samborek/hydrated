import { jsx as _jsx } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { Paper } from "@/components/Paper";
import { JsonView } from "./JsonView";
export default {
    component: JsonView,
};
const EXAMPLE_JSON = {
    string: "lorem ipsum dolor sit amet, consectetur adipiscing elit. sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    number: 123456,
    boolean: false,
    null: null,
    array: ["string", 123456, false, null],
    object: {
        k1: 123,
        k2: "123",
        k3: false,
    },
};
const Template = (args) => {
    return (_jsx(Paper, { p: 20, children: _jsx(JsonView, { src: EXAMPLE_JSON, ...args }) }));
};
export const Default = {
    render: Template,
};
export const CustomFontSize = {
    render: Template,
    args: {
        fs: [10, null, 20],
    },
};
