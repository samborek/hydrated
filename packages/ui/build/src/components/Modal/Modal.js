import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "@galacticcouncil/ui/jsx/jsx-runtime";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { ArrowLeft, X } from "lucide-react";
import { createContext, useContext, useMemo } from "react";
import { Box } from "@/components/Box";
import { DrawerContent, DrawerHeader, DrawerRoot } from "@/components/Drawer";
import { Icon } from "@/components/Icon";
import { ScrollArea } from "@/components/ScrollArea";
import { useBreakpoints } from "@/theme";
import { Paper } from "../Paper";
import { SModalBody, SModalContent, SModalContentDivider, SModalDescription, SModalFooter, SModalHeader, SModalHeaderButton, SModalOverlay, SModalPaper, SModalTitle, SModalTitleContainer, SModalTopContent, SModalWrapper, } from "./Modal.styled";
const ModalContext = createContext({
    variant: "auto",
});
const ModalRoot = DialogPrimitive.Root;
const ModalTrigger = DialogPrimitive.Trigger;
const ModalPortal = DialogPrimitive.Portal;
const ModalCloseTrigger = DialogPrimitive.Close;
const ModalOverlay = (props) => _jsx(SModalOverlay, { ref: props.ref, ...props });
const ModalContent = ({ children, ref, topContent, forceMount, animationDurationMs, ...props }) => (_jsxs(ModalPortal, { forceMount: forceMount, children: [_jsx(ModalOverlay, { animationDurationMs: animationDurationMs }), _jsx(SModalWrapper, { onClick: (e) => e.stopPropagation(), animationDurationMs: animationDurationMs, children: _jsxs(SModalContent, { ref: ref, ...props, hasTopContent: !!topContent, children: [topContent && _jsx(SModalTopContent, { children: topContent }), _jsx(SModalPaper, { children: children })] }) })] }));
const ModalTitle = ({ children, ref, ...props }) => (_jsx(DialogPrimitive.Title, { ref: ref, asChild: true, ...props, children: _jsx(SModalTitle, { as: "h2", children: children }) }));
const ModalDescription = ({ children, ref, ...props }) => (_jsx(DialogPrimitive.Description, { ref: ref, asChild: true, ...props, children: _jsx(SModalDescription, { children: children }) }));
const ModalClose = (props) => {
    return (_jsx(SModalHeaderButton, { asChild: true, align: "right", children: _jsx(DialogPrimitive.Close, { ...props, children: _jsx(Icon, { component: X, size: 20 }) }) }));
};
const ModalHeader = ({ title, description, customDescription, align = "default", customHeader, customTitle, onBack, closable = true, ...props }) => {
    const { variant } = useContext(ModalContext);
    if (variant === "drawer") {
        return (_jsx(DrawerHeader, { title: title, description: description, customDescription: customDescription, customHeader: customHeader, customTitle: customTitle }));
    }
    return (_jsxs(SModalHeader, { ...props, children: [_jsxs(SModalTitleContainer, { children: [onBack && (_jsx(SModalHeaderButton, { onClick: onBack, align: "left", children: _jsx(Icon, { component: ArrowLeft, size: 18 }) })), customTitle ? (_jsxs(_Fragment, { children: [_jsx(VisuallyHidden.Root, { children: _jsx(ModalTitle, { children: title }) }), customTitle] })) : (_jsx(ModalTitle, { sx: {
                            textAlign: align === "center" ? "center" : "left",
                            pr: 40,
                            pl: align === "default" && !onBack ? 0 : 40,
                        }, children: title })), closable && _jsx(ModalClose, {})] }), customDescription ? (_jsxs(_Fragment, { children: [description && (_jsx(VisuallyHidden.Root, { children: _jsx(ModalDescription, { children: description }) })), customDescription] })) : (description && (_jsx(ModalDescription, { sx: { textAlign: align === "center" ? "center" : "left" }, children: description }))), customHeader] }));
};
const ModalBody = ({ scrollable = true, children, maxHeight, ...props }) => {
    if (scrollable) {
        return (_jsx(ScrollArea, { sx: { flex: 1, height: "auto", minHeight: 0 }, children: _jsx(Box, { maxHeight: maxHeight ?? "calc(75vh - var(--modal-block-offset) * 2)", children: _jsx(SModalBody, { ...props, children: children }) }) }));
    }
    return (_jsx(SModalBody, { ...props, maxHeight: maxHeight, children: children }));
};
const ModalFooter = (props) => _jsx(SModalFooter, { ...props });
const Modal = ({ children, variant = "auto", disableInteractOutside = false, topContent, animationDurationMs, ...props }) => {
    const { gte } = useBreakpoints();
    const isDrawer = variant === "auto" ? !gte("md") : variant === "drawer";
    const context = useMemo(() => ({ variant }), [variant]);
    if (isDrawer) {
        return (_jsx(ModalContext.Provider, { value: context, children: _jsx(DrawerRoot, { ...props, children: _jsx(DrawerContent, { onInteractOutside: disableInteractOutside ? (e) => e.preventDefault() : undefined, children: children }) }) }));
    }
    return (_jsx(ModalContext.Provider, { value: context, children: _jsx(ModalRoot, { ...props, children: _jsx(ModalContent, { ...props, animationDurationMs: animationDurationMs, onClick: (e) => e.stopPropagation(), topContent: topContent, onInteractOutside: disableInteractOutside ? (e) => e.preventDefault() : undefined, children: children }) }) }));
};
const ModalContainer = ({ children, className, ...props }) => (_jsx(ModalRoot, { ...props, modal: false, children: _jsx(SModalContent, { sx: { position: "unset" }, className: className, children: _jsx(Paper, { children: children }) }) }));
const ModalContentDivider = SModalContentDivider;
export { Modal, ModalBody, ModalClose, ModalCloseTrigger, ModalContainer, ModalContent, ModalContentDivider, ModalDescription, ModalFooter, ModalHeader, ModalOverlay, ModalPortal, ModalRoot, ModalTitle, ModalTrigger, };
