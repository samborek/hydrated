import { jsx as _jsx, Fragment as _Fragment } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { CircleInfo } from "@galacticcouncil/ui/assets/icons";
import { Tooltip } from "@galacticcouncil/ui/components";
export const ApprovalTooltip = () => (_jsx(Tooltip, { text: _jsx(_Fragment, { children: "To continue, you need to grant Hydration smart contracts permission to move your funds from your wallet. Depending on the asset and wallet you use, it is done by signing the permission message (gas free), or by submitting an approval transaction (requires gas)." }), children: _jsx(CircleInfo, {}) }));
