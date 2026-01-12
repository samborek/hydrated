import { jsx as _jsx } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { BasicModal } from "@/components/primitives";
import { ModalType, useModalContext } from "@/hooks/useModal";
import { EmodeModalContent } from "./EmodeModalContent";
export const EmodeModal = () => {
    const { type, close, args } = useModalContext();
    return (_jsx(BasicModal, { open: type === ModalType.Emode, setOpen: close, title: "Manage E-Mode", children: _jsx(EmodeModalContent, { mode: args.emode }) }));
};
