import { jsx as _jsx, jsxs as _jsxs } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { Settings } from "@galacticcouncil/ui/assets/icons";
import { Button, Icon } from "@galacticcouncil/ui/components";
import { getEmodeMessage } from "@/components/transactions/emode/emode.utils";
import { EmodeModalType } from "@/components/transactions/emode/EmodeModalContent";
import { useAppDataContext } from "@/hooks/app-data-provider/useAppDataProvider";
import { useModalContext } from "@/hooks/useModal";
export const ManageEmodeButton = ({ className, }) => {
    const { openEmode } = useModalContext();
    const { user, eModes } = useAppDataContext();
    const isEModeDisabled = user.userEmodeCategoryId === 0;
    return (_jsxs(Button, { size: "small", variant: isEModeDisabled ? "tertiary" : "secondary", outline: isEModeDisabled, disabled: !user, className: className, onClick: () => openEmode(isEModeDisabled ? EmodeModalType.ENABLE : EmodeModalType.SWITCH), children: [isEModeDisabled
                ? "Disabled"
                : getEmodeMessage(eModes[user.userEmodeCategoryId]?.label), _jsx(Icon, { mr: -4, size: 14, component: Settings })] }));
};
