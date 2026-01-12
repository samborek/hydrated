import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { Flex, Separator, Stack, Text, Tooltip, } from "@galacticcouncil/ui/components";
import { getToken } from "@galacticcouncil/ui/utils";
import { Big } from "big.js";
import { useState } from "react";
import { ReserveLogo } from "@/components/primitives/ReserveLogo";
import { useAppFormatters } from "@/hooks/app-data-provider/useAppFormatters";
import { SContainer } from "./IncentivesButton.styled";
export const IncentivesButton = ({ incentives = [], symbol, }) => {
    const { formatPercent } = useAppFormatters();
    const [open, setOpen] = useState(false);
    if (!incentives.length) {
        return null;
    }
    const isIncentivesInfinity = incentives.some((incentive) => incentive.incentiveAPR === "Infinity");
    const incentivesAPRSum = isIncentivesInfinity
        ? "Infinity"
        : incentives.reduce((aIncentive, bIncentive) => aIncentive + +bIncentive.incentiveAPR, 0);
    const incentivesNetAPR = isIncentivesInfinity
        ? "Infinity"
        : incentivesAPRSum !== "Infinity"
            ? Big(incentivesAPRSum || 0).toNumber()
            : "Infinity";
    if (incentivesNetAPR === 0) {
        return null;
    }
    const incentivesButtonValue = () => {
        if (incentivesNetAPR !== "Infinity") {
            return (_jsx(Text, { color: getToken("text.medium"), fs: 11, children: formatPercent(incentivesNetAPR * 100) }));
        }
        else {
            return (_jsx(Text, { fs: 11, color: getToken("text.medium"), children: "\u221E" }));
        }
    };
    return (_jsx(Tooltip, { asChild: true, text: _jsx(IncentivesTooltipContent, { incentives: incentives, incentivesNetAPR: incentivesNetAPR, symbol: symbol }), children: _jsxs(SContainer, { onClick: () => {
                setOpen(!open);
            }, children: [_jsx("div", { sx: { mr: 4 }, children: incentivesButtonValue() }), _jsx(Flex, { children: incentives.map((incentive) => (_jsx(ReserveLogo, { address: incentive.rewardTokenAddress, size: "extra-small", sx: { ml: -3 } }, incentive.rewardTokenSymbol))) })] }) }));
};
export const IncentivesTooltipContent = ({ incentives, incentivesNetAPR, symbol, }) => {
    const { formatPercent } = useAppFormatters();
    const FormattedNumber = ({ incentiveAPR, }) => {
        return (_jsx(Flex, { align: "center", gap: 4, children: incentiveAPR !== "Infinity" ? (_jsxs(_Fragment, { children: [_jsx(Text, { children: formatPercent(Number(incentiveAPR) * 100) }), _jsx(Text, { children: "APR" })] })) : (_jsxs(_Fragment, { children: [_jsx(Text, { children: "\u221E %" }), _jsx(Text, { children: "APR" })] })) }));
    };
    return (_jsxs(Flex, { direction: "column", children: [_jsxs(Text, { mb: 8, children: ["Participating in this ", symbol, " reserve gives annualized rewards."] }), _jsxs(Stack, { gap: 6, children: [incentives.map((incentive) => (_jsxs(Flex, { align: "center", justify: "space-between", children: [_jsxs(Flex, { align: "center", gap: 6, children: [_jsx(ReserveLogo, { address: incentive.rewardTokenAddress, size: "small" }), _jsx(Text, { children: incentive.rewardTokenSymbol })] }), _jsx(FormattedNumber, { incentiveAPR: incentive.incentiveAPR })] }, incentive.rewardTokenAddress))), incentives.length > 1 && (_jsxs(_Fragment, { children: [_jsx(Separator, { sx: {
                                    borderTop: "1px solid",
                                    borderColor: getToken("buttons.primary.low.rest"),
                                } }), _jsxs(Flex, { align: "center", justify: "space-between", children: [_jsx(Text, { children: "Net APR" }), _jsx(FormattedNumber, { incentiveAPR: incentivesNetAPR })] })] }))] })] }));
};
