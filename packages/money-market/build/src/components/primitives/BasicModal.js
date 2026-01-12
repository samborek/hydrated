import { jsx as _jsx, jsxs as _jsxs } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { Modal, ModalBody, ModalHeader } from "@galacticcouncil/ui/components";
export const BasicModal = ({ title, open, setOpen, children, }) => {
    const handleClose = () => setOpen(false);
    return (_jsxs(Modal, { open: open, onOpenChange: handleClose, disableInteractOutside: true, children: [_jsx(ModalHeader, { title: title }), _jsx(ModalBody, { children: children })] }));
};
