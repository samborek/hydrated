import { jsx as _jsx, jsxs as _jsxs } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { Alert, Flex, Text, Toggle } from "@galacticcouncil/ui/components";
export const BorrowAmountWarning = ({ className, riskCheckboxAccepted, onRiskCheckboxChange, }) => {
    return (_jsxs("div", { className: className, children: [_jsx(Alert, { variant: "warning", sx: { my: 20 }, description: "Borrowing this amount will reduce your health factor and increase risk\n        of liquidation." }), _jsxs(Flex, { align: "center", as: "label", gap: 10, children: [_jsx(Toggle, { size: "large", checked: riskCheckboxAccepted, onCheckedChange: onRiskCheckboxChange }), _jsx(Text, { fw: 500, children: "I acknowledge the risks involved." })] })] }));
};
