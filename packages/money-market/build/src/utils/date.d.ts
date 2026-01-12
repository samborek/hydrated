type TimeUnit = "day" | "month" | "year";
type Operation = "add" | "subtract";
export declare function toUnixTimestamp(date: Date | number): number;
export declare function getAdjustedTimestamp(date: Date, value?: number, unit?: TimeUnit, operation?: Operation): number;
export {};
