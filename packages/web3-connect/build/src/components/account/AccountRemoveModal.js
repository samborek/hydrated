import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { Button, ModalBody, ModalFooter, ModalHeader, } from "@galacticcouncil/ui/components";
export const AccountRemoveModal = ({ align = "default", onDelete, onCancel, onBack, }) => {
    return (_jsxs(_Fragment, { children: [_jsx(ModalHeader, { title: "Remove address", onBack: onBack, align: align }), _jsx(ModalBody, { sx: { textAlign: align === "default" ? "left" : "center" }, children: "Are you sure you want to remove this account address?" }), _jsxs(ModalFooter, { justify: "space-between", children: [_jsx(Button, { variant: "secondary", onClick: onCancel, children: "Cancel" }), _jsx(Button, { variant: "primary", onClick: () => onDelete?.(), children: "Yes, remove" })] })] }));
};
