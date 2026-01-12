import { FC } from "react";
type Props = {
    readonly name: string;
    readonly onChange: (name: string) => void;
    readonly onCancel: () => void;
};
export declare const AccountNameEdit: FC<Props>;
export {};
