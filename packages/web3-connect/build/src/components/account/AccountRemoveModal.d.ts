import { FC } from "react";
type Props = {
    readonly align?: "default" | "center";
    readonly onDelete: () => void;
    readonly onCancel: () => void;
    readonly onBack?: () => void;
};
export declare const AccountRemoveModal: FC<Props>;
export {};
