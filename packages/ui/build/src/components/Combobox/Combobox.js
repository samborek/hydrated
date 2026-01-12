import { jsx as _jsx, jsxs as _jsxs } from "@galacticcouncil/ui/jsx/jsx-runtime";
import * as Popover from "@radix-ui/react-popover";
import { Command } from "cmdk";
import { Check } from "lucide-react";
import { Icon } from "@/components/Icon";
import { SelectCaret, SelectLabel, } from "@/components/Select/Select";
import { SContent, SelectTrigger, SItem, SViewport, } from "@/components/Select/Select.styled";
const ComboboxTrigger = SelectTrigger.withComponent(Popover.PopoverTrigger);
const ComboboxContent = SContent.withComponent(Popover.PopoverContent);
const ComboboxGroup = SViewport.withComponent(Command.Group);
const ComboboxItem = SItem.withComponent(Command.Item);
export const Combobox = ({ label, placeholder, items, selectedItems, className, onSelectionChange, }) => {
    return (_jsxs(Popover.Root, { children: [_jsxs(ComboboxTrigger, { className: className, children: [label && _jsx(SelectLabel, { children: label }), !selectedItems?.length
                        ? placeholder
                        : selectedItems
                            .map((item) => items.find((i) => i.key === item)?.label)
                            .filter(Boolean)
                            .join(", "), _jsx(SelectCaret, {})] }), _jsx(ComboboxContent, { sx: { minWidth: "var(--radix-popover-trigger-width)" }, children: _jsx(Command, { children: _jsx(Command.List, { children: _jsx(ComboboxGroup, { children: items.map((item) => {
                                const isSelected = selectedItems?.includes(item.key);
                                return (_jsxs(ComboboxItem, { value: item.key, onSelect: () => {
                                        onSelectionChange(isSelected
                                            ? (selectedItems?.filter((key) => key !== item.key) ??
                                                [])
                                            : [...(selectedItems ?? []), item.key]);
                                    }, children: [item.label, isSelected && _jsx(Icon, { size: 12, component: Check })] }, item.key));
                            }) }) }) }) })] }));
};
