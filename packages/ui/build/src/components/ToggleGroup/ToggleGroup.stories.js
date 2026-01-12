import { jsx as _jsx, jsxs as _jsxs } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { BellIcon, BookmarkIcon, MonitorIcon, MoonIcon, SunIcon, ThumbsUpIcon, } from "lucide-react";
import { useState } from "react";
import { ToggleGroup, ToggleGroupItem, } from "./ToggleGroup";
export default {
    component: ToggleGroup,
};
const SingleSelectTemplate = (args) => {
    const [value, setValue] = useState("option1");
    return (_jsxs(ToggleGroup, { type: "single", value: value, onValueChange: setValue, ...args, children: [_jsx(ToggleGroupItem, { value: "option1", children: _jsx(SunIcon, {}) }), _jsx(ToggleGroupItem, { value: "option2", children: _jsx(MoonIcon, {}) }), _jsx(ToggleGroupItem, { value: "option3", children: _jsx(MonitorIcon, {}) })] }));
};
const MultipleSelectTemplate = (args) => {
    const [value, setValue] = useState([]);
    return (_jsxs(ToggleGroup, { type: "multiple", value: value, onValueChange: setValue, ...args, children: [_jsxs(ToggleGroupItem, { value: "option1", children: [_jsx(ThumbsUpIcon, {}), " Like"] }), _jsxs(ToggleGroupItem, { value: "option2", children: [_jsx(BellIcon, {}), " Subscribe"] }), _jsxs(ToggleGroupItem, { value: "option3", children: [_jsx(BookmarkIcon, {}), " Bookmark"] })] }));
};
export const Default = {
    render: SingleSelectTemplate,
};
export const Multiple = {
    render: MultipleSelectTemplate,
};
export const Disabled = {
    render: SingleSelectTemplate,
    args: {
        disabled: true,
    },
};
