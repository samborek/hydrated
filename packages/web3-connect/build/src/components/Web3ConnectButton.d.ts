import { ButtonProps } from "@galacticcouncil/ui/components";
import { FC, Ref } from "react";
export type Web3ConnectButtonProps = ButtonProps & {
    allowIncompatibleAccounts?: boolean;
};
export declare const Web3ConnectButton: FC<Web3ConnectButtonProps & {
    ref?: Ref<HTMLButtonElement>;
}>;
