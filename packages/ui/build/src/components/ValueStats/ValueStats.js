import { jsx as _jsx, jsxs as _jsxs } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { SValueStats, SValueStatsBottomValue, SValueStatsLabel, SValueStatsValue, SValueStatsValueContainer, } from "@/components/ValueStats/ValueStats.styled";
import { useResponsiveValue } from "@/styles/media";
import { Skeleton } from "../Skeleton";
export const ValueStatsLabel = SValueStatsLabel;
export const ValueStatsValue = SValueStatsValue;
export const ValueStatsBottomValue = SValueStatsBottomValue;
export const ValueStats = ({ font = "primary", wrap, size, label, customLabel, value, customValue, bottomLabel, customBottomLabel, isLoading, className, }) => {
    const shouldWrap = useResponsiveValue(wrap, false);
    return (_jsxs(SValueStats, { shouldWrap: shouldWrap, size: size, className: className, children: [customLabel ?? _jsx(SValueStatsLabel, { children: label }), _jsxs(SValueStatsValueContainer, { size: size, children: [isLoading ? (_jsx(SValueStatsValue, { font: font, size: size, children: _jsx(Skeleton, { width: 120, height: "100%" }) })) : ((customValue ?? (_jsx(SValueStatsValue, { font: font, size: size, children: value })))), isLoading && (bottomLabel || customBottomLabel) ? (_jsx(SValueStatsBottomValue, { children: _jsx(Skeleton, { width: 120, height: "100%" }) })) : ((customBottomLabel ?? (_jsx(SValueStatsBottomValue, { children: bottomLabel }))))] })] }));
};
