import Big from "big.js";
export const GHO_SYMBOL = "HUSD";
export const GHO_ASSET_ID = "222";
/**
 * Determines if GHO is available for borrowing (minting) on the provided network, also based off the token symbol being borrowed
 * @param {GhoUtilMintingAvailableParams} - The reserve symbol and current market name
 * @returns {bool} - If the GHO token is available for minting
 */
export const GHO_SUPPORTED_MARKETS = ["hydration_v3", "hydration_testnet_v3"];
export const isGho = (reserve) => {
    return reserve.symbol === GHO_SYMBOL;
};
export const getGhoReserve = (reserves) => {
    return reserves.find(isGho);
};
/**
 * Calculates the weighted average APY
 * @param baseVariableBorrowRate - The base variable borrow rate, normalized
 * @param totalBorrowAmount - The total amount of the asset that is being borrowed
 * @param discountableAmount - The amount that can be discounted for the user
 * @param borrowRateAfterDiscount - The borrow rate after the discount is applied
 * @returns
 */
export const weightedAverageAPY = (baseVariableBorrowRate, totalBorrowAmount, discountableAmount, borrowRateAfterDiscount) => {
    if (discountableAmount === 0)
        return baseVariableBorrowRate;
    if (totalBorrowAmount <= discountableAmount)
        return borrowRateAfterDiscount;
    const nonDiscountableAmount = totalBorrowAmount - discountableAmount;
    return ((nonDiscountableAmount * baseVariableBorrowRate +
        discountableAmount * borrowRateAfterDiscount) /
        totalBorrowAmount);
};
/**
 * This helps display the discountable amount of GHO based off of how much is being borrowed and how much is discountable.
 * This is used in both the borrow modal and the discount rate calculator.
 * @param discountableGhoAmount - The amount of GHO that is discountable
 * @param amountGhoBeingBorrowed - The amount of GHO requesting to be borrowed
 * @returns The amount of discountable GHO as a number in a display-friendly form
 */
export const displayDiscountableAmount = (discountableGhoAmount, amountGhoBeingBorrowed) => {
    return discountableGhoAmount >= amountGhoBeingBorrowed
        ? amountGhoBeingBorrowed
        : discountableGhoAmount;
};
/**
 * This helps display the non-discountable amount of GHO based off of how much is being borrowed and how much is discountable.
 * This is used in both the borrow modal and the discount rate calculator.
 * @param discountableGhoAmount - The amount of GHO that is discountable
 * @param amountGhoBeingBorrowed - The amount of GHO requesting to be borrowed
 * @returns The amount of non-discountable GHO as a number in a display-friendly form
 */
export const displayNonDiscountableAmount = (discountableGhoAmount, amountGhoBeingBorrowed) => {
    return discountableGhoAmount >= amountGhoBeingBorrowed
        ? 0
        : amountGhoBeingBorrowed - discountableGhoAmount;
};
export const findAndFilterGhoReserve = (reserves) => {
    return reserves.reduce((acum, reserve) => {
        if (reserve.symbol === GHO_SYMBOL)
            return { value: reserve, filtered: acum.filtered };
        else
            return { ...acum, filtered: acum.filtered.concat(reserve) };
    }, {
        value: undefined,
        filtered: [],
    });
};
export const formatGhoReserve = (reserve, ghoReserveData) => {
    const borrowCap = Big(ghoReserveData.aaveFacilitatorBucketMaxCapacity);
    return {
        ...reserve,
        borrowCap: borrowCap.toString(),
        borrowCapUSD: borrowCap.times(reserve.priceInUSD).toString(),
    };
};
export const getGhoBorrowApyRange = (ghoReserveData) => {
    const minVal = ghoReserveData.ghoBorrowAPYWithMaxDiscount;
    const maxVal = ghoReserveData.ghoVariableBorrowAPY;
    const normalizedLowValue = Number((minVal * 100).toFixed(2));
    const normalizedHighValue = Number((maxVal * 100).toFixed(2));
    const isSameDisplayValue = normalizedLowValue === normalizedHighValue;
    return isSameDisplayValue ? minVal * 100 : [minVal * 100, maxVal * 100];
};
