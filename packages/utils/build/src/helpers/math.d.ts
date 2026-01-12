import Big from "big.js";
export declare const linearScale: (input: [number, number], output: [number, number]) => (value: number) => number;
export declare const percentageDifference: (a: string | bigint | Big, b: string | bigint | Big) => Big;
export declare const getReversePrice: (price: string) => string;
