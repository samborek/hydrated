import Big, { BigSource } from "big.js";
export declare function isValidBigSource(value: unknown): value is BigSource;
export declare function toBig(value: string | number): Big.Big | null;
export declare function bigShift(value: BigSource, places: number): Big;
