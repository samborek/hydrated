import { jsx as _jsx } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { BasicModal } from "@/components/primitives/BasicModal";
import { ModalType, useModalContext } from "@/hooks/useModal";
import { ClaimRewardsModalContent } from "./ClaimRewardsModalContent";
export const ClaimRewardsModal = () => {
    const { type, close } = useModalContext();
    return (_jsx(BasicModal, { open: type === ModalType.ClaimRewards, setOpen: close, title: "Claim Rewards", children: _jsx(ClaimRewardsModalContent, {}) }));
};
