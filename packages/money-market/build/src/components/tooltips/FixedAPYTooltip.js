import { jsx as _jsx } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { CircleInfo } from "@galacticcouncil/ui/assets/icons";
import { Tooltip } from "@galacticcouncil/ui/components";
import { GHO_SYMBOL } from "@/utils/ghoUtilities";
export const FixedAPYTooltip = () => {
    return (_jsx(Tooltip, { text: `This rate may be changed over time depending on the need for the ${GHO_SYMBOL} supply to contract/expand.`, children: _jsx(CircleInfo, {}) }));
};
