import { jsx as _jsx, jsxs as _jsxs } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { SettingsIcon } from "lucide-react";
import { IconPlaceholder } from "@/assets/icons";
import { MenuItem, MenuItemDescription, MenuItemIcon, MenuItemLabel, MenuSelectionItem, MenuSelectionItemArrow, } from "@/components/Menu";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, } from "./DropdownMenu.styled";
export default {
    title: "components/DropdownMenu",
};
export const DropdownMenuStory = () => {
    return (_jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { children: _jsx(SettingsIcon, { size: 21 }) }), _jsxs(DropdownMenuContent, { fullWidth: true, children: [_jsx(DropdownMenuItem, { asChild: true, children: _jsxs(MenuSelectionItem, { children: [_jsx(MenuItemIcon, { component: IconPlaceholder }), _jsx(MenuItemLabel, { children: "Item 1" }), _jsx(MenuSelectionItemArrow, {})] }) }), _jsx(DropdownMenuItem, { asChild: true, children: _jsxs(MenuItem, { children: [_jsx(MenuItemIcon, { component: IconPlaceholder }), _jsx(MenuItemLabel, { children: "Item 2" }), _jsx(MenuItemDescription, { children: "Description" })] }) }), _jsx(DropdownMenuItem, { asChild: true, children: _jsx(MenuItem, { children: _jsx(MenuItemLabel, { children: "Item 3" }) }) })] })] }));
};
