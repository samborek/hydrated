import { FC } from "react";
type AmountVariant = "default" | "horizontalLabel" | "tokenLabel" | "small";
type AmountSize = "default" | "large";
type AmountProps = {
    readonly label?: string;
    readonly value: string;
    readonly displayValue?: string;
    readonly variant?: AmountVariant;
    readonly className?: string;
    readonly size?: AmountSize;
};
export declare const Amount: FC<AmountProps>;
export {};
