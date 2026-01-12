import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { ArrowRight } from "@galacticcouncil/ui/assets/icons";
import { Flex, Icon, Skeleton, Text, } from "@galacticcouncil/ui/components";
import { getToken } from "@galacticcouncil/ui/utils";
import Big from "big.js";
import { HealthFactorNumber } from "@/components/primitives/HealthFactorNumber";
import { HEALTH_FACTOR_RISK_THRESHOLD } from "@/ui-config/misc";
export const HealthFactorChange = ({ healthFactor, futureHealthFactor, loading = false, fontSize, ...props }) => {
    if (healthFactor === "-1" && futureHealthFactor === "-1")
        return null;
    const visibleChange = Big(healthFactor).toFixed(2, Big.roundDown) !==
        Big(futureHealthFactor).toFixed(2, Big.roundDown);
    const isBelowRiskThreshold = Big(healthFactor).lt(HEALTH_FACTOR_RISK_THRESHOLD);
    return (_jsxs(Flex, { direction: "column", align: "flex-end", ...props, children: [_jsx(Flex, { gap: 4, direction: "row", align: "center", justify: "flex-end", children: loading ? (_jsx(Skeleton, { height: "1em", width: 80 })) : (_jsxs(_Fragment, { children: [_jsx(HealthFactorNumber, { value: healthFactor, fontSize: fontSize }), visibleChange && (_jsxs(_Fragment, { children: [_jsx(Icon, { size: 14, component: ArrowRight }), _jsx(HealthFactorNumber, { fontSize: fontSize, value: isNaN(Number(futureHealthFactor))
                                        ? healthFactor
                                        : futureHealthFactor })] }))] })) }), isBelowRiskThreshold && (_jsx(Text, { fs: 11, lh: 1, color: getToken("text.low"), mt: -2, children: "Liquidation at <1.0" }))] }));
};
