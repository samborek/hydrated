import Big from "big.js";
import { useAppDataContext } from "@/hooks/app-data-provider/useAppDataProvider";
import { useModalContext } from "@/hooks/useModal";
var ErrorType;
(function (ErrorType) {
    ErrorType[ErrorType["CAN_NOT_WITHDRAW_THIS_AMOUNT"] = 0] = "CAN_NOT_WITHDRAW_THIS_AMOUNT";
    ErrorType[ErrorType["POOL_DOES_NOT_HAVE_ENOUGH_LIQUIDITY"] = 1] = "POOL_DOES_NOT_HAVE_ENOUGH_LIQUIDITY";
    ErrorType[ErrorType["ZERO_LTV_WITHDRAW_BLOCKED"] = 2] = "ZERO_LTV_WITHDRAW_BLOCKED";
})(ErrorType || (ErrorType = {}));
export const useWithdrawError = ({ assetsBlockingWithdraw, poolReserve, healthFactorAfterWithdraw, withdrawAmount, }) => {
    const { mainTxState: withdrawTxState } = useModalContext();
    const { user } = useAppDataContext();
    let blockingError = undefined;
    const unborrowedLiquidity = Big(poolReserve.unborrowedLiquidity);
    if (!withdrawTxState.success && !withdrawTxState.txHash) {
        if (assetsBlockingWithdraw.length > 0 &&
            !assetsBlockingWithdraw.includes(poolReserve.symbol)) {
            blockingError = ErrorType.ZERO_LTV_WITHDRAW_BLOCKED;
        }
        else if (healthFactorAfterWithdraw.lt("1") &&
            user.totalBorrowsMarketReferenceCurrency !== "0") {
            blockingError = ErrorType.CAN_NOT_WITHDRAW_THIS_AMOUNT;
        }
        else if (!blockingError &&
            (unborrowedLiquidity.eq("0") ||
                Big(withdrawAmount || "0").gt(poolReserve.unborrowedLiquidity))) {
            blockingError = ErrorType.POOL_DOES_NOT_HAVE_ENOUGH_LIQUIDITY;
        }
    }
    const errors = {
        [ErrorType.CAN_NOT_WITHDRAW_THIS_AMOUNT]: "You can not withdraw this amount because it will cause collateral call",
        [ErrorType.POOL_DOES_NOT_HAVE_ENOUGH_LIQUIDITY]: "These funds have been borrowed and are not available for withdrawal at this time.",
        [ErrorType.ZERO_LTV_WITHDRAW_BLOCKED]: `Assets with zero LTV (${assetsBlockingWithdraw}) must be withdrawn or disabled as collateral to perform this action`,
    };
    return {
        blockingError,
        errorText: blockingError ? errors[blockingError] : undefined,
    };
};
