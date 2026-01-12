import Big from "big.js";
declare module "big.js" {
    interface BigConstructor {
        min(...values: [Big.BigSource, ...Big.BigSource[]]): Big.Big;
        max(...values: [Big.BigSource, ...Big.BigSource[]]): Big.Big;
        _patched?: boolean;
    }
}
export declare function patchBigJs(): void;
