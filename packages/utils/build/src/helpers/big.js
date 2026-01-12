import Big from "big.js";
export function isValidBigSource(value) {
    if (value instanceof Big) {
        return true;
    }
    if (value === null || value === undefined || value === "") {
        return false;
    }
    const num = Number(value);
    return !isNaN(num) && isFinite(num);
}
export function toBig(value) {
    return isValidBigSource(value) ? new Big(value) : null;
}
export function bigShift(value, places) {
    const big = Big(value || 0);
    return places >= 0
        ? big.times(new Big(10).pow(places))
        : big.div(new Big(10).pow(-places));
}
