import { jsx as _jsx, Fragment as _Fragment } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { CircleInfo } from "@galacticcouncil/ui/assets/icons";
import { Tooltip } from "@galacticcouncil/ui/components";
export const BorrowCapMaxedTooltip = ({ borrowCap, }) => {
    if (!borrowCap || !borrowCap.isMaxed)
        return null;
    return (_jsx(Tooltip, { text: _jsx(_Fragment, { children: "Protocol borrow cap at 100% for this asset. Further borrowing unavailable." }), children: _jsx(CircleInfo, {}) }));
};
