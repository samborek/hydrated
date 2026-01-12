import { jsx as _jsx } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { BasicModal } from "@/components/primitives";
import { TxModalWrapper } from "@/components/transactions/TxModalWrapper";
import { ModalType, useModalContext } from "@/hooks/useModal";
import { CollateralChangeModalContent } from "./CollateralChangeModalContent";
export const CollateralChangeModal = () => {
    const { type, close, args } = useModalContext();
    return (_jsx(BasicModal, { open: type === ModalType.CollateralChange, setOpen: close, title: "Change collateral", children: _jsx(TxModalWrapper, { underlyingAsset: args.underlyingAsset, children: (params) => _jsx(CollateralChangeModalContent, { ...params }) }) }));
};
