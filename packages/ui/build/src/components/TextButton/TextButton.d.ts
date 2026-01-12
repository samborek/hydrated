import { FC, Ref } from "react";
import { CustomTextButtonProps } from "./TextButton.styled";
export type TextButtonProps = React.ComponentPropsWithoutRef<"button"> & CustomTextButtonProps;
export declare const TextButton: FC<TextButtonProps & {
    ref?: Ref<HTMLButtonElement>;
}>;
export type LinkTextButtonProps = React.ComponentPropsWithoutRef<"a"> & CustomTextButtonProps;
export declare const LinkTextButton: FC<LinkTextButtonProps & {
    ref?: Ref<HTMLAnchorElement>;
}>;
