import Big from "big.js";
export const linearScale = (input, output) => (value) => {
    if (input[0] === input[1] || output[0] === output[1])
        return output[0];
    const ratio = (output[1] - output[0]) / (input[1] - input[0]);
    return output[0] + ratio * (value - input[0]);
};
export const percentageDifference = (a, b) => {
    const aBig = Big(typeof a === "bigint" ? a.toString() : a);
    const bBig = Big(typeof b === "bigint" ? b.toString() : b);
    return aBig.minus(bBig).abs().div(aBig.plus(bBig).div(2)).mul(100);
};
export const getReversePrice = (price) => Big(price || "0").gt(0) ? Big(1).div(price).toString() : price;
