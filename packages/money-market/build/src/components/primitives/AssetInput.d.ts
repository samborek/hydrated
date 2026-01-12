import { CapType } from "@/types";
export interface Asset {
    balance?: string;
    symbol: string;
    iconSymbol?: string;
    address: string;
    aToken?: boolean;
    priceInUsd?: string;
    decimals?: number;
}
export interface AssetInputProps<T extends Asset = Asset> {
    name: string;
    value: string;
    usdValue: string;
    symbol: string;
    onChange?: (value: string) => void;
    disabled?: boolean;
    disableInput?: boolean;
    onSelect?: (asset: T) => void;
    assets: T[];
    capType?: CapType;
    maxValue?: string;
    isMaxSelected?: boolean;
    inputTitle?: React.ReactNode;
    balanceText?: React.ReactNode;
    loading?: boolean;
    className?: string;
    error?: string;
}
export declare const AssetInput: <T extends Asset = Asset>({ value, symbol, onChange, onSelect, assets, maxValue, loading, className, error, }: AssetInputProps<T>) => import("react").JSX.Element;
