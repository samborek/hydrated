import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { InterestRate } from "@aave/contract-helpers";
import { calculateHealthFactorFromBalancesBigUnits, USD_DECIMALS, } from "@aave/math-utils";
import { CircleInfo } from "@galacticcouncil/ui/assets/icons";
import { Box, Button, Flex, Separator, Stack, SummaryRow, Text, Tooltip, } from "@galacticcouncil/ui/components";
import { bigShift } from "@galacticcouncil/utils";
import Big from "big.js";
import { useState } from "react";
import { AssetInput, HealthFactorChange, IncentivesButton, } from "@/components/primitives";
import { HealthFactorRiskWarning } from "@/components/primitives/HealthFactorRiskWarning";
import { ParameterChangeWarning } from "@/components/warnings/ParameterChangeWarning";
import { useAppDataContext } from "@/hooks/app-data-provider/useAppDataProvider";
import { useAppFormatters } from "@/hooks/app-data-provider/useAppFormatters";
import { useAssetCaps } from "@/hooks/useAssetCaps";
import { CapType } from "@/types";
import { HEALTH_FACTOR_RISK_THRESHOLD } from "@/ui-config/misc";
import { getMaxAmountAvailableToBorrow } from "@/utils/getMaxAmountAvailableToBorrow";
import { roundToTokenDecimals } from "@/utils/utils";
import { BorrowActions } from "./BorrowActions";
export var ErrorType;
(function (ErrorType) {
    ErrorType[ErrorType["MAX_EXCEEDED"] = 0] = "MAX_EXCEEDED";
    ErrorType[ErrorType["STABLE_RATE_NOT_ENABLED"] = 1] = "STABLE_RATE_NOT_ENABLED";
    ErrorType[ErrorType["NOT_ENOUGH_LIQUIDITY"] = 2] = "NOT_ENOUGH_LIQUIDITY";
    ErrorType[ErrorType["BORROWING_NOT_AVAILABLE"] = 3] = "BORROWING_NOT_AVAILABLE";
    ErrorType[ErrorType["NOT_ENOUGH_BORROWED"] = 4] = "NOT_ENOUGH_BORROWED";
})(ErrorType || (ErrorType = {}));
const BorrowModeSwitch = ({ setInterestRateMode, interestRateMode, variableRate, stableRate, ...props }) => {
    const { formatPercent } = useAppFormatters();
    return (_jsxs(Box, { ...props, children: [_jsxs(Text, { fs: 14, mb: 6, sx: { display: "flex", alignItems: "center", gap: 4 }, children: ["Borrow APY Rate", _jsx(Tooltip, { text: "Allows you to switch between variable and stable interest rates, where variable rate can increase and decrease depending on the amount of liquidity in the reserve, and stable rate will stay the same for the duration of your loan.", children: _jsx(CircleInfo, {}) })] }), _jsxs(Flex, { gap: 10, children: [_jsxs(Button, { width: "100%", variant: interestRateMode === InterestRate.Variable ? "primary" : "tertiary", onClick: () => setInterestRateMode(InterestRate.Variable), children: [_jsx(Text, { mr: 4, as: "span", children: "Variable" }), formatPercent(Number(variableRate) * 100)] }), _jsxs(Button, { width: "100%", variant: interestRateMode === InterestRate.Stable ? "primary" : "tertiary", onClick: () => setInterestRateMode(InterestRate.Stable), children: [_jsx(Text, { mr: 4, as: "span", children: "Stable" }), formatPercent(Number(stableRate) * 100)] })] })] }));
};
export const BorrowModalContent = ({ poolReserve, userReserve, symbol, }) => {
    const { user, marketReferencePriceInUsd } = useAppDataContext();
    const { borrowCap } = useAssetCaps();
    const [interestRateMode, setInterestRateMode] = useState(InterestRate.Variable);
    const [amount, setAmount] = useState("");
    const [healthFactorRiskCheckboxAccepted, setHealthFactorRiskCheckboxAccepted,] = useState(false);
    const maxAmountToBorrow = getMaxAmountAvailableToBorrow(poolReserve, user, interestRateMode);
    // We set this in a useEffect, so it doesn't constantly change when
    // max amount selected
    const handleChange = (_value) => {
        if (_value === "-1") {
            setAmount(maxAmountToBorrow);
        }
        else {
            const decimalTruncatedValue = roundToTokenDecimals(_value, poolReserve.decimals);
            setAmount(decimalTruncatedValue);
        }
    };
    const isMaxSelected = amount === maxAmountToBorrow;
    // health factor calculations
    const amountToBorrowInUsd = bigShift(Big(amount || 0)
        .mul(poolReserve.formattedPriceInMarketReferenceCurrency)
        .mul(marketReferencePriceInUsd), -USD_DECIMALS);
    const newHealthFactor = calculateHealthFactorFromBalancesBigUnits({
        collateralBalanceMarketReferenceCurrency: user.totalCollateralUSD,
        borrowBalanceMarketReferenceCurrency: Big(user.totalBorrowsUSD)
            .plus(amountToBorrowInUsd)
            .toString(),
        currentLiquidationThreshold: user.currentLiquidationThreshold,
    });
    // calculating input usd value
    const usdValue = Big(amount || 0).mul(poolReserve.priceInUSD);
    // error types handling
    let blockingError = undefined;
    if (!!amount && Big(amount || 0).gt(maxAmountToBorrow)) {
        blockingError = ErrorType.MAX_EXCEEDED;
    }
    else if (interestRateMode === InterestRate.Stable &&
        !poolReserve.stableBorrowRateEnabled) {
        blockingError = ErrorType.STABLE_RATE_NOT_ENABLED;
    }
    else if (interestRateMode === InterestRate.Stable &&
        userReserve?.usageAsCollateralEnabledOnUser &&
        Big(amount || 0).lt(userReserve?.underlyingBalance || 0)) {
        blockingError = ErrorType.NOT_ENOUGH_BORROWED;
    }
    else if (Big(amount || 0).gt(poolReserve.formattedAvailableLiquidity)) {
        blockingError = ErrorType.NOT_ENOUGH_LIQUIDITY;
    }
    else if (!poolReserve.borrowingEnabled) {
        blockingError = ErrorType.BORROWING_NOT_AVAILABLE;
    }
    const handleBlocked = () => {
        switch (blockingError) {
            case ErrorType.MAX_EXCEEDED:
                return "Maximum available amount exceeded";
            case ErrorType.BORROWING_NOT_AVAILABLE:
                return `Borrowing is currently unavailable for ${poolReserve.symbol}.`;
            case ErrorType.NOT_ENOUGH_BORROWED:
                return "You can borrow this asset with a stable rate only if you borrow more than the amount you are supplying as collateral.";
            case ErrorType.NOT_ENOUGH_LIQUIDITY:
                return "There are not enough funds in the {poolReserve.symbol} reserve to borrow";
            case ErrorType.STABLE_RATE_NOT_ENABLED:
                return "The Stable Rate is not enabled for this currency";
            default:
                return;
        }
    };
    const iconSymbol = poolReserve.iconSymbol;
    const incentives = interestRateMode === InterestRate.Stable
        ? poolReserve.sIncentivesData
        : poolReserve.vIncentivesData;
    const shouldRenderIncentives = incentives && incentives.length > 0;
    const healthFactor = user ? user.healthFactor : "-1";
    const futureHealthFactor = newHealthFactor.toString();
    const shouldRenderHealthFactor = healthFactor !== "-1" && futureHealthFactor !== "-1";
    const displayHealthFactorRiskCheckbox = !!amount &&
        !newHealthFactor.eq(-1) &&
        newHealthFactor.lt(HEALTH_FACTOR_RISK_THRESHOLD);
    return (_jsxs(_Fragment, { children: [poolReserve.stableBorrowRateEnabled && (_jsxs(_Fragment, { children: [_jsx(BorrowModeSwitch, { pb: 14, interestRateMode: interestRateMode, setInterestRateMode: setInterestRateMode, variableRate: poolReserve.variableBorrowAPY, stableRate: poolReserve.stableBorrowAPY }), _jsx(Separator, { mx: "var(--modal-content-inset)", mb: 14 })] })), _jsx(AssetInput, { name: "borrow-amount", value: amount, onChange: handleChange, usdValue: usdValue.toString(), assets: [
                    {
                        balance: maxAmountToBorrow,
                        symbol,
                        iconSymbol,
                        address: poolReserve.underlyingAsset,
                    },
                ], symbol: symbol, capType: CapType.borrowCap, isMaxSelected: isMaxSelected, maxValue: maxAmountToBorrow, balanceText: "Available", error: handleBlocked() }), _jsx(Separator, { mx: "var(--modal-content-inset)" }), _jsxs(Stack, { separated: true, separator: _jsx(Separator, { mx: "var(--modal-content-inset)" }), withTrailingSeparator: true, children: [shouldRenderIncentives && (_jsx(SummaryRow, { label: "Incentives", content: _jsx(IncentivesButton, { incentives: incentives, symbol: poolReserve.symbol }) })), shouldRenderHealthFactor && (_jsx(SummaryRow, { label: "Health Factor", content: _jsx(HealthFactorChange, { healthFactor: healthFactor, futureHealthFactor: futureHealthFactor }) })), _jsxs(Stack, { gap: 14, py: 14, children: [_jsx(ParameterChangeWarning, {}), borrowCap.determineWarningDisplay({ borrowCap }), displayHealthFactorRiskCheckbox && (_jsx(HealthFactorRiskWarning, { message: "Borrowing this amount will reduce your health factor and increase risk of liquidation.", accepted: healthFactorRiskCheckboxAccepted, onAcceptedChange: setHealthFactorRiskCheckboxAccepted, isUserConsentRequired: true }))] })] }), _jsx(BorrowActions, { poolReserve: poolReserve, amountToBorrow: amount, poolAddress: poolReserve.underlyingAsset, interestRateMode: interestRateMode, symbol: symbol, blocked: blockingError !== undefined ||
                    (displayHealthFactorRiskCheckbox && !healthFactorRiskCheckboxAccepted) })] }));
};
