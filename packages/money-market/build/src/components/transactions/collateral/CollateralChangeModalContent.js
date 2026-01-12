import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { calculateHealthFactorFromBalancesBigUnits } from "@aave/math-utils";
import { ArrowRight } from "@galacticcouncil/ui/assets/icons";
import { Alert, Flex, Icon, Separator, Stack, SummaryRow, Text, } from "@galacticcouncil/ui/components";
import { getToken } from "@galacticcouncil/ui/utils";
import Big from "big.js";
import { HealthFactorChange } from "@/components/primitives";
import { ValueDetail } from "@/components/primitives/ValueDetail";
import { IsolationModeWarning } from "@/components/warnings/IsolationModeWarning";
import { useAppDataContext } from "@/hooks/app-data-provider/useAppDataProvider";
import { useAppFormatters } from "@/hooks/app-data-provider/useAppFormatters";
import { useAssetCaps } from "@/hooks/useAssetCaps";
import { zeroLTVBlockingWithdraw } from "@/utils/transactions";
import { CollateralChangeActions } from "./CollateralChangeActions";
export var ErrorType;
(function (ErrorType) {
    ErrorType[ErrorType["DO_NOT_HAVE_SUPPLIES_IN_THIS_CURRENCY"] = 0] = "DO_NOT_HAVE_SUPPLIES_IN_THIS_CURRENCY";
    ErrorType[ErrorType["CAN_NOT_USE_THIS_CURRENCY_AS_COLLATERAL"] = 1] = "CAN_NOT_USE_THIS_CURRENCY_AS_COLLATERAL";
    ErrorType[ErrorType["CAN_NOT_SWITCH_USAGE_AS_COLLATERAL_MODE"] = 2] = "CAN_NOT_SWITCH_USAGE_AS_COLLATERAL_MODE";
    ErrorType[ErrorType["ZERO_LTV_WITHDRAW_BLOCKED"] = 3] = "ZERO_LTV_WITHDRAW_BLOCKED";
})(ErrorType || (ErrorType = {}));
export const CollateralChangeModalContent = ({ poolReserve, userReserve, symbol }) => {
    const { user } = useAppDataContext();
    const { debtCeiling } = useAssetCaps();
    const { formatCurrency } = useAppFormatters();
    // Health factor calculations
    const isCollateralEnabled = userReserve.usageAsCollateralEnabledOnUser;
    const usageAsCollateralModeAfterSwitch = !isCollateralEnabled;
    const currenttotalCollateralMarketReferenceCurrency = Big(user.totalCollateralMarketReferenceCurrency);
    // Messages
    const showEnableIsolationModeMsg = !poolReserve.isIsolated && usageAsCollateralModeAfterSwitch;
    const showDisableIsolationModeMsg = !poolReserve.isIsolated && !usageAsCollateralModeAfterSwitch;
    const showEnterIsolationModeMsg = poolReserve.isIsolated && usageAsCollateralModeAfterSwitch;
    const showExitIsolationModeMsg = poolReserve.isIsolated && !usageAsCollateralModeAfterSwitch;
    const totalCollateralAfterSwitchETH = currenttotalCollateralMarketReferenceCurrency[usageAsCollateralModeAfterSwitch ? "plus" : "minus"](userReserve.underlyingBalanceMarketReferenceCurrency);
    const healthFactorAfterSwitch = calculateHealthFactorFromBalancesBigUnits({
        collateralBalanceMarketReferenceCurrency: totalCollateralAfterSwitchETH.toString(),
        borrowBalanceMarketReferenceCurrency: user.totalBorrowsMarketReferenceCurrency,
        currentLiquidationThreshold: user.currentLiquidationThreshold,
    });
    const assetsBlockingWithdraw = zeroLTVBlockingWithdraw(user);
    // error handling
    let blockingError = undefined;
    if (assetsBlockingWithdraw.length > 0 &&
        !assetsBlockingWithdraw.includes(poolReserve.symbol)) {
        blockingError = ErrorType.ZERO_LTV_WITHDRAW_BLOCKED;
    }
    else if (Big(userReserve.underlyingBalance).eq(0)) {
        blockingError = ErrorType.DO_NOT_HAVE_SUPPLIES_IN_THIS_CURRENCY;
    }
    else if ((!userReserve.usageAsCollateralEnabledOnUser &&
        poolReserve.reserveLiquidationThreshold === "0") ||
        poolReserve.reserveLiquidationThreshold === "0") {
        blockingError = ErrorType.CAN_NOT_USE_THIS_CURRENCY_AS_COLLATERAL;
    }
    else if (userReserve.usageAsCollateralEnabledOnUser &&
        user.totalBorrowsMarketReferenceCurrency !== "0" &&
        healthFactorAfterSwitch.lte("1")) {
        blockingError = ErrorType.CAN_NOT_SWITCH_USAGE_AS_COLLATERAL_MODE;
    }
    // error render handling
    const getBlockingErrorMessage = () => {
        switch (blockingError) {
            case ErrorType.DO_NOT_HAVE_SUPPLIES_IN_THIS_CURRENCY:
                return "You do not have supplies in this currency.";
            case ErrorType.CAN_NOT_USE_THIS_CURRENCY_AS_COLLATERAL:
                return "You can not use this currency as collateral.";
            case ErrorType.CAN_NOT_SWITCH_USAGE_AS_COLLATERAL_MODE:
                return "You can not switch usage as collateral mode for this currency, because it will cause collateral call.";
            case ErrorType.ZERO_LTV_WITHDRAW_BLOCKED:
                return `Assets with zero LTV (${assetsBlockingWithdraw.join(", ")}) must be withdrawn or disabled as collateral to perform this action.`;
            default:
                return "";
        }
    };
    const healthFactor = user ? user.healthFactor : "-1";
    const futureHealthFactor = healthFactorAfterSwitch.toString();
    const shouldRenderHealthFactor = healthFactor !== "-1" && futureHealthFactor !== "-1";
    return (_jsxs(_Fragment, { children: [_jsxs(Stack, { mt: "var(--modal-content-inset)", separated: true, separator: _jsx(Separator, { mx: "var(--modal-content-inset)" }), withTrailingSeparator: true, children: [_jsx(SummaryRow, { label: "Supply balance", content: _jsx(ValueDetail, { value: formatCurrency(userReserve.underlyingBalance, {
                                symbol,
                            }) }) }), _jsx(SummaryRow, { label: "Collateral", content: _jsx(Flex, { align: "center", gap: 4, children: isCollateralEnabled ? (_jsxs(_Fragment, { children: [_jsx(Text, { color: getToken("accents.success.emphasis"), fw: 500, children: "Enabled" }), _jsx(Icon, { size: 14, component: ArrowRight }), _jsx(Text, { color: getToken("accents.danger.emphasis"), fw: 500, children: "Disabled" })] })) : (_jsxs(_Fragment, { children: [_jsx(Text, { color: getToken("accents.danger.emphasis"), fw: 500, children: "Disabled" }), _jsx(Icon, { size: 14, component: ArrowRight }), _jsx(Text, { color: getToken("accents.success.emphasis"), fw: 500, children: "Enabled" })] })) }) }), shouldRenderHealthFactor && (_jsx(SummaryRow, { label: "Health Factor", content: _jsx(HealthFactorChange, { healthFactor: healthFactor, futureHealthFactor: futureHealthFactor }) })), _jsxs(Stack, { gap: 14, py: 14, children: [showExitIsolationModeMsg && (_jsx(Alert, { variant: "info", description: "You will exit isolation mode and other tokens can now be used as collateral" })), showEnableIsolationModeMsg && (_jsx(Alert, { variant: "warning", description: "Enabling this asset as collateral increases your borrowing power and Health Factor. However, it can get liquidated if your health factor drops below 1." })), showDisableIsolationModeMsg && (_jsx(Alert, { variant: "warning", description: "Disabling this asset as collateral affects your borrowing power and Health Factor." })), showEnterIsolationModeMsg && (_jsx(IsolationModeWarning, { asset: poolReserve.symbol })), blockingError !== undefined && (_jsx(Alert, { variant: "error", description: getBlockingErrorMessage() })), poolReserve.isIsolated &&
                                debtCeiling.determineWarningDisplay({ debtCeiling })] })] }), _jsx(CollateralChangeActions, { symbol: symbol, poolReserve: poolReserve, usageAsCollateral: usageAsCollateralModeAfterSwitch, blocked: blockingError !== undefined })] }));
};
