import { FC, ReactNode } from "react";
type AssetWarningProps = {
    readonly title: string;
    readonly description: string;
    readonly titleInfo?: ReactNode;
};
export declare const AssetWarning: FC<AssetWarningProps>;
type AssetPropertyChangedProps = {
    readonly previous: ReactNode | bigint;
    readonly current: ReactNode | bigint;
};
export declare const AssetPropertyChanged: FC<AssetPropertyChangedProps>;
export {};
