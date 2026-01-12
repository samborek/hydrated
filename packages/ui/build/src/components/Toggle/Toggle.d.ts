import { FC, Ref } from "react";
import { FlexProps } from "@/components/Flex";
import { TextProps } from "@/components/Text";
import { ToggleProps } from "./Toggle.styled";
export declare const ToggleRoot: FC<FlexProps>;
export declare const Toggle: FC<ToggleProps & {
    ref?: Ref<HTMLButtonElement>;
}>;
export declare const ToggleLabel: FC<TextProps & {
    ref?: Ref<HTMLParagraphElement>;
}>;
