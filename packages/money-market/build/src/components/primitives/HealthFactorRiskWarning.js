import { jsx as _jsx, jsxs as _jsxs } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { Alert, Flex, Text, Toggle, } from "@galacticcouncil/ui/components";
export const HealthFactorRiskWarning = ({ canContinue, message, accepted, onAcceptedChange, isUserConsentRequired, ...props }) => {
    return (_jsx(Flex, { direction: "column", gap: 10, ...props, children: _jsx(Alert, { variant: "warning", description: message, action: canContinue !== false &&
                isUserConsentRequired && (_jsxs(Flex, { align: "center", as: "label", gap: 10, children: [_jsx(Toggle, { size: "large", checked: accepted, onCheckedChange: onAcceptedChange }), _jsx(Text, { fs: "p4", lh: 1.3, fw: 600, children: "I acknowledge the risks involved." })] })) }) }));
};
