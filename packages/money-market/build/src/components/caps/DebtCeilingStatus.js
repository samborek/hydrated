import { jsx as _jsx, jsxs as _jsxs } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { CircleInfo } from "@galacticcouncil/ui/assets/icons";
import { ProgressBar, Text, Tooltip } from "@galacticcouncil/ui/components";
import { useAppFormatters } from "@/hooks/app-data-provider/useAppFormatters";
export const DebtCeilingStatus = ({ debt, ceiling, usageData, className, }) => {
    const { formatCurrency } = useAppFormatters();
    const determineColor = () => {
        if (usageData.isMaxed || usageData.percentUsed >= 99.99) {
            return "red400";
        }
        else if (usageData.percentUsed >= 98) {
            return "warning300";
        }
        else {
            return "green400";
        }
    };
    return (_jsxs("div", { className: className, children: [_jsxs("div", { sx: { flex: "row", justify: "space-between", align: "center" }, children: [_jsxs("div", { sx: { flex: "row", align: "center" }, children: [_jsx(Text, { fs: 13, color: "basic400", children: _jsx("span", { children: "Isolated Debt Ceiling" }) }), _jsx(Tooltip, { text: _jsx("span", { sx: { color: "white" }, children: _jsx("span", { children: "Debt ceiling limits the amount possible to borrow against this asset by protocol users. Debt ceiling is specific to assets in isolation mode and is denoted in USD." }) }), children: _jsx(CircleInfo, {}) })] }), _jsxs(Text, { fs: 14, children: [formatCurrency(Number(debt)), _jsx("span", { sx: { display: "inline-block", mx: 4 }, children: "of" }), formatCurrency(Number(ceiling))] })] }), _jsx(ProgressBar, { size: "small", color: determineColor(), value: usageData.percentUsed <= 1 ? 1 : usageData.percentUsed })] }));
};
