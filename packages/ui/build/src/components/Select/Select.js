import { jsx as _jsx, jsxs as _jsxs } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { ItemText, Root, Trigger, Value, } from "@radix-ui/react-select";
import { CaretDown } from "@/assets/icons";
import { getToken } from "@/utils";
import { Icon } from "../Icon";
import { Text } from "../Text";
import { SContent, SelectTrigger, SItem, SViewport } from "./Select.styled";
export const Select = ({ label, placeholder, items, renderTrigger, ...props }) => {
    return (_jsxs(Root, { ...props, children: [renderTrigger ? (_jsx(Trigger, { sx: { cursor: "pointer" }, children: renderTrigger() })) : (_jsxs(SelectTrigger, { children: [label && _jsx(SelectLabel, { children: label }), _jsx(Value, { placeholder: placeholder }), _jsx(SelectCaret, {})] })), _jsx(SContent, { sideOffset: 6, align: "center", position: "popper", children: _jsx(SViewport, { children: items.map((item) => (_jsx(SItem, { value: item.key, children: _jsx(ItemText, { children: item.label }) }, item.key))) }) })] }));
};
export const SelectLabel = ({ children }) => (_jsx(Text, { fs: 12, fw: 600, color: getToken("text.medium"), children: children }));
export const SelectCaret = () => (_jsx(Icon, { size: 8, component: CaretDown, color: getToken("colors.greys.400") }));
