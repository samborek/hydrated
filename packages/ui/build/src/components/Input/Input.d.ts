import { FC, ReactNode, Ref } from "react";
import { CustomInputProps } from "./Input.styled";
type TrailingElementProps = {
    unit?: string;
    iconEnd?: React.ComponentType;
    trailingElement?: never;
} | {
    unit?: never;
    iconEnd?: never;
    trailingElement?: ReactNode;
};
export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & CustomInputProps & TrailingElementProps & {
    isError?: boolean;
    iconStart?: React.ComponentType;
    className?: string;
    ref?: Ref<HTMLInputElement>;
};
export declare const Input: FC<InputProps>;
export {};
