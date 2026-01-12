import { jsx as _jsx } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { Alert } from "@galacticcouncil/ui/components";
export const BorrowCapWarning = ({ borrowCap, className, }) => {
    // Don't show a warning when less than 98% utilized
    if (!borrowCap.percentUsed || borrowCap.percentUsed < 98)
        return null;
    return (_jsx(Alert, { className: className, variant: "warning", description: borrowCap.isMaxed
            ? "Protocol borrow cap is at 100% for this asset. Further borrowing unavailable."
            : "Maximum amount available to borrow is limited because protocol borrow cap is nearly reached." }));
};
