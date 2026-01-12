import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "@galacticcouncil/ui/jsx/jsx-runtime";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { Box } from "@/components/Box";
import { Icon } from "@/components/Icon";
import { ScrollArea } from "@/components/ScrollArea";
import { SSheetBody, SSheetClose, SSheetContent, SSheetHeader, SSheetOverlay, SSheetPaper, SSheetTitle, SSheetTitleContainer, SSheetWrapper, } from "./Sheet.styled";
const SheetRoot = DialogPrimitive.Root;
const SheetTrigger = DialogPrimitive.Trigger;
const SheetPortal = DialogPrimitive.Portal;
const SheetCloseTrigger = DialogPrimitive.Close;
const SheetClose = (props) => {
    return (_jsx(SSheetClose, { asChild: true, align: "right", children: _jsx(DialogPrimitive.Close, { ...props, children: _jsx(Icon, { component: X, size: 20 }) }) }));
};
const SheetOverlay = ({ ref, ...props }) => _jsx(SSheetOverlay, { ref: ref, ...props });
const SheetContent = ({ children, ref, ...props }) => (_jsxs(SheetPortal, { children: [_jsx(SheetOverlay, {}), _jsx(SSheetWrapper, { children: _jsx(SSheetContent, { ref: ref, ...props, children: _jsx(SSheetPaper, { children: children }) }) })] }));
const SheetTitle = ({ children, ref, ...props }) => (_jsx(DialogPrimitive.Title, { ref: ref, asChild: true, ...props, children: _jsx(SSheetTitle, { as: "h2", children: children }) }));
const SheetHeader = ({ title, ...props }) => (_jsx(SSheetHeader, { ...props, children: _jsxs(SSheetTitleContainer, { children: [_jsx(SheetTitle, { children: title || _jsx(_Fragment, { children: "\u00A0" }) }), _jsx(SheetClose, {})] }) }));
const SheetBody = ({ scrollable = true, children, maxHeight, ...props }) => {
    if (scrollable) {
        return (_jsx(ScrollArea, { sx: { flex: 1, height: "auto", minHeight: 0 }, children: _jsx(Box, { maxHeight: maxHeight ?? "calc(75vh - var(--modal-block-offset) * 2)", children: _jsx(SSheetBody, { ...props, children: children }) }) }));
    }
    return (_jsx(SSheetBody, { ...props, maxHeight: maxHeight, children: children }));
};
const Sheet = ({ title, disableInteractOutside = false, children, ...props }) => {
    return (_jsx(SheetRoot, { ...props, children: _jsxs(SheetContent, { onInteractOutside: disableInteractOutside ? (e) => e.preventDefault() : undefined, children: [_jsx(SheetHeader, { title: title }), _jsx(SheetBody, { children: children })] }) }));
};
export { Sheet, SheetBody, SheetClose, SheetCloseTrigger, SheetContent, SheetHeader, SheetOverlay, SheetPortal, SheetRoot, SheetTitle, SheetTrigger, };
