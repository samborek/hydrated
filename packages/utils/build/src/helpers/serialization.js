import { Binary, FixedSizeBinary } from "polkadot-api";
import { isBigInt } from "remeda";
export const safeStringify = (value, format) => {
    if (!value)
        return value?.toString() ?? "";
    return JSON.stringify(value, (_, value) => {
        if (value instanceof Binary) {
            return FixedSizeBinary.fromBytes(value.asBytes()).asHex();
        }
        return isBigInt(value) ? `bigint:${value.toString()}` : value;
    }, format ? 2 : undefined);
};
export const safeParse = (value) => {
    return JSON.parse(value, (_, value) => {
        if (typeof value === "string") {
            if (value.startsWith("bigint:"))
                return BigInt(value.slice(7));
        }
        return value;
    });
};
