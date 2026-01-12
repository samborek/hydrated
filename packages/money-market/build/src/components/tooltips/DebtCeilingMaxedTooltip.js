import { jsx as _jsx, Fragment as _Fragment } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { CircleInfo } from "@galacticcouncil/ui/assets/icons";
import { Tooltip } from "@galacticcouncil/ui/components";
export const DebtCeilingMaxedTooltip = ({ debtCeiling, }) => {
    if (!debtCeiling || !debtCeiling.isMaxed)
        return null;
    return (_jsx(Tooltip, { text: _jsx(_Fragment, { children: "Protocol debt ceiling is at 100% for this asset. Futher borrowing against this asset is unavailable." }), children: _jsx(CircleInfo, {}) }));
};
