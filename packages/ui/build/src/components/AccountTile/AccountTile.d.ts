import { FC } from "react";
type Props = {
    readonly name: string;
    readonly address: string;
    readonly value: string;
    readonly active?: boolean;
    readonly label?: string;
    readonly className?: string;
    readonly walletLogoSrc?: string;
    readonly onClick?: () => void;
};
export declare const AccountTile: FC<Props>;
export {};
