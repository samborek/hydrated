import { jsx as _jsx, jsxs as _jsxs } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { BadgeDollarSign, ChevronDown } from "@galacticcouncil/ui/assets/icons";
import { ButtonTransparent, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, Icon, MenuItemLabel, MenuSelectionItem, } from "@galacticcouncil/ui/components";
import { getToken } from "@galacticcouncil/ui/utils";
import { useMemo, useState } from "react";
import { ReserveLogo } from "@/components/primitives/ReserveLogo";
const ClaimRewardsSelectItem = ({ label, icon, onClick, isTrigger = false, }) => (_jsxs(MenuSelectionItem, { onClick: onClick, sx: { display: "flex", alignItems: "center" }, children: [icon, _jsx(MenuItemLabel, { children: label }), isTrigger && _jsx(Icon, { size: 18, component: ChevronDown })] }));
export const ClaimRewardsSelect = ({ rewards = [], selectedReward, setSelectedReward, }) => {
    const [open, setOpen] = useState(false);
    const selectItems = useMemo(() => {
        return [
            {
                key: "all",
                label: "Claim all rewards",
                icon: (_jsx(Icon, { size: 24, color: getToken("accents.info.onPrimary"), component: BadgeDollarSign })),
            },
            ...rewards.map((reward) => ({
                key: reward.symbol,
                label: reward.symbol,
                icon: _jsx(ReserveLogo, { address: reward.rewardTokenAddress }),
            })),
        ];
    }, [rewards]);
    const selectedItem = selectItems.find(({ key }) => key === selectedReward);
    return (_jsxs(DropdownMenu, { open: open, onOpenChange: setOpen, children: [_jsx(DropdownMenuTrigger, { asChild: true, children: selectedItem && (_jsx(ButtonTransparent, { sx: {
                        bg: getToken("details.separators"),
                        borderRadius: "lg",
                    }, children: _jsx(ClaimRewardsSelectItem, { ...selectedItem, isTrigger: true }) })) }), _jsx(DropdownMenuContent, { align: "end", children: selectItems.map((item) => (_jsx(DropdownMenuItem, { asChild: true, children: _jsx(ClaimRewardsSelectItem, { ...item, onClick: () => {
                            setSelectedReward(item.key);
                            setOpen(false);
                        } }) }, item.key))) })] }));
};
