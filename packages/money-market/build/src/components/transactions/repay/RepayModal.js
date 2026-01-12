import { jsx as _jsx } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { PERMISSION } from "@aave/contract-helpers";
import { BasicModal } from "@/components/primitives/BasicModal";
import { TxModalWrapper } from "@/components/transactions/TxModalWrapper";
import { ModalType, useModalContext } from "@/hooks/useModal";
import { RepayModalContent } from "./RepayModalContent";
export const RepayModal = () => {
    const { type, close, args } = useModalContext();
    return (_jsx(BasicModal, { open: type === ModalType.Repay, setOpen: close, title: "Repay", children: _jsx(TxModalWrapper, { underlyingAsset: args.underlyingAsset, requiredPermission: PERMISSION.BORROWER, children: (params) => (_jsx(RepayModalContent, { ...params, debtType: args.currentRateMode })) }) }));
};
