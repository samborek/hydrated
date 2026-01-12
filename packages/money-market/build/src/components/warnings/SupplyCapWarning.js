import { jsx as _jsx } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { Alert } from "@galacticcouncil/ui/components";
export const SupplyCapWarning = ({ supplyCap, className, }) => {
    // Don't show a warning when less than 98% utilized
    if (!supplyCap.percentUsed || supplyCap.percentUsed < 98)
        return null;
    return (_jsx(Alert, { className: className, variant: "warning", description: supplyCap.isMaxed
            ? "Protocol supply cap is at 100% for this asset. Further supply unavailable."
            : `Maximum amount available to supply is limited because protocol supply cap is at ${supplyCap.percentUsed.toFixed(2)}%.` }));
};
