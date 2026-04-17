import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { Portal, Root, Trigger, } from "@radix-ui/react-tooltip";
import { useState } from "react";
import { CircleInfo } from "@/assets/icons";
import { ButtonIcon } from "../Button";
import { DrawerHeader } from "../Drawer";
import { Icon } from "../Icon";
import { Modal, ModalBody } from "../Modal";
import { Text } from "../Text";
import { useBreakpoints } from "../../theme";
import { getToken } from "@/utils";
import { SContent, STrigger } from "./Tooltip.styled";
export const Tooltip = ({ text, children, side = "bottom", align = "center", sideOffset = 3, alignOffset = -10, asChild = false, preventDefault, iconColor, }) => {
    const [open, setOpen] = useState(false);
    const { isMobile } = useBreakpoints();
    if (isMobile) {
        return (_jsxs(_Fragment, { children: [_jsx(ButtonIcon, { asChild: asChild, onClick: (e) => {
                        if (preventDefault) {
                            e.preventDefault();
                            e.stopPropagation();
                        }
                        setOpen(true);
                    }, onPointerDown: (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                    }, sx: { p: 0, height: "auto", width: "auto" }, children: children || _jsx(TooltipIcon, { color: iconColor }) }), _jsxs(Modal, { open: open, onOpenChange: setOpen, children: [_jsx(DrawerHeader, { customTitle: " ", title: "Tooltip", sx: { borderBottom: "none" } }), _jsx(ModalBody, { children: text })] })] }));
    }
    const TriggerComp = asChild ? Trigger : STrigger;
    return (_jsxs(Root, { delayDuration: 0, open: open, onOpenChange: setOpen, children: [_jsx(TriggerComp, { type: "button", asChild: asChild, onClick: (e) => {
                    if (preventDefault) {
                        e.preventDefault();
                        e.stopPropagation();
                    }
                    setOpen(true);
                }, onPointerDown: (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                }, children: children || _jsx(TooltipIcon, { color: iconColor }) }), _jsx(Portal, { children: _jsx(SContent, { side: side, align: align, sideOffset: sideOffset, alignOffset: alignOffset, collisionPadding: 12, children: typeof text === "string" ? (_jsx(Text, { fw: 500, fs: 12, children: text })) : (text) }) })] }));
};
export const TooltipIcon = (props) => (_jsx(Icon, { sx: { cursor: "pointer" }, component: CircleInfo, size: 14, color: getToken("icons.onContainer"), ...props }));
