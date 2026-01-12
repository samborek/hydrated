import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { Separator, Stack, SummaryRow } from "@galacticcouncil/ui/components";
import Big from "big.js";
import { useRef, useState } from "react";
import { AssetInput, HealthFactorChange } from "@/components/primitives";
import { HealthFactorRiskWarning } from "@/components/primitives/HealthFactorRiskWarning";
import { ValueDetail } from "@/components/primitives/ValueDetail";
import { useAppDataContext } from "@/hooks/app-data-provider/useAppDataProvider";
import { useAppFormatters } from "@/hooks/app-data-provider/useAppFormatters";
import { useModalContext } from "@/hooks/useModal";
import { HEALTH_FACTOR_RISK_THRESHOLD } from "@/ui-config/misc";
import { calculateHFAfterWithdraw } from "@/utils/hfUtils";
import { zeroLTVBlockingWithdraw } from "@/utils/transactions";
import { WithdrawActions } from "./WithdrawActions";
import { useWithdrawError } from "./WithdrawError";
import { calculateMaxWithdrawAmount } from "./WithdrawModalContent.utils";
export var ErrorType;
(function (ErrorType) {
    ErrorType[ErrorType["CAN_NOT_WITHDRAW_THIS_AMOUNT"] = 0] = "CAN_NOT_WITHDRAW_THIS_AMOUNT";
    ErrorType[ErrorType["POOL_DOES_NOT_HAVE_ENOUGH_LIQUIDITY"] = 1] = "POOL_DOES_NOT_HAVE_ENOUGH_LIQUIDITY";
    ErrorType[ErrorType["ZERO_LTV_WITHDRAW_BLOCKED"] = 2] = "ZERO_LTV_WITHDRAW_BLOCKED";
})(ErrorType || (ErrorType = {}));
export const WithdrawModalContent = ({ poolReserve, userReserve, symbol, }) => {
    const { formatCurrency } = useAppFormatters();
    const { mainTxState: withdrawTxState } = useModalContext();
    const { user } = useAppDataContext();
    const [_amount, setAmount] = useState("");
    const [withdrawMax, setWithdrawMax] = useState("");
    const [healthFactorRiskCheckboxAccepted, setHealthFactorRiskCheckboxAccepted,] = useState(false);
    const amountRef = useRef("");
    const isMaxSelected = _amount === "-1";
    const maxAmountToWithdraw = calculateMaxWithdrawAmount(user, userReserve, poolReserve);
    const underlyingBalance = Big(userReserve?.underlyingBalance || "0");
    const unborrowedLiquidity = Big(poolReserve.unborrowedLiquidity);
    const withdrawAmount = isMaxSelected
        ? maxAmountToWithdraw.toString()
        : _amount;
    const isMaxExceeded = !!withdrawAmount && Big(withdrawAmount).gt(maxAmountToWithdraw);
    const handleChange = (value) => {
        const maxSelected = value === "-1";
        amountRef.current = maxSelected ? maxAmountToWithdraw.toString() : value;
        setAmount(value);
        if (maxSelected && maxAmountToWithdraw.eq(underlyingBalance)) {
            setWithdrawMax("-1");
        }
        else {
            setWithdrawMax(maxAmountToWithdraw.toString());
        }
    };
    const assetsBlockingWithdraw = zeroLTVBlockingWithdraw(user);
    const healthFactorAfterWithdraw = calculateHFAfterWithdraw({
        user,
        userReserve,
        poolReserve,
        withdrawAmount,
    });
    const { blockingError, errorText } = useWithdrawError({
        assetsBlockingWithdraw,
        poolReserve,
        healthFactorAfterWithdraw,
        withdrawAmount,
    });
    const displayHealthFactorRiskCheckbox = !!withdrawAmount &&
        !healthFactorAfterWithdraw.eq(-1) &&
        healthFactorAfterWithdraw.lt(HEALTH_FACTOR_RISK_THRESHOLD) &&
        userReserve.usageAsCollateralEnabledOnUser;
    // calculating input usd value
    const usdValue = Big(withdrawAmount || "0").mul(userReserve?.reserve.priceInUSD || 0);
    const healthFactor = user ? user.healthFactor : "-1";
    const futureHealthFactor = healthFactorAfterWithdraw.toString();
    const shouldRenderHealthFactor = healthFactor !== "-1" && futureHealthFactor !== "-1";
    return (_jsxs(_Fragment, { children: [_jsx(AssetInput, { name: "withdraw-amount", value: withdrawAmount, onChange: handleChange, symbol: symbol, assets: [
                    {
                        balance: maxAmountToWithdraw.toString(),
                        symbol: symbol,
                        iconSymbol: poolReserve.iconSymbol,
                        address: poolReserve.underlyingAsset,
                    },
                ], usdValue: usdValue.toString(), isMaxSelected: isMaxSelected, disabled: withdrawTxState.loading, maxValue: maxAmountToWithdraw.toString(), balanceText: unborrowedLiquidity.lt(underlyingBalance) ? (_jsx("span", { children: "Available" })) : (_jsx("span", { children: "Supply balance" })), error: isMaxExceeded ? "Insufficient balance on your account." : errorText }), _jsx(Separator, { mx: "var(--modal-content-inset)" }), _jsxs(Stack, { separated: true, separator: _jsx(Separator, { mx: "var(--modal-content-inset)" }), withTrailingSeparator: true, children: [_jsx(SummaryRow, { label: "Remaining supply", content: _jsx(ValueDetail, { value: formatCurrency(underlyingBalance.minus(withdrawAmount || "0").toString(), {
                                symbol,
                            }) }) }), shouldRenderHealthFactor && (_jsx(SummaryRow, { label: "Health Factor", content: _jsx(HealthFactorChange, { healthFactor: healthFactor, futureHealthFactor: futureHealthFactor }) })), displayHealthFactorRiskCheckbox && (_jsx(HealthFactorRiskWarning, { py: 14, message: "Withdrawing this amount will reduce your health factor and increase risk of liquidation.", accepted: healthFactorRiskCheckboxAccepted, onAcceptedChange: setHealthFactorRiskCheckboxAccepted, isUserConsentRequired: true }))] }), _jsx(WithdrawActions, { poolReserve: poolReserve, amountToWithdraw: isMaxSelected ? withdrawMax : withdrawAmount, poolAddress: poolReserve.underlyingAsset, symbol: symbol, blocked: blockingError !== undefined ||
                    (displayHealthFactorRiskCheckbox &&
                        !healthFactorRiskCheckboxAccepted) ||
                    isMaxExceeded })] }));
};
