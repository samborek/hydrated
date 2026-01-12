import React, { FC } from "react";
import { BoxProps } from "@/components/Box";
import { MicroButtonVariant, SButtonProps } from "./Button.styled";
export type ButtonProps = BoxProps & SButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement> & {
    ref?: React.Ref<HTMLButtonElement>;
};
export type MicroButtonProps = BoxProps & {
    variant?: MicroButtonVariant;
    ref?: React.Ref<HTMLButtonElement>;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;
export declare const Button: FC<ButtonProps>;
export declare const ButtonTransparent: FC<ButtonProps>;
export declare const MicroButton: FC<MicroButtonProps>;
export declare const ButtonIcon: FC<ButtonProps>;
export declare const LoadingButton: FC<ButtonProps & {
    isLoading: boolean;
    loadingVariant?: ButtonProps["variant"];
}>;
