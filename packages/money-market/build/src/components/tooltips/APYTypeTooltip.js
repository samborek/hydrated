import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { CircleInfo } from "@galacticcouncil/ui/assets/icons";
import { Tooltip } from "@galacticcouncil/ui/components";
export const APYTypeTooltip = () => (_jsx(Tooltip, { text: _jsxs(_Fragment, { children: ["Allows you to switch between ", _jsx("b", { children: "variable" }), " and ", _jsx("b", { children: "stable" }), " interest rates, where variable rate can increase and decrease depending on the amount of liquidity in the reserve, and stable rate will stay the same for the duration of your loan."] }), children: _jsx(CircleInfo, {}) }));
