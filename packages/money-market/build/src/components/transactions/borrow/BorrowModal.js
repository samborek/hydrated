import { jsx as _jsx } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { PERMISSION } from "@aave/contract-helpers";
import { BasicModal } from "@/components/primitives/BasicModal";
import { GhoBorrowModalContent } from "@/components/transactions/borrow/GhoBorrowModalContent";
import { TxModalWrapper } from "@/components/transactions/TxModalWrapper";
import { ModalType, useModalContext } from "@/hooks/useModal";
import { useProtocolDataContext } from "@/hooks/useProtocolDataContext";
import { useRootStore } from "@/store/root";
import { BorrowModalContent } from "./BorrowModalContent";
export const BorrowModal = () => {
    const displayGho = useRootStore((store) => store.displayGho);
    const { type, close, args } = useModalContext();
    const { currentMarket } = useProtocolDataContext();
    return (_jsx(BasicModal, { open: type === ModalType.Borrow, setOpen: close, title: "Borrow", children: _jsx(TxModalWrapper, { action: "borrow", underlyingAsset: args.underlyingAsset, requiredPermission: PERMISSION.BORROWER, children: (params) => displayGho({ symbol: params.symbol, currentMarket }) ? (_jsx(GhoBorrowModalContent, { ...params })) : (_jsx(BorrowModalContent, { ...params })) }) }));
};
